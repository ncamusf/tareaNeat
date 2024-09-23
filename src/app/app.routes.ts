import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { CryptoNeatAppComponent } from '@components/crypto-neat-app.component';
import { authGuard } from './auth.guard';
import { TransactionsPageComponent } from '@components/transactions-page/transactions-page.component';
import { HomePageComponent } from '@components/home-page/home-page.component';

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: '',
        component: CryptoNeatAppComponent,
        canActivate: [authGuard],
        children: [
            {path: 'home', component: HomePageComponent},
            {path: 'transactions-page', component:TransactionsPageComponent}
        ]
    }
    
];
