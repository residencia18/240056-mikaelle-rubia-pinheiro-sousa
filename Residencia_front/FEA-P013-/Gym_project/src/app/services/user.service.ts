import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {GoogleAuthProvider} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor( private cookieService: CookieService, private afs: AngularFireAuth) { }
  public login_: boolean = false;

  signInWithGoogle(){

    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }

  registerWithEmailPassword(authResquest: { email: string, password: string}){
    return this.afs.createUserWithEmailAndPassword(authResquest.email, authResquest.password);
  }

  signInWithEmailPassword(authResquest: { email: string, password: string}){
    return this.afs.signInWithEmailAndPassword(authResquest.email, authResquest.password);
  }

  isLoggedId(): boolean{

    const TOKEN = this.cookieService.get('USER_INFOR');
    return TOKEN ? true : false;
  }
}
