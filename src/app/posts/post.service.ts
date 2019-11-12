import {Injectable} from '@angular/core';
import {Post} from '../helpers/interfaces';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private observePosts = new Subject<any>();
  editMode: boolean = false;

  constructor(
    private httpClient: HttpClient
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
              title: post.title,
              content: post.content
            };
          });
        })
      )
      .subscribe(posts => {
        this.posts = posts;
        this.observePosts.next([...this.posts]);
      }, error => console.log(error));
  }

  getPostById(postId: string) {
    return this.httpClient.get<{ message: string, post: any }>(`${environment.nodeUrl}posts/${postId}`);
  }

  addPost(post: Post) {
    this.httpClient.post<{ status: number, post: any }>(`${environment.nodeUrl}posts`, post)
      .subscribe(postsData => {
        const newPost = {
          id: postsData.post._id,
          ...post
        };
        this.posts.push(newPost);
        this.observePosts.next([...this.posts]);
      }, error => console.log(error));
  }

  deletePostDb(id: string) {
    this.httpClient.delete(`${environment.nodeUrl}posts/${id}`)
      .subscribe(() => {
        this.posts = this.posts.filter(p => p.id !== id);
        this.observePosts.next([...this.posts]);
      }, error => console.log(error));
  }

  updatePost(editedPost: any, postId) {
    this.httpClient.patch(`${environment.nodeUrl}posts/${postId}`, editedPost)
      .subscribe(data => {
      }, error => console.log(error));
  }
}
