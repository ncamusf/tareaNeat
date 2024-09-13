import { UserInfo } from "../models/userInfo";
import { currencyBalance } from "./currencyBalance.data";
import { transactions } from "./transactions.data";

export const userInfo : UserInfo = {
    name: 'Nicolas',
    lastName: 'Camus',
    accountBalanceCrypto: currencyBalance,
    accountBalanceUSD: 0,
    transactions: transactions,
}
