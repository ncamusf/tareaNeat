import { Component, OnInit } from '@angular/core';
import { CryptoInfo } from '../models/cryptoInfo';
import { CryptoService } from '../services/crypto.service';
import { Transaction } from '../models/transaction';
import { UserInfo } from '../models/userInfo';
import { UserService } from '../services/user.service';
import { interval } from 'rxjs';
import { CurrencyBalance } from '../models/currencyBalance';

@Component({
  selector: 'crypto-neat-app',
  standalone: true,
  imports: [],
  templateUrl: './crypto-neat-app.component.html',
})
export class CryptoNeatAppComponent implements OnInit{

    cryptosInfo!: CryptoInfo[];
    transactions!: Transaction[];
    userInfo!: UserInfo;
    cryptoInfo!: CryptoInfo [];
  
    constructor(private cryptoService: CryptoService,private userService: UserService) { }
    ngOnInit(): void {
      this.cryptosInfo = this.cryptoService.callCryptoAPI();
      this.userInfo = this.userService.getUserInfo();
      this.transactions = this.userInfo.transactions;

      interval(30000).subscribe(()=> {
        this.cryptosInfo = this.cryptoService.callCryptoAPI();
      })

    }

    getCurrencyBalanceInUSD(currencyBalance:CurrencyBalance): String{
      return ((this.cryptosInfo.find(info => info.name === currencyBalance.currencyName)?.priceUSD || 0) * currencyBalance.totalAmount).toFixed(2);
    }

}
