import { Component } from '@angular/core';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css'],
})
export class AddEmployeeFormComponent {
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

  constructor(
    private toastr: ToastrService,
    private employeeService: EmployeeService
  ) {}

  onSubmitForm() {
    if (
      this.firstNameTH.trim() === '' ||
      this.lastNameTH.trim() === '' ||
      this.firstNameEN.trim() === '' ||
      this.lastNameEN.trim() === '' ||
      this.nickName.trim() === '' ||
      this.email.trim() === ''
    ) {
      this.toastr.error('Please fill in field');
      return;
    }

    const url = `${this.employeeService.url}`;
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
      .post(url, employeeData, { headers })
      .then((response) => {
        console.log(response);
        this.toastr.success('Success add employee');
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error('Fail to add employee');
      });

    this.resetInput();
  }

  onCancel() {
    this.resetInput();
  }

  private resetInput() {
    this.firstNameTH = '';
    this.lastNameTH = '';
    this.firstNameEN = '';
    this.lastNameEN = '';
    this.nickName = '';
    this.empID = '';
    this.departmentID = null;
    this.positionID = null;
    this.statusID = null;
    this.email = '';
    this.telephone = null;
    this.startDate = null;
    this.birthDate = null;
    this.profilePath = '';
  }
}
