import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/Classes/post';
import { User } from 'src/app/Classes/user';
import { AuthService } from 'src/app/Services/auth.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';

import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public isCollapsed = true;

  @Input() posts!: Post[];
  users: User[] = [];
  userId = this.auth.getLoggedUser().id;

  constructor(
    private userSvc: UserService,
    private postSvc: PostService,
    private modalService: NgbModal,
    private auth: AuthService
  ) {  }

  ngOnInit(): void {
    this.getUsers()
  }

  getTimeFromNow(date:Date):any{
    return moment(date).fromNow()
  }

  getAvatar(users: User[], post: Post): string | undefined {
    if (users && post) {
      return users.find(user => user.id == post.ownerId)?.avatar
    }
    return ''
  }

  getSlug(users: User[], post: Post): string | undefined {
    if (users && post) {
      return users.find(user => user.id == post.ownerId)?.slug
    }
    return ''
  }


  getUsers(): void {
    this.userSvc.getAllUsers()
      .subscribe(users => {
        this.users = users;
      })
  }

  checkIfUserCan(post: Post):boolean{
    return post.ownerId == this.auth.getLoggedUser().id
  }

  editPost(post: Post){
    post.isEditing = true;
  }

  cancelEdit(post: Post){
    post.isEditing = false;
    post.editingValue = [post.title, post.content]
  }

  submitEdit(post:Post){
    post.title = post.editingValue[0];
    post.content = post.editingValue[1]
    post.edited = true;
    post.isEditing = false;
    this.postSvc.editPost(post, post.id).subscribe(() => {})
  }


  deleteMyPost(post: Post) {

    this.postSvc.deletePost(post)
      .subscribe(() => {
        let index = this.posts.findIndex(p => p.id === post.id)
        this.posts.splice(index, 1)
      })

  }

  openVerticallyCentered(content: any, post: Post) {
    if (this.auth.getLoggedUser().id == post.ownerId) {
      this.modalService.open(content, { centered: true })
    } else {
      alert('You can t delete other users post')
    }
  }

  upvote(post:Post){
    if(post.upvotes.includes(this.userId)){
      // se trovo id su array up tolgo id
      let index = post.upvotes.findIndex(u => u == this.userId)
      post.upvotes.splice(index, 1)
      this.postSvc.editPost(post, post.id).subscribe(()=>{});
    }else{
      // non torvo id user su up[]
      if(post.downvotes.includes(this.userId)){
        // se trovo su down, tolgo da down e aggiungo su up
        let index = post.downvotes.findIndex(u => u == this.userId)
        post.downvotes.splice(index, 1)
        post.upvotes.push(this.userId)
        this.postSvc.editPost(post, post.id).subscribe(()=>{});

      }else{
        // non e' ne su up ne su down, aggiungo su up
        post.upvotes.push(this.userId)
        this.postSvc.editPost(post, post.id).subscribe(()=>{});

      }
    }
  }

  downvote(post:Post){

    if(post.downvotes.includes(this.userId)){
      let index = post.downvotes.findIndex(u => u == this.userId)
      post.downvotes.splice(index, 1)
      this.postSvc.editPost(post, post.id).subscribe(()=>{});
    }else{
      if(post.upvotes.includes(this.userId)){
        let index = post.upvotes.findIndex(u => u == this.userId)
        post.upvotes.splice(index, 1)
        post.downvotes.push(this.userId)
        this.postSvc.editPost(post, post.id).subscribe(()=>{});
      }else{
        post.downvotes.push(this.userId)
        this.postSvc.editPost(post, post.id).subscribe(()=>{});
      }
    }
  }


}
