import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthguradServiceService } from 'src/app/authgurad-service.service';
import { IdeadunesService } from 'src/app/ideadunes.service';
import { IAccounts } from 'src/app/models/Accounts';
import { UserFactoryService } from 'src/app/user-factory.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  service;
  accounts:IAccounts[]=[];
  searchValue="";
  selectedAccountId=0;
  initForm:UserFactoryService;
  constructor(
    private _service: IdeadunesService, 
    private route: ActivatedRoute,
    private router: Router,
    private _initForm: UserFactoryService,
    private Authguardservice: AuthguradServiceService) {
    this.service = _service;
    this.initForm=_initForm;
  }


  ngOnInit(): void {
    this.getAccountsInfo();
  }
   getAccountsInfo() {
    this.service.getAccountsList()
      .subscribe(
        res => {this.accounts = res; console.log(this.accounts);
        },
        error => console.log("Error :: " + error)
      )
  }
  addNotes(item:IAccounts){
    this.Authguardservice.setAccountInfo(item);
    this.router.navigate(['/LD']
    , {
      state: {
        action: ['Notes','3'],
  }});
  }
  viewAccounts(item:IAccounts){
    this.Authguardservice.setAccountInfo(item);
    this.router.navigate(['/LD']
    , {
      state: {
        action: ['Info','0'],
  }});
  }
}
