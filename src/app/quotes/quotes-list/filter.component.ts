import { Component, Input, Output,EventEmitter } from "@angular/core";

@Component({
    selector: 'app-filter',
    template: `
        <input type = 'text' [(ngModel)] = 'searchString'/>
    `
})
export class FilterComponent{
    private _searchString: string;

    @Input() get SearchString() {
      return this._searchString;
    }
    
    set searchString(value: string) {
        this._searchString = value;
        this.changed.emit(value);
    }

    @Output() changed: EventEmitter<string> = new EventEmitter<string>();

}

