import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '@common/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AnimalRecordHttpService {
  private readonly httpClient = inject(HttpClient);

  /**
   * Fetches the list of animals from the backend.
   * @returns Observable of animal array
   */
  getAnimals(): Observable<any[]> {
    const url = `${Constants.apiBaseUrl}/animals`;
    return this.httpClient.get<any[]>(url);
  }

  // You can add more methods for animal record details, updates, etc.
}
