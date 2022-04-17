import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { ApiService } from '../shared/api.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['./login-template.component.css']
})
export class LoginTemplateComponent{

  constructor(private formbuilder:FormBuilder, private http:HttpClient, private api:ApiService,
    private router:Router, private toast:NgToastService) { }
@ViewChild("form")
  // ngOnInit(): void {
  // }
loginform!:NgForm;
onlogin(form:NgForm){
console.log("Login-Template Here...")
this.api.getLoginDetails(this.loginform.value).subscribe(res=>{
  console.log(res);
  const user=res.find((a:any)=>{
    return a.email === this.loginform.value.email && a.password === this.loginform.value.password
  });
  console.log(user);
  if(user){
    console.log(this.loginform)
    this.toast.success({detail:user.firstName+" "+"Logged in Successfully....!",summary:"Success Message", duration:5000})
   
    //alert("Login Succesfull");
    localStorage.setItem('isLoggedIn','true');
    localStorage.setItem('name',user.firstName);

    // toast success
      // if login success then navigate to my Dashboard        
   this.router.navigate(['auth/employee-dashboard']);       
   this.loginform.reset(); 
  }
  else{
    //alert("Wrong Username & Password plz try again");
    //toast error
    this.toast.error({detail:"Error Message",summary:"Invalid Username or Password plz try again",duration:15000})
    this.loginform.reset();
  }
},err=>{
  // alert("Something Went wrong")
  this.toast.error({detail:"Error Message",summary:"Invalid Username or Password plz try again",duration:15000})
})
}

}
