import { computed, Injectable, signal } from '@angular/core';
import { BaseHttpService } from '@services/http';
import { Constants } from '@common/constants/constants';
import { Announcement } from '@models';
import {IResponse, ISearch, ISearchAnnouncement} from '@common/interfaces/http';

/**
 * Service to handle HTTP requests related to announcements.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root',
})
export class AnnouncementHttpService extends BaseHttpService<Announcement> {
  protected override source = Constants.ANNOUNCEMENTS_URL;

  readonly announcementList = signal<Announcement[]>([]);
  readonly selectedAnnouncement = signal<Announcement | null>(null);
  private readonly isLoading = signal<boolean>(false);
  private readonly hasSearched = signal<boolean>(false);

  readonly hasSearchedAnnouncements = computed(() => this.hasSearched());
  readonly isAnnouncementsLoading = computed(() => this.isLoading());
  readonly isAnnouncementsEmpty = computed(() => {
    return this.announcementList().length === 0 && !this.isLoading();
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
   * Loads paginated and optionally filtered announcements from the user's municipality.
   * @param filters Object containing optional title and stateId filters.
   * @param options Optional pagination control.
   * @author dgutierrez
   */
  getAllAnnouncementsByMunicipality(
    filters: ISearchAnnouncement = {},
    options: {
      page?: number;
      nextPage?: boolean;
      previousPage?: boolean;
    } = {}
  ): void {
    this.search = this.updatePageState(this.search, options);
    this.fetchAnnouncements(filters);
  }

  /**
   * Fetches an announcement by its ID.
   * @param id Announcement ID
   * @param callback Optional callback function
   * @author dgutierrez
   */
  getAnnouncementById(id: number, callback?: VoidFunction): void {
    this.getOne(id).subscribe({
      next: (announcement) => {
        this.selectedAnnouncement.set(announcement);
        callback?.();
      },
      error: this.handleError({
        message: 'Error fetching announcement by ID.',
        context: `${this.constructor.name}#getAnnouncementById`,
      }),
    });
  }

  /**
   * Internally fetches filtered announcements for the authenticated user's municipality.
   * @param filters Object containing title and stateId (optional).
   * @author dgutierrez
   */
  private fetchAnnouncements(filters: { title?: string; stateId?: number } = {}): void {
    const params = {
      page: this.search.page,
      size: this.search.size,
      ...filters,
    };

    this.isLoading.set(true);
    this.http
      .get<IResponse<Announcement[]>>(`${this.sourceUrl}/my-municipality/filter`, {
        params: this.buildUrlParams(params),
      })
      .subscribe({
        next: (res) => {
          this.announcementList.set(res.data);
          this.search = { ...this.search, ...res.meta };
          this.updatePagination(res.meta?.totalPages ?? 0);
          this.hasSearched.set(true);
        },
        error: this.handleError({
          message: 'Error fetching announcements.',
          context: `${this.constructor.name}#fetchAnnouncements`,
        }),
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  /**
   * Updates pagination metadata and limits overflow.
   * @param totalPages Total number of available pages.
   * @author dgutierrez
   */
  private updatePagination(totalPages: number): void {
    this.totalItems = Array.from({ length: totalPages }, (_, i) => i + 1);
    if (this.searchPage > totalPages && totalPages > 0) {
      this.search.page = totalPages;
    }
  }
}
