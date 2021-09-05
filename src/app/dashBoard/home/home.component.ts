import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  activatedOptions=false;
  constructor(private route: ActivatedRoute,
    private router: Router) {
    this.activatedOptions=this.router.url === '/Home';
  }
  isUserLogIn:boolean=false;
  ngOnInit(): void {
  }
}
