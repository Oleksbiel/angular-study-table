import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {


  public post: TPost;

  constructor(
    private location: Location,
    private _postServices: PostService,
    private route: ActivatedRoute,
    ) { }

    ngOnInit() {
      // this.getPost();
  }

  // public getPost() {

  //   const id = +this.route.snapshot.paramMap.get('postID');
  //   this.post = this._postServices.getPost(id);
  // }

  // goBack() {
  //   //this.location.
  //   this.location.back();
  // }

}
