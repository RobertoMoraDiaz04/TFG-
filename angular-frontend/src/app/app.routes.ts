import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { MenComponent } from './components/men/men.component';
import { WomenComponent } from './components/women/women.component';
import { KidComponent } from './components/kid/kid.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: "login", component: LoginComponent }, 
  { path: "", redirectTo: "/login", pathMatch: "full" }, 
  { path: "register", component: RegisterComponent },
  { path: "landing", component: LandingComponent },
  { path: "men", component: MenComponent },
  { path: "women", component: WomenComponent },
  { path: "kid", component: KidComponent },
  { path: "**", redirectTo: "/login" } 
];
