// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number ) {
    const ellipsis = '...';

    if ( value.length <= limit ) {
      return value;
    }
    return `${value.slice(0, limit)}${ellipsis}`;
  }

}
