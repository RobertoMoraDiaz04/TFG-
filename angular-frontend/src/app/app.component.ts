import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { GlobalComponent } from './components/global/global .component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NgFor, NgIf, RouterOutlet, LoginComponent, LandingComponent, RegisterComponent, GlobalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
}