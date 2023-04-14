import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IServer } from '../model/interface/server';

@Injectable({
  providedIn: 'root',
})
export class CrudExampleService {
  private _url = environment.url;
  private _listPath = this._url + environment.path.list;
  private _getPath = this._url + environment.path.get;
  private _pingPath = this._url + environment.path.ping;
  private _savePath = this._url + environment.path.save;
  private _deletePath = this._url + environment.path.delete;

  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) {}

  getAll(): Observable<IServer[]> {
    return this._http.get<IServer[]>(this._listPath).pipe(
      map((items: any) => {
        return items.data.servers.map((element: any) => {
          return { ...element, id: element?._id };
        });
      })
    );
  }

  getById(id: number): Observable<IServer> {
    return this._http.get<IServer>(`${this._getPath}/${id}`).pipe(
      map((item: any) => {
        return { ...item, id: item?._id };
      })
    );
  }

  create(body: IServer): Observable<IServer> {
    return this._http.post<IServer>(`${this._savePath}`, body);
  }

  delete(id: string): Observable<IServer> {
    return this._http.delete<IServer>(`${this._deletePath}/${id}`);
  }

  ping(ipAddress: string): Observable<IServer> {
    return this._http.get<IServer>(`${this._pingPath}/${ipAddress}`);
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', { duration: 2500 });
  }
}
