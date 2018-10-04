import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { FormControl, FormGroup } from '@angular/forms';
//import { TPost } from './post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public posts: Array<TPost>;
  public sortedPosts: Array<TPost>;
  public postSearchControl: FormGroup;

  constructor(private _postServices: PostService) { }

  ngOnInit() {

    this.getAll();

    this.postSearchControl = new FormGroup({
      postId: new FormControl(),
      postTitle: new FormControl(),
      postContent: new FormControl()
    });

    this.postSearchControl.valueChanges.subscribe((values) =>{
      this.filterTable(values);
    });

  }

  public getAll() {
    this._postServices.getAll().subscribe(posts => this.posts = posts);

    // this.posts = this._postServices.getAll();
    // this.sortedPosts = JSON.parse(JSON.stringify(this.posts));
    //  this.sortedPosts = this.posts;
    // this.posts = this.sortedPosts;
  }

  public postDelete(post: number) {
    this._postServices.postDelete(post);
    this.getAll();
  }

  public filterTable(values) {
    this.sortedPosts = this.posts.filter(post =>  (values.postId ? +post.id === +values.postId : true) && (values.postTitle ? post.title.includes(values.postTitle) : true) && (values.postContent ? post.body.includes(values.postContent) : true)) ;

  }

  public sortTable(sortValue: string): void {
    console.log(sortValue);
    //this.posts.sort((a,b) =>);
  }
}

