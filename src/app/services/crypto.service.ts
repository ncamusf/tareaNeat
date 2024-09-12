import { Injectable } from '@angular/core';
import { CryptoInfo } from '../models/cryptoInfo';
import { cryptos } from '../data/crypto.data';
import { Transaction } from '../models/transaction';
import { transactions } from '../data/transactions.data';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private cryptosInfo: CryptoInfo[] = cryptos;
  private transactions: Transaction[] = transactions;
   
  constructor() { }

  getCryptosInfo(): CryptoInfo[] {;
    return this.cryptosInfo;
  }
  getTransactions(): Transaction[] {;
    return this.transactions;
  }
}
