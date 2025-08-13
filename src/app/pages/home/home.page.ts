import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  inject,
  OnInit,
  viewChild
} from '@angular/core';
import {LogoBienestarAnimalComponent} from '@components/icons';
import {Constants} from '@common/constants/constants';
import {AnnouncementHttpService, AuthHttpService} from '@services/http';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {SwiperProps} from 'swiper/react';
import {Announcement} from '@models';
import {Router} from '@angular/router';
import {PagesUrlsEnum} from '@common/enums';

/**
 * Home page component that displays the main landing page of the application.
 * @author dgutierrez
 */
@Component({
  selector: 'app-home-page',
  imports: [
    LogoBienestarAnimalComponent,
    MatCardContent,
    MatIcon,
    MatCard,
    DatePipe,
    MatButton
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: Constants.changeDetectionStrategy,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  readonly announcementsHttpService = inject(AnnouncementHttpService);
  readonly authHttpService = inject(AuthHttpService);
  readonly router = inject(Router);

  readonly swiper = viewChild<ElementRef<any>>('swiperContainer');

  ngOnInit(): void {
    this.announcementsHttpService.getVisibleAnnouncementsByMunicipality();
  }

  /**
   * @author dgutierrez
   */
  readonly whenAnnouncementsLoadedThenLoadSwiperEffect = effect(() => {
    if (this.announcementsHttpService.announcementList().length > 0) {
      this.loadSwiper();
    }
  })

  private loadSwiper() {
    const swiperParams: SwiperProps = {
      slidesPerView: 1,
      navigation: true,
      autoplay: true,
      pagination: {clickable: true},
      spaceBetween: 10,
    }

    if (this.swiper()) {
      const swiperElement = this.swiper()?.nativeElement;
      if (swiperElement) {
        Object.assign(swiperElement, swiperParams);
        swiperElement.initialize();
      }
    }
  }

  /**
   * @param announcement The announcement to be viewed.
   * @author dgutierrez
   */
  onView(announcement: Announcement) {
    this.router.navigate([PagesUrlsEnum.ANNOUNCEMENTS_DETAIL, announcement.id]);
  }
}
