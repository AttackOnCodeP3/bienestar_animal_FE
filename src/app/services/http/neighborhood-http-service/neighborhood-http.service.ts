import {inject, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {AlertService} from '@services/general';
import {Constants} from '@common/constants/constants';
import {ISearch} from '@common/interfaces/http';
import {Neighborhood} from '@models';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodHttpService extends BaseHttpService<Neighborhood>{

  private alertService = inject(AlertService);

  protected override source = Constants.GET_ALL_NEIGHBORHOODS_URL;

  neighborhoodList = signal<Neighborhood[]>([]);

  search: ISearch = { page: 1, size: 100 };
  totalItems: number[] = [];

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (res) => {
        this.search = { ...this.search, ...res.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ?? 0 }, (_, i) => i + 1);
        this.neighborhoodList.set(res.data);
      },
      error: (err) => {
        console.error('Error loading neighborhoods', err);
        this.alertService.displayAlert('error', 'Error loading neighborhoods');
      }
    });
  }
}
