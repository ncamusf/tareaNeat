import { CurrencyBalance } from "./currencyBalance";
import { Transaction } from "./transaction";

export class UserInfo {
    id: string = '';
    name: string = '';
    lastName: string = '';
    accountBalanceUSD: number = 0;
    accountBalanceCrypto: CurrencyBalance[] = [];
    transactions: Transaction[] = [];
}