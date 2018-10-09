import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule , ReactiveFormsModule } from '@angular/forms';



import {PostRoutingModule  } from "./post-routing.module";
import { PostComponent } from "./post.component";
import { PostManageComponent } from './post-manage/post-manage.component';
import { TableSearchComponent } from './table-search/table-search.component';
import { SortTableDirective } from '../../shared/sort-table.directive';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostComponent, 
    PostManageComponent, 
    TableSearchComponent, 
    SortTableDirective
  ]
})
export class PostModule {}
