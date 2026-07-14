import {Component, inject, Input} from '@angular/core';
import {ProductReview} from "../../../../../shared/models/product-review.model";
import {Observable} from "rxjs";
import {ProductReviewService} from "../../../../services/product-review.service";

@Component({
  selector: 'app-product-review-list',
  templateUrl: './product-review-list.component.html',
  styleUrl: './product-review-list.component.scss'
})
export class ProductReviewListComponent {
  private readonly productReviewService = inject(ProductReviewService);

  @Input() public set productId(id: number) {
    this.productReviewService.loadReviews(id);
  };

  public get reviews$(): Observable<ProductReview[]> {
    return this.productReviewService.reviews;
  }
}
