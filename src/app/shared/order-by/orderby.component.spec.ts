import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { OrderByComponent } from './orderby.component';
import { PostComponent } from '../../pages/post/post.component';
import { TableSearchComponent } from '../../pages/post/table-search/table-search.component';
import { PostRoutingModule } from '../../pages/post/post-routing.module';
import { PostManageComponent } from '../../pages/post/post-manage/post-manage.component';
import { PostService } from '../../pages/post/post.service';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_BASE_HREF } from '@angular/common';

describe('OrderByComponent', () => {
  let component: OrderByComponent;
  let fixture: ComponentFixture<OrderByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PostRoutingModule , RouterModule.forRoot([]), HttpClientTestingModule],
      declarations: [PostManageComponent , PostComponent , TableSearchComponent , OrderByComponent ],
      providers: [PostService, {provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeDefined();
  // });

  // it('should name exist', () => {
  //   const testString = 'some string';
  //   expect(testString).toEqual(jasmine.any(String));
  // });

});
