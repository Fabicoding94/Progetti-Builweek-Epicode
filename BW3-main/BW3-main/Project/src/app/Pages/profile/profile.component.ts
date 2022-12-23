import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/Classes/post';
import { User } from 'src/app/Classes/user';
import { AuthService } from 'src/app/Services/auth.service';
import { PostService } from 'src/app/Services/post.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:User = new User('', '', '', '', '', '')
  posts:Post[] = [];

  editing:boolean = false;
  canUserEdit!:boolean;
  editProfile = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl('')
  })

  constructor(
    private auth:AuthService,
    private postSvc:PostService,
    private route:ActivatedRoute,
    private router:Router,
    private userSvc: UserService,
    private modalService: NgbModal,
  ) {
    this.router.events.subscribe((event) => {
      this.ngOnInit();
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {

      this.userSvc.getUserBySlug(params.slug)
      .subscribe(user => {
        this.user = user[0]
        this.canUserEdit = this.user.id == this.auth.getLoggedUser().id;
        this.editProfile.setValue({
          name: this.user.name,
          lastname: this.user.lastname,
          username: this.user.username,
          email: this.user.email
        })

        this.postSvc.getPostByOwner(user[0].id)
        .subscribe(posts => {
          this.posts = posts.reverse();
        })
      })
    })
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true })
  }

  edit(){

    let hold:User = {
      id: this.user.id,
      name: <string>this.editProfile.value.name,
      lastname: <string>this.editProfile.value.lastname,
      username: <string>this.editProfile.value.username,
      slug: User.slugify(<string>this.editProfile.value.username),
      avatar: this.user.avatar,
      email: <string>this.editProfile.value.email,
      password: undefined
    }

    this.userSvc.editUser(hold)
    .subscribe(() => {
      this.auth.logOut()
      this.router.navigate(['/'])
    })
  }



}
