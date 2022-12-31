import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DefaultService {

  constructor() { }

  /**
   * Returns a list of all items
   */
  abstract GetAll(size: number, sort: string, order: string, page: number, getInputs: string, id?: number, id2?:number): Observable<any>;
  abstract GetSimple(attr:{}): Observable<any>;
}