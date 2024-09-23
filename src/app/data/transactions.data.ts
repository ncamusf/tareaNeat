import { Transaction } from "../models/transaction";

export const transactions:Transaction[] = [
    {
      "uid":"1",
      "date": new Date(),
      "transactionType": "Compra",
      "cryptocurrency": "Bitcoin (BTC)",
      "quantity": 0.005,
      "pricePerUnitUSD": 25000,
      "totalAmountUSD": 125,
      "transactionStatus": "Completada"
    },
    {
      "uid":"1",
      "date": new Date(),
      "transactionType": "Venta",
      "cryptocurrency": "Ethereum (ETH)",
      "quantity": 0.1,
      "pricePerUnitUSD": 1800,
      "totalAmountUSD": 180,
      "transactionStatus": "Rechazada"
    },
    {
      "uid":"1",
      "date": new Date(),
      "transactionType": "Compra",
      "cryptocurrency": "Litecoin (LTC)",
      "quantity": 2.0,
      "pricePerUnitUSD": 85,
      "totalAmountUSD": 170,
      "transactionStatus": "Completada"
    }
]