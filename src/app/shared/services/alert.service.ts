import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonColor: 'rgb(210, 155, 253)',
      width: 430
    })
  }

  warn(title: string, message: string){
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonColor: 'rgb(210, 155, 253)',
      width: 430
    })
  }

  error(title: string, message: string){
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonColor: 'rgb(210, 155, 253)',
      width: 430
    })
  }
}