import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';



import {routes  } from './post-routing.module';
import { PostComponent } from './post.component';
import { PostManageComponent } from './post-manage/post-manage.component';
import { TableSearchComponent } from './table-search/table-search.component';
import { OrderByComponent } from '../../shared/order-by/orderby.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PostComponent,
    PostManageComponent,
    TableSearchComponent,
    OrderByComponent
  ],
  exports: [
    OrderByComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PostModule {}
