import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthguradServiceService } from 'src/app/authgurad-service.service';
import { IAccounts } from 'src/app/models/Accounts';
import { UserFactoryService } from 'src/app/user-factory.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  tabs=[
    {name:'Info', label:'Info', isSelected:false},
    {name:'Contacts', label:'Contacts', isSelected:false},
    {name:'Social', label:'Social', isSelected:false},
    {name:'Notes',label:'Notes', isSelected:false},
    {name:'Task', label:'Task', isSelected:false},
    {name:'Patients', label:'Patients', isSelected:false},
    {name:'Stats', label:'Stats', isSelected:false}];
    accountName='';
    accountId=0;
    initForm:UserFactoryService;
    actions:any;
  routeState: any;
  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _initForm: UserFactoryService,
    private Authguardservice: AuthguradServiceService) {   
      this.initForm=_initForm;
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.routeState = this.router.getCurrentNavigation()?.extras.state;
        if (this.routeState) {
          this.actions = this.routeState.action;
          console.log(this.actions);
        }
      }  
    }
  ngOnInit(): void {
    this.accountName=this.Authguardservice.readSessionForUser('selectedAccountName');
    if(this.actions){
      this.navigate(this.actions[0],Number(this.actions[1]));
    }
  
  }
  
  navigate(menu:string,i:number){
    this.tabs.forEach(e=>{e.isSelected=false});
    this.tabs[i].isSelected=true;
   this.router.navigate([{ relativeTo: this.route },{ outlets: { sub: [menu] }}]);
  }
  notes(){
     this.router.navigate(['Notes']);  
  }
  
}
