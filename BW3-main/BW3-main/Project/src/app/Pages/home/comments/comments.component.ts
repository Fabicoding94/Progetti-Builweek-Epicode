import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostComment } from 'src/app/Classes/comment';
import { Post } from 'src/app/Classes/post';
import { AuthService } from 'src/app/Services/auth.service';
import { CommentService } from 'src/app/Services/comment.service';

import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() postId!:number
  comments: PostComment[] = []
  form!: FormGroup;
  formIsValid!: boolean
  userId:number = this.authSvc.getLoggedUser().id;

  constructor(
    private commentSvc:CommentService,
    private authSvc:AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.commentSvc.getCommentByPost(this.postId).subscribe(
      res => {
        this.comments = res
    })
    this.form = new FormGroup({
      content: new FormControl(null, Validators.required)
    })
  }

  getTimeFromNow(date:Date):any{
    return moment(date).fromNow()
  }

  getPostComments() {
    this.commentSvc.getCommentByPost(this.postId).subscribe(
      res => console.log(res)
    )
  }

  canEditComment(comment:PostComment):boolean {
    return this.authSvc.getLoggedUser().id == comment.ownerId ? true : false
  }

  changeComment(comment: PostComment): void {
    if(comment.isEditing) {
      comment.isEditing = false
      comment.edited = true;
      this.commentSvc.editComment(comment)
      .subscribe(() => {})
    } else {
      comment.isEditing = !comment.isEditing
    }
  }

  cancelEdit(comment: PostComment): void {
    comment.isEditing = false;
    this.commentSvc.getCommentById(comment.id).subscribe((com) => {
      comment.content = com.content;
    })

  }

  postComment() {
    if(this.form.valid) {
      this.commentSvc.addComment(new PostComment(
        this.postId,
         this.authSvc.getLoggedUser().id,
         this.authSvc.getLoggedUser().username,
         this.form.value.content
      ))
      .subscribe((res) => {
        this.comments.push(res)
        this.form.reset()
      })
    }
  }

  // MODAL METHODS
  openVerticallyCentered(content:any, comment:PostComment) {

    this.modalService.open(content, { centered: true })

  }

  deleteMyComment(comment:PostComment){
    this.commentSvc.deleteComment(comment)
    .subscribe(() => {
      let index = this.comments.findIndex(c => c.id == comment.id);
      this.comments.splice(index, 1)
    })
  }

  upvote(comment:PostComment){
    if(comment.upvotes.includes(this.userId)){
      // se trovo id su array up tolgo id
      let index = comment.upvotes.findIndex(u => u == this.userId)
      comment.upvotes.splice(index, 1)
      this.commentSvc.editComment(comment).subscribe(()=>{});
    }else{
      // non torvo id user su up[]
      if(comment.downvotes.includes(this.userId)){
        // se trovo su down, tolgo da down e aggiungo su up
        let index = comment.downvotes.findIndex(u => u == this.userId)
        comment.downvotes.splice(index, 1)
        comment.upvotes.push(this.userId)
        this.commentSvc.editComment(comment).subscribe(()=>{});

      }else{
        // non e' ne su up ne su down, aggiungo su up
        comment.upvotes.push(this.userId)
        this.commentSvc.editComment(comment).subscribe(()=>{});

      }
    }
  }

  downvote(comment:PostComment){

    if(comment.downvotes.includes(this.userId)){
      let index = comment.downvotes.findIndex(u => u == this.userId)
      comment.downvotes.splice(index, 1)
      this.commentSvc.editComment(comment).subscribe(()=>{});
    }else{
      if(comment.upvotes.includes(this.userId)){
        let index = comment.upvotes.findIndex(u => u == this.userId)
        comment.upvotes.splice(index, 1)
        comment.downvotes.push(this.userId)
        this.commentSvc.editComment(comment).subscribe(()=>{});
      }else{
        comment.downvotes.push(this.userId)
        this.commentSvc.editComment(comment).subscribe(()=>{});
      }
    }
  }


}
