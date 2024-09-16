import { Injectable } from '@angular/core';
import { userInfo } from '../data/userInfo.data';
import { UserInfo } from '../models/userInfo';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userInfo: UserInfo = userInfo;
  
  constructor(private afs : AngularFirestore) { }

  createUserInfo(name:string, lastName:string): void{
    userInfo.id = this.afs.createId();
    userInfo.accountBalanceUSD = this.getRandomMoneyAmount();
    userInfo.name = name;
    userInfo.lastName = lastName;
    userInfo.accountBalanceCrypto = [];
    userInfo.transactions = [];
    this.afs.collection('/Users').add(userInfo);
  }

  private getRandomMoneyAmount():number{
    return Math.floor(Math.random() * 99901) + 100;
  }

  getUserInfo(){
    return this.userInfo;
  }
}
