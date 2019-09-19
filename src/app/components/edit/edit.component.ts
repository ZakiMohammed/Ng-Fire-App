import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    frm: FormGroup;    
    product: Product;
    message: string = '';

    get f() { return this.frm.controls; }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private builder: FormBuilder,
        private productService: ProductService
    ) {
        this.product = new Product();        
    }

    ngOnInit() {
        let id = this.route.snapshot.params.id || '0';
        if (id != '0') {
            this.product = <Product>this.route.snapshot.queryParams;        
        } else {
            this.product.id = id;
        }
        this.initForm();
    }

    onSubmit() {        
        if (this.frm.valid) {
            let id = this.product.id;
            let product = <Product>{ id, ...this.frm.value };
            
            if (id == '0') {                
                this.productService.add(product);
            } else {
                this.productService.update(product);
            }
            this.router.navigate(['/home']);

        } else {            
            this.message = '😋 Please fill the form';
            setTimeout(() => this.message = '', 2000);
        }
    }

    initForm(): void {
        this.frm = this.builder.group({
            title: [this.product.title, [Validators.required]],
            description: [this.product.description, [Validators.required]],
            price: [this.product.price, [Validators.required, Validators.min(1), Validators.max(9999)]],
        });
    }

}
