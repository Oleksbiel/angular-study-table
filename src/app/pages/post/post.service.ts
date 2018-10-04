import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class PostService {

  public posts: Array<TPost>;

  constructor(private _http: HttpClient) {

    //setTimeout(() => {
      // this.posts = Posts;
    //}, 500);
  }

  //Емулируем http  через observable обьект
  // public getAll(): Array<TPost> {

  //   return this.posts;
  // }

  public getAll(): Observable<any> {
    return this._http.get('https://jsonplaceholder.typicode.com/posts');
  }

  public postDelete(postID: number ) {
    return this.posts = this.posts.filter(posts => posts.id !== postID);
  }
  public postAdd(post: TPost) {
    this.posts = [...this.posts, post];
  }

  public getPost(postID: number) {
    return this.posts.find(posts => posts.id === postID);
  }
  //метод фильтрации внутри сервиса

}
