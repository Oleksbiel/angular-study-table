import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from './post.service';
import { OrderByComponent } from '../../shared/order-by/orderby.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  public posts: Array<TPost>;
  public sortedPosts: Array<TPost>;

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

  public tableSearch(searchTitle) {
    this._postServices.filterPosts(searchTitle).subscribe(posts =>{
      this.posts = posts;
    });
  } 


  public sortData(sortfieldData) {
    // this._postServices.sortPosts(e).subscribe(posts => this.posts = posts);
    // console.log(sortfieldData);
    const sortedPosts = [...this.posts];

    sortedPosts.sort((a,b) => {

      let sortTitle = sortfieldData.sortTitle;

      if(sortfieldData.sortDir === 'asc'){
          if(a[sortTitle] < b[sortTitle]) return -1;
          if(a[sortTitle] > b[sortTitle]) return 1;
          return 0;
      } else {
          if(a[sortTitle] > b[sortTitle]) return -1;
          if(a[sortTitle] < b[sortTitle]) return 1;
          return 0;
      }
    });

    this.posts = sortedPosts;

  }
}

