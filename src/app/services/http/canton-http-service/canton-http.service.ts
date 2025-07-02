import {inject, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Canton, District} from '@models';
import {AlertService} from '@services/general';
import {Constants} from '@common/constants/constants';
import {IResponse, ISearch} from '@common/interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class CantonHttpService extends BaseHttpService<Canton> {
  private alertService = inject(AlertService);

  protected override source = Constants.GET_ALL_CANTONS_URL;

  cantonList = signal<Canton[]>([]);
  districtsByCanton = signal<District[]>([]);

  search: ISearch = { page: 1, size: 10 };
  totalItems: number[] = [];

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (res) => {
        this.search = { ...this.search, ...res.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ?? 0 }, (_, i) => i + 1);
        this.cantonList.set(res.data);
      },
      error: (err) => {
        console.error('Error loading cantons', err);
        this.alertService.displayAlert('error', 'Error loading cantons');
      }
    });
  }

  getDistrictsByCantonId(cantonId: number): void {
    const url = `${this.sourceUrl}/${cantonId}/districts`;
    this.http.get<IResponse<District[]>>(url).subscribe({
      next: res => this.districtsByCanton.set(res.data),
      error: err => {
        console.error('Error fetching districts by canton', err);
        this.alertService.displayAlert('error', 'Error loading districts');
      }
    });
  }
}
