import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  getProducts(): Observable<Product[]> {
    return this.db.collection('product').snapshotChanges().pipe(map(result => {
        let products: Product[] = [];
        result.forEach(element => {
            console.log(element.payload.doc.data());
            products.push(<Product>element.payload.doc.data());
        });
        return products;
    }));
    // return this.db.collection('product').valueChanges();
  }
  get() {
    return this.db.collection('product').snapshotChanges();
    // return this.db.collection('product').valueChanges();
  }
}
