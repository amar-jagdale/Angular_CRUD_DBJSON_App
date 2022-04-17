import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  displayUsername=localStorage.getItem('name');
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  

  // Logout Method..........
logout()
{
  //localStorage.removeItem('user');
  localStorage.clear();  
  this.route.navigate(['auth/login-template']);  
}
}
