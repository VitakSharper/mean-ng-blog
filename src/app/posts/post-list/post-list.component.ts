import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../helpers/interfaces';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;
  editMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private postService: PostService
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postsSub = this.postService.getPostsObserver()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
  }


  onDelPost(id: string) {
    this.postService.deletePostDb(id);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
