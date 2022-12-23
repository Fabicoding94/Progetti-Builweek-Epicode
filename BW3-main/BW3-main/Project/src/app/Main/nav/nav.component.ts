import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isMenuCollapsed = true;
  userName!: string
  userNameParam:string = this.auth.isUserLogged() ? this.auth.getLoggedUser().slug : '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.router.events.subscribe((event:any)=>{
      this.userNameParam = this.auth.isUserLogged() ? this.auth.getLoggedUser().slug : '';
    })
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if(this.checkIfUserLogged()){
      this.userName = this.getUserName();
    }
  }

  checkIfUserLogged():boolean{
    return this.auth.isUserLogged();
  }

  getUserName():string{
    return this.auth.getLoggedUser().name;
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true })
  }

  logOut():void{
    this.auth.logOut();
    this.router.navigate(['/'])
  }

}
