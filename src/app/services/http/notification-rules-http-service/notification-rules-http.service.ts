import {computed, Injectable, signal} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {BaseHttpService} from '@services/http';
import {createPageArray} from '@common/utils';
import {IResponse, ISearch} from '@common/interfaces/http';
import {MunicipalPreventiveCareConfigurationDTO} from '@models/dto';
import {AlertTypeEnum} from '@common/enums';

@Injectable({
  providedIn: 'root',
})
export class NotificationRulesHttpService extends BaseHttpService<MunicipalPreventiveCareConfigurationDTO> {
  protected override source = Constants.MUNICIPAL_PREVENTIVE_CARE_CONFIGURATIONS_URL;

  readonly configurationList = signal<MunicipalPreventiveCareConfigurationDTO[]>([]);
  /**
   * Signal to hold the selected municipal preventive care configuration.
   * It can be null if no configuration is selected.
   * This is used to store the configuration details when fetched by ID or updated.
   * @author dgutierrez
   */
  readonly selectedConfigurationId = signal<MunicipalPreventiveCareConfigurationDTO | null>(null);
  private readonly isLoading = signal<boolean>(false);

  readonly isConfigurationsLoading = computed(() => this.isLoading());
  readonly isConfigurationsEmpty = computed(() => {
    return this.configurationList().length === 0 && !this.isConfigurationsLoading();
  });

  search: ISearch = {
    page: 1,
    size: 10,
  };

  totalItems: number[] = [];

  get searchPage(): number {
    return this.search.page ?? 1;
  }

  /**
   * Public method to load municipal preventive care configurations with optional pagination control.
   * @param options Object with page control keys
   * @example getAllConfigurations({ nextPage: true })
   * @example getAllConfigurations({ page: 3 })
   * @author dgutierrez
   */
  getAll(options: {
    page?: number;
    nextPage?: boolean;
    previousPage?: boolean;
  } = {}): void {
    this.search = this.updatePageState(this.search, options);
    this.fetchConfigurations();
  }

  /**
   * Fetches a municipal preventive care configuration by its ID.
   * @param id ID of the configuration to fetch.
   * @param callback Optional callback function to execute after fetching the configuration.
   * @author dgutierrez
   */
  getConfigurationById(id: number, callback?: VoidFunction): void {
    this.http.get<IResponse<MunicipalPreventiveCareConfigurationDTO>>(`${this.sourceUrl}/${id}`).subscribe({
      next: (res) => {
        this.selectedConfigurationId.set(res.data);
        callback?.();
      },
      error: this.handleError({
        message: 'Ocurrió un error al obtener la configuración por ID.',
        context: `${this.constructor.name}#getConfigurationById`,
      }),
    });
  }

  /**
   * Updates a municipal preventive care configuration by its ID.
   * @param id ID of the configuration to update.
   * @param payload Partial payload containing the fields to update.
   * @param callback Optional callback function to execute after the update.
   * @author dgutierrez
   */
  updateConfiguration(id: number, payload: Partial<MunicipalPreventiveCareConfigurationDTO>, callback?: VoidFunction): void {
    this.http.put<IResponse<MunicipalPreventiveCareConfigurationDTO>>(`${this.sourceUrl}/${id}`, payload).subscribe({
      next: (res) => {
        this.selectedConfigurationId.set(res.data);
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          message: res.message,
        })
        callback?.();
      },
      error: this.handleError({
        message: 'Ocurrió un error al actualizar la configuración preventiva municipal.',
        context: `${this.constructor.name}#updateConfiguration`,
      }),
    });
  }

  /**
   * Fetches the list of municipal preventive care configurations with pagination.
   * @author dgutierrez
   */
  private fetchConfigurations(): void {
    const params = {
      page: this.search.page,
      size: this.search.size,
    };

    this.isLoading.set(true);
    this.http.get<IResponse<MunicipalPreventiveCareConfigurationDTO[]>>(`${this.sourceUrl}`, {
      params: this.buildUrlParams(params),
    }).subscribe({
      next: (res) => {
        this.configurationList.set(res.data);
        this.updatePagination(res.meta?.totalPages ?? 0);
        this.search = {...this.search, ...res.meta};
      },
      error: this.handleError({
        message: 'Ocurrió un error al obtener las configuraciones preventivas municipales.',
        context: `${this.constructor.name}#fetchConfigurations`,
      }),
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Updates the pagination state based on the total number of pages.
   * @param totalPages Total number of pages available.
   * @author dgutierrez
   */
  private updatePagination(totalPages: number): void {
    this.totalItems = createPageArray(totalPages);
    if (this.searchPage > totalPages && totalPages > 0) {
      this.search.page = totalPages;
    }
  }
}
