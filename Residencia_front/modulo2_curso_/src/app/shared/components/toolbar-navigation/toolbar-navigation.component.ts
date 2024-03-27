import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrl: './toolbar-navigation.component.css'
})
export class ToolbarNavigationComponent {
  constructor(private router: Router, private cookeService: CookieService){}

  handleLogout(): void{
    this.cookeService.delete("USER_INFOR");
    void this.router.navigate(['/home']);
  }
}
