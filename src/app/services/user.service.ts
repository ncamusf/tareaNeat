import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { transactions } from '../data/transactions.data';
import { userInfo } from '../data/userInfo.data';
import { UserInfo } from '../models/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userInfo: UserInfo = userInfo;
  
  constructor() { }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }
}
