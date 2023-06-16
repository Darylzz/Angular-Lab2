import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { AddEmployeeFormComponent } from './employee/add-employee/add-employee-form/add-employee-form.component';
import { ShowAllEmployeeComponent } from './employee/show-all-employee/show-all-employee.component';
import { ShowByOneEmployeeComponent } from './employee/show-all-employee/show-by-one-employee/show-by-one-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModifyEmployeeComponent } from './employee/show-all-employee/show-by-one-employee/modify-employee/modify-employee.component';
import { EmployeeService } from './employee/employee.service';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/add', component: AddEmployeeComponent },
  { path: 'employee/:id/info', component: ShowByOneEmployeeComponent },
  { path: 'employee/:id/modify', component: ModifyEmployeeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    ShowAllEmployeeComponent,
    ShowByOneEmployeeComponent,
    AddEmployeeComponent,
    AddEmployeeFormComponent,
    ModifyEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
