import {DestroyRef, inject, Injectable} from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Params} from "@angular/router";
import {ProductDataService} from "./product-data.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productDataService: ProductDataService = inject(ProductDataService);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private products$ = this.productsSubject.asObservable();
  private destroyRef = inject(DestroyRef);

  public loadProducts(params?: Params): void {
    this.getProducts(params)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.productsSubject.next(products);
        },
        error: () => {
          this.productsSubject.next([]);
        }
      });
  }

  public get products(): Observable<Product[]> {
    return this.products$;
  }

  private getProducts(params?: Params): Observable<Product[]> {
    return this.productDataService.getProducts(params);
  }

  public deleteById(id: string): void {
    this.productDataService.deleteByProductId(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.deleteProduct(id);
        },
        error: (err) => {
          if (err.status === 404) {
            this.deleteProduct(id);
          }
        }
      });
  }

  public getById(id: string): Observable<Product> {
    return this.productDataService.getByProductId(id);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.productDataService.updateProduct(product);
  }

  private deleteProduct(id: string): void {
    const current = this.productsSubject.getValue();
    this.productsSubject.next(current.filter(product => id !== product.id));
  }
}
