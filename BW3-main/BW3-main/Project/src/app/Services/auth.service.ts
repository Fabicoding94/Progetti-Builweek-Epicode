import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Classes/user';

type AuthResponse = {
  accessToken: string,
  user:User
}

export interface ILogin {
  email: string,
  password: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiUrl:string = 'http://localhost:3000'

  register(registerData:User){
    return this.http.post<AuthResponse>(this.apiUrl+'/register', registerData)
  }

  login(loginData:ILogin){
    return this.http.post<AuthResponse>(this.apiUrl+'/login', loginData)
  }

  isUserLogged():boolean{
    return localStorage.getItem('access') != null
  }

  getLoggedUser(){
    let db = localStorage.getItem('access')
    return db ? JSON.parse(db).user : null
  }
  getAccessToken():string{
    let db = localStorage.getItem('access')
    return db ? JSON.parse(db).accessToken : null
  }

  saveAccessData(data:AuthResponse){
    localStorage.setItem('access',JSON.stringify(data))
  }

  logOut(){
    localStorage.removeItem('access')
  }
}
