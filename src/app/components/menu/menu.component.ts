import { AfterViewInit, Component} from '@angular/core';
import { UsersService } from 'src/app/services/user.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements AfterViewInit {
  isAuth?: boolean;

  constructor(private usersService: UsersService, private router: Router){}
  
  ngAfterViewInit(): void {
    this.usersService.getAuthStatus().subscribe((res: boolean) => this.isAuth = res);
  }

  logout(){
    this.usersService.deleteToken()
    this.router.navigateByUrl("/");

  }

}
