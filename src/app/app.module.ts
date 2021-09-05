import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './dashBoard/home/home.component';
import { LandingPageComponent } from './landingPage/landing-page/landing-page.component';
import { LoginComponent } from './account-details/login/login/login.component';
import { SignupComponent } from './account-details/signup/signup/signup.component';
import { AccountListComponent } from './account-details/account/account-list/account-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponentComponent } from './404/not-found-component/not-found-component.component';
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './account-details/notes/notes.component';
import { MentionModule } from 'angular-mentions';
import { SearchAccountsPipe } from './search-accounts.pipe';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './account-details/info/info.component';
import { SocialComponent } from './account-details/social/social.component';
import { ContactsComponent } from './account-details/contacts/contacts.component';
import { TaskComponent } from './account-details/task/task.component';
import { PatientsComponent } from './account-details/patients/patients.component';
import { StatsComponent } from './account-details/stats/stats.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthguradServiceService } from './authgurad-service.service';
import { AuthenticationGuard } from './authentication.guard';
import { LogOutComponent } from './login/log-out/log-out.component';
import { MentionsModule } from '@flxng/mentions';

const appRoots: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "LogOut", component: LogOutComponent },
  { path: "Accounts", component: AccountListComponent, canActivate:[AuthenticationGuard]},
  { path: "Login/Signup", component: SignupComponent },
  // { path: "LD", component: LandingPageComponent , canActivate:[AuthenticationGuard]},
  { path: "Home", component: HomeComponent, canActivate:[AuthenticationGuard] },
  { path: "LD", component: LandingPageComponent, canActivate:[AuthenticationGuard], children: [
    {path: 'Notes', component: NotesComponent, outlet: 'sub'},
    {path: 'Info', component: InfoComponent, outlet: 'sub'},
    {path: 'Contacts', component: ContactsComponent, outlet: 'sub'},
    {path: 'Social', component: SocialComponent, outlet: 'sub'},
    {path: 'Task', component: TaskComponent, outlet: 'sub'},
    {path: 'Patients', component: PatientsComponent, outlet: 'sub'},
    {path: 'Stats', component: StatsComponent, outlet: 'sub'}
  ]},
  // { path: "Notes", component: NotesComponent},
  { path: "",  redirectTo: 'Login', pathMatch:'full' },
  { path: "**", component: NotFoundComponentComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    AccountListComponent,
    NotesComponent,
    SearchAccountsPipe,
    InfoComponent,
    LogOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MentionModule,
    FormsModule,
    MentionsModule,
    RouterModule.forRoot(appRoots),
    NgbModule,
  ],
  providers: [AuthguradServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
