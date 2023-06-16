import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-show-all-employee',
  templateUrl: './show-all-employee.component.html',
  styleUrls: ['./show-all-employee.component.css'],
})
export class ShowAllEmployeeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedEmployee: any = {};
  employees: any[] = [];
  isLoading = true;
  pagedEmployees: any[] = [];
  totalEmployees = 0;
  pageSize = 4;
  filteredEmployees: any[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeService
      .getEmployees()
      .then((response) => {
        this.employees = response.data.result;
        this.totalEmployees = this.employees.length;
        this.filteredEmployees = this.employees;
        this.updatePagedEmployees();
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      })
      .catch((error) => {
        console.error(error);
        this.isLoading = false;
      });
  }

  clickToDelete(index: number) {
    const employee = this.pagedEmployees[index];
    const empID = employee.empID;

    const url = `${this.employeeService.url}/${empID}`;
    const headers = this.employeeService.getHeaders();

    axios
      .delete(url, { headers })
      .then((response) => {
        this.toastr.success(`Delete employee ID : ${empID} success`);
        this.updatePagedEmployees();
        this.ngZone.run(() => {
          // console.log(1);
        });
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(error);
      });
  }

  updatePagedEmployees() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    const filteredEmployees = this.filteredEmployees.filter(
      (employee) => employee.statusID === 1
    );
    this.totalEmployees = filteredEmployees.length;
    this.pagedEmployees = filteredEmployees.slice(startIndex, endIndex);
    this.changeDetectorRef.detectChanges();
  }

  clickToShowDetail(index: number) {
    const employee = this.pagedEmployees[index];
    const empID = employee.empID;
    this.router.navigate([`/employee/${empID}/info`]);
  }

  filterEmployee() {
    // this.paginator.firstPage();
    // this.updatePagedEmployees();
    this.paginator.firstPage();
    this.filteredEmployees = this.employees.filter((employee) => {
      const fullName = `${employee.firstNameEN} ${employee.lastNameEN} ${employee.nickName}`;
      return fullName.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    this.totalEmployees = this.filteredEmployees.length;
    this.updatePagedEmployees();
  }

  handlePageEvent(event: PageEvent) {
    this.updatePagedEmployees();
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterEmployee();
  }
}
