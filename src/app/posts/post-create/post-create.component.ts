import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  editedPost: any = null;
  editMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public postService: PostService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.createPostForm();
    this.onEdit();
  }

  private onEdit() {
    this.router.data.subscribe(data => {
      if (data.post) {
        this.editMode = true;
        this.editedPost = data.post.post;
        this.postForm.get('title').setValue(data.post.post.title);
        this.postForm.get('content').setValue(data.post.post.content);
      } else {
        this.editMode = false;
      }
    });
  }

  private createPostForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      content: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.isLoading = true;
      if (this.editMode) {
        this.postService.updatePost({
          title: this.postForm.get('title').value,
          content: this.postForm.get('content').value
        }, this.editedPost._id);
        this.isLoading = false;
      } else {
        this.postService.addPost(this.postForm.value);
        this.isLoading = false;
        this.postForm.reset();
      }
    }
  }
}
