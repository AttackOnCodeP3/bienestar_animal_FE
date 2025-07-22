import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Animal} from '@models';
import {Constants} from '@common/constants/constants';
import {IResponse, ISearch} from '@common/interfaces/http';
import {createPageArray} from '@common/utils';
import {CreateAnimalRequestDto} from '@models/dto';
import {AlertTypeEnum} from '@common/enums';

@Injectable({
  providedIn: 'root'
})
export class CommunityAnimalHttpService extends BaseHttpService<Animal> {
  protected override source: string = Constants.COMMUNITY_ANIMALS_URL;

  /**
   * Signal that holds the list of community animals registered by the authenticated user.
   */
  readonly communityAnimalListMine = signal<Animal[]>([]);

  search: ISearch = {
    page: 1,
    size: 10,
  };

  totalItems: number[] = [];
  /**
   * Fetches community animals registered by the authenticated user.
   * Calls the backend endpoint `/community-animals/mine`.
   *
   * @author gjimenez
   */
  getMine(): void {
    const params = {
      page: this.search.page || 1,
      size: this.search.size || 10,
    };

    this.http.get<IResponse<Animal[]>>(this.sourceUrl + '/mine', {
      params: this.buildUrlParams(params),
    }).subscribe({
      next: (res) => {
        this.communityAnimalListMine.set(res.data);
        this.search = { ...this.search, ...res.meta };
        this.totalItems = createPageArray(res.meta?.totalPages ?? 0);
      },
      error: this.handleError({
        message: 'Ocurrió un error al obtener los animales registrados por el usuario',
        context: `${this.constructor.name}#getMine`,
      }),
    });
  }

  /**
   * Registers a new community animal (with controls and vaccines).
   * On success, shows a success alert and reloads the list.
   * @param createAnimalRequestDto CreateAnimalRequestDTO with full animal registration data
   * @param callback Optional callback function to execute after successful registration
   * @author dgutierrez
   */
  registerCommunityAnimal(createAnimalRequestDto: CreateAnimalRequestDto, callback?: VoidFunction): void {
    this.add(createAnimalRequestDto).subscribe({
      next: res => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: res.message,
        });
        this.getMine();
        if (callback) {
          callback();
        }
      },
      error: this.handleError({
        message: 'Ocurrió un error al registrar el animal comunitario',
        context: `${this.constructor.name}#registerCommunityAnimal`,
      }),
    });
  }
}
