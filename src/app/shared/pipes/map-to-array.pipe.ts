import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {

  transform(map: Map<any, any> | null | undefined): [any, any][] {
    return map ? Array.from(map.entries()) : [];
  }

}
