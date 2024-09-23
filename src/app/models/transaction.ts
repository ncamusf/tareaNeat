export class Transaction {
    uid: string = '';
    date: Date = new Date();
    transactionType: string = '';
    cryptocurrency: string = '';
    quantity: number = 0;
    pricePerUnitUSD: number = 0;
    totalAmountUSD: number = 0;
    transactionStatus: string = '';
}