import {Component, inject, Input, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CartEntry} from "../../../shared/models/cart-entry.model";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {
  @Input() public entriesPerPage = 5;
  private cartService: CartService = inject(CartService);
  private currentPageEntriesSubject: BehaviorSubject<CartEntry[]> = new BehaviorSubject<CartEntry[]>([]);
  public currentPageEntries$: Observable<CartEntry[]> = this.currentPageEntriesSubject.asObservable();
  public currentPage = 1;
  public totalPages = 1;

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.totalPages = this.cartService.getTotalPages(this.entriesPerPage);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      this.loadNewEntries();
    })
  }

  public pageCounter(): number[] {
    return new Array(this.totalPages);
  }

  public loadPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.loadNewEntries();
  }

  private loadNewEntries(): void {
    const entriesPage = this.cartService.getPage(this.currentPage, this.entriesPerPage);
    this.currentPageEntriesSubject.next(entriesPage);
  }
}
