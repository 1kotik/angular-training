import {Component, inject, Input} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrl: './product-edit-page.component.scss'
})
export class ProductEditPageComponent {
  public productSubject: BehaviorSubject<Product> = new BehaviorSubject<Product>({} as Product);
  public product$: Observable<Product> = this.productSubject.asObservable();
  private readonly productService = inject(ProductService);
  private readonly router: Router = inject(Router);

  @Input() set id(id: string) {
    this.productService.getById(id).subscribe(product => {
      this.productSubject.next(product);
    })
  }

  public editProduct(product: Product, formValue: any): void {
    product.image = formValue.image;
    product.title = formValue.title;
    product.price = formValue.price;
    product.stock = formValue.stock;
    product.description = formValue.description;
    this.productService.updateProduct(product).subscribe(product => {
      this.productSubject.next(product);
      this.router.navigate(['/products/' + product.id]);
    });
  }
}
