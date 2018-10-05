import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule , ReactiveFormsModule } from '@angular/forms';



import {PostRoutingModule  } from "./post-routing.module";
import { PostComponent } from "./post.component";
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostManageComponent } from './post-manage/post-manage.component';
import { TableSearchComponent } from './table-search/table-search.component';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [PostComponent, PostEditComponent, PostNewComponent, PostManageComponent, TableSearchComponent]
})
export class PostModule {}
