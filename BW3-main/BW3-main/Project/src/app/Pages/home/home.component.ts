import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/Classes/post';
import { PostService } from 'src/app/Services/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts:Post[] = []
  newPostPage: boolean = false
  sortByUpvotes: boolean = false;

  constructor(private postSvc: PostService, private router: Router) {
    this.router.events.subscribe((event) => {
      this.getPosts();
    })
  }

  ngOnInit(): void {

  }

  sortPostsByUpvotes(){
    this.sortByUpvotes = !this.sortByUpvotes
    if(this.sortByUpvotes == true){
      this.postSvc.getAllPosts()
      .subscribe(posts => {
        this.posts = posts.sort((a, b) => (a.upvotes.length - a.downvotes.length) - (b.upvotes.length - b.downvotes.length)).reverse()
      })
    }else{
      this.postSvc.getAllPosts()
      .subscribe(posts => {
        this.posts = posts.reverse()
      })
    }
  }


  getPosts() {
    this.postSvc.getAllPosts()
    .subscribe(posts => {
      if(this.sortByUpvotes == true){
        this.posts = posts.sort((a, b) => (a.upvotes.length - a.downvotes.length) - (b.upvotes.length - b.downvotes.length)).reverse()
      }else{
        this.posts = posts.reverse()
      }
    })
  }

  toggleNewPost() {
    if(
      this.newPostPage == false
    ){
      this.router.navigate([ '/home', 'new-post'])
      this.newPostPage = true

    }else{

      this.router.navigate([ '/home'])
      this.newPostPage = false
    }
  }
}





