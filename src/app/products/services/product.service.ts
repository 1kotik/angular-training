import {inject, Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Product} from "../../shared/models/product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Params} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {
  FILTERS_API_PARAMS_MAP
} from "../../shared/constants/app.constants";

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

  public loadProducts(params?: Params): void {
    this.getProducts(params).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  public get products(): Observable<Product[]> {
    return this.products$;
  }

  private getProducts(params?: Params): Observable<Product[]> {
    let httpParams = this.fillHttpParams(params);
    return this.apiService.get<Product[]>(this.ENTITY_NAME, httpParams);
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

  private fillHttpParams(params: Params | undefined): HttpParams | undefined {
    if (!params) {
      return undefined;
    }
    let httpParams = new HttpParams();
    for (let [key, httpParamName] of FILTERS_API_PARAMS_MAP) {
      let httpParamValue = params[key];
      if (httpParamValue !== undefined) {
        httpParams = this.setHttpParam(httpParams, httpParamName, httpParamValue);
      }
    }
    return httpParams;
  }

  private setHttpParam(httpParams: HttpParams, httpParamName: string, httpParamValue: any): HttpParams {
    if (httpParamValue === 'false' || httpParamValue === 'true') {
      httpParamValue = httpParamValue === 'true' ? 0 : -1;
    }
    return httpParams.set(httpParamName, httpParamValue);
  }
}
