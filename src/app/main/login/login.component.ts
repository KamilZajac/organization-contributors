import { Component } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { take } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginError: boolean;

  Form = new FormGroup({
    login: new FormControl('', [
      Validators.required
    ]),
    pass: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private githubService: GithubService,
    private router: Router) {
  }

  logIn() {
    const login = this.Form.get('login').value;
    const pass = this.Form.get('pass').value;
    const base64pass = btoa(`${login}:${pass}`);

    this.githubService.logIn(base64pass).then(user => {
      this.router.navigate(['contributors'])
    }).catch(() => {
      this.loginError = true;
    })
  }
}
