import {inject, Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Product} from "../../shared/models/product.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiService: ApiService = inject(ApiService);
  private readonly ENTITY_NAME: string = "products";
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private products$ = this.productsSubject.asObservable();

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.getProducts().subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  public get products(): Observable<Product[]> {
    return this.products$;
  }

  public getProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>(this.ENTITY_NAME);
  }

  public deleteById(id: number): void {
    this.apiService.deleteById(this.ENTITY_NAME, id).subscribe({
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

  public getById(id: number): Observable<Product> {
    return this.apiService.getById<Product>(this.ENTITY_NAME, id);
  }

  private deleteProduct(id: number): void {
    const current = this.productsSubject.getValue();
    this.productsSubject.next(current.filter(product => id !== product.id));
  }
}
