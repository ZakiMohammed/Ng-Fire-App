import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

declare var window: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    products: Product[] = [];
    message: string = '';

    constructor(public productService: ProductService) { }

    ngOnInit() {
        this.productService.getAll().subscribe(products => {
            this.products = products;
        });
    }

    onDeleteClick($event: any, product: Product) {
        this.productService.delete(product);
        window.scrollTo(0, 0);
        this.message = '💩 Product deleted';
        setTimeout(() => this.message = '', 2000);
    }

}
