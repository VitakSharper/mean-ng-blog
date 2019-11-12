import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostRoutingModule} from './post-routing.module';
import {PostCreateComponent} from '../post-create/post-create.component';
import {PostListComponent} from '../post-list/post-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../helpers/material/material.module';
import {PostStartComponent} from '../post-start/post-start.component';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    PostStartComponent,
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PostRoutingModule,
    FlexModule,
  ],
  exports: [
    PostStartComponent,
    PostCreateComponent,
    PostListComponent
  ]
})
export class PostModule {
}
