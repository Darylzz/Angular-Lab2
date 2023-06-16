import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-show-by-one-employee',
  templateUrl: './show-by-one-employee.component.html',
  styleUrls: ['./show-by-one-employee.component.css'],
})
export class ShowByOneEmployeeComponent implements OnInit {
  selectedEmployee: any = {};
  constructor(
    private router: ActivatedRoute,
    private Router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const empID = this.router.snapshot.paramMap.get('id');
    const url = `${this.employeeService.url}/${empID}/info`;

    const headers = this.employeeService.getHeaders();

    axios
      .get(url, { headers })
      .then((response) => {
        this.selectedEmployee = response.data.result;
        // console.log(this.selectedEmployee);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clickToModify() {
    const employee = this.router.snapshot.paramMap.get('id');
    this.Router.navigate([`/employee/${employee}/modify`]);
  }
}
