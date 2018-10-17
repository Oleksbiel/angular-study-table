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
  // getObservableValue(): any {
  //   throw new Error("Method not implemented.");
  // }

  public postsUrl = 'http://localhost:3000/posts';
  public posts: Array<TPost>;

  constructor(private _http: HttpClient) {
  }

  public getAll(): Observable<any> {
    return this._http.get(this.postsUrl);
  }

  public getPost(postID: number) {
    const url = `${this.postsUrl}/${postID}`;
    return this._http.get(url);
  }

  public deletePost (postID: number): Observable<number> {
    const url = `${this.postsUrl}/${postID}`;
    return this._http.delete<number>(url, httpOptions);
  }

  public managePost(post: TPost , newPostBool): Observable<TPost> {
    if ( newPostBool ) {
      return this._http.post<TPost>(this.postsUrl, post, httpOptions);
    } else {
      const url = `${this.postsUrl}/${post.id}`;
      return this._http.patch<TPost>(url, post, httpOptions);
    }
  }

  public searchSortPosts(filterData): Observable<any> {
    const baseUrl = this.postsUrl + '?';
    const SearchUrl = `&q=${filterData.searchTitle}`;
    // tslint:disable-next-line:max-line-length
    const SortUrl = `&_sort=${typeof filterData.sort === 'undefined' ? '' : filterData.sort.sortTitle}&_order=${typeof filterData.sort === 'undefined' ? '' : filterData.sort.sortDir}`;
    // tslint:disable-next-line:max-line-length
    const totalUrl = baseUrl + (typeof filterData.searchTitle === 'undefined' ? '' : SearchUrl) +  (typeof filterData.sort === 'undefined' ? '' : SortUrl);
    return this._http.get(totalUrl);
  }
}
