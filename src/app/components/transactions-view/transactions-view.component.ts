import { Component } from '@angular/core';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'transactions-view',
  standalone: true,
  imports: [],
  templateUrl: './transactions-view.component.html'
})
export class TransactionsViewComponent {
  transactions!: Transaction[];
}
