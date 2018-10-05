import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = 'http://localhost:3000/posts/';
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
    return this._http.get(this.postsUrl);
  }

  // public postDelete(postID: number ) {
  //   return this.posts = this.posts.filter(posts => posts.id !== postID);
  // }
  // public postAdd(post: TPost) {
  //   this.posts = [...this.posts, post];
  // }

  public getPost(postID: number) {
    const url = `${this.postsUrl}/${postID}`;
    return this._http.get(url);
  }


  public deletePost (postID: number): Observable<TPost> {
    const url = `${this.postsUrl}/${postID}`;
    return this._http.delete<TPost>(url, httpOptions);
  }
  public addPost (post: TPost): Observable<TPost> {
    console.log(post);
    return this._http.post<TPost>(this.postsUrl, post, httpOptions);
  }


  //метод фильтрации внутри сервиса

}
