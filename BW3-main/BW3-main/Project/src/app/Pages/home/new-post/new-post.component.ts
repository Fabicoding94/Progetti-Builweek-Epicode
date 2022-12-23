import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from 'src/app/Classes/post';
import { AuthService } from 'src/app/Services/auth.service';
import { PostService } from 'src/app/Services/post.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postform!: FormGroup
  formIsValid!: boolean


  constructor(
    private postSvc: PostService,
    private auth: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.postform = new FormGroup({
      postTitle: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      postContent: new FormControl(null, Validators.required),
    })

  }

  submit(){
    if(this.postform.valid){

      this.postSvc.addPost(
        new Post(
          this.auth.getLoggedUser().id,
          this.auth.getLoggedUser().username,
          this.postform.value.postTitle,
          this.postform.value.postContent,
          ))
      .subscribe(res => {
       this.router.navigate(['/home']);
      })

    }else{
      this.formIsValid = false;

    }
  }




}
