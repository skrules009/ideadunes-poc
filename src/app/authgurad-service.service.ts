import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAccounts } from './models/Accounts';

@Injectable({
  providedIn: 'root'
})
export class AuthguradServiceService {

  constructor() { }
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  gettoken() {
    const is=!!localStorage.getItem("userId")
    this.loggedIn.next(is);
    return is;
  }
  createSession(user: { userId: any; password: any; }) {
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('User-password', user.password);
  }
  setAccountInfo(acc: IAccounts) {
    localStorage.setItem('selectedAccountId', acc.accountId.toString());
    localStorage.setItem('selectedAccountName', acc.name);
  }
  readSessionForUser(key: string) {
    return localStorage.getItem(key) ?? '';
  }
  removeSession(){
    this.loggedIn.next(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('User-password');
    localStorage.removeItem('selectedAccountId');
    localStorage.removeItem('selectedAccountName');
  }

}
