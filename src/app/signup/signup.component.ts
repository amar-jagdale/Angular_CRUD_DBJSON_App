import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup, Validators,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import{ApiService} from '../shared/api.service';
import{faLock} from '@fortawesome/free-solid-svg-icons';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForms!:FormGroup;
  faLock=faLock; // fa-lock-Icon Definition
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private formbuilder:FormBuilder, private http:HttpClient,private api:ApiService,
  private router:Router, private toast:NgToastService) { } // router for navigate page

isNumbervalid:boolean=true;

  ngOnInit(): void {
    this.signupForms=this.formbuilder.group({
      firstName:['',Validators.required],
      // userName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(7)],this.api.checkUsernameNotTaken.bind(this.api)],
      lastName:['',Validators.required],
      email:['',[Validators.required,Validators.pattern(this.emailPattern)],this.api.validateEmailNotTaken.bind(this.api)],
      mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password:['',[Validators.required,Validators.minLength(5)]]
    })
  }
  //signup form Method
  signUp(){
    // required http post call when submit forms
  //  alert("User Registered Successfull....!")      
    this.api.postSignUpdata(this.signupForms.value).subscribe((res)=>{
      // alert("User Registered Successfull....!")
      console.log(res);
      this.toast.success({detail:this.signupForms.value.firstName+" "+" Signed Up Successfully....!",summary:"Signup User Successfull",duration:5000})  
      //this.signupForms.reset();
      this.router.navigate(['auth/login-template']);
    },err=>{
       this.toast.error({detail:"Please Enter All Required Fields",summary:"Error While Signup ..!!!!"})
     // alert("Error While Signup User")
    })
  }  

  validateUsername(){
    this.api.postSignUpdata
  }

}
