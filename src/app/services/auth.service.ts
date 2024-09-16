import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService) {  }


  login(email: string, password:string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then(()=> {
        localStorage.setItem('token','true');
        this.fireAuth.onAuthStateChanged((user) => {
          if (user) {
            // User logged in already or has just logged in.
            localStorage.setItem('idUser',user.uid);
          } else {
            // User not logged in or has just logged out.
          }
        });
        
        this.router.navigate(['crypto-neat-app']);

      }, err => {
        alert('Something went wrong');
        this.router.navigate(['/login']);
      }
    )
  }
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.fireAuth.onAuthStateChanged(user => {
        if (user) {
          if(localStorage.getItem('idUser') == user.uid){
            resolve(true);
          }
          resolve(false);
        } else {
          resolve(false);
        }
      }, error => reject(error));
    });
  }



  register(email: string, password:string,
    name: string, lastName: string){
    this.fireAuth.createUserWithEmailAndPassword(email,password).then( () => {
      alert('Registration Successful')
      this.login(email,password);
      this.userService.createUserInfo(name,lastName);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  logout(){
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('token');
      localStorage.removeItem('idUser')
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }
}
