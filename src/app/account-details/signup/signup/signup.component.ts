import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeadunesService } from 'src/app/ideadunes.service';
import { UserFactoryService } from 'src/app/user-factory.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  service:IdeadunesService;
  signupForm: any;
  initForm:UserFactoryService;
  constructor(private _service: IdeadunesService, 
    private route: ActivatedRoute,
    private router: Router,
    private _initForm :UserFactoryService,) {
    this.service = _service;
    this.initForm=_initForm;
  }
  ngOnInit(): void {
    this.signupForm=this.initForm.initializedSignUpForm();
  }
  AddUser() {
    this.service.AddUser(this.initForm.prepareSignUpReq(this.signupForm))
      .subscribe(
        resultArray => { console.log(resultArray); this.router.navigate(['/Login']); },
        error => console.log("Error :: " + error)
      )
   
  }
 
  
  
}



