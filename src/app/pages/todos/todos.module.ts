import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {TodosRoutingModule  } from "./todos-routing.module";
import { TodosComponent } from "./todos.component";

@NgModule({
  imports: [CommonModule, TodosRoutingModule],
  declarations: [TodosComponent]
})
export class TodosModule {}
