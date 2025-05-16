import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule ],
   templateUrl: './men.component.html',
})

export class MenComponent {}