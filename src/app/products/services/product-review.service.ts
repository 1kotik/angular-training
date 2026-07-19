import {inject, Injectable} from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {ProductReview} from "../../shared/models/product-review.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {
  private readonly apiService: ApiService = inject(ApiService);
  private readonly ENTITY_NAME: string = "reviews";
  private reviewsSubject = new BehaviorSubject<ProductReview[]>([]);
  private reviews$ = this.reviewsSubject.asObservable();

  public get reviews(): Observable<ProductReview[]> {
    return this.reviews$;
  }

  public loadReviews(productId: string): void {
    this.getReviews(productId).subscribe(reviews => {
      this.reviewsSubject.next(reviews);
    });
  }

  public getReviews(productId: string): Observable<ProductReview[]> {
    let params: HttpParams = new HttpParams().set("productId", productId);
    return this.apiService.get<ProductReview[]>(this.ENTITY_NAME, params);
  }
}
