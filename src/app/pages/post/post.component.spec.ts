import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostComponent } from './post.component';
import { PostService } from './post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostModule } from './post.module';
import { By } from '@angular/platform-browser';
import { TableSearchComponent } from './table-search/table-search.component';
import { OrderByComponent } from '../../shared/order-by/orderby.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  // tslint:disable-next-line:no-shadowed-variable
  let PostService: PostService;
  let spy: jasmine.Spy;
  let de;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PostModule, HttpClientTestingModule, RouterTestingModule],

      declarations: [  ],
      providers: []

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll', () => {
    let getAllSpy = spyOn(component, 'getAll');
    expect(getAllSpy.call).toBeTruthy();
  });

  it('should be called  searchReset ', () => {
    spyOn(component, 'searchReset');
    const childDir = de.query(By.directive(TableSearchComponent));
    const cmp = childDir.componentInstance;
    cmp.handlerReset.emit();
    expect(component.searchReset).toHaveBeenCalled();
    expect(component.searchTitle).toBeUndefined();
  });

  it('should be called  sortDataFunc with data', () => {
    spyOn(component, 'sortData');
    const childDir = de.query(By.directive(OrderByComponent));
    const cmp = childDir.componentInstance;
    cmp.sortDataFunc.emit(1);
    expect(component.sortData).toHaveBeenCalledWith(1);
  });

  it('should be called  tableSearch with data', () => {
    spyOn(component, 'tableSearch');
    const childDir = de.query(By.directive(TableSearchComponent));
    const cmp = childDir.componentInstance;
    cmp.searchValue.emit('test');
    expect(component.tableSearch).toHaveBeenCalledWith('test');
  });
});
