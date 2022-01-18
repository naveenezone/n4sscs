import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// IAM
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/resources/iam/service/auth/auth.service';
import { UserDataService } from 'src/app/shared/resources/iam/service/data/user-data.service';

@Component({
  selector: 'app-index6',
  templateUrl: './index6.component.html',
  styleUrls: ['./index6.component.scss'],
})

/**
 * Index-6 component
 */
export class Index6Component implements OnInit {

  currentSection = 'home';

  //From IAM
  username;
  password;
  active;
  invalidLogin = false;
  modalReference: NgbModalRef;

  // Login
  closeResult: string;
  modalOptions: NgbModalOptions;

  // constructor(private modalService: NgbModal) { }
  // IAM
  constructor(private modalService: NgbModal, private router: Router, public authService: AuthService, private userDataService: UserDataService) { }

  ngOnInit(): void {
  }

  /**
   * Window scroll method
   */
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50) {
      navbar.classList.add('nav-sticky');
    } else {
      navbar.classList.remove('nav-sticky');
    }
  }

  /**
   * Section changed method
   * @param sectionId specify the current sectionID
   */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('navbarCollapse').classList.toggle('show');
  }

  /**
  * Login modal
  */
  loginModal(logincontent) {
    // this.modalService.open(content, { centered: true });
    this.modalReference = this.modalService.open(logincontent);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Register modal
   * @param registercontent content
   */
  registerModal(registercontent) {
    this.modalService.open(registercontent, { centered: true });
  }


  // IAM
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  JoinAndClose() {
    this.modalReference.close();
  }
  handleLogin() {
    this.authService.authenticate(this.username, this.password).subscribe(
      data => {
        // console.log(data);
        this.userDataService.getUserbyUsername(this.username).subscribe(
          response => {
            this.active = response.active;
            // console.log(this.active);
            if (this.active === 0) {
              // console.log(`active:0-Disable login`);
              this.invalidLogin = true;
              this.authService.logout();
            } else {
              this.router.navigate(['welcome', this.username]);
              this.invalidLogin = false;
              this.JoinAndClose();
            }
          }
        );
      }, error => {
        // console.log(error);
        this.invalidLogin = true;
      }
    );
  }

  authService_logout() {
    this.router.navigate(['/logout']);
    return this.authService.logout();
  }

  getUsername() {
    return this.authService.getAuthenticatedUser();
  }

}
