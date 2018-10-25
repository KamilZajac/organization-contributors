import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private headers = new HttpHeaders();

  private organizationName: string;
  private allRepositories: Array<Object>;
  private allContributors = new BehaviorSubject<Array<Object>>(null);

  private repositoriesTransfer = new Subject<Array<Object>>();

  constructor(private http: HttpClient, private apollo: Apollo, private router: Router) {
  }


  getOrganizationContributors(orgName): Observable<Array<Object>> {
    this.organizationName = orgName;
    this.prepareContributorsInfo();

    return this.allContributors.asObservable();
  }

  prepareContributorsInfo() {

    this.fetchOrganization().pipe(take(1)).subscribe((org) => {
      const allReposCount = org['public_repos'];
      this.fetchRepos(allReposCount)
      let allRepos = []

      this.repositoriesTransfer.subscribe(arr => {
        allRepos = [...allRepos, ...arr];

        if (allRepos.length === allReposCount) {
          this.allRepositories = allRepos;
          this.fetchContributors().then(contributors => {
            this.mergeDuplicates(contributors);
          })
        }
      })
    }, () => {
      this.router.navigate(['']);
    });
  }

  fetchRepos(allReposCount) {

    const url = `https://api.github.com/orgs/${this.organizationName}/repos`;

    const allPages = Math.ceil(allReposCount / 100);
    for (let i = 1; i <= allPages; i++) {
      this.http.get<Array<Object>>(url, { headers: this.headers, params: { 'per_page': '100', 'page': `${i}` } })
        .pipe(take(1))
        .subscribe(repos => {
          this.repositoriesTransfer.next(repos)
        }, () => {
          this.router.navigate(['']);
        });
    }
  }

  fetchOrganization() {
    const url = `https://api.github.com/orgs/${this.organizationName}`;
    return this.http.get(url, { headers: this.headers });
  }

  fetchContributors() {
    let allContributors = [];
    return new Promise((resolve, reject) => {
      this.allRepositories.forEach((repo, idx) => {
        this.http.get<Array<Object>>(repo['contributors_url'], { headers: this.headers })
          .pipe(take(1))
          .subscribe(contributors => {
            allContributors = [...allContributors, ...contributors];

            setTimeout(() => {
              if (idx === this.allRepositories.length - 1) {
                resolve(allContributors)
              }
            }, 500)
          }, () => {
            this.router.navigate(['']);

          })
      })
    })

  }

  logIn(token) {

    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders().append('Authorization', 'Basic ' + token)
      const url = `https://api.github.com/user`;
      this.http.get(url, { headers: headers }).pipe(take(1)).subscribe(user => {
        this.headers = new HttpHeaders().append('Authorization', 'Basic ' + token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        resolve(user);
      }, () => {
        reject();
      })
    });
  }


  mergeDuplicates(arr) {
    let result = [];
    arr.forEach(function (user) {
      if (user) {
        if (!this[user.id]) {
          this[user.id] = { id: user.id, contributions: 0, login: user.login, avatar_url: user.avatar_url, gists: null, followers: null };
          result.push(this[user.id]);
        }
        this[user.id].contributions += user.contributions;
      }
    }, Object.create(null))
    this.allContributors.next(result)
    this.getContributorsStats(result)
  }

  getContributorsStats(allContributors?) {
    this.prepareQuery(allContributors).then(query => {
      this.apollo
        .watchQuery({
          query: gql`{
              ${query}
          }
          `,
        })
        .valueChanges.subscribe(response => {
          this.handleGraphqlResponse(allContributors, response);
        });
    })

  }


  prepareQuery(allContributors) {
    return new Promise((resolve) => {
      let query = '';
      allContributors.forEach((user, index) => {
        if (user) {
          query = query.concat(`
          id_${user.id}: user(login: "${user.login}") {
            login
            gists {
              totalCount
            }
            followers {
              totalCount
            }
          }
        `)
        }
        if (index === allContributors.length - 1) {
          resolve(query);
        }
      });
    });
  }
  handleGraphqlResponse(allContributors, response) {
    Object.keys(response.data).forEach((key, idx) => {
      const id = key.replace('id_', '');
      const index = allContributors.findIndex((member) => member.id === Number(id));
      allContributors[index].gists = response.data[key].gists.totalCount;
      allContributors[index].followers = response.data[key].followers.totalCount;

      if (idx === Object.keys(response.data).length) {
        console.log(allContributors);
      }
    })
  }

  fetchSingleUser(login) {
    return new Promise((res) => {

      this.apollo
        .watchQuery({
          query: gql`
        {
          user: user(login: "${login}"){
            avatarUrl
            login
            bio
            company
            location
            isHireable
            followers{
              totalCount
            }
            gists{
              totalCount
            }
              repositories(first:100){
              edges{
                node{
                  name
                }
              }
            }
          }
        }
        `,
        })
        .valueChanges.subscribe(response => {
          res(response.data['user'])
        });
    })
  }

  clearContributors() {
    this.allContributors.next(null);
    this.allRepositories = null;
  }
}
