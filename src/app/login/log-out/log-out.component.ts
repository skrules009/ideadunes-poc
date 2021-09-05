import { Component, OnInit } from '@angular/core';
import { AuthguradServiceService } from 'src/app/authgurad-service.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private Authguardservice: AuthguradServiceService) { }

  ngOnInit(): void {
    this.Authguardservice.removeSession();
  }

}
