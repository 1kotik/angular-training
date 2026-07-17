import {Component, inject, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FilterInfoService} from "../../../services/filter-info.service";
import {FILTER_CONFIGS} from "../../../../shared/constants/app.constants";
import {FilterConfig} from "../../../../shared/models/filter-config.model";

@Component({
  selector: 'filter-section',
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.scss'
})
export class FilterSectionComponent implements OnInit {
  private readonly productService: ProductService = inject(ProductService);
  private filterInfoService: FilterInfoService = inject(FilterInfoService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private appliedManually: boolean = false;

  public form: FormGroup = this.formBuilder.group({
    priceRange: [{from: null, to: null}],
    ratingRange: [{from: null, to: null}],
    stockPresence: [null],
    reviewPresence: [null]
  })

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!this.appliedManually) {
        this.form.patchValue(this.getValuesFromParams(params));
      }
      this.appliedManually = false;
      this.productService.loadProducts(params);
      this.filterInfoService.updateFilterInfos(this.form.value);
    });

    this.filterInfoService.filterDeleted$.subscribe(filterId => {
      this.form.get(filterId)?.reset();
      this.applyFilters();
    })
  }

  public applyFilters(): void {
    this.appliedManually = true;
    let queryParams: any = {};
    let formValues = this.form.value;

    for (let filterConfig of FILTER_CONFIGS) {
      this.setQueryParam(queryParams, filterConfig, formValues[filterConfig.formName]);
    }

    this.router.navigate([], {
      queryParams: queryParams,
      relativeTo: this.route
    });
  }

  public resetFilters(): void {
    this.form.reset();
    this.applyFilters();
  }

  private setQueryParam(params: Params, filterConfig: FilterConfig, formValue: any): void {
    if (formValue === undefined || formValue === null || formValue === false) return;
    for (let mapping of filterConfig.mappings) {
      if (formValue && typeof formValue !== "object") {
        params[mapping.paramName] = formValue;
      } else if (formValue[mapping.formFieldName]) {
        params[mapping.paramName] = formValue[mapping.formFieldName];
      }
    }
  }

  private getValuesFromParams(params: Params): any {
    let formValues: any = {};
    for (let filterConfig of FILTER_CONFIGS) {
      let filterValue: any = {};
      for (let mapping of filterConfig.mappings) {
        let paramValue = params[mapping.paramName];
        if (paramValue !== undefined) {
          filterValue[mapping.formFieldName] = paramValue;
        }
      }
      formValues[filterConfig.formName] = filterConfig.mappings.length === 1
        ? filterValue[filterConfig.mappings[0].formFieldName]
        : filterValue;
    }
    return formValues;
  }
}
