import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { LandingComponent } from './components/landing/landing.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NgFor, NgIf, RouterOutlet, LoginComponent, LandingComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
}