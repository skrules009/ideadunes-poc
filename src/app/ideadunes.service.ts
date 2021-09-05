import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccounts, IComment, INote, IUser } from './models/Accounts';
import { ChoiceWithIndices } from '@flxng/mentions';

@Injectable({
  providedIn: 'root'
})
export class IdeadunesService {

  constructor(private http: HttpClient) { }
  // accounts: any[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  configUrl = "https://localhost:44300/api/";

  AddUser(user: any): Observable<any> {
    return this.http.post<Boolean>(this.configUrl + "Home/AddUser", user, this.httpOptions);
  }
  Login(user: any): Observable<any> {
    return this.http.post<Boolean>(this.configUrl + "Home/Login", user, this.httpOptions);

  }
  getAccountsList(): Observable<IAccounts[]> {
    return this.http.get<IAccounts[]>(this.configUrl + "Accounts/GetAccounts");
  }
  AddNote(note: INote, mention:any): Observable<any> {
    return this.http.post<Boolean>(this.configUrl + "Accounts/addNote", {BONote:note,mention:mention}, this.httpOptions);
  }
  getNotesList(accountId:number): Observable<INote[]> {
    return this.http.get<INote[]>(this.configUrl + "Accounts/GetNotes?accountId="+accountId);
  }
  getUserList(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.configUrl + "Home/GetUsers");
  }
  AddComment(comment: IComment): Observable<any> {
    return this.http.post<Boolean>(this.configUrl + "Accounts/addComment", comment, this.httpOptions);
  }
  // private user=new BehaviorSubject<string>('santosh');
  // cast=this.user.asObservable();
  // addNewUsers(newUser)
  // {
  //   this.user.next(newUser);
  // }

}
