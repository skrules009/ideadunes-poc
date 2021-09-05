import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthguradServiceService } from './authgurad-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ideadunes-poc';
  isLoggedIn$: Observable<boolean>;
  constructor(private authService:AuthguradServiceService) { 
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
