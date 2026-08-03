import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {

  transform(map: Map<string, any> | null | undefined): [string, string][] {
    return map ? Array.from(map.entries()) : [];
  }

}
