import {inject, Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {Observable} from "rxjs";
import {ProductReview} from "../../shared/models/product-review.model";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductReviewDataService {
  private readonly apiService: ApiService = inject(ApiService);
  private readonly ENTITY_NAME: string = "reviews";

  public getReviewsByProductId(productId: string): Observable<ProductReview[]> {
    const params: HttpParams = new HttpParams().set("productId", productId);
    return this.apiService.get<ProductReview[]>(this.ENTITY_NAME, params);
  }
}
