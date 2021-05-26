import { Component, Inject, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/app/_services/data.service";
import { IQuote } from "src/app/_shared/interfaces";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
    selector: 'dialog-quote-update',
    templateUrl: './dialog-quote-update.component.html',
    styleUrls:['dialog-quote-update.component.css']
})
export class QuoteUpdateDialogComponent implements OnInit{
    id: number;
    quote: IQuote;
    isView: boolean;

    constructor(private dataService: DataService,private route:ActivatedRoute, private router:Router, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef:MatDialogRef<QuoteUpdateDialogComponent> ) { }
    
    ngOnInit() {
        // + is a shortcut way to convert type --> number: get from url:param
        // this.id = +this.route.snapshot.paramMap.get('id');

        //get id from calling window passed to modal
        this.id = this.data.QuoteID;
        this.isView = this.data.isView;
        
        this.dataService.getQuote(this.id).subscribe(
            (data) => {
                this.quote = data;
                this.quote.DueDate = new Date(data.DueDate);
            },
            (e) => {
                console.log("display quote details has error: " + e);
            }
        );
    }

    update(id: number, quote: IQuote) {
        if (!(quote.DueDate instanceof Date))
            quote.DueDate = new Date(quote.DueDate + ' ');
        
        this.dataService.updateQuote(id, quote).subscribe(
            () => {},
            (e) => {
                console.log("Update quote has error: " + e);
            }
        )
    }

    cancel() {
        this.dialogRef.close();
    }

}