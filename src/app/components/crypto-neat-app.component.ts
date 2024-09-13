import { Component, OnInit } from '@angular/core';
import { CryptoInfo } from '../models/cryptoInfo';
import { CryptoService } from '../services/crypto.service';
import { Transaction } from '../models/transaction';
import { UserInfo } from '../models/userInfo';
import { UserService } from '../services/user.service';
import { interval } from 'rxjs';
import { CurrencyBalance } from '../models/currencyBalance';
import { CryptoCardComponent } from "./crypto-card/crypto-card.component";
import { CryptoPriceWindowComponent } from "./crypto-price-window/crypto-price-window.component";
import { CryptoBalanceWindowComponent } from "./crypto-balance-window/crypto-balance-window.component";
import { PerfilWindowComponent } from "./perfil-window/perfil-window.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@Component({
  selector: 'crypto-neat-app',
  standalone: true,
  imports: [CryptoCardComponent, CryptoPriceWindowComponent, CryptoBalanceWindowComponent, PerfilWindowComponent, NavBarComponent],
  templateUrl: './crypto-neat-app.component.html',
})
export class CryptoNeatAppComponent implements OnInit{

    cryptosInfo!: CryptoInfo[];
    transactions!: Transaction[];
    userInfo!: UserInfo;
  
    constructor(private cryptoService: CryptoService,private userService: UserService) { }
    ngOnInit(): void {
      this.cryptosInfo = this.cryptoService.callCryptoAPI();
      this.userInfo = this.userService.getUserInfo();
      this.transactions = this.userInfo.transactions;

      interval(30000).subscribe(()=> {
        this.cryptosInfo = this.cryptoService.callCryptoAPI();
      })

    }

}
