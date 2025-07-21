import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageUploadHttpService } from './image-upload-http.service';
import { Constants } from '@common/constants/constants';
import { ImageUploadHttpService} from '@services/http';

describe('ImageUploadHttpService', () => {
  let service: ImageUploadHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageUploadHttpService]
    });
    service = TestBed.inject(ImageUploadHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload image and set imageUrl on success', () => {
    const
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImageUploadHttpService } from './image-upload-http.service';
import { Constants } from '@common/constants/constants';

describe('ImageUploadHttpService', () => {
  let service: ImageUploadHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageUploadHttpService]
    });
    service = TestBed.inject(ImageUploadHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload image and set imageUrl on success', ()