import {Injectable} from '@angular/core';
import {Post} from '../helpers/interfaces';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private observePosts = new Subject<any>();

  constructor() {
  }

  getPosts(): Post[] {
    return [...this.posts];
  }

  getPostsObserver(): Observable<Post[]> {
    return this.observePosts.asObservable();
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.observePosts.next([...this.posts]);
  }
}
