import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IResponse} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T> {

  protected source!: string;
  protected http = inject(HttpClient);

  get sourceUrl(): string {
    return Constants.apiBaseUrl + this.source;
  }

  public find(id: string | number): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(this.sourceUrl + '/' + id);
  }

  public findAll(): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.sourceUrl);
  }

  public findAllWithParams(params: any = {}): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.sourceUrl, {params: this.buildUrlParams(params)});
  }

  public findAllWithParamsAndCustomSource(customUrlSource: string, params: any = {}): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(`${this.sourceUrl}/${customUrlSource}`, {params: this.buildUrlParams(params)});
  }

  public add(data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.sourceUrl, data);
  }

  public addWithParams(params: any = {}, data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.sourceUrl, data, {params: this.buildUrlParams(params)});
  }

  public addCustomSource(customUrlSource: string, data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(`${this.sourceUrl}/${customUrlSource}`, data);
  }

  public edit(id: number | undefined, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.sourceUrl + '/' + id, data);
  }

  public editCustomSource(customUrlSource: string, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(`${this.sourceUrl}${customUrlSource ? '/' + customUrlSource: ''}`, data);
  }

  public del(id: any): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(this.sourceUrl + '/' + id);
  }

  public delCustomSource(customUrlSource: string): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(`${this.sourceUrl}/${customUrlSource}`);
  }

  public buildUrlParams (params: any = {}) {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    })
    return queryParams;
  }
}
