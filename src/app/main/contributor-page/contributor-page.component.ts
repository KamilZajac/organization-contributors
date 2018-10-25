import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { GithubService } from 'src/app/services/github.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contributor-page',
  templateUrl: './contributor-page.component.html',
  styleUrls: ['./contributor-page.component.scss']
})
export class ContributorPageComponent implements OnInit {
  user;

  constructor(private route: ActivatedRoute, private githubService: GithubService, private location: Location) { }

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe(param => {
      this.githubService.fetchSingleUser(param.login).then(user => {
        this.user = user;
      })
    })
  }

  goBack() {
    this.location.back();
  }

}
