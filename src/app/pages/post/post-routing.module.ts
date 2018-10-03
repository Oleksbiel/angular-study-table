import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostNewComponent } from './post-new/post-new.component';

import {  PostComponent} from './post.component';


const routes: Routes = [
    { path: "", component: PostComponent},
    {path: 'new' , component:  PostNewComponent},
    {path: ':postID' , component:  PostEditComponent},

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class PostRoutingModule { }
