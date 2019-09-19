import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

    list: Item[] = [];
    listFiltered: Item[] = [];
    listSelected: Item[] = [];
    selectedText: string;
    _searchText: string;

    get searchText(): string {
		return this._searchText;
	}
	set searchText(value: string) {
		this._searchText = value;
		if (!this._searchText) {
            this.listFiltered = this.deepCopy(this.list);			
		} else {
            this.listFiltered = this.deepCopy(this.list.filter(i => i.value.toLowerCase().indexOf(this._searchText.toLowerCase()) !== -1));
        }
        this.listSelected.forEach((item, index) => {
            let filterIndex = this.listFiltered.findIndex(i => i.value === item.value);
            if (filterIndex !== -1) {
                this.listFiltered[filterIndex].checked = true;
            }
        });		
	}

    constructor() {
        this.list = [
            { value: 'Apple', checked: false },
            { value: 'Mango', checked: false },
            { value: 'Banana', checked: false },
            { value: 'Orange', checked: false },
            { value: 'Watermelon', checked: false },
            { value: 'Grapes', checked: false },
        ];
        this.listFiltered = this.deepCopy(this.list);
    }

    ngOnInit() {
    }

    onItemChange($event: any, item: Item, index: number) {
        if (item.checked) {
            this.listFiltered[index].checked = false;

            let selectedIndex = this.listSelected.findIndex(i => i.value === item.value);
            this.listSelected.splice(selectedIndex, 1);
        } else {
            this.listFiltered[index].checked = true;
            this.listSelected.push({ ...this.listFiltered[index] });
        }
        this.selectedText = this.listSelected.map(i => i.value).toString().split(',').join(', ');
    }

    deepCopy(o: any) {
        let output: any, v: any, key: any;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
            v = o[key];
            output[key] = (typeof v === "object") ? this.deepCopy(v) : v;
        }
        return output;
    }

}
class Item {
    value: string;
    checked: boolean;    
}
