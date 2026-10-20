import {inject, Injectable} from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {ApiService} from "../../shared/services/api.service";
import {Observable} from "rxjs";
import {Params} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {FILTERS_API_PARAMS_MAP} from "../../shared/constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private readonly apiService: ApiService = inject(ApiService);
  private readonly ENTITY_NAME: string = "products";

  public getProducts(params?: Params): Observable<Product[]> {
    const httpParams = this.fillHttpParams(params);
    return this.apiService.get<Product[]>(this.ENTITY_NAME, httpParams);
  }

  public deleteByProductId(id: string): Observable<void> {
    return this.apiService.deleteById(this.ENTITY_NAME, id);
  }

  public getByProductId(id: string): Observable<Product> {
    return this.apiService.getById<Product>(this.ENTITY_NAME, id);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.apiService.updateById(this.ENTITY_NAME, product.id, product);
  }

  private fillHttpParams(params: Params | undefined): HttpParams | undefined {
    if (!params) {
      return undefined;
    }
    let httpParams = new HttpParams();
    for (const [key, httpParamName] of FILTERS_API_PARAMS_MAP) {
      const httpParamValue = params[key];
      if (httpParamValue !== undefined) {
        httpParams = this.setHttpParam(httpParams, httpParamName, httpParamValue);
      }
    }
    return httpParams;
  }

  private setHttpParam(httpParams: HttpParams, httpParamName: string, httpParamValue: string | number | boolean): HttpParams {
    if (httpParamValue === 'false' || httpParamValue === 'true') {
      httpParamValue = httpParamValue === 'true' ? 0 : -1;
    }
    return httpParams.set(httpParamName, httpParamValue);
  }
}
