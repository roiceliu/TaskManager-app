import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";

import { DataService } from "src/app/_services/data.service";
import { IQuote } from "src/app/_shared/interfaces";


@Component({
    selector: 'app-quote-details',
    templateUrl: './dialog-quote-details.component.html',
    styleUrls:['../quote-update/dialog-quote-update.component.css']
})
export class QuoteDetailsDialogComponent implements OnInit{
    id: number;
    quote: IQuote;

    constructor(private dataService: DataService,private route:ActivatedRoute, private router:Router, @Inject(MAT_DIALOG_DATA) public data: number, public dialogRef:MatDialogRef<QuoteDetailsDialogComponent>) { }
    
    ngOnInit() {
        //get id from calling window passed to modal
        this.id = this.data;
        
        this.dataService.getQuote(this.id).subscribe(
            (data) => {
                this.quote = data;
                debugger;
                this.quote.DueDate = new Date(data.DueDate);
            },
            (e) => {
                console.log("display quote details has error: " + e);
            }
        );
    }

    cancel() {
        this.dialogRef.close();
    }

    delete(id: number) {
        this.dataService.deleteQuote(id).subscribe(
            () => {
                this.router.navigate(['/quotes']);
             },
            (e) => {
                console.log("Delete quote has error: " + e);
            }
        )
    }

}