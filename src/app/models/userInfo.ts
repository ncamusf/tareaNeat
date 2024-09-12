import { CurrencyBalance } from "./currencyBalance";
import { Transaction } from "./transaction";

export class UserInfo {
    name: string = 'Nicolas';
    lastName: string = 'Camus';
    accountBalanceUSD: number = 0;
    accountBalanceCrypto: CurrencyBalance[] = [];
    transactions: Transaction[] = [];
}