import {Component, OnInit} from '@angular/core';
import {PostService} from '../../posts/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  ngOnInit() {
  }

  onAdd() {
    this.postService.editMode = false;
  }
}
