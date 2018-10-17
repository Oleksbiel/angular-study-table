import { PostManageComponent } from './post-manage/post-manage.component';
import {  PostComponent} from './post.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: "", component: PostComponent},
    {path: 'new' , component:  PostManageComponent},
    {path: ':postID' , component:  PostManageComponent},
];

