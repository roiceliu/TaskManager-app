import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DataService } from "src/app/_services/data.service";
import { IQuote } from "src/app/_shared/interfaces";

@Component({
    selector: 'app-add-quote',
    templateUrl: './addQuote.component.html'
})
export class AddQuoteComponent implements OnInit{
    form: FormGroup;
    submitted: boolean;
    error: string;

    constructor(private dataService: DataService, private router: Router) { }
    
    ngOnInit() {
        this.submitted = false;

        //bind form's filed with validations
        this.form = new FormGroup({
            QuoteType: new FormControl('', Validators.required),
            Contact: new FormControl('', Validators.required),
            TaskType: new FormControl('',Validators.required),
            // TODO: validate date
            DueDate: new FormControl('', Validators.required),
            Task: new FormControl('')
        })
    }

    create() {
        let val = this.form.value;
        if (this.form.invalid) return;

        //set up quote information
        const data: IQuote = {
            QuoteID : null,
            QuoteType : val.QuoteType,
            Contact: val.Contact,
            Task: val.Task,
            TaskType: val.TaskType,
            DueDate: new Date(val.DueDate)
        }
        this.dataService.createQuote(data).subscribe(
            () => {
                // TODO: redirect to list quotes + update list quotes
                this.router.navigate(['/quotes']);

             },
            (e:any) => {
                this.error = "Create quote failed. Try Again ";
            }
        )
    }
}
