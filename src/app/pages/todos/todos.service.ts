import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private _httpTodos: HttpClient) { }

  public getAll(){
    return this._httpTodos.get('https://jsonplaceholder.typicode.com/todos');
  }

  public todosDelete(post: string ){
    // return this.posts = this.posts.filter(posts => posts.title !== post);
  }
  public todosAdd(post: string){
    // this.posts.push({title: post});
  }


}
