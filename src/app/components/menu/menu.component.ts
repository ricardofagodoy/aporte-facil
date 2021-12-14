import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from "@angular/router";
import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoginService } from '../login/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy {
  
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  public name : string = "Aporte Fácil"
  public loggedUser : string

  constructor(changeDetectorRef: ChangeDetectorRef, 
              media: MediaMatcher, 
              public dialog: MatDialog,
              private router : Router,
              public loginService : LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 750px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // When logged in, show name in the toolbar
    loginService.waitForLogin().subscribe(() => {
      this.loggedUser = loginService.getLoggedUser()
    })
  }

  navigateTo(path) {
    this.router.navigate([path])
  }

  provide_feedback() {
      this.dialog.open(FeedbackDialog, {
        width: '80vw',
        maxWidth: '700px'
      })
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

@Component({
  selector: 'feedback-dialog',
  templateUrl: 'feedback-dialog.html',
})
export class FeedbackDialog {

  constructor(public dialogRef: MatDialogRef<FeedbackDialog>,
              private _snackBar: MatSnackBar,
              private service : MenuService) {}

  send_feedback(feedback_text) {
    this.service.sendFeedback(feedback_text).then(() => {
      this._snackBar.open('Muito obrigado pelo feedback!', 'OK', {duration: 4000})
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}