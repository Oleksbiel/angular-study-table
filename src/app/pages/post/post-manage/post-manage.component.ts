import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { AppComponent } from '../../../app.component';
import { Subscriber, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.css']
})
export class PostManageComponent implements OnInit, OnDestroy {


  public editablePostData;
  public newPost: Boolean = false;
  public postManageControl: FormGroup;
  public submitted: Boolean = false;
  public postData: TPost;
  private destroySubject: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _postServices: PostService,
  ) {
    this.route.params.pipe(takeUntil(this.destroySubject)).subscribe(params => {
      if (params.hasOwnProperty('postID')) {
        this.getPost(params.postID);
      } else {
        this.newPost = true;
      }
    });

   }

   private  uniqID () {
    return new Date().getTime();
  }

  ngOnInit() {
    this.postManageControl = new FormGroup({
      postTitle: new FormControl('', [ Validators.required, Validators.minLength(2)]),
      postContent: new FormControl('', [ Validators.required, Validators.minLength(2)])
    });
  }
  ngOnDestroy(): void {
    this.destroySubject.next();

  }



  get f() { return this.postManageControl.controls; }

  public postSave() {

    this.submitted = true;

    if (this.postManageControl.invalid) {
        return;
    }

    this.postData = {
      userId: this.uniqID(),
      id: this.uniqID(),
      title: this.postManageControl.value.postTitle,
      body: this.postManageControl.value.postContent
    };

      this._postServices.addPost(this.postData).subscribe(post => {
        console.log('NewPost created');
        this.router.navigate(['posts']);
      });
      /// когда создается новый пост потом переходит на страницу posts , но дата там старая и нужно ее обновить какой то тригер , как лучше сделать тригер , тут пост создался и сделать еше раз getPosts в компоненте post.component
  }

  public postEdit() {

    this.submitted = true;

    if (this.postManageControl.invalid) {
        return;
    }

    this.postData = {
      userId: this.editablePostData.userId,
      id: this.editablePostData.id,
      title: this.postManageControl.value.postTitle,
      body: this.postManageControl.value.postContent
    };

    this._postServices.editPost(this.postData).subscribe(post => {
      console.log('Post edited.');
      this.router.navigate(['posts']);
    });
    /// когда создается новый пост потом переходит на страницу posts , но дата там старая и нужно ее обновить какой то тригер , как лучше сделать тригер , тут пост создался и сделать еше раз getPosts в компоненте post.component


  }

  public getPost(postID: number) {
    this._postServices.getPost(postID).subscribe(post => {
      this.editablePostData = post;
      this.setFormData(post);
    });
  }

  public setFormData(post) {
    this.postManageControl.setValue({
      postTitle: post.title,
      postContent: post.body,
    });
  }



}
