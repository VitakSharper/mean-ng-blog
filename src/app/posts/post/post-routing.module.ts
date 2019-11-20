import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostListComponent} from '../post-list/post-list.component';
import {PostCreateComponent} from '../post-create/post-create.component';
import {PostStartComponent} from '../post-start/post-start.component';
import {PostResolver} from '../post.resolver';
import {PostGuard} from './post.guard';


const routes: Routes = [
  {
    path: '', component: PostStartComponent, children: [
      {path: 'posts', component: PostListComponent},
      {path: 'create', component: PostCreateComponent, canActivate: [PostGuard]},
      {path: 'edit/:id', component: PostCreateComponent, resolve: {post: PostResolver}, canActivate: [PostGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PostGuard]
})
export class PostRoutingModule {
}
