import { Component, Input } from '@angular/core';
import { CryptoInfo } from '../../models/cryptoInfo';
import { UserInfo } from '../../models/userInfo';
import { CurrencyBalance } from '../../models/currencyBalance';

@Component({
  selector: 'crypto-balance-window',
  standalone: true,
  imports: [],
  templateUrl: './crypto-balance-window.component.html',
  styleUrl: './crypto-balance-window.component.css'
})
export class CryptoBalanceWindowComponent {

  @Input() cryptosInfo!: CryptoInfo[];
  @Input() userInfo!: UserInfo;

  getCurrencyBalanceInUSD(currencyBalance:CurrencyBalance): String{
    return ((this.cryptosInfo.find(info => info.name === currencyBalance.currencyName)?.priceUSD || 0) * currencyBalance.totalAmount).toFixed(2);
  }
}
