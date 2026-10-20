import {DestroyRef, inject, Injectable} from '@angular/core';
import {ProductReview} from "../../shared/models/product-review.model";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductReviewDataService} from "./product-review-data.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {
  private productReviewDataService: ProductReviewDataService = inject(ProductReviewDataService);
  private reviewsSubject = new BehaviorSubject<ProductReview[]>([]);
  private reviews$ = this.reviewsSubject.asObservable();
  private destroyRef = inject(DestroyRef);

  public get reviews(): Observable<ProductReview[]> {
    return this.reviews$;
  }

  public loadReviews(productId: string): void {
    this.getReviews(productId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (reviews) => {
          this.reviewsSubject.next(reviews);
        },
        error: () => {
          this.reviewsSubject.next([]);
        }
      });
  }

  public getReviews(productId: string): Observable<ProductReview[]> {
    return this.productReviewDataService.getReviewsByProductId(productId);
  }
}
