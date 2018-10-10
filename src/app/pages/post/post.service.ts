import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, filter } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = 'http://localhost:3000/posts';
  public posts: Array<TPost>;

  constructor(private _http: HttpClient) {}

  public getAll(): Observable<any> {
    return this._http.get(this.postsUrl);
  }

  public getPost(postID: number) {
    const url = `${this.postsUrl}/${postID}`;
    return this._http.get(url);
  }
  public editPost( post:TPost ) {
    const url = `${this.postsUrl}/${post.id}`;
    return this._http.patch<TPost>(url, post, httpOptions);
  }


  public deletePost (postID: number): Observable<TPost> {
    const url = `${this.postsUrl}/${postID}`;
    return this._http.delete<TPost>(url, httpOptions);
  }

  public addPost (post: TPost): Observable<TPost> {
    return this._http.post<TPost>(this.postsUrl, post, httpOptions);
  }

  public filterPosts (searchField)  {
    return this.getAll().pipe(map(posts => {
      return posts.filter(post => post.title.includes(searchField) || post.body.includes(searchField));
    }));
  }

  public sortTable (sortBy: String, dir) {
    return this.getAll().pipe(map(posts => {
      if ( dir === 'asc' ) {
        return posts.sort((a , b) => a.id - b.id);
      } else {
        return posts.sort((a , b) => b.id - a.id);
      }
    }));
  }


}
