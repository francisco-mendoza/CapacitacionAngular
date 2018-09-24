import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

var _config = { api_url: 'http://127.0.0.1:3000/api' };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) 
  {   }

  login(email: string, password: string) {
    return this.http.post<any>(`${_config.api_url}/auth/login`, { email, password })
        .pipe(map(user => 
            {
              if (user && user.token) 
                  localStorage.setItem('currentUserAuth', JSON.stringify(user));
              return user;
            })
        );
  }

}
