import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-manage',
  templateUrl: './post-manage.component.html',
  styleUrls: ['./post-manage.component.css']
})
export class PostManageComponent implements OnInit {

  public postID: number;
  public newUser: Boolean = false;
  public postManageControl: FormGroup;
  public submitted: Boolean = false;
  public newPost: Array<TPost>;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('postID')){
        this.postID = params.postID;
      } else {
        this.newUser = true;
      }
    });
   }

  ngOnInit() {
    this.postManageControl = new FormGroup({
      postId: new FormControl(),
      postTitle: new FormControl(),
      postContent: new FormControl()
    });
  }

  get f() { return this.postManageControl.controls; }

  public postSave() {

  this.submitted = true;

  // stop here if form is invalid
  if (this.postManageControl.invalid) {
      return;
  }



    this.newPost = {
      id: this.uniqID(),
      title: this.postManageControl.value.postTitle,
      body: this.postManageControl.value.postContent
    };

    // this._postServices.postAdd(this.post);
    this.router.navigate(['posts']);
  }

  public uniqID () {

		let date = new Date();
		let timestamp = date.getTime();
    return timestamp;

  }


}
