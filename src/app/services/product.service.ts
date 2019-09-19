import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productsCollection: AngularFirestoreCollection<Product>;
    private productDoc: AngularFirestoreDocument<Product>;
    private collectionName: string = 'product';

    constructor(public db: AngularFirestore) {
        this.productsCollection = this.db.collection(this.collectionName);
    }

    get(id: string) {
        this.productDoc = this.db.doc<Product>('product/' + id);
        return this.productDoc.snapshotChanges().pipe(
            map(changes => {
                const data = changes.payload.data();
                const id = changes.payload.id;
                return { id, ...data };
            }))
    }

    getAll(): Observable<Product[]> {
        return this.productsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Product;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    add(product: Product): void {
        delete product.id;
        this.productsCollection.add(product);
    }

    delete(product: Product) {
        this.productDoc = this.db.doc(`${this.collectionName}/${product.id}`);
        this.productDoc.delete();
    }

    update(product: Product) {
        this.productDoc = this.db.doc(`${this.collectionName}/${product.id}`);
        delete product.id;
        this.productDoc.update(product);
    }
}
