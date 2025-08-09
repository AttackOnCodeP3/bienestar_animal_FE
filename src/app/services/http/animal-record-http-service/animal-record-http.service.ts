import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '@common/constants/constants';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import{IViewAnimalRecord} from '@common/interfaces/view-animal-record.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalRecordHttpService extends BaseHttpService<IViewAnimalRecord> {
  protected override source = Constants.ANIMAL_RECORDS_URL;
  /**
   * Fetches the list of animals from the backend.
   * @returns Observable of animal array
   */

  getAnimalsByOwnerId(ownerId: number): Observable<any[]> {
    return this.findAllWithParams({ ownerId: ownerId }).pipe(
      map((response: any) => Array.isArray(response.data) ? response.data : [])
    );
  }

  getAbandonedAnimalsByOwnerId(ownerId: number): Observable<any[]> {
    return this.findAllWithParams({ ownerId: ownerId, status: 'abandoned' }).pipe(
      map((response: any) => Array.isArray(response.data) ? response.data : [])
    );
  }

  // You can add more methods for animal record details, updates, etc.
}
