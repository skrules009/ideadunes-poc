import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, RequiredValidator, ValidationErrors, Validators } from '@angular/forms';
import { ChoiceWithIndices } from '@flxng/mentions';
import { AuthguradServiceService } from './authgurad-service.service';
import { IAccounts, IComment, IMention, INote } from './models/Accounts';

@Injectable({
  providedIn: 'root'
})
export class UserFactoryService {

  constructor(private Authguardservice: AuthguradServiceService,private fb: FormBuilder) { }
  public initializedSignUpForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      userId: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      createDt: new FormControl(null),
      role: new FormControl(null),
      password: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    });
  }
  public prepareSignUpReq(fg: FormGroup) {
    return {
      userId: fg.controls.userId.value,
      firstName: fg.controls.firstName.value,
      lastName: fg.controls.lastName.value,
      createDt: null,
      role: fg.controls.role.value,
      password: fg.controls.password.value,
      city: fg.controls.city.value,
      address: fg.controls.address.value,
    }
  }
  public editNoteForm(note?: INote): FormGroup {
    let notes=note?.notes;
    note?.choiceList?.map(x=>{
      notes=notes?.replace('<b>','').replace('</b>','');
    });
    
    return new FormGroup({
      accountId: new FormControl(note?.accountId),
      noteId: new FormControl(note?.noteId),
      notes: new FormControl(notes),
      createdDt: new FormControl(note?.createdDt),
      typeOfContact: new FormControl(note?.typeOfContact),
      pin: new FormControl(note?.pin),
      timeIn: new FormControl(note?.timeIn),
      timeOut: new FormControl(note?.timeOut),
      createdBy: new FormControl(note?.createdBy),
    });
  }
  private checkTime(i:number) {
    return (i < 10) ? "0" + i : i;
}
  public initializedNoteForm(): FormGroup {
      const d = new Date();
      const h=d.getHours();
      const m=d.getMinutes();
     let time= this.checkTime(h)+':'+this.checkTime(m);
      return this.fb.group({
        accountId: new FormControl(null),
        noteId: new FormControl(null),
        notes: new FormControl('', Validators.required),
        createdDt: new FormControl(null),
        typeOfContact: new FormControl('Type Of Notes',[Validators.required,this.validateType]),
        pin: new FormControl(false, Validators.required),
        timeIn: new FormControl(time, Validators.required),
        timeOut: new FormControl(time, Validators.required),
        createdBy: new FormControl(null),
      });
  }
 public validateType(control: AbstractControl): ValidationErrors | null {
    if(control.value==='Type Of Notes'){
      control.setErrors({required: true });
    }
    return null;
}
  public initializedCommentForm(item: INote) {
    return new FormGroup({
      accountId: new FormControl(item.accountId),
      noteId: new FormControl(item.noteId),
      comment: new FormControl('', Validators.required),
      commentId: new FormControl(null),
      createdDt: new FormControl(null),
      createdBy: new FormControl(null),

    });
  }
  public prepareLoginReq(fg: FormGroup) {
    let user = {
      'userId': fg.controls.userId.value,
      'password': fg.controls.password.value
    }
    return user;
  }
  public creatLoginForm() {
    return new FormGroup({ userId: new FormControl(null), password: new FormControl(null) });
  }
  
  public prepareNoteForm(fg: FormGroup,selectedItem:ChoiceWithIndices[]): INote {
   
    return {
      accountId: Number(this.Authguardservice.readSessionForUser('selectedAccountId')),
      noteId: fg.controls.noteId.value ? fg.controls.noteId.value : 0,
      notes: fg.controls.notes.value,
      typeOfContact: fg.controls.typeOfContact.value,
      pin: fg.controls.pin.value ? fg.controls.pin.value : false,
      timeIn: fg.controls.timeIn.value,
      timeOut: fg.controls.timeOut.value,
      createdBy: this.Authguardservice.readSessionForUser('userId'),
    }
  }
  public prepareCommentForm(fg: FormGroup,selectedItem:ChoiceWithIndices[]): IComment {
    let comm=fg.controls.comment.value;
    selectedItem.map(x=>{
      comm=comm.replace('@'+x.choice.name,'<b>@'+x.choice.name+'</b>');
    })
    return {
      accountId: Number(this.Authguardservice.readSessionForUser('selectedAccountId')),
      noteId: fg.controls.noteId.value,
      commentId: fg.controls.commentId.value ? fg.controls.commentId.value : 0,
      comment: comm, //fg.controls.comment.value,
      createdBy: this.Authguardservice.readSessionForUser('userId'),
    }
  }
}
