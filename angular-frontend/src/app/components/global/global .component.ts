import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from '../landing/landing.component';
import { MenComponent } from '../men/men.component';
import { WomenComponent } from '../women/women.component';
import { KidComponent } from '../kid/kid.component';

@Component({
  selector: 'app-global',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule, LandingComponent, MenComponent, WomenComponent, KidComponent  ],
   templateUrl: './global.component.html',
})

export class GlobalComponent {}