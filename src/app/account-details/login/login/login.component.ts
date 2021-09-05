import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthguradServiceService } from 'src/app/authgurad-service.service';
import { IdeadunesService } from 'src/app/ideadunes.service';
import { UserFactoryService } from 'src/app/user-factory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  service;
  isSaved:boolean;
  loginForm:any;
  initForm:UserFactoryService;
  constructor(
    private _service: IdeadunesService, 
    private route: ActivatedRoute,
    private router: Router, private _initForm: UserFactoryService,
    private Authguardservice: AuthguradServiceService) {
    this.service = _service;
    this.isSaved = false;
    this.initForm=_initForm;
  }

  ngOnInit(): void {
    this.loginForm=this.initForm.creatLoginForm();
  }
  Login() {
    let user=this.initForm.prepareLoginReq(this.loginForm);
    this.service.Login(user)
      .subscribe(
        resultArray => { 
          if(resultArray){
           this.Authguardservice.createSession(user);
          this.router.navigate(['/Home']); 
        }
       }
      )
  }
 
}
