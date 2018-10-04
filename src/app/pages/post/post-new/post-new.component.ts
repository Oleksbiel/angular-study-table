import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { TPost } from '../post';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  public post: TPost;
  public submitted: boolean = false;

  public postTitle: FormControl = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(10),
    Validators.required
  ]);
  public postContent: FormControl = new FormControl('', [
    Validators.minLength(2),
    Validators.maxLength(150),
    Validators.required
  ]);

  public postForm: FormGroup = new FormGroup({
    postTitle: this.postTitle,
    postContent: this.postContent
  });

  constructor(
    private _postServices: PostService,
    private router: Router
  ) {}

  ngOnInit() {

  }
  get f() { return this.postForm.controls; }

  public postSave() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.postForm.invalid) {
        return;
    }



    this.post = {
      id: this.uniqID(),
      title: this.postForm.value.postTitle,
      body: this.postForm.value.postContent
    };

    this._postServices.postAdd(this.post);
    this.router.navigate(['post'])
  }

  public uniqID () {
		let date = new Date();
		let timestamp = date.getTime();
    return timestamp;

	}

}
