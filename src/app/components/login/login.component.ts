import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name?: string;
  password?: string;
  isAdmin: boolean = false;

  constructor(private usersService: UsersService, private router: Router) {}

  login() {
    if (this.name && this.password) {
      const user = {
        name: this.name,
        password: this.password,
        isAdmin: this.isAdmin,
      };
      this.usersService.login(user).subscribe(data => {
        this.usersService.setToken(data.token);
        this.router.navigateByUrl("/");
      });
    }
  }
}
