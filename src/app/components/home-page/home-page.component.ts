import { Component, OnInit } from '@angular/core';
import { CryptoBalanceWindowComponent } from '@components/crypto-balance-window/crypto-balance-window.component';
import { CryptoPriceWindowComponent } from '@components/crypto-price-window/crypto-price-window.component';
import { NewsWindowComponent } from '@components/news-window/news-window.component';
import { CryptoInfo } from '@models/cryptoInfo';
import { UserInfo } from '@models/userInfo';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CryptoDataService } from '../../services/crypto.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CryptoBalanceWindowComponent, CryptoPriceWindowComponent, NewsWindowComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  cryptosInfo: CryptoInfo[] = [];
  userInfo!: UserInfo;

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
}