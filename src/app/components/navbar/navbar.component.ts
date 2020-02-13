import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public currentUrl = '/';

  constructor(private router: Router, private cartService: CartService) {
    this.router.events.pipe( filter( event => event instanceof NavigationStart) )
      .subscribe( {next: (event: NavigationStart) => this.currentUrl = event.url });
  }

  ngOnInit() {
  }

}
