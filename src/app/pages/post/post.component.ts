import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public posts: Array<TPost>;
  public orderChange: EventEmitter<any> = new EventEmitter();

  public sortedFieldData: Array<TPost>;
  public searchTitle: String;

  constructor(private _postServices: PostService) {}

  ngOnInit() {

    this.getAll();

  }

  public getAll() {
    this._postServices.getAll().subscribe(posts => this.posts = posts);
  }

  public postDelete(postID: number) {
    this._postServices.deletePost(postID).subscribe(post => this.getAll());
  }
  public manipulateData(searchTitle , sortedPostObj) {
    const manipPosts = {
      searchTitle: searchTitle,
      sort: sortedPostObj
    };
    this._postServices.searchSortPosts(manipPosts).subscribe(posts => this.posts = posts);
  }
  public searchReset () {
    this.getAll();
    this.searchTitle = undefined;
  }

  public tableSearch(searchTitle) {
    this.searchTitle = searchTitle;
    this.manipulateData(searchTitle, this.sortedFieldData);
    // this._postServices.filterPosts(searchTitle).subscribe(posts => {
    //   this.posts = posts;
    // });
  }
  public sortData(sortfieldData) {
    this.sortedFieldData = sortfieldData;
    this.manipulateData(this.searchTitle, sortfieldData);

    // this._postServices.sortPosts(sortfieldData).subscribe(posts => this.posts = posts);
    this.orderChange.next(sortfieldData);
  }
}

