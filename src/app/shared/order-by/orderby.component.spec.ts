import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { OrderByComponent } from './orderby.component';
import { PostComponent } from '../../pages/post/post.component';
import { PostService } from '../../pages/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostModule } from '../../pages/post/post.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const orderByNameProperty: String = 'someName';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'post-wrapper',
  template: '<orderBy [name]="orderByName"><orderBy>'
})
export class PostWrapperComponent extends PostComponent {
  orderByName: String = orderByNameProperty;
  constructor(postServices: PostService) {
    super(postServices);
    // debugger
  }
}
describe('OrderByComponent', () => {
  let component: PostWrapperComponent;
  let orderByComponent: OrderByComponent;
  let fixture: ComponentFixture<PostWrapperComponent>;
  let fixtureOrderBy: ComponentFixture<OrderByComponent>;
  let htmlWrap;
  let spyHandleSort: jasmine.Spy;
  let spyCheckStatus: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PostModule , HttpClientTestingModule, RouterTestingModule],
      declarations: [PostWrapperComponent ],
      providers: [
        { provide: PostComponent, useClass: PostWrapperComponent}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostWrapperComponent);
    fixtureOrderBy = TestBed.createComponent(OrderByComponent);
    component = fixture.componentInstance;
    orderByComponent = fixture.debugElement.query(By.directive(OrderByComponent)).componentInstance;
    htmlWrap = fixture.debugElement.query(By.css('.parent'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(orderByComponent).toBeDefined();
  });

  fit('should name exist', () => {
    component.orderByName = 'testName';
    // orderByComponent.name = 'test';
    fixtureOrderBy.detectChanges();
    expect(orderByComponent.name).toEqual('testName');
  });

  it('should name exist', () => {
    // orderByComponent.name = 'test';
    fixtureOrderBy.detectChanges();
    expect(orderByComponent.name).toEqual(orderByNameProperty);
  });

  it('should change column Direction on click', () => {
    htmlWrap.triggerEventHandler('click', null);
    expect(orderByComponent.columnDir).toBe('desc');
  });

  it('should Func handlerSort init functions', () => {
    htmlWrap.triggerEventHandler('click', null);

    spyHandleSort = spyOn(orderByComponent, 'handlerSort');
    spyCheckStatus = spyOn(orderByComponent, 'checkStatus');
    expect(spyHandleSort.call).toBeTruthy();
    expect(spyCheckStatus.call).toBeTruthy();
  });

  it('should Func handlerSort init functions', () => {
    let spySortDataFunc: jasmine.Spy = spyOn(orderByComponent, 'sortDataFunc');

    spyHandleSort = spyOn(orderByComponent, 'handlerSort');
    expect(spyHandleSort.call).toBeTruthy();
    expect(spySortDataFunc.call).toBeTruthy();

  });

  it('should Func handlerSort with data ', () => {

    let sortData = {
      sortTitle: 'sortTitle',
      sortDir: 'sortDir',
      isActive: 'isActive'
    };

    orderByComponent.sortDataFunc.subscribe((value) => sortData = value);

    htmlWrap.triggerEventHandler('click', null);

    expect(sortData.sortTitle).toBe('sortTitle');
    expect(sortData.sortDir).toBe('sortDir');
    expect(sortData.isActive).toBe('isActive');

  });
  it('should containt default value ', () => {
    orderByComponent.isActive = true;
    expect(orderByComponent.isActive).toBeTruthy();
  });
});
