import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {Post} from '../../helpers/interfaces';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService) {
  }

  ngOnInit() {
    this.createPostForm();
  }

  private createPostForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      content: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const post: Post = {
        ...this.postForm.value,
        id: (this.postService.getPosts().length + 1).toString()
      };
      this.postService.addPost(post);
      this.postForm.reset();
    }
  }

}
