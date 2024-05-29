import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> |
  Promise<boolean | UrlTree> |
  boolean | UrlTree{

    if(!this.userService.isLoggedId()){
      this.router.navigate(['home'])
      return false;

    }
    this.userService.isLoggedId();
    return true;
  }
}
