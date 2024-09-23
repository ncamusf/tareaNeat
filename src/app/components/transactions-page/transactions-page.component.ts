import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '@models/transaction';
import { CryptoInfo } from '@models/cryptoInfo';
import { UserInfo } from '@models/userInfo';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { CryptoDataService } from 'src/app/services/crypto.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmTransactionDialogComponent } from '../confirm-transaction-dialog/confirm-transaction-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
  ],
})
export class TransactionsPageComponent implements OnInit {
  transactionForm: FormGroup;
  cryptosInfo: CryptoInfo[] = [];
  userInfo!: UserInfo;
  amountInCrypto: number = 0;
  amountInUSD: number = 0;

  constructor(
    private afAuth: AngularFireAuth,
    private cryptoDataService: CryptoDataService,
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      transactionType: ['Compra', Validators.required],
      cryptoType: ['BTC', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.cryptoDataService.cryptosInfo$.subscribe(
      cryptosInfo => {
        this.cryptosInfo = cryptosInfo;
      },
      error => {
        console.error('Error al obtener cryptosInfo:', error);
      }
    );

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userService.getUserInfo().subscribe(
          userInfo => {
            if (userInfo) {
              this.userInfo = userInfo;
              this.updateAmountValidators(); // Actualizamos los validadores al cargar la info del usuario

              // Configurar las suscripciones después de obtener userInfo
              // Suscripción para 'transactionType'
              this.transactionForm.get('transactionType')?.valueChanges.subscribe((newTransactionType) => {
                this.updateAmountValidators();
                this.calculateAmounts();
              });

              // Suscripción para 'cryptoType'
              this.transactionForm.get('cryptoType')?.valueChanges.subscribe((newCryptoType) => {
                this.updateAmountValidators();
                this.calculateAmounts();
              });

              // Suscripción para 'amount'
              this.transactionForm.get('amount')?.valueChanges.subscribe((newAmount) => {
                this.calculateAmounts(newAmount);
              });

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
      }
    });
  }

  updateAmountValidators() {
    if (!this.userInfo) {
      return; // Salir si userInfo es undefined
    }

    const transactionType = this.transactionForm.get('transactionType')?.value;
    const amountControl = this.transactionForm.get('amount');
    if (!amountControl) {
      return;
    }

    amountControl.clearValidators();
    amountControl.setValidators([Validators.required, Validators.min(0)]);

    if (transactionType === 'Compra') {
      // Para compra, el monto en USD no puede exceder el saldo en USD del usuario
      amountControl.addValidators([Validators.max(this.userInfo.accountBalanceUSD)]);
    } else if (transactionType === 'Venta') {
      // Para venta, el monto en criptomonedas no puede exceder el saldo de la criptomoneda seleccionada
      const selectedCryptoTag = this.transactionForm.get('cryptoType')?.value;
      const selectedCrypto = this.cryptosInfo.find(crypto => crypto.tag === selectedCryptoTag);
      const cryptoBalance = this.userInfo.accountBalanceCrypto.find(crypto => crypto.currencyName === selectedCrypto?.name)?.totalAmount || 0;
      amountControl.addValidators([Validators.max(cryptoBalance)]);
    }

    amountControl.updateValueAndValidity();
  }

  calculateAmounts(amountInput?: number) {
    if (!this.userInfo) {
      return;
    }
  
    const selectedCrypto = this.cryptosInfo.find(
      (crypto) => crypto.tag === this.transactionForm.value.cryptoType
    );
    const transactionType = this.transactionForm.value.transactionType;
    const amount = amountInput ?? this.transactionForm.value.amount ?? 0;
  
    console.log('amount:', amountInput);
  
    if (selectedCrypto && selectedCrypto.priceUSD != 0 && amount > 0) {
      if (transactionType === 'Compra') {
        this.amountInCrypto = amount / selectedCrypto.priceUSD;
        this.amountInUSD = amount;
      } else if (transactionType === 'Venta') {
        this.amountInCrypto = amount;
        this.amountInUSD = amount * selectedCrypto.priceUSD;
      }
    } else {
      this.amountInCrypto = 0;
      this.amountInUSD = 0;
    }
  }

  makeNewTransaction() {
    if (!this.userInfo) {
      console.error('Información del usuario no disponible.');
      return;
    }
  
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
      const selectedCrypto = this.cryptosInfo.find(
        (crypto) => crypto.tag === transactionData.cryptoType
      );
  
      if (!selectedCrypto) {
        console.error('Criptomoneda no encontrada');
        return;
      }
  
      let newTransaction: Transaction;
  
      if (transactionData.transactionType === 'Compra') {
        // Compra
        newTransaction = {
          uid: this.userInfo.id,
          date: new Date(),
          transactionType: 'Compra',
          cryptocurrency: selectedCrypto.name,
          quantity: this.amountInCrypto,
          pricePerUnitUSD: selectedCrypto.priceUSD,
          totalAmountUSD: transactionData.amount,
          transactionStatus: 'Pendiente',
        };
      } else if (transactionData.transactionType === 'Venta') {
        // Venta
        newTransaction = {
          uid: this.userInfo.id,
          date: new Date(),
          transactionType: 'Venta',
          cryptocurrency: selectedCrypto.name,
          quantity: transactionData.amount,
          pricePerUnitUSD: selectedCrypto.priceUSD,
          totalAmountUSD: this.amountInUSD,
          transactionStatus: 'Pendiente',
        };
      } else {
        console.error('Tipo de transacción desconocido');
        return; 
      }

      const dialogRef = this.dialog.open(ConfirmTransactionDialogComponent, {
        data: { transaction: newTransaction }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.userService.updateUserInfo(newTransaction).subscribe(
            (success) => {
              if (success) {
                console.log("La transacción se realizó");
                this.router.navigate(['/home']);
              } else {
                console.error("La transacción fue rechazada por Neat Crypto Exchange.");
              }
            },
            (error) => {
              console.error('La transacción no pudo ocurrir correctamente, intente de nuevo', error);
            }
          );
        } else {
          console.log('La transacción fue cancelada por el usuario.');
        }
      });
  
    } else {
      console.error('Formulario inválido');
    }
  }

  getCryptoBalance(cryptoTag: string): number {
    if (!this.userInfo) {
      return 0;
    }

    const selectedCrypto = this.cryptosInfo.find(crypto => crypto.tag === cryptoTag);
    const cryptoBalance = this.userInfo.accountBalanceCrypto.find(crypto => crypto.currencyName === selectedCrypto?.name);
    return cryptoBalance ? cryptoBalance.totalAmount : 0;
  }
}