import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/_services/data.service';
import { IQuote } from 'src/app/_shared/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dialog-quote-update',
  templateUrl: './dialog-quote-update.component.html',
  styleUrls: ['dialog-quote-update.component.css'],
})
export class QuoteUpdateDialogComponent implements OnInit {
  id: number;
  quote: IQuote;
  isView: boolean;
  form: FormGroup;
  error: string;
  submitted: boolean;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuoteUpdateDialogComponent>
  ) { }

  ngOnInit() {
    // + is a shortcut way to convert type --> number: get from url:param
    // this.id = +this.route.snapshot.paramMap.get('id');
    this.submitted = false;

    //get id from calling window passed to modal
    this.id = this.data.QuoteID;
    this.isView = this.data.isView;

    this.dataService.getQuote(this.id).subscribe(
      (data) => {
        this.quote = data;
        // this.quote.DueDate = new Date(data.DueDate);

        //bind form with validators
        this.form = new FormGroup({
          QuoteID: new FormControl({
            value: this.quote.QuoteID,
            disabled: true,
          }),
          QuoteType: new FormControl({
            value: this.quote.QuoteType,
            disabled: this.isView
          }, Validators.required),
          Contact: new FormControl({
            value: this.quote.Contact,
            disabled: this.isView
          }, Validators.required),
          TaskType: new FormControl({
            value: this.quote.TaskType,
            disabled: this.isView
          }, Validators.required),
          DueDate: new FormControl({
            value: new Date(this.quote.DueDate).toISOString().substring(0, 16),
            disabled: this.isView
          }, Validators.required),
          Task: new FormControl({
            value: this.quote.Task,
            disabled: this.isView
          }, Validators.required),
        });
      },
      (e) => {
        console.log('display quote details has error: ' + e);
      }
    );
  }

  // FIXME: need to check if form is valid or not
  update(id: number, quote: IQuote) {
    debugger;
    this.submitted = true;
    //check on form's inputs
    if (this.form.invalid) return;


    //bind form value to send to update
    let val = this.form.value;
    if (!(val.DueDate instanceof Date))
      val.DueDate = new Date(val.DueDate);

    const updateData: IQuote = {
      QuoteID: val.QuoteID,
      QuoteType: val.QuoteType,
      Contact: val.Contact,
      Task: val.Task,
      TaskType: val.TaskType,
      DueDate: val.DueDate
    }

    this.dataService.updateQuote(this.id, updateData).subscribe(
      () => {this.dialogRef.close({ data: 'updated' }); },
      (e) => {
        console.log('Update quote has error: ' + e);
      }
    );
 
  }

  cancel() {
    this.dialogRef.close();
  }
}



