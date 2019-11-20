import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../helpers/interfaces';
import {PostService} from '../post.service';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';
import {AuthService} from '../../auth/auth.service';

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

  totalPosts: number = 0;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 20];
  pageIndex = 1;

  constructor(
    private postService: PostService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getPosts();
    this.postsSub = this.postService.getPostsObserver()
      .subscribe((postsData: { posts: any, maxPosts: number }) => {
        this.posts = postsData.posts;
        this.totalPosts = postsData.maxPosts;
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  getPosts() {
    this.postService.getPosts(this.pageIndex, this.postsPerPage);
  }

  onDelPost(id: string) {
    this.postService.deletePostDb(id).subscribe(() => {
      this.getPosts();
    });
  }

  onChangePage($event: PageEvent) {
    this.isLoading = true;
    this.pageIndex = $event.pageIndex + 1;
    this.postsPerPage = $event.pageSize;
    this.getPosts();
    //this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
