import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transaction } from '@models/transaction';

@Component({
  selector: 'confirm-transaction-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-transaction-dialog.component.html',
  styleUrl: './confirm-transaction-dialog.component.css'
})
export class ConfirmTransactionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transaction: Transaction }
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
