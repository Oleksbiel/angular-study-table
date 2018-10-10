import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'orderBy',
  templateUrl: './orderby.component.html'
})
export class OrderByComponent implements OnInit {

  public columnDir: String = 'desc';
  
  @Input('name') name: String;
  @Output() sortDataFunc: EventEmitter<object> = new EventEmitter<object>();
  @HostListener('click', ['$event.target']) 

  changeDir(event){

    this.handlerSort(this.name , this.columnDir );
    this.columnDir = this.columnDir === 'asc' ? 'desc' : 'asc';
  } 

  public handlerSort(sortTitle , sortDir) {
    const sortData = {
      sortTitle,
      sortDir
    };
    this.sortDataFunc.emit(sortData);
  }

  
  constructor() { }

  ngOnInit() {}

}
