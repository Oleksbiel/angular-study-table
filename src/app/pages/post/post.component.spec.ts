import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import {PostRoutingModule  } from './post-routing.module';

import { PostComponent } from './post.component';
import { PostService } from './post.service';
import { Observable, of } from 'rxjs';

import { TableSearchComponent } from './table-search/table-search.component';
import { OrderByComponent } from '../../shared/order-by/orderby.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { PostManageComponent } from './post-manage/post-manage.component';
import { APP_BASE_HREF } from '@angular/common';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  // tslint:disable-next-line:no-shadowed-variable
  let PostService: PostService;
  let spy: jasmine.Spy;
  let posts = [{
      userId: 1,
      id: 5,
      title: 'aaaaa222',
      // tslint:disable-next-line:max-line-length
      body: 'repudiandae veniam quaerat sunt sednalias aut fugiat sit autem sed estnvoluptatem omnis possimus esse voluptatibus quisnest aut tenetur dolor neque'
    }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PostRoutingModule , RouterModule.forRoot([]), HttpClientTestingModule],
      declarations: [  PostManageComponent , PostComponent , TableSearchComponent , OrderByComponent ],
      providers: [PostService, {provide: APP_BASE_HREF, useValue : '/' }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    // PostService = fixture.debugElement.injector.get(PostService);
    // spy = spyOn(PostService, 'getAll').and.returnValue(of(posts));

    // fixture.detectChanges();
  });

  // afterEach(() => {
  //   fixture.destroy();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should call postService', () => {
  //   component.someMethod();
  //   expect(spy.calls.any()).toBeTruthy();
  // });

  // it('should set posts', () => {
  //   component.someMethod();
  //   expect(component.posts).toEqual(posts);
  // });
});
