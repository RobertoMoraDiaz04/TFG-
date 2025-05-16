import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-kid',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule ],
   templateUrl: './kid.component.html',
})

export class KidComponent {}