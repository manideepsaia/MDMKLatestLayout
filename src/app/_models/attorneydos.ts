import { Practice } from './practice';
import { User } from './user';

export class attorneydos {

    practice: Practice;
    documentTypes: Array<string> = [];
    dosFrom: Array<Date> = [];
    dosTo: Array<Date> = [];
  //  searchBy:string;
   // searchValue : string;
    patientItem: string = null;
    doctor: User = null;
    attorney: User[] = [];
    pageNumber: Array<number> = [];
    status: string[] = [];
    statusDate: Array<Date> = [];
    paymentDate: Array<Date> = [];
    arbNotes: string[] = [];
    natureOfDispute: string[] = [];
     map: Map<String, Array<string>>;
    // dosNewFrom:Array<Date>=[];
    // dosNewTo:Array<Date>=[];
     newDocType: any[] = [];
  }





