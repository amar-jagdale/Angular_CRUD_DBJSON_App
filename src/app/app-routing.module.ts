import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { AuthGuard } from './Auth/auth.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { LoginTemplateComponent } from './login-template/login-template.component';
import { LoginComponent } from './login/login.component';
import { NotAuthGuard } from './NoAuth/not-auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {path:'', redirectTo:'auth/login-template',pathMatch:'full'},
    // {path:'login-template',canActivate:[AuthGuard],component:LoginTemplateComponent},   
    {path:'auth/login-template',canActivate:[NotAuthGuard],component:LoginTemplateComponent},
    {path:'auth/signup', component:SignupComponent,canActivate:[NotAuthGuard]},
    {path:'auth/employee-dashboard', canActivate:[AuthGuard],component:EmployeeDashboardComponent},
    {path:'addNewEmployee', component:AddNewEmployeeComponent},   
  // {path:'employee-dashboard',component:EmployeeDashboardComponent},
  // {path:'login', component:LoginComponent},
  // {path:'signup', component:SignupComponent},
      // sequence is must after that PNF C enter
     {path:'**',component:PageNotFoundComponent}      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
