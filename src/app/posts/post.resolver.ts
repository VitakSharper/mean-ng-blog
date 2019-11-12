import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PostService} from './post.service';

@Injectable({providedIn: 'root'})
export class PostResolver implements Resolve<any> {
  constructor(private postService: PostService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.postService.getPostById(route.params['id']);
  }
}
