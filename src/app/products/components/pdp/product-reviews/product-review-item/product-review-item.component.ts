import {Component, Input} from '@angular/core';
import {ProductReview} from "../../../../../shared/models/product-review.model";

@Component({
  selector: 'app-product-review-item',
  templateUrl: './product-review-item.component.html',
  styleUrl: './product-review-item.component.scss'
})
export class ProductReviewItemComponent {
  @Input() review!: ProductReview
}
