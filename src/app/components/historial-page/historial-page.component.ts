import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfo } from '@models/userInfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'history', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-page.component.html',
  styleUrls: ['./historial-page.component.css']
})
export class HistorialPageComponent implements OnInit {
  userInfo: UserInfo | undefined;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {

    // Obtener la información del usuario
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userService.getUserInfo().subscribe(
          userInfo => {
            if (userInfo) {
              this.userInfo = userInfo;
            } else {
              console.error('El usuario no existe en la base de datos.');
            }
          },
          error => {
            console.error('Error al obtener la información del usuario:', error);
          }
        );
      } else {
        console.error('No hay un usuario autenticado.');
        // Opcional: redirigir al login
      }
    });
  }

  getDate(date: any): string {
    if (date && date.seconds) {

      const firebaseDate = new Date(date.seconds * 1000);
      return firebaseDate.toLocaleString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true 
      });
    } else {
      return 'Fecha no válida';
    }
  }
}