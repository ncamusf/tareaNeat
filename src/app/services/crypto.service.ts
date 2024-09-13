import { Injectable } from '@angular/core';
import { CryptoInfo } from '../models/cryptoInfo';
import { cryptos } from '../data/crypto.data';

@Injectable({
  providedIn: 'root'
})
export class CryptoService { 
  
  constructor() { }

  callCryptoAPI(): CryptoInfo[] {
    //Aqui se llamaria a la API y se revisaria si la informacion obtenido esta llegando correctamente.
    console.log('CryptosInfo actualizada');
    return cryptos;
  }

}
