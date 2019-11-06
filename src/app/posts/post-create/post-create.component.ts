import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {Post} from '../../helpers/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService) {
  }

  ngOnInit() {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostsObserver()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
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
        id: (this.posts.length + 1).toString()
      };
      this.postService.addPost(post);
      this.postForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
