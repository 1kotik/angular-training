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
  public productSubject: BehaviorSubject<Product | null> = new BehaviorSubject<Product | null>({} as Product);
  public product$: Observable<Product | null> = this.productSubject.asObservable();
  private readonly productService = inject(ProductService);
  private readonly router: Router = inject(Router);

  @Input() set id(id: string) {
    this.productService.getById(id).subscribe({
      next: (product)=> {
        this.productSubject.next(product);
      },
      error: ()=> {
        this.productSubject.next(null);
      }
    })
  }

  public editProduct(product: Product, formValue: any): void {
    product.image = formValue.image;
    product.title = formValue.title;
    product.price = formValue.price;
    product.stock = formValue.stock;
    product.description = formValue.description;
    this.productService.updateProduct(product).subscribe({
      next: (updatedProduct) => {
        this.productSubject.next(updatedProduct);
        this.router.navigate(['/products/' + product.id]);
      },
      error: ()=> {
        alert("Error occurred while updating product");
      }
    });
  }
}
