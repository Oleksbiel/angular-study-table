import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public posts: Array<TPost>;
  public sortedPosts: Array<TPost>;

  public isActiveID: Boolean = false;
  public isActiveTitle: Boolean = false;
  public isActiveContent: Boolean = false;

  public orderSortID: String =  'desc';
  public orderSortTitle: String = 'desc';
  public orderSortContent: String = 'desc';

  constructor(private _postServices: PostService) { }

  ngOnInit() {

    this.getAll();

  }

  public getAll() {
    this._postServices.getAll().subscribe(posts => this.posts = posts);
  }

  public postDelete(postID: number) {
    this._postServices.deletePost(postID).subscribe(post => this.getAll());
  }

  public tableSearch(searchTitle) {
    this._postServices.filterPosts(searchTitle).subscribe(posts => {
      this.posts = posts;
    });
  }
  public sortTableByID() {
    this.isActiveID = true;
    this._postServices.sortTable('id' , this.orderSortID ).subscribe(sortedPosts => this.posts = sortedPosts);
    this.orderSortID = this.orderSortID === 'asc' ? 'desc' :  'asc';
    this.isActiveTitle = false;
    this.isActiveContent = false;
  }
}

