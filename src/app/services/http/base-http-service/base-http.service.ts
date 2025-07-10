import {inject, Injectable, WritableSignal} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IResponse, ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {AlertService} from '@services/general';
import {AlertTypeEnum} from '@common/enums';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T> {

  protected source!: string;
  protected http = inject(HttpClient);
  protected readonly alertService = inject(AlertService);

  get sourceUrl(): string {
    return Constants.apiBaseUrl + this.source;
  }

  /** Devuelve IResponse con metadata */
  find(id: string | number): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(this.sourceUrl + '/' + id);
  }

  /** Devuelve solo el dato T */
  getOne(id: number): Observable<T> {
    return this.http.get<T>(this.sourceUrl + '/' + id);
  }

  findAll(): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.sourceUrl);
  }

  fetchAllPaginated({
                      updateSignal,
                      page,
                      size,
                      setSearchMeta,
                      setTotalItems,
                      context
                    }: {
    updateSignal: WritableSignal<T[]>;
    page: number;
    size: number;
    setSearchMeta: (meta: Partial<ISearch>) => void;
    setTotalItems: (totalPages: number) => void;
    context: string;
  }): void {
    this.findAllWithParams({page, size}).subscribe({
      next: (res) => {
        setSearchMeta(res.meta);
        setTotalItems(res.meta?.totalPages ?? 0);
        updateSignal.set(res.data);
      },
      error: this.handleError({
        message: 'Error fetching data',
        context
      })
    });
  }

  findAllWithParams(params: any = {}): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.sourceUrl, {params: this.buildUrlParams(params)});
  }

  findAllWithParamsAndCustomSource(customUrlSource: string, params: any = {}): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(`${this.sourceUrl}/${customUrlSource}`, {params: this.buildUrlParams(params)});
  }

  add(data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.sourceUrl, data);
  }

  addWithParams(params: any = {}, data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.sourceUrl, data, {params: this.buildUrlParams(params)});
  }

  addCustomSource(customUrlSource: string, data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(`${this.sourceUrl}/${customUrlSource}`, data);
  }

  edit(id: number | undefined, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.sourceUrl + '/' + id, data);
  }

  editCustomSource(customUrlSource: string, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(`${this.sourceUrl}${customUrlSource ? '/' + customUrlSource : ''}`, data);
  }

  del(id: any): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(this.sourceUrl + '/' + id);
  }

  delCustomSource(customUrlSource: string): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(`${this.sourceUrl}/${customUrlSource}`);
  }

  buildUrlParams(params: any = {}) {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    });
    return queryParams;
  }

  /**
   * Handles errors from HTTP requests and displays an alert.
   */
  handleError({
                message,
                context = 'HTTP Error',
              }: {
    message: string;
    context?: string;
  }): (err: any) => void {
    return (err: any) => {
      console.error(`${context}:`, err);

      let finalMessage = message;

      if (err instanceof Error && err.message) {
        finalMessage = err.message;
      } else if (err?.mensaje) {
        finalMessage = err.mensaje;
      } else if (err?.error?.mensaje) {
        finalMessage = err.error.mensaje;
      } else if (typeof err === 'string') {
        finalMessage = err;
      }

      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: finalMessage,
      });
    };
  }
}
