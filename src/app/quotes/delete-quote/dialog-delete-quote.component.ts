import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'dialog-delete-quote',
    templateUrl: './dialog-delete-quote.component.html'
})
export class DeleteQuoteComponent{
    constructor(  @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DeleteQuoteComponent>) { }
    
    cancel():void {
        this.dialogRef.close();
        }
    
}
