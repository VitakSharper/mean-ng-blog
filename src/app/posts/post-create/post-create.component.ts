import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';
import {PostsValidators} from '../posts.validators';
import {SnackbarService} from '../../helpers/snackbar.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  editedPost: any = null;
  editMode = false;
  isLoading = false;
  imgPreview: string = null;

  constructor(
    private fb: FormBuilder,
    public postService: PostService,
    private router: ActivatedRoute,
    private snackbar: SnackbarService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.onEdit();
  }

  private createForm() {
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
          title: data.post.post.title,
          content: data.post.post.content,
          image: data.post.post.imagePath
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.editMode) {
      this.postService.updatePost(this.postForm.value, this.editedPost._id);
      this.isLoading = false;
      this.snackbar.showSnack(`Your post ${this.postForm.get('title').value} was successful updated (●'◡'●)`, null);
    } else {
      this.postService.addPost(this.postForm.value);
      this.snackbar.showSnack(`Your post ${this.postForm.get('title').value} was successful created (●'◡'●)`, null);
      this.postForm.reset();
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
