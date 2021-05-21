export interface IQuote{
    QuoteID: number;
    QuoteType: string;
    Contact: string;
    Task: string;
    TaskType: string;
    DueDate: Date;
}

export class User{
    userName: string;
    password: string;
    token: string;
    expires: Date;
}