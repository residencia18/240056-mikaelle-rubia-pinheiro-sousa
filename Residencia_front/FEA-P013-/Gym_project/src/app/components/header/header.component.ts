import { LoginComponent } from './../login/login.component';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs'


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  constructor(private router: Router, private cookeService: CookieService) {}

handleLogout(): void{
    this.cookeService.delete("USER_INFOR");
    void this.router.navigate(['/home']);
  }


}
