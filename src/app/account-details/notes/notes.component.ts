import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IdeadunesService } from 'src/app/ideadunes.service';
import { IAccounts, IComment, IMentionedUser, INote, IUser } from 'src/app/models/Accounts';
import { UserFactoryService } from 'src/app/user-factory.service';
import { ChoiceWithIndices } from '@flxng/mentions';
import { AuthguradServiceService } from 'src/app/authgurad-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  noteTypes: String[];
  searchValue: string = '';
  closeResult = '';
  service: IdeadunesService;
  note: FormGroup;
  initForm: UserFactoryService;
  noteList: INote[];
  user: IUser[];
  comment: FormGroup;
  selectedNoteIdOld: any;
  selectedNoteId: any;
  @Input() accountData: any;
  loading = false;
  choices: IMentionedUser[] = [];
  selectedItem: ChoiceWithIndices[] = [];
  userlist: IMentionedUser[] = [];
  submitted = false;
  commentSubmitted=false;
  selectedAccounts=0;
  constructor(private modalService: NgbModal,
    private _service: IdeadunesService,
    private route: ActivatedRoute,
    private _initForm: UserFactoryService,
    private _Auth:AuthguradServiceService,
    private router: Router) {
    this.service = _service;
    this.initForm = _initForm;
    this.noteTypes = ['Visit', 'Phone Call', 'Email', 'Text', 'Info', 'Plan', 'Other'];
    this.note = this.initForm.initializedNoteForm();
    this.comment = new FormGroup({});
    this.noteList = [];
    this.user = [];
    this.selectedAccounts=parseInt(this._Auth.readSessionForUser('selectedAccountId'));
    //this.user1;
  }

  showMore(noteId: any) {
    this.selectedNoteId = this.selectedNoteIdOld === noteId ? '' : noteId;
    this.selectedNoteIdOld = this.selectedNoteId;
  }
  ngOnInit(): void {
    this.getUserList();
    this.getNotesList(this.selectedAccounts);
   
  }
  get f() { return this.note.controls; }
  get c() { return this.comment.controls; }
  saveNote(modal:any): void {
    this.addValidator(true);
    this.submitted = true;
    if (this.note.invalid) {
      return;
    }
    modal.close('Save click');
    let filterDuplicate=[...new Set(this.selectedItem)];
    this.service.AddNote(this.initForm.prepareNoteForm(this.note,filterDuplicate), filterDuplicate)
      .subscribe(
        results => { this.getNotesList(this.selectedAccounts); },
        error => console.log("Error :: " + error)
      )
  }
  saveComment(modal:any): void {
    this.commentSubmitted=true;
    if (this.comment.invalid) {
      return;
    }
    modal.close('Save click');
    let filterDuplicate=[...new Set(this.selectedItem)];
    this.service.AddComment(this.initForm.prepareCommentForm(this.comment, filterDuplicate))
      .subscribe(
        results => {
          this.getNotesList(this.selectedAccounts);
          console.log(results);
          this.selectedNoteIdOld = '';
          this.showMore(this.selectedNoteId);
        },
        error => console.log("Error :: " + error)
      )
  }
  editNote(note: INote, accountContent: any) {
    this.selectedItem=[];
    this.note = this.initForm.editNoteForm(note);
    let selectedMention:ChoiceWithIndices[]=[];
    this.popup(accountContent);
    note.choiceList?.map(x=>{
      selectedMention.push({choice:{name:x.name,id:x.noteId,userId:x.userId},indices:{start:x?.start,end:x.end}});
    })
    this.onSelectedChoicesChange(selectedMention);
  }
  pinToggle() {
    this.note.patchValue({ 'pin': !this.note.controls.pin.value });
  }
  pinnedItem(note: INote) {
    note.pin = !note.pin;
    let filterDuplicate=[...new Set(this.selectedItem)];
    this.service.AddNote(note,filterDuplicate)
      .subscribe(
        results => { this.getNotesList(this.selectedAccounts); },
        error => console.log("Error :: " + error)
      )
  }
  addValidator(isValidate:boolean){
    if(isValidate){
      this.note.controls.notes.addValidators(Validators.required);      
      this.note.controls.timeIn.addValidators(Validators.required); 
      this.note.controls.timeOut.addValidators(Validators.required); 
      this.note.controls.notes.updateValueAndValidity();      
      this.note.controls.timeIn.updateValueAndValidity(); 
      this.note.controls.timeOut.updateValueAndValidity();         
    } else {  
      this.note.controls.notes.clearValidators();      
      this.note.controls.timeIn.clearValidators(); 
      this.note.controls.timeOut.clearValidators();
      this.note.controls.notes.updateValueAndValidity(); 
      this.note.controls.timeIn.updateValueAndValidity(); 
      this.note.controls.timeOut.updateValueAndValidity();                       
    }
  }
  openAddNotes(accountContent: any) {
    this.note = this.initForm.initializedNoteForm();
    this.addValidator(false);
    this.popup(accountContent);
  }
  private popup(accountContent: any) {
    this.modalService.open(accountContent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.dismissModal(reason)}`;
    });
  }
  openAddComment(accountContent: any, item: INote) {
    this.selectedItem=[];
    this.comment = this.initForm.initializedCommentForm(item);
    this.modalService.open(accountContent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.dismissModal(reason)}`;
    });
  }
  getNotesList(account:any) {
    this.service.getNotesList(account)
      .subscribe(
        results => {
          this.noteList = results; console.log(this.noteList);
          let pattern;
          let distinct:any=[];
          this.noteList.map(x=>x.choiceList?.forEach(y=>{
              distinct.push(y.name);            
          }));
          distinct=[...new Set(distinct)];         
          this.noteList.map(x=>{
            distinct.forEach((y:any)=>{
              pattern='@'+y;
              x.notes=x.notes.replace(new RegExp(pattern, "g"), '<b>'+pattern+'</b>');
            })
            })
        },
        error => console.log("Error :: " + error)
      )
  }
  private dismissModal(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  async loadChoices(searchTerm: string): Promise<IMentionedUser[]> {
    const users = await (await this.getUsers()).map(x => { return <IMentionedUser>{ name: x.firstName + ' ' + x.lastName, id: x.id, userId: x.userId } });
    this.choices = users.filter((user) => {
      const alreadyExists = false;
      return !alreadyExists && user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
    this.choices.push({ name: 'Add New', id: 0, userId: 'AddNew' });
    return this.choices;
  }
  getChoiceLabel = (user: IMentionedUser): string => {
    if (user.name === 'Add New') {
      return '';
    }
    return `@${user.name}`;
  };
  onSelectedChoicesChange(choices: ChoiceWithIndices[]): void {
    if(this.selectedItem.length>0){
      this.selectedItem.push(choices[choices.length-1]);
    }else{
    this.selectedItem = choices;
    }
  }
  onMenuHide(): void {
    this.choices = [];
  }

  async getUserList() {
    this.service.getUserList()
      .subscribe(
        results => {
          this.user = results;
        },
        error => console.log("Error :: " + error)
      )
  }
  async getUsers(): Promise<IUser[]> {
    this.loading = true;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loading = false;
        resolve([...this.user]);
      }, 100);
    });
  }
}
