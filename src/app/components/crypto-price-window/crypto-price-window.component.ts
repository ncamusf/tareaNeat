import { Component, Input } from '@angular/core';
import { CryptoInfo } from '../../models/cryptoInfo';

@Component({
  selector: 'crypto-price-window',
  standalone: true,
  imports: [],
  templateUrl: './crypto-price-window.component.html',
  styleUrl: './crypto-price-window.component.css'
})
export class CryptoPriceWindowComponent {

  @Input() cryptosInfo!: CryptoInfo[];
}
