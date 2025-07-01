import {inject, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {AlertService} from '@services/general';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';


@Injectable({
  providedIn: 'root'
})
export class InterestHttpService extends BaseHttpService<InterestHttpService> {

  private alertService: AlertService = inject(AlertService);

  protected override source: string = Constants.INTEREST;

  interestList = signal<InterestHttpService[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: any = [];

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.interestList.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(item: any) {
    this.add(item).subscribe({
      next: (response) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the interest', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: any) {
    this.edit(item.id, item).subscribe({
      next: (response) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the interest', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: any) {
    this.del(item.id).subscribe({
      next: (response) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the interest', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}
