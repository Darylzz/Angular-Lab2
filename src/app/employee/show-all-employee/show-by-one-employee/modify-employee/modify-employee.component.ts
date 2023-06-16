import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/employee/employee.service';

@Component({
  selector: 'app-modify-employee',
  templateUrl: './modify-employee.component.html',
  styleUrls: ['./modify-employee.component.css'],
})
export class ModifyEmployeeComponent implements OnInit {
  firstNameTH!: string;
  lastNameTH!: string;
  firstNameEN!: string;
  lastNameEN!: string;
  nickName!: string;
  empID!: string;
  departmentID!: number | null;
  positionID!: number | null;
  statusID!: number | null;
  email!: string;
  telephone!: number | null;
  startDate!: number | null;
  birthDate!: number | null;
  profilePath!: string;
  isModified: boolean = false;

  constructor(
    private params: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const empID = this.params.snapshot.paramMap.get('id');
    const url = `${this.employeeService.url}/${empID}/info`;
    const headers = this.employeeService.getHeaders();

    axios
      .get(url, { headers })
      .then((response) => {
        const employeeData = response.data.result;

        this.firstNameTH = employeeData.firstNameTH;
        this.lastNameTH = employeeData.lastNameTH;
        this.firstNameEN = employeeData.firstNameEN;
        this.lastNameEN = employeeData.lastNameEN;
        this.nickName = employeeData.nickName;
        this.empID = employeeData.empID;
        this.departmentID = employeeData.departmentID;
        this.positionID = employeeData.positionID;
        this.statusID = employeeData.statusID;
        this.email = employeeData.email;
        this.telephone = employeeData.telephone;
        this.startDate = employeeData.startDate;
        this.birthDate = employeeData.birthDate;
        this.profilePath = employeeData.profilePath;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onFieldChange() {
    this.isModified = true;
  }

  onModifyEmployee() {
    if (!this.isModified) {
      this.toastr.error('Please change anything in filed or click cancel');
      return;
    }

    if (
      !this.firstNameTH ||
      !this.lastNameTH ||
      !this.firstNameEN ||
      !this.lastNameEN ||
      !this.nickName ||
      !this.empID ||
      !this.departmentID ||
      !this.positionID ||
      !this.statusID ||
      !this.email ||
      !this.telephone ||
      !this.startDate ||
      !this.birthDate ||
      !this.profilePath
    ) {
      this.toastr.error('Please fill in any field');
      return;
    }

    const empID = this.params.snapshot.paramMap.get('id');
    const url = `${this.employeeService.url}/${empID}`;

    const headers = this.employeeService.getHeaders();

    const employeeData = {
      firstNameTH: this.firstNameTH,
      lastNameTH: this.lastNameTH,
      firstNameEN: this.firstNameEN,
      lastNameEN: this.lastNameEN,
      nickName: this.nickName,
      empID: this.empID,
      departmentID: this.departmentID,
      positionID: this.positionID,
      statusID: this.statusID,
      email: this.email,
      telephone: this.telephone,
      startDate: this.startDate,
      birthDate: this.birthDate,
      profilePath: this.profilePath,
    };

    axios
      .put(url, employeeData, { headers })
      .then((response) => {
        this.toastr.success(`Successfully modified empID: ${empID}`);
        this.router.navigate([`/employee/${empID}/info`]);
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(error);
      });
  }

  onCancel() {
    const empID = this.params.snapshot.paramMap.get('id');
    this.router.navigate([`/employee/${empID}/info`]);
  }
}
