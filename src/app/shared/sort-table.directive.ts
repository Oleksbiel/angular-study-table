import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSortTable]',
  exportAs: 'sortTable'
})
export class SortTableDirective {


  constructor() { }

  @Input('sortDir') sortDir: string;
  @Input('sortTitle') sortTitle: string;
  @Input('sortedData') sortedData: string;
  @HostListener('click', ['$event']) testFync(event){ 
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
  }

  public matSortChange() {
    return '111111'
  }
}

// немогу понять как передавать дату из директивы в комонент ,
// Я так понял должно работтаь мы кликаем по дерективе и достаем по чем будем фильтровать идем в сервис и там фильтруем потом как то нужно дату передать из директивы в компонент
