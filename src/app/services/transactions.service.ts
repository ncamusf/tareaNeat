import { Injectable } from '@angular/core';
import { Transaction } from '@models/transaction';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  neatCryptoExchange(transaction:Transaction): boolean{
    return Math.random() > 0.1;
  }

  callNeatCryptoExchange(transaction:Transaction): Observable<boolean> {
    // Simular una llamada a una API donde el 10% de las transacciones son rechazadas
    const isSuccess = Math.random() >= 0.1;
    return of(isSuccess);
  }
}
