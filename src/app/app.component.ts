import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoNeatAppComponent } from "./components/crypto-neat-app.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CryptoNeatAppComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tareaNeat';
}
