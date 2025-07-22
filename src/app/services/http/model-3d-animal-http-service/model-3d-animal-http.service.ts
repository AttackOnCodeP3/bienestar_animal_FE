import { Injectable, signal, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../base-http-service/base-http.service';
import { Constants } from '@common/constants/constants';
import { IResponse, ISearch } from '@common/interfaces/http';
import { AlertTypeEnum } from '@common/enums';
import { createPageArray } from '@common/utils';
import { Model3DAnimal } from '@models';
import { I18nService } from '@services/general';

@Injectable({
  providedIn: 'root'
})
export class Model3DAnimalHttpService extends BaseHttpService<Model3DAnimal> {
    private readonly i18nService = inject(I18nService);

  
  protected override source = Constants.MODEL_3D_ANIMAL_URL;

  readonly model3DAnimalList = signal<Model3DAnimal[]>([]);
  readonly currentModel3D = signal<Model3DAnimal | null>(null);
  
  search: ISearch = { page: 1, size: 10 };
  totalItems: number[] = [];

  /**
   * Fetches all 3D models with pagination and updates local state.
   * 
   * Updates:
   * - `model3DAnimalList` signal with the fetched list
   * - `search` metadata (page, size, totalPages, etc.)
   * - `totalItems` array for pagination
   * 
   * Displays an error alert if the request fails.
   * 
   * @author nav
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.model3DAnimalList,
      page: this.search.page || 1,
      size: this.search.size || 10,
      setSearchMeta: (meta) => {
        this.search = { ...this.search, ...meta };
      },
      setTotalItems: (totalPages) => {
        this.totalItems = createPageArray(totalPages);
      },
      context: `${this.constructor.name}#getAll`,
    });
  }

  /**
   * Get from database 3D model by animal ID and update signal
   * @param animalId ID of the animal
   * @author nav
   */
   getByAnimalId(animalId: number): void {
    const url = `${this.sourceUrl}/animal/${animalId}`;
    this.http.get<IResponse<Model3DAnimal>>(url).subscribe({
      next: (res) => {
        if (res.data && res.data.urlModelo) {
          this.currentModel3D.set(res.data);
        } else {
          this.currentModel3D.set(null);
        }
      },
      error: (error) => {        
        this.alertService.displayAlert({
          type: AlertTypeEnum.ERROR,
          messageKey: `Error cargando modelo 3D: ${error.status === 500 ? 'Error del servidor' : 'Error de conexión'}`,
        });
        this.currentModel3D.set(null);
        this.handleError({
          message: 'Error loading 3D model for animal',
          context: `${this.constructor.name}#getByAnimalId`,
        })(error);
      }
    });
  }
  /**
   * Get 3D model by ID and update signal
   * @param id ID of the 3D model
   * @author nav
   */
  getById(id: number): void {
    this.find(id).subscribe({
      next: (res) => {
        this.currentModel3D.set(res.data);
      },
      error: this.handleError({
        message: 'Error loading 3D model',
        context: `${this.constructor.name}#getById`,
      })
    });
  }

  /**
   * Sends a new 3D model to the server for creation.
   * On success, shows a success alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   * 
   * @param model3D The 3D model object to be created.
   * @returns void
   * @author nav
   */
  save(model3D: Model3DAnimal): void {
    this.add(model3D).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message,
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred adding the 3D model',
        context: `${this.constructor.name}#save`,
      }),
    });
  }

  /**
   * Updates an existing 3D model by its ID.
   * If the ID is not present, the update is aborted and an error alert is shown.
   * On success, shows a success alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   * 
   * @param model3D The 3D model object with updated fields. Must contain a valid `id`.
   * @returns void
   * @author nav
   */
 update(model3D: Model3DAnimal): void {
  if (!model3D.id) {
    this.alertService.displayAlert({
      type: AlertTypeEnum.ERROR,
      message: '3D Model ID is required for update',
    });
    return;
  }

  this.edit(model3D.id, model3D).subscribe({
    next: (response) => {
      this.alertService.displayAlert({
        type: AlertTypeEnum.SUCCESS,
        messageKey: response.message,
      });
      this.getAll();
    },
    error: this.handleError({
      message: 'An error occurred updating the 3D model',
      context: `${this.constructor.name}#update`,
    }),
  });
}

  /**
   * Deletes a 3D model by its ID.
   * On success, displays a confirmation alert and refreshes the paginated list.
   * On failure, displays an error alert and logs the error.
   * 
   * @param model3D The 3D model object to be deleted. Must contain a valid `id`.
   * @returns void
   * @author nav
   */
  delete(model3D: Model3DAnimal): void {
    this.del(model3D.id).subscribe({
      next: (response) => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: response.message,
        });
        this.getAll();
      },
      error: this.handleError({
        message: 'An error occurred deleting the 3D model',
        context: `${this.constructor.name}#delete`,
      }),
    });
  }

  /**
   * Clear current model
   * @author nav
   */
  clearModel(): void {
    this.currentModel3D.set(null);
  }


}