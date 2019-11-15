import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';
import {PostsValidators} from '../posts.validators';

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
  imgPreview: string = null;

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

  private createPostForm() {
    this.postForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(6)]],
      content: [null, [Validators.required, Validators.minLength(6)]],
      image: [null, [Validators.required], [PostsValidators.mimeType]]
    });
  }

  private onEdit() {
    this.router.data.subscribe(data => {
      if (data.post) {
        this.editMode = true;
        this.editedPost = data.post.post;
        this.postForm.patchValue({
          'title': data.post.post.title,
          'content': data.post.post.content
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.isLoading = true;
      if (this.editMode) {
        this.postService.updatePost({
          title: this.postForm.get('title').value,
          content: this.postForm.get('content').value,
          updatedAt: Date.now()
        }, this.editedPost._id);
        this.isLoading = false;
      } else {
        this.postService.addPost(this.postForm.value);
        this.postForm.reset();
      }
    }
  }

  onImgPicked($event: Event) {
    const image = ($event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image});
    this.postForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    };
    reader.readAsDataURL(image);

  }
}
