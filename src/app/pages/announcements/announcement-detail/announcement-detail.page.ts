import {Component, computed, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {AlertTypeEnum, PagesUrlsEnum, RouteParamsEnum} from '@common/enums';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, I18nService} from '@services/general';
import {AnnouncementHttpService} from '@services/http';
import {LoadingModalService} from '@services/modals';
import {MatDivider} from '@angular/material/divider';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatCard, MatCardContent} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

/**
 * @author dgutierrez
 */
@Component({
  selector: 'app-announcement-detail-page',
  imports: [
    MatDivider,
    MatIcon,
    MatButton,
    MatMiniFabButton,
    MatTooltip,
    MatCard,
    MatCardContent,
    DatePipe
  ],
  templateUrl: './announcement-detail.page.html',
  styleUrl: './announcement-detail.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementDetailPage implements OnInit {

  readonly alertService = inject(AlertService);
  readonly announcementHttpService = inject(AnnouncementHttpService);
  readonly i18nService = inject(I18nService);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly loadingModalService = inject(LoadingModalService);
  readonly sanitizer = inject(DomSanitizer);

  readonly safeDescription = computed<SafeHtml>(() => {
    const a = this.announcementHttpService.selectedAnnouncement();
    const html = a?.description ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  ngOnInit(): void {
    this.initializeAnnouncementToSeeDetails();
  }

  /**
   * @author dgutierrez
   */
  private initializeAnnouncementToSeeDetails() {
    const announcementId = Number(this.route.snapshot.paramMap.get(RouteParamsEnum.ANNOUNCEMENT_ID));
    if (!this.validateAnnouncementId(announcementId)) {
      return;
    }
    this.announcementHttpService.getVisibleAnnouncementById(announcementId, {
      ...this.loadingModalService.httpHandlersLoading,
    });
  }


  /**
   * Validates the announcement ID.
   * If the ID is invalid, it displays an alert and navigates to the list of announcements.
   * @param id The ID of the announcement to validate.
   * @author dgutierrez
   */
  private validateAnnouncementId(id: number | null): boolean {
    if (id === null || isNaN(id) || id <= 0) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        message: "No se ha encontrado el anuncio solicitado, por favor, inténtelo de nuevo",
      });
      this.navigateToHome();
      return false;
    }
    return true;
  }

  /**
   * @author dgutierrez
   */
  navigateToHome() {
    this.router.navigate([PagesUrlsEnum.HOME]);
  }
}
