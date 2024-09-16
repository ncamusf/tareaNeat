import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoNeatAppComponent } from "./components/crypto-neat-app.component";
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CryptoNeatAppComponent, FormsModule, LoginComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'CryptoNeat';
}