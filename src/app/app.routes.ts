import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { CryptoNeatAppComponent } from '@components/crypto-neat-app.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'crypto-neat-app', component:CryptoNeatAppComponent, canActivate: [authGuard] }
];
