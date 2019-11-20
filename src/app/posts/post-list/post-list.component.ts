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
  private isAuthSub: Subscription;
  isLoading = false;
  isAuth = false;

  totalPosts = 0;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 20];
  pageIndex = 1;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isAuth = !!this.authService.getToken();
    this.isAuthSub = this.authService.getIsAuth()
      .subscribe((data) => {
        this.isAuth = data.isAuth;
      }, error => console.log(error));

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
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.isAuthSub.unsubscribe();
  }
}
