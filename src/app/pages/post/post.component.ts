import { Component, OnInit, EventEmitter } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // someMethod(): any {
  //   throw new Error("Method not implemented.");
  // }

  public posts: Array<TPost>;
  public orderChange: EventEmitter<any> = new EventEmitter();

  public sortedFieldData: Array<TPost>;
  public searchTitle: String;


  private manipulateData(searchTitle , sortedPostObj) {
    const manipPosts = {
      searchTitle: searchTitle,
      sort: sortedPostObj
    };
    this._postServices.searchSortPosts(manipPosts).subscribe(posts => this.posts = posts);
  }



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
  public searchReset () {
    this.getAll();
    this.searchTitle = undefined;
  }

  public tableSearch(searchTitle) {
    this.searchTitle = searchTitle;
    this.manipulateData(searchTitle, this.sortedFieldData);
  }
  public sortData(sortfieldData) {
    this.sortedFieldData = sortfieldData;
    this.manipulateData(this.searchTitle, sortfieldData);
    this.orderChange.next(sortfieldData);
  }
}

