import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public currentUrl = '/';
  public cartItemsCount;

  constructor(private router: Router, private cartService: CartService, private authService: AuthService) {
    this.router.events.pipe( filter( event => event instanceof NavigationStart) )
      .subscribe( {next: (event: NavigationStart) => this.currentUrl = event.url });

  }

  ngOnInit() {
    this.cartItemsCount = this.cartService.getCount();
    this.cartService.cartChanged.subscribe( () => this.cartItemsCount = this.cartService.getCount());
  }

}
