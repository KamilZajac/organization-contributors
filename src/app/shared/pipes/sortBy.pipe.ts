import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  pure: false
})
export class sortByPipe implements PipeTransform {

  transform(array: Array<any>, args: { property: string, direction: string }): Array<any> {

    return array = array.sort((a: any, b: any) => {
      if (args.direction === 'asc') {
        return a[args.property] - b[args.property];
      }
      return b[args.property] - a[args.property];
    });
  }
}



