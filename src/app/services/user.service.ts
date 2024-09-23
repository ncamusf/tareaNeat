import { Injectable } from '@angular/core';
import { UserInfo } from '../models/userInfo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, from, map, Observable, of, switchMap, take, throwError } from 'rxjs';
import { currencyBalance } from '../data/currencyBalance.data';
import { transactions } from '../data/transactions.data';
import { TransactionsService } from './transactions.service';
import { Transaction } from '@models/transaction';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userInfo!: UserInfo;
  
  constructor(private afs : AngularFirestore, private transactionService: TransactionsService,private fireAuth: AngularFireAuth) { }

  // Función para guardar la información del usuario
  saveUserInfo(userInfo: UserInfo): Promise<void> {
    return this.afs.collection('Users').doc(userInfo.id).set(Object.assign({}, userInfo));
  }

  getUserInfo(): Observable<UserInfo | undefined> {
    return from(this.fireAuth.currentUser).pipe(
      switchMap(user => {
        if (user) {
          const userId = user.uid;
          return this.afs.collection('Users').doc<UserInfo>(userId).valueChanges().pipe(
            take(1)
          );
        } else {
          console.error('No hay un usuario autenticado.');
          return of(undefined);
        }
      })
    );
  }

  createUserInfo(id: string,name:string, lastName:string): void{
    const newUser: UserInfo = {
      id: id,
      name: name,
      lastName: lastName,
      accountBalanceUSD: this.getRandomMoneyAmount(),
      accountBalanceCrypto: currencyBalance,
      transactions: transactions
    };
    this.saveUserInfo(newUser)
      .then(() => console.log('Usuario creado y guardado exitosamente'))
      .catch(error => console.error('Error al crear el usuario:', error));
  }

  updateUserInfo(newTransaction:Transaction): Observable<boolean> {
    return this.getUserInfo().pipe(
      switchMap(userInfo => {
        if (!userInfo) {
          console.error('El usuario no existe en la base de datos.');
          return throwError('El usuario no existe en la base de datos.');
        }

        this.userInfo = userInfo;
        console.log('Información del usuario:', this.userInfo);

        return this.transactionService.callNeatCryptoExchange(newTransaction).pipe(
          switchMap(success => {
            if (success) {
              // Actualizar balances
              if (newTransaction.transactionType === 'Compra') {
                this.userInfo.accountBalanceUSD -= newTransaction.totalAmountUSD;
                this.updateCryptoBalance(newTransaction.cryptocurrency, newTransaction.quantity);
              } else if (newTransaction.transactionType === 'Venta') {
                this.userInfo.accountBalanceUSD += newTransaction.totalAmountUSD;
                this.updateCryptoBalance(newTransaction.cryptocurrency, -newTransaction.quantity);
              }
              newTransaction.transactionStatus = 'Completada';
            } else {
              newTransaction.transactionStatus = 'Rechazada';
            }

            // Actualizar la información del usuario
            this.userInfo.transactions.unshift(newTransaction);

            // Guardar la información actualizada del usuario
            return from(this.saveUserInfo(this.userInfo)).pipe(
              map(() => success),
              catchError(error => {
                console.error('Error al guardar la información del usuario:', error);
                return throwError(error);
              })
            );
          }),
          catchError(error => {
            console.error('Error al realizar la transacción:', error);
            return throwError(error);
          })
        );
      }),
      catchError(error => {
        console.error('Error al obtener la información del usuario:', error);
        return throwError(error);
      })
    );
  }

  private updateCryptoBalance(cryptoName: string, quantity: number) {
    const cryptoBalance = this.userInfo.accountBalanceCrypto.find(cb => cb.currencyName === cryptoName);
    if (cryptoBalance) {
      cryptoBalance.totalAmount += quantity;
    } else {
      this.userInfo.accountBalanceCrypto.unshift({
        currencyName: cryptoName,
        totalAmount: quantity
      });
    }
  }

  private getRandomMoneyAmount():number{
    return Math.floor(Math.random() * 99901) + 100;
  }
}
