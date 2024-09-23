import { Component, OnInit } from '@angular/core';
import { CryptoInfo } from '../../models/cryptoInfo';
import { UserInfo } from '../../models/userInfo';
import { CurrencyBalance } from '../../models/currencyBalance';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CryptoDataService } from 'src/app/services/crypto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'crypto-balance-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-balance-window.component.html',
  styleUrl: './crypto-balance-window.component.css'
})
export class CryptoBalanceWindowComponent implements OnInit {
  cryptosInfo: CryptoInfo[] = [];
  userInfo: UserInfo | undefined;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private cryptoDataService: CryptoDataService
  ) { }

  ngOnInit(): void {
    this.cryptoDataService.cryptosInfo$.subscribe(
      cryptosInfo => {
        this.cryptosInfo = cryptosInfo;
      },
      error => {
        console.error('Error al obtener cryptosInfo:', error);
      }
    );

    // Obtener la información del usuario
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userService.getUserInfo().subscribe(
          userInfo => {
            if (userInfo) {
              this.userInfo = userInfo;
            } else {
              console.error('El usuario no existe en la base de datos.');
            }
          },
          error => {
            console.error('Error al obtener la información del usuario:', error);
          }
        );
      } else {
        console.error('No hay un usuario autenticado.');
        // Opcional: redirigir al login
      }
    });
  }
  // Método que devuelve las 3 criptomonedas con el balance más alto en USD
  getTopThreeCryptoBalances() {
    if (!this.userInfo?.accountBalanceCrypto) {
      return [];  
    }
    return this.userInfo.accountBalanceCrypto
      .sort((a, b) => this.getCurrencyBalanceInUSD(b) - this.getCurrencyBalanceInUSD(a)) // Ordenar de mayor a menor
      .slice(0, 3); // Tomar solo los primeros 3 elementos
  }

  getCurrencyBalanceInUSD(currencyBalance:CurrencyBalance): number{
    return ((this.cryptosInfo.find(info => info.name === currencyBalance.currencyName)?.priceUSD || 0) * currencyBalance.totalAmount);
  }
  getFormattedTotalAmount(totalAmount: number): string {
    return totalAmount.toFixed(4);
  }
}
