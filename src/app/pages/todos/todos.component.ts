import { Component, OnInit } from '@angular/core';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  
  public todos;

  constructor(private _todosServices: TodosService) { }

  ngOnInit() {
    this.getAll();
  }

  public getAll(){
    this._todosServices.getAll().subscribe(todos => this.todos = todos  );
  }

}
