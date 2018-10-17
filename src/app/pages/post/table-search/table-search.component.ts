import { Component, OnInit , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
export class TableSearchComponent {

  @Output() searchValue: EventEmitter<number | string>  = new EventEmitter();
  @Output() handlerReset: EventEmitter<any>  = new EventEmitter();

  public searchTitle: string;
  public searchField: number | string;

  public search(searchData) {
    this.searchValue.emit(searchData);
  }

  public searchReset() {
    this.searchTitle = '';
    this.handlerReset.emit();
  }
}
