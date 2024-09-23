import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { CryptoInfo } from '../models/cryptoInfo';
import { cryptos } from '../data/crypto.data';

@Injectable({
  providedIn: 'root'
})
export class CryptoDataService {
  private cryptosInfoSubject = new BehaviorSubject<CryptoInfo[]>([]);
  cryptosInfo$ = this.cryptosInfoSubject.asObservable();

  constructor() {
    // Iniciar la actualización periódica al crear el servicio
    interval(30000).pipe(
      startWith(0), // Ejecutar inmediatamente al suscribirse
      switchMap(() => this.callCryptoAPI())
    ).subscribe(
      (cryptosInfo: CryptoInfo[]) => {
        this.cryptosInfoSubject.next(cryptosInfo);
      },
      (error) => {
        console.error('Error al obtener la información de criptomonedas:', error);
      }
    );
  }

  private callCryptoAPI(): Observable<CryptoInfo[]> {
    //Aqui se llamaria a la API y se revisaria si la informacion obtenido esta llegando correctamente.
    console.log('CryptosInfo actualizada');
    return of(<CryptoInfo[]>cryptos);
  }

}
