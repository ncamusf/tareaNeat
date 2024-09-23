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


    login(email: string, password: string) {
      this.fireAuth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.router.navigate(['/home']);
        } else {
          console.error('No se pudo obtener el usuario después de iniciar sesión.');
        }
      }).catch(err => {
        alert('Algo salió mal');
        console.error('Error en login:', err);
        this.router.navigate(['/login']);
      });
    }
  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState.pipe(
      map(user => !!user) 
    );
  }

  register(email: string, password: string, name: string, lastName: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      alert('Registro exitoso');
      const user = userCredential.user;
      if (user) {
        this.userService.createUserInfo(user.uid, name, lastName);
        this.router.navigate(['/home']);
      } else {
        console.error('No se pudo obtener el usuario después del registro.');
      }
    }).catch(err => {
      alert(err.message);
      console.error('Error en register:', err);
      this.router.navigate(['/register']);
    });
  }

  logout(){
    this.fireAuth.signOut().then( () => {
      localStorage.removeItem('idUser')
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }
}
