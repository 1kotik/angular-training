import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "../../shared/models/product.model";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(products: Product[] | null, searchInput: string | null): Product[] {
    if (!products) {
      return [];
    }
    if (!searchInput || searchInput.length < 2) {
      return products;
    }
    let searchValue = searchInput.toLowerCase();
    return products.filter(product =>
      product.title.toLowerCase().includes(searchValue)
    );
  }

}
