import {inject, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Municipality} from '@models';
import {ISearch} from '@common/interfaces/http';
import {AlertService} from '@services/general';
import {Constants} from '@common/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityHttpService extends BaseHttpService<Municipality> {

  private readonly alertService = inject(AlertService);

  protected override source: string = Constants.GET_ALL_MUNICIPALITIES_URL;

  municipalityList = signal<Municipality[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ?? 0 }, (_, i) => i + 1);
        this.municipalityList.set(response.data);
      },
      error: (err) => {
        console.error('Error fetching municipalities:', err);
      }
    });
  }

  save(municipality: Municipality) {
    this.add(municipality).subscribe({
      next: (response) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err) => {
        this.alertService.displayAlert('error', 'An error occurred adding the municipality', 'center', 'top', ['error-snackbar']);
        console.error('Error saving municipality:', err);
      }
    });
  }

  update(municipality: Municipality) {
    if (!municipality.id) {
      this.alertService.displayAlert('error', 'Municipality ID is required for update', 'center', 'top', ['error-snackbar']);
      return;
    }
    this.edit(municipality.id, municipality).subscribe({
      next: (response) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err) => {
        this.alertService.displayAlert('error', 'An error occurred updating the municipality', 'center', 'top', ['error-snackbar']);
        console.error('Error updating municipality:', err);
      }
    });
  }

  delete(municipality: Municipality) {
    this.del(municipality.id).subscribe({
      next: (response) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the municipality', 'center', 'top', ['error-snackbar']);
        console.error('Error deleting municipality:', err);
      }
    });
  }
}
