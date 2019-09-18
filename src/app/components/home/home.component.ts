import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Product } from 'src/app/models/product';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    items: Product[] = [];

    constructor(public firebaseService: FirebaseService) { }

    ngOnInit() {
        this.firebaseService.get().subscribe(result => {
            result.forEach(element => {
                console.log(element.payload.doc.data());                
                console.log(element.payload.doc.id);                
            });
        });
    }

}
