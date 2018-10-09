import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.css']
})
export class PostManageComponent implements OnInit {

  public editablePostData;
  public newPost: Boolean = false;
  public postManageControl: FormGroup;
  public submitted: Boolean = false;
  public postData: TPost;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _postServices: PostService
  ) {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('postID')){
        this.getPost(params.postID);
      } else {
        this.newPost = true;
      }
    });
   }

  ngOnInit() {
    this.postManageControl = new FormGroup({
      postTitle: new FormControl('', [ Validators.required, Validators.minLength(2)]),
      postContent: new FormControl('', [ Validators.required, Validators.minLength(2)])
    });
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

      this._postServices.addPost(this.postData).subscribe(post =>{
        console.log('NewPost created');
      });
      /// когда создается новый пост потом переходит на страницу posts , но дата там старая и нужно ее обновить какой то тригер , как лучше сделать тригер , тут пост создался и сделать еше раз getPosts в компоненте post.component
      this.router.navigate(['posts']);
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
      console.log("Post edited.");
    });
    /// когда создается новый пост потом переходит на страницу posts , но дата там старая и нужно ее обновить какой то тригер , как лучше сделать тригер , тут пост создался и сделать еше раз getPosts в компоненте post.component

    this.router.navigate(['posts']);

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
    })
  }

  public uniqID () {

		let date = new Date();
		let timestamp = date.getTime();
    return timestamp;

  }


}
