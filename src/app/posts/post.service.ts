import {Injectable} from '@angular/core';
import {Post} from '../helpers/interfaces';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SnackbarService} from '../helpers/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private observePosts = new Subject<{ posts: any, maxPosts: number }>();

  constructor(
    private httpClient: HttpClient,
    private route: Router,
    private snackbar: SnackbarService
  ) {
  }

  getPostsObserver(): Observable<{ posts: any, maxPosts?: number }> {
    return this.observePosts.asObservable();
  }

  getPosts(page: number, limit: number) {
    this.httpClient.get<{ results: number, posts: any }>(
      `${environment.nodeUrl}posts/?page=${page}&limit=${limit}`)
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map(post => {
              return {
                id: post._id,
                ...post
              };
            }), maxPosts: postData.results
          };
        })
      )
      .subscribe(posts => {
        this.posts = posts.posts;
        this.observePosts.next({posts: [...this.posts], maxPosts: posts.maxPosts});
      }, error => console.log(error));
  }

  getPostById(postId: string): Observable<any> {
    return this.httpClient.get<{ message: string, post: any }>(`${environment.nodeUrl}posts/${postId}`);
  }

  addPost(post: any) {
    this.httpClient.post<{ status: number, post: any }>(`${environment.nodeUrl}posts`, this.checkPostData(post))
      .subscribe(() => {
        this.route.navigate(['/posts']);
      }, error => this.snackbar.showSnack(error.error.message, null));
  }

  updatePost(editedPost: any, postId) {
    this.httpClient.patch(`${environment.nodeUrl}posts/${postId}`, this.checkPostData(editedPost, postId))
      .subscribe(data => {
      }, error => console.log(error));
  }

  checkPostData(post: any, postId?: string): FormData | string {
    let postData: any | FormData;

    if (typeof post.image === 'object') {
      postData = new FormData();
      postData.append('title', post.title);
      postData.append('content', post.content);
      postData.append('image', post.image, post.title);
    } else {
      postData = {
        id: postId,
        ...post
      };
    }
    return postData;
  }

  deletePostDb(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.nodeUrl}posts/${id}`);
  }
}
