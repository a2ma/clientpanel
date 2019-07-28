import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  passwordConf: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    if (this.password === this.passwordConf) {
      this.authService.register(this.email, this.password)
        .then(res => {
          this.flashMessage.show('You are now registered and logged in.', { cssClass: 'alert-success', timeout: 4000 });
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.flashMessage.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
        });
    } else {
      this.flashMessage.show('Your password confirmation does not match. Please try again.', { cssClass: 'alert-danger', timeout: 4000 });
    }

  }

}
