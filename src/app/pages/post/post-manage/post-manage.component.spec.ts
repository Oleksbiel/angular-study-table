import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute , Router, RouterModule } from '@angular/router';
import { PostManageComponent } from './post-manage.component';
import { PostComponent } from '../post.component';
import { TableSearchComponent } from '../table-search/table-search.component';
import { OrderByComponent } from '../../../shared/order-by/orderby.component';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule, } from '@angular/common/http/testing';
import { Subject } from 'rxjs';

class RouterStab {
  navigate(params) {
  }
}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

describe('PostManageComponent', () => {
  let component: PostManageComponent;
  let fixture: ComponentFixture<PostManageComponent>;

  beforeEach(async(() => {
    // const routerSpy = createRouterSpy();
    TestBed.configureTestingModule({
      declarations: [ PostManageComponent , PostComponent , TableSearchComponent , OrderByComponent ],
      providers: [
        PostService,
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: Router, useClass: RouterStab},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
      ],
      imports: [FormsModule, ReactiveFormsModule, RouterModule.forRoot([]), HttpClientTestingModule]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PostManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 2 controls', () => {
    expect(component.postManageControl.contains('postTitle')).toBeTruthy();
    expect(component.postManageControl.contains('postContent')).toBeTruthy();
  });

  it('should make the postTitle control required', () => {
    const control = component.postManageControl.get('postTitle');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should make the postContent control required', () => {
    const control = component.postManageControl.get('postContent');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should be edit page', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
    let spySetFormData = spyOn(component , 'setFormData');

    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({postID: 5 });
    expect(component.newPost).toBeFalsy();
    expect(component.setFormData).not.toHaveBeenCalled();
  });

  it('should init F func', () => {
    let spyF = spyOn(component , 'f');
    expect(spyF.call).toBeTruthy();
  });


});
