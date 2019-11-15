import {Injectable} from '@angular/core';
import {Post} from '../helpers/interfaces';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private observePosts = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private route: Router
  ) {
  }

  getPostsObserver(): Observable<Post[]> {
    return this.observePosts.asObservable();
  }

  getPosts() {
    this.httpClient.get<{ message: string, posts: any }>(`${environment.nodeUrl}posts`)
      .pipe(
        map((postData) => {
          return postData.posts.map(post => {
            return {
              id: post._id,
              ...post
            };
          });
        })
      )
      .subscribe(posts => {
        this.posts = posts;
        this.observePosts.next([...this.posts]);
      }, error => console.log(error));
  }

  getPostById(postId: string): Observable<any> {
    return this.httpClient.get<{ message: string, post: any }>(`${environment.nodeUrl}posts/${postId}`);
  }

  addPost(post: any) {
    this.httpClient.post<{ status: number, post: any }>(`${environment.nodeUrl}posts`, this.checkPostData(post))
      .subscribe(postsData => {
        const newPost = {
          id: postsData.post._id,
          title: post.title,
          content: post.content,
          imagePath: postsData.post.imagePath
        };
        this.posts.push(newPost);
        this.observePosts.next([...this.posts]);
        setTimeout(() => {
          this.route.navigate(['/posts']);
        }, 1000);
      }, error => console.log(error));
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

  deletePostDb(id: string) {
    this.httpClient.delete(`${environment.nodeUrl}posts/${id}`)
      .subscribe(() => {
        this.posts = this.posts.filter(p => p.id !== id);
        this.observePosts.next([...this.posts]);
      }, error => console.log(error));
  }
}
