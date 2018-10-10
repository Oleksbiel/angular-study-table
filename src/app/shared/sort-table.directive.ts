import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSortTable]'
})
export class SortTableDirective {


  constructor() { }

  // // tslint:disable-next-line:no-input-rename
  // @Input('sortDir') sortDir: string;
  // // tslint:disable-next-line:no-input-rename
  // @Input('sortTitle') sortTitle: string;
  // // tslint:disable-next-line:no-input-rename
  // @Input('sortedData') sortedData: string;
  // @HostListener('click', ['$event']) testFync(event) {
  //   console.log(this.sortTitle);
  //   this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
  // }

  // public matSortChange() {
  //   return '111111';
  // }
}

// немогу понять как передавать дату из директивы в комонент ,
// tslint:disable-next-line:max-line-length
// Я так понял должно работтаь мы кликаем по дерективе и достаем по чем будем фильтровать идем в сервис и там фильтруем потом как то нужно дату передать из директивы в компонент
