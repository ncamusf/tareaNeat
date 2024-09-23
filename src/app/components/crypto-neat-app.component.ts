import { Component} from '@angular/core';

import {RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'crypto-neat-app',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './crypto-neat-app.component.html',
})
export class CryptoNeatAppComponent{

  constructor(){ }

}

