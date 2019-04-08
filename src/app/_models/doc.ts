import { Practice } from "./practice";
import { User } from "./user";

export class doc{

    practice : Practice;
    documentTypes:Array<string>=[];
    dosFrom:Array<Date>=[]
    dosTo:Array<Date>=[];
    searchBy:string;
    searchValue : string;
    patientItem :string;    
    //doa:Date=null;
    //dob:Date=null;
    doctor:User;
   // attorney:User[]=[];
    pageNumber:Array<number>=[];
  }
  
  
  
  
  