import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class HttpService {

  // console.log('token==', this.authService.token);
  // 请求类型
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'token': 'my-token'});
  httpOptions = {
    headers: this.headers
  };
  constructor(private http: HttpClient) { }
 baseUrl = 'http://47.102.109.123:8084'; // 基础接口url
  //  baseUrl = 'http://127.0.0.1:8084'; // 基础接口url
  /**
   *  GET请求处理（一般用于获取数据）
   * @param url 后台接口api 例如：/api/test/6
   */
  // public get(url: string): Observable<any> {
  //   const tokenstr = window.sessionStorage.getItem('token');
  //   // console.log('tokendddddd==', tokenstr);
  //   // this.httpOptions.headers.set('token', tokenstr);
  //   // console.log('tokendddddd==', this.httpOptions.headers.get( 'token'));
  //   if (tokenstr !== undefined) {
  //     // this.httpOptions = {
  //     //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': tokenstr})
  //     // };
  //
  //     this.httpOptions.headers =
  //       this.httpOptions.headers.set('token', tokenstr);
  //   }
  //   return this.http.get(`${this.baseUrl}${url}`, this.httpOptions).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //   );
  // }

  public get(url: string): Observable<any> {
    const tokenstr = window.sessionStorage.getItem('token');
    // console.log('tokendddddd==', tokenstr);
    // this.httpOptions.headers.set('token', tokenstr);
    // console.log('tokendddddd==', this.httpOptions.headers.get( 'token'));
    if (tokenstr !== undefined) {
      // this.httpOptions = {
      //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': tokenstr})
      // };

      this.httpOptions.headers =
        this.httpOptions.headers.set('token', tokenstr);
    }
    return this.http.get(`${this.baseUrl}${url}`).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }



  // public getblob(url: string): Observable<any> {
  //   const tokenstr = window.sessionStorage.getItem('token');
  //   if (tokenstr !== undefined) {
  //     console.log('tokenstr==', tokenstr);
  //     this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'token': tokenstr});
  //   } else {
  //     console.log('tokenstr是null');
  //   }
  //   console.log('getblob的header==', this.headers.get('token'));
  //   return  this.http.get(`${this.baseUrl}${url}`, {observe: 'response',
  //      headers: this.headers, responseType: 'blob'}) .pipe(
  //   catchError(this.handleError)
  //   );
  //
  //
  // }

  public getblob(url: string): Observable<any> {
    const tokenstr = window.sessionStorage.getItem('token');
    if (tokenstr !== undefined) {
      console.log('tokenstr==', tokenstr);
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'token': tokenstr});
    } else {
      console.log('tokenstr是null');
    }
    console.log('getblob的header==', this.headers.get('token'));
    return  this.http.get(`${this.baseUrl}${url}`, {observe: 'response',
     responseType: 'blob'}) .pipe(
      catchError(this.handleError)
    );


  }

  public gettext(url: string): Observable<any> {
    const tokenstr = window.sessionStorage.getItem('token');
    if (tokenstr !== undefined) {
      console.log('tokenstr==', tokenstr);
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'token': tokenstr});
    } else {
      console.log('tokenstr是null');
    }
    console.log('getblob的header==', this.headers.get('token'));
    return  this.http.get(`${this.baseUrl}${url}`, {observe: 'response',
      responseType: 'text'}) .pipe(
      catchError(this.handleError)
    );


  }

  /**
   * POST请求处理（一般用于保存数据）
   * @param url 后台接口api
   * @param data 参数
   */
  // public post(url: string, data = {}): Observable<any> {
  //   const tokenstr = window.sessionStorage.getItem('token');
  //   console.log('pos里的tokendddddd==', tokenstr);
  //   if (tokenstr !== null) {
  //     this.httpOptions.headers =
  //       this.httpOptions.headers.set('token', tokenstr);
  //   }
  //   return this.http.post(`${this.baseUrl}${url}`, data , this.httpOptions).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //   );
  // }

  public post(url: string, data = {}): Observable<any> {
    const tokenstr = window.sessionStorage.getItem('token');
    console.log('pos里的tokendddddd==', tokenstr);
    if (tokenstr !== null) {
      this.httpOptions.headers =
        this.httpOptions.headers.set('token', tokenstr);
    }
    return this.http.post(`${this.baseUrl}${url}`, data ).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  /**
   * PUT请求处理（一般用于更新数据）
   * @param url 后台接口api 例如：/api/test/6
   * @param data 参数
   */
  public put(url: string, data = {}): Observable<any> {
    const tokenstr = window.sessionStorage.getItem('token');
    if (tokenstr !== undefined) {
      this.httpOptions.headers =
        this.httpOptions.headers.set('token', tokenstr);
    }
    return this.http.put(url, data, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  /**
   * DELETE请求处理（一般用于删除数据）
   * @param url 后台接口api 例如：/api/test/6
   */
  public delete(url: string): Observable<{}> {
    const tokenstr = window.sessionStorage.getItem('token');
    if (tokenstr !== undefined) {
      this.httpOptions.headers =
        this.httpOptions.headers.set('token', tokenstr);
    }
    return this.http.delete(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  /**
   *  提取数据
   * @param res 返回结果
   */
  private extractData(res: Response) {
    console.log('res===', res);
    const body = res;
    return body || {};
  }
  /**
   * 错误消息类
   * param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
