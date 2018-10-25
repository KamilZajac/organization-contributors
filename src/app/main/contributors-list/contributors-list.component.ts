import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contributors-list',
  templateUrl: './contributors-list.component.html',
  styleUrls: ['./contributors-list.component.scss']
})
export class ContributorsListComponent implements OnInit {
  contributors;
  user;
  organizationQuery: string = '';
  activeSorting = { property: 'contributions', direction: 'desc' };
  loading: boolean;


  constructor(private githubService: GithubService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getContributors() {
    this.loading = true;
    this.githubService.getOrganizationContributors(this.organizationQuery).subscribe((contributors) => {
      if (contributors) {
        this.loading = true;
        this.contributors = contributors;
      }
    });
  }
  changeSorting(sorting) {
    this.activeSorting = sorting;
  }

  onMemberClicked(contributor) {
    this.router.navigate(['contributors', contributor.login]);
  }

  onChangeOrganization() {
    this.loading = false;
    this.contributors = null;
    this.githubService.clearContributors();
  }

}
