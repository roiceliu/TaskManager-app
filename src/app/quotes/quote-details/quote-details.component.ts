import { HttpClient } from "@angular/common/http";
import { isQuote } from "@angular/compiler";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/app/_services/data.service";
import { IQuote } from "src/app/_shared/interfaces";


@Component({
    selector: 'app-quote-details',
    templateUrl: './quote-details.component.html',
    styleUrls:['quote-details.component.css']
})
export class QuoteDetailsComponent implements OnInit{
    id: number;
    quote: IQuote;

    constructor(private dataService: DataService,private route:ActivatedRoute, private router:Router) { }
    
    ngOnInit() {
        // + is a shortcut way to convert type --> number
        this.id = +this.route.snapshot.paramMap.get('id');
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
            quote.DueDate = new Date(quote.DueDate);
        this.dataService.updateQuote(id, quote).subscribe(
            () => {
                this.router.navigate(['/quotes']);
            },
            (e) => {
                console.log("Update quote has error: " + e);
            }
        )
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