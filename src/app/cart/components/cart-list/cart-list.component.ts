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
  @Input() public entriesPerPage: number = 5;
  private cartService: CartService = inject(CartService);
  private currentPageEntriesSubject: BehaviorSubject<CartEntry[]> = new BehaviorSubject<CartEntry[]>([]);
  public currentPageEntries$: Observable<CartEntry[]> = this.currentPageEntriesSubject.asObservable();
  public currentPage: number = 1;
  public totalPages: number = 1;

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.loadNewEntries();
      this.totalPages = this.cartService.getTotalPages(this.entriesPerPage);
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
    let entriesPage = this.cartService.getPage(this.currentPage, this.entriesPerPage);
    this.currentPageEntriesSubject.next(entriesPage);
  }
}
