import {Pipe, PipeTransform} from '@angular/core';
import {FILTER_CONFIGS_MAP} from "../../shared/constants/app.constants";

@Pipe({
  name: 'formatFilterValue'
})
export class FormatFilterValuePipe implements PipeTransform {

  transform(value: any, filterId: string): string {
    const config = FILTER_CONFIGS_MAP.get(filterId);
    if (!config) {
      return '';
    }
    return config.formatLabel(value, config);
  }
}
