import {inject, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {AlertService} from '@services/general';
import {Constants} from '@common/constants/constants';
import {District, Neighborhood} from '@models';
import {IResponse, ISearch} from '@common/interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class DistrictHttpService extends BaseHttpService<District>{

  private alertService = inject(AlertService);

  protected override source = Constants.GET_ALL_DISTRICTS_URL;

  districtList = signal<District[]>([]);
  neighborhoodsByDistrict = signal<Neighborhood[]>([]);

  search: ISearch = { page: 1, size: 10 };
  totalItems: number[] = [];

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (res) => {
        this.search = { ...this.search, ...res.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ?? 0 }, (_, i) => i + 1);
        this.districtList.set(res.data);
      },
      error: (err) => {
        console.error('Error loading districts', err);
        this.alertService.displayAlert('error', 'Error loading districts');
      }
    });
  }

  getNeighborhoodsByDistrictId(districtId: number): void {
    const url = `${this.sourceUrl}/${districtId}/neighborhoods`;
    this.http.get<IResponse<Neighborhood[]>>(url).subscribe({
      next: res => this.neighborhoodsByDistrict.set(res.data),
      error: err => {
        console.error('Error fetching neighborhoods by district', err);
        this.alertService.displayAlert('error', 'Error loading neighborhoods');
      }
    });
  }
}
