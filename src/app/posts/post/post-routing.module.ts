import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostListComponent} from '../post-list/post-list.component';
import {PostCreateComponent} from '../post-create/post-create.component';
import {PostStartComponent} from '../post-start/post-start.component';


const routes: Routes = [
  {
    path: '', component: PostStartComponent, children: [
      {path: 'posts', component: PostListComponent},
      {path: 'create', component: PostCreateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
