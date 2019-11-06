import {Injectable, OnInit} from '@angular/core';
import {Post} from '../helpers/interfaces';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private observePosts = new Subject<any>();

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getPosts() {
    this.httpClient.get<{ message: string, posts: Post[] }>(`${environment.nodeUrl}api/posts`).subscribe(data => {
      this.posts = data.posts;
      this.observePosts.next([...this.posts]);
    }, error => console.log(error));
  }

  getPostsObserver(): Observable<Post[]> {
    return this.observePosts.asObservable();
  }

  addPost(post: Post) {
    this.httpClient.post<{ message: string }>(`${environment.nodeUrl}api/posts`, post)
      .subscribe(postsData => {
        console.log(postsData);
        this.posts.push(post);
        this.observePosts.next([...this.posts]);
      }, error => console.log(error));
  }
}
