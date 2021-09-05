export interface IUser {
     id?: number,
     userId: string,
     firstName: string,
     lastName: string,
     createDt?: string,
     role?: string,
     password?: string,
     city?: string,
     address?: string,
}

export interface IAccounts {
     accountId: number,
     name: string,
     type?: string,
     address?: string,
     doorCode?: string,
     phone?: string,
     website?: string,
     facebook?: string,
     size?: number,
     additionalInfo?: string,
     office?: string,
     crr?: string,
     zone?: string,
     visitFrequency?: string,
     contactStatus?: string,
     infoForClinicalTeam?: string
}
export interface INote {
     accountId: number,
     noteId: number,
     notes: string,
     createdDt?: string,
     typeOfContact: string,
     pin: boolean,
     timeIn: string,
     timeOut: string,
     createdBy?: string, 
     commentList?: IComment[],
     choiceList?: IMention[],
}
export interface IComment {
     accountId: number,
     noteId: number,
     commentId:number,
     comment: string,
     createdDt?: string,
     createdBy?: string, 
}
export interface IMention {
     noteId: number,
     name: string,
     id?: string,
     userId?: string, 
     start:number,
     end:number
}
export interface IMentionedUser {
     id: number;
     name: string;
     userId?:string
   }