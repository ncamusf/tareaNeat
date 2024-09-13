import { Component, Input } from '@angular/core';
import { UserInfo } from '../../models/userInfo';

@Component({
  selector: 'perfil-window',
  standalone: true,
  imports: [],
  templateUrl: './perfil-window.component.html',
  styleUrl: './perfil-window.component.css'
})
export class PerfilWindowComponent {

  @Input() userInfo!: UserInfo;
}
