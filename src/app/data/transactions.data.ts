import { Transaction } from "../models/transaction";

export const transactions:Transaction[] = [
    {
      "date": "2024-09-12 15:30",
      "transactionType": "Compra",
      "cryptocurrency": "Bitcoin (BTC)",
      "quantity": 0.005,
      "pricePerUnitUSD": 25000,
      "totalAmountUSD": 125,
      "transactionStatus": "Completada"
    },
    {
      "date": "2024-09-12 14:00",
      "transactionType": "Venta",
      "cryptocurrency": "Ethereum (ETH)",
      "quantity": 0.1,
      "pricePerUnitUSD": 1800,
      "totalAmountUSD": 180,
      "transactionStatus": "Rechazada"
    },
    {
      "date": "2024-09-11 13:20",
      "transactionType": "Compra",
      "cryptocurrency": "Litecoin (LTC)",
      "quantity": 2.0,
      "pricePerUnitUSD": 85,
      "totalAmountUSD": 170,
      "transactionStatus": "Completada"
    }
]