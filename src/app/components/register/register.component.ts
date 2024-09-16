import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  lastName: string = '';

  constructor(private auth: AuthService) {}
  

  ngOnInit(): void {
  }

  register() {
    if(this.email==''){
      alert('Please enter email');
      return;
    }

    if(this.password==''){
      alert('Please enter password');
      return;
    }
    if(this.name==''){
      alert('Please enter name');
      return;
    }

    if(this.lastName==''){
      alert('Please enter lastName');
      return;
    }
    this.auth.register(this.email,this.password,this.name,this.lastName);
    this.email = '';
    this. password = '';
  }
}
