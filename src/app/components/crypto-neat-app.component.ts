import { Component, OnInit } from '@angular/core';
import { CryptoInfo } from '../models/cryptoInfo';
import { CryptoService } from '../services/crypto.service';
import { Transaction } from '../models/transaction';
import { UserInfo } from '../models/userInfo';

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
  
    constructor(private cryptoService: CryptoService) { }
    ngOnInit(): void {
      this.cryptosInfo = this.cryptoService.getCryptosInfo();
      this.transactions = this.userService.getTransactions();
      this.userInfo = this.userService.getUserInfo();
    }

}
