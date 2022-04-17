import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import{FormBuilder,FormGroup,Validators,Validator} from'@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import{faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) //implements OnInit
export class LoginComponent implements OnInit {
  // falock=faLock;
   public loginForms!:FormGroup;
   emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  //Email Validation
   constructor(private formbuilder:FormBuilder, private http:HttpClient, private api:ApiService,
    private router:Router, private toast:NgToastService) { }

// @ViewChild("form")
  ngOnInit(): void {
    this.loginForms=this.formbuilder.group({
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',Validators.required]     
    })
  }
 //loginForms!:NgForm;
// login form data post
// form:NgForm
  login(){
    this.api.getSignUpdata().subscribe((res)=>{      
      const user=res.find((a:any)=>{
        console.log(res);
        return a.email === this.loginForms.value.email && a.password === this.loginForms.value.password
      });
      console.log(user);
      if(user){
        this.toast.success({detail:"Success Message",summary:"Login is Successfull", duration:5000})
        //alert("Login Succesfull");
        localStorage.setItem('isLoggedIn','true');
        localStorage.setItem('name',user.firstName)
        // toast success
          // if login success then navigate to my Dashboard        
       this.router.navigate(['auth/employee-dashboard']);       
       this.loginForms.reset(); 
      } else{
        //alert("Wrong Username & Password plz try again");
        //toast error
        this.toast.error({detail:"Error Message",summary:"Invalid Username or Password plz try again",duration:5000})
        this.loginForms.reset();
      }
    },err=>{
      // alert("Something Went wrong")
      this.toast.error({detail:"Error Message",summary:"Invalid Username or Password plz try again",duration:5000})
    })
  }

}
