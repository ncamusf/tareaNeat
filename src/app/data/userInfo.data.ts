import { UserInfo } from "../models/userInfo";
import { currencyBalance } from "./currencyBalance.data";
import { transactions } from "./transactions.data";

export const userInfo : UserInfo = {
    id: '',
    name: 'Nicolas',
    lastName: 'Camus',
    accountBalanceCrypto: currencyBalance,
    accountBalanceUSD: 10000,
    transactions: transactions,
}
