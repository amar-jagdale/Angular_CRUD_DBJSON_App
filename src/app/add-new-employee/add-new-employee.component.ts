import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; 
import { ApiService } from '../shared/api.service';
import { Router, RouterLink } from '@angular/router';
import { NgToastModule, NgToastService} from 'ng-angular-popup';
import { EmployeeModel } from '../employee-dashboard/employee-dashboard.model';


@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent implements OnInit {


  constructor(private formBuilder:FormBuilder,private api:ApiService,private route:Router, 
    private toast:NgToastService) { }
    employeeModelObj:EmployeeModel=new EmployeeModel();

//display User Name
// displayUsername=localStorage.setItem('email',this['loginForms'].value.email)
displayUsername=localStorage.getItem('name');
formValue!: FormGroup;
employeeData:any[]=[];
showAdd!:boolean;
showUpdate!:boolean;
// isalreadyExist=false;

//search property
searchTerm:any;

//Duplicate Name
isExists:boolean=false;
isEmpty:boolean=false;
// private DuplicateNameBounce:any;

//paginate page property
page:any;

emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
showUpdateTitle!:boolean;
showAddTitle!:boolean;


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
    firstName:['',[Validators.required],this.api.validateUsernameNotTaken.bind(this.api)], //Asynchronous method
    lastName:['',[Validators.required]],
    Email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
    Mobile:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
    Salary:['',[Validators.required,Validators.pattern("^[0-9]*$")]]      
      })  
  this.getAllEmployee();
  }


  postEmployeeDetails(){
    //alert("fucntion call");
    this.employeeModelObj.id=this.formValue.value.id ;
    
      this.employeeModelObj.firstName=this.formValue.value.firstName;
      this.employeeModelObj.lastName=this.formValue.value.lastName;
      this.employeeModelObj.Email=this.formValue.value.Email;
      this.employeeModelObj.Mobile=this.formValue.value.Mobile;
      this.employeeModelObj.Salary=this.formValue.value.Salary;
    
      let cancel=document.getElementById("cancel");
      this.api.postData(this.employeeModelObj).subscribe(res=> {
        // check is value is comes on console or not
        console.log(res);    
        //alert("Record inserted successfully");
        this.toast.success({detail:this.employeeModelObj.firstName+" "+"Details Added Successfully",summary:"Employee Registered...",duration:2000})
        cancel?.click();this.formValue.reset();
        this.getAllEmployee();
      },
      err=>{
        console.log("Error While Employee Registration....");
        this.toast.error({detail:"Please Enter correct required values",summary:"Error while Registration of employee"})
      })
     }
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




   

}
