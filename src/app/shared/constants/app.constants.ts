import {FilterConfig} from "../models/filter-config.model";
import {RangeModel} from "../components/range-filter/range-filter.component";

export const APP_CONSTANTS = {
  CURRENCY: '$',
  GUEST_CART_ID_KEY: 'guestCartId',
  USER_KEY: 'user'
}

export const FILTER_CONFIGS: FilterConfig[] = [
  {
    formName: 'priceRange',
    mappings: [
      {
        formFieldName: 'from',
        paramName: 'priceFrom',
        paramApiName: 'price:gte'
      },
      {
        formFieldName: 'to',
        paramName: 'priceTo',
        paramApiName: 'price:lte'
      }
    ],
    formatLabel: formatPriceLabel
  },
  {
    formName: 'ratingRange',
    mappings: [
      {
        formFieldName: 'from',
        paramName: 'ratingFrom',
        paramApiName: 'rating.rate:gte'
      },
      {
        formFieldName: 'to',
        paramName: 'ratingTo',
        paramApiName: 'rating.rate:lte'
      }
    ],
    formatLabel: formatRatingLabel
  },
  {
    formName: 'stockPresence',
    labelTemplate: `Stock presence`,
    mappings: [
      {
        formFieldName: 'stockPresence',
        paramName: 'stockPresence',
        paramApiName: 'stock:gt'
      }
    ],
    formatLabel: formatBooleanLabel
  },
  {
    formName: 'reviewPresence',
    labelTemplate: `Review presence`,
    mappings: [
      {
        formFieldName: 'reviewPresence',
        paramName: 'reviewPresence',
        paramApiName: 'rating.count:gt'
      }
    ],
    formatLabel: formatBooleanLabel
  }
]

export const FILTER_CONFIGS_MAP = new Map<string, FilterConfig>(
  FILTER_CONFIGS.map(filter => [filter.formName, filter])
);

export const FILTERS_API_PARAMS_MAP = new Map<string, string>();

FILTER_CONFIGS.forEach(config => {
  config.mappings.forEach(mapping => {
    if (mapping.paramName && mapping.paramApiName) {
      FILTERS_API_PARAMS_MAP.set(mapping.paramName, mapping.paramApiName);
    }
  })
});

export function formatPriceLabel(price: RangeModel) {
  let currency = APP_CONSTANTS.CURRENCY;
  let from = price.from;
  let to = price.to;
  if (from && to) {
    return `${currency}${from}-${currency}${to}`;
  }
  if (from) {
    return `From ${currency}${from}`;
  }
  if (to) {
    return `To ${currency}${to}`;
  }
  return '';
}

export function formatRatingLabel(rating: RangeModel) {
  let from = rating.from;
  let to = rating.to;
  if (from && to) {
    return `Rating ${from}-${to}`;
  }
  if (from) {
    return `Rating ${from}+`;
  }
  if (to) {
    return `Rating <${to}`;
  }
  return '';
}

export function formatBooleanLabel(value: boolean, filterConfig?: FilterConfig) {
  if (!filterConfig) {
    return '';
  }
  let label = filterConfig.labelTemplate ? filterConfig.labelTemplate : filterConfig.formName;
  if (value) {
    return label;
  }
  return '';
}
