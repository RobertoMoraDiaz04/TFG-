import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalComponent } from '../global/global.component';

@Component({
  selector: 'app-Landing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, GlobalComponent],
   templateUrl: './landing.component.html',
})

export class LandingComponent {}