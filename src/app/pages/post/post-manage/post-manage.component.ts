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

  public postData: TPost;
  public newUser: Boolean = false;
  public postManageControl: FormGroup;
  public submitted: Boolean = false;
  public newPost: TPost;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _postServices: PostService
  ) {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('postID')){
        this.getPost(params.postID);
      } else {
        this.newUser = true;
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



    this.newPost = {
      userId: this.uniqID(),
      id: this.uniqID(),
      title: this.postManageControl.value.postTitle,
      body: this.postManageControl.value.postContent
    };

      this._postServices.addPost(this.newPost);
      this.router.navigate(['posts']);
  }

  public getPost(postID: number) {
    this._postServices.getPost(postID).subscribe(post => this.postData = post);
  }

  public uniqID () {

		let date = new Date();
		let timestamp = date.getTime();
    return timestamp;

  }


}
