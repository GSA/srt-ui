import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


// import services
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { FileService } from '../../shared/services/file.service';


import { AuthGuard } from '../../auth-guard.service';

// import classes
import { User } from '../../shared/user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myform: FormGroup;  
  filterParams = {}
  params = {};
  current: any
  title: String;
  self: boolean = false
  selectedUser: User;
  isGSAAdmin = false;
  editable = false;
  newemail: String;
  paramAdmin = {};
  /* CONSTRUCTORS */

  /**
   * constructor
   */
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private auth: AuthGuard
    
  ) {
    this.current = this.authService.getCurrent();
  }

  /**
   * lifecycle
   */
  ngOnInit() {    
 
    
    this.route.params.subscribe((params => {
      const userID = params['userID'];

      this.getSelectedUser(userID);
    }))

    this.isGSAAdmin = this.auth.isGSAAdmin;
    
  }


  
  /**
   * lifecycle
   */
  ngOnChange() {    

  }
 

  /**
   * Get Current User.
   */
  getSelectedUser(userID) {
    this.params['UserID'] = userID;
    this.userService.getUserFromDatabase(this.params).subscribe(
      data => {
        this.selectedUser = new User(data);
        this.title = this.current.id === userID ? "Your Profile" : "Review Profile";
        this.self = this.current.id === userID ? true : false;

        debugger
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
    * Edit the info.
    */
  editInfo() {
    this.editable = !this.editable;
  }

  /**
     * Save the info.
     */

  saveInfo() {
    console.log(this.newemail);
    this.paramAdmin['NewEmail'] = this.newemail;
    this.paramAdmin['UserID'] = this.route.snapshot.params['userID'];
    this.userService.updateUserInfo(this.paramAdmin).subscribe(
      data => {
        console.log(data);

        this.selectedUser.email = data.email
        if (this.selectedUser.email) {
          this.editable = false;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

    /**
     * update the user profile.
     * Kailun's new add
     */

  uploadphoto() {
    debugger
    this.fileService.updateImage(this.current).subscribe(
      data =>{
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
    
  

}