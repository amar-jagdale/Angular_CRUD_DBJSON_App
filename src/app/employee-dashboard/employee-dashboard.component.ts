import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; 
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService} from 'ng-angular-popup';
import { EmployeeFilterPipe} from './employee-filter.pipe';
@Component({
  selector: 'app-employee-dashboard',   
  providers: [ApiService ],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
 
employeeModelObj:EmployeeModel=new EmployeeModel();

//display User Name
// displayUsername=localStorage.setItem('email',this['loginForms'].value.email)
displayUsername=localStorage.getItem('name');
formValue!: FormGroup;
employeeData:any[]=[];
showAdd!:boolean;
showUpdate!:boolean;

//search property
searchTerm:any;



//paginate page property
page:any;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
showUpdateTitle!:boolean;
showAddTitle!:boolean;
  constructor(private formBuilder:FormBuilder,private api:ApiService,private route:Router, 
    private toast:NgToastService) { 
  }

  addButtonClickFunction(){
    
    this.showUpdate=false;
    this.showAdd=true;
    console.log(this.formValue.value)
    this.formValue.reset();    
    this.showUpdateTitle=false;
    this.showAddTitle=true;
  }

  ngOnInit(): void {

  //console.log("Hello");
  this.formValue=this.formBuilder.group({
  firstName:['',[Validators.required]],
  lastName:['',Validators.required],
  Email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
  Mobile:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
  Salary:['',[Validators.required,Validators.pattern("^[0-9]*$")]]      
    })  
this.getAllEmployee();
}

// postEmployeeDetails(){
// //alert("fucntion call");
// this.employeeModelObj.id=this.formValue.value.id ;

//   this.employeeModelObj.firstName=this.formValue.value.firstName;
//   this.employeeModelObj.lastName=this.formValue.value.lastName;
//   this.employeeModelObj.Email=this.formValue.value.Email;
//   this.employeeModelObj.Mobile=this.formValue.value.Mobile;
//   this.employeeModelObj.Salary=this.formValue.value.Salary;

//   let cancel=document.getElementById("cancel");
//   this.api.postData(this.employeeModelObj).subscribe(res=> {
//     // check is value is comes on console or not
//     console.log(res);    
//     //alert("Record inserted successfully");
//     this.toast.success({detail:this.employeeModelObj.firstName+" "+"Details Added Successfully",summary:"Employee Registered..."})
//     cancel?.click();this.formValue.reset();
//     this.getAllEmployee();
//   },
//   err=>{
//     console.log("Error While Employee Registration....");
//     this.toast.error({detail:"Please Enter correct required values",summary:"Error while Registration of employee"})
//   })
//  }

//  Search function
// search(event1: any) {
//   console.log(this.employeeData);
//   // const purpose:any=event1
//   console.log(event1);
//   this.employeeData = this.storedemployeeData.filter((d: any) => d.firstName.toLowerCase().includes(event1)||d.lastName.toLowerCase().includes(event1)||d.email.toLowerCase().includes(event1));
//   this.formValue.reset();
// }

getAllEmployee(){
  this.api.getData().subscribe(res=>{
    this.employeeData=res;
  })

}
deleteEmployee(row:any){
 

  this.api.deleteData(row.id).subscribe(a=>{
    //alert("Record Deleted Succesfully");
    this.toast.success({detail:row.firstName+""+"Employee Details Deleted Successfully",summary:"Records Deleted",duration:3000})
    this.formValue.reset();
    console.log(row);
    this.getAllEmployee();
  })

}
updateEmployee(row:any){
  this.showAdd=false;
  this.showUpdate=true;

  this.showUpdateTitle=true;
  this.showAddTitle=false;

  this.employeeModelObj.id=row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['Email'].setValue(row.Email);
  this.formValue.controls['Mobile'].setValue(row.Mobile);
  this.formValue.controls['Salary'].setValue(row.Salary);  
}

updateEmployeeDetails(){

  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.Email=this.formValue.value.Email;
  this.employeeModelObj.Mobile=this.formValue.value.Mobile;
  this.employeeModelObj.Salary=this.formValue.value.Salary;
  this.api.updateData(this.employeeModelObj,this.employeeModelObj.id).subscribe(a=>{
  console.log(a);
 // alert("Record updated Succesfully");
 
  this.toast.success({detail:this.employeeModelObj.firstName+" "+"Details updated Successfully",summary:"Details Updated..."})
  let cancel=document.getElementById("cancel");
    cancel?.click();
    this.formValue.reset();
   /****/ this.getAllEmployee();
  })
}
// Logout Method.............
  logout()
  {
    //localStorage.removeItem('user');
    localStorage.clear();  
    this.route.navigate(['auth/login-template']);  
  }

}
