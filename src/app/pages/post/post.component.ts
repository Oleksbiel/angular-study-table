import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public posts;
  public searchText: string;
  public sortedPosts;
  public postSearchID: FormControl = new FormControl();
  public postSearchTitlte: FormControl = new FormControl();
  public postSearchContent: FormControl = new FormControl();

  constructor(private _postServices: PostService) { }

  ngOnInit() {
    this.getAll();
    this.postSearchID.valueChanges.subscribe((value) => {
      this.sortTableById(value);
    });

    this.postSearchTitlte.valueChanges.subscribe((value) => {
      this.sortTableByTitle(value);

    });
    // this.postSearchID.valueChanges.subscribe((value) => {
    //   this.sortTableById(value);
    // });

  }

  public getAll() {
    this.sortedPosts = this._postServices.getAll();
    this.posts = this.sortedPosts;
  }

  public postDelete(post: number) {
    console.log(this.postSearchID);
    this._postServices.postDelete(post);
    this.getAll();
  }

  public sortTableById(value: number) {
    if ( !value ) {
      this.sortedPosts = this.posts;
      return false;
    }

    this.sortedPosts = this.posts.filter(post => +post.id === +value );
  }

  public sortTableByTitle(value: string) {
    if ( !value.length ) {
      this.sortedPosts = this.posts;
      return false;
    }
    this.sortedPosts = this.posts.filter(post => post.title.includes(value));
  }


}
