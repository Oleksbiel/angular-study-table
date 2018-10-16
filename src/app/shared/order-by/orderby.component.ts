import { Component, OnInit, HostListener, Input, Output, EventEmitter,  OnDestroy } from '@angular/core';
import { PostComponent } from '../../pages/post/post.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'orderBy',
  templateUrl: './orderby.component.html'
})
export class OrderByComponent implements OnInit , OnDestroy {


  constructor(
    private postComponent: PostComponent
  ) {}

  public columnDir: String = 'desc';
  public isActive: Boolean;
  public sortedData;
  private destroySubject: Subject<void> = new Subject();

  @Input() name: String;
  @Output() sortDataFunc: EventEmitter<object> = new EventEmitter<object>();
  @HostListener('click', ['$event'])
  changeDir(e) {

    this.handlerSort(this.name , this.columnDir );
    this.checkStatus();
    this.columnDir = this.columnDir === 'asc' ? 'desc' : 'asc';
  }

  public checkStatus () {
    if ( this.sortedData.isActive === this.name ) {
      this.columnDir = this.columnDir === 'asc' ? 'desc' : 'asc';
      this.isActive = true;
    } else {
      this.columnDir = 'desc';
      this.isActive = false;
    }

  }

  public handlerSort(sortTitle , sortDir) {
    const sortData = {
      sortTitle,
      sortDir,
      isActive: this.name
    };
    this.sortDataFunc.emit(sortData);
  }

  ngOnInit() {
    this.postComponent.orderChange.pipe(takeUntil(this.destroySubject)).subscribe( sortedDataFromC => {
      this.sortedData = sortedDataFromC;
      // this.checkStatus(sortedDataFromC);
    });
  }
  ngOnDestroy(): void {
    this.destroySubject.next();
  }

}
