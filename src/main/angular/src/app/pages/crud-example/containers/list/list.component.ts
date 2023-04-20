import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudExampleService } from 'src/app/shared/crud-example/crud-example.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { IServer } from 'src/app/shared/model/interface/server';
import { FilterPipe } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [FilterPipe],
})
export class ListComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  public criterial: string = '';

  displayedColumns: string[] = [
    'ipAddress',
    'imageUrl',
    'name',
    'memory',
    'type',
    'status',
    'operation',
  ];
  dataSource: IServer[] = [];
  servers: IServer[] = [];

  constructor(
    private _crudExampleService: CrudExampleService,
    private _dialog: MatDialog,
    private _router: Router,
    private _filterPipe: FilterPipe
  ) {}

  ngOnInit(): void {
    this._getAll();
  }

  private _getAll(): void {
    const sub = this._crudExampleService.getAll().subscribe((item) => {
      this.dataSource = item;
      this.servers = item;
    });
    this._subscriptions.push(sub);
    console.log(sub);
  }

  ping(ipAddress: string): void {
    this._crudExampleService.openSnackBar('Ping...');
    this._crudExampleService.ping(ipAddress).subscribe(
      (response: any) => {
        // Update the corresponding server object in the servers array
        const index = this.servers.findIndex(
          (server) => server.ipAddress === ipAddress
        );
        if (index >= 0) {
          this.servers[index].status = response.data.server.status;
        }
        console.log(response); // Handle the response as per your requirement
      },
      (error) => {
        console.log(error); // Handle the error as per your requirement
      }
    );
  }

  delete(id: string): void {
    this._dialog
      .open(DialogComponent, {
        data: 'Eliminar',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this._crudExampleService.delete(id).subscribe(() => {
            this._crudExampleService.openSnackBar(
              'Registro se elimino con exito'
            );
            this._getAll();
          });
        }
      });
  }

  goForm(id?: number): void {
    const path = !!id ? `forms/${id}` : 'forms';
    this._router.navigate([path]);
  }

  filterUsers(): void {
    if (this.criterial) {
      this.dataSource = this._filterPipe.transform(
        this.servers,
        this.criterial
      );
    } else {
      this.dataSource = this.servers;
    }
  }

  test(): void {
    this.filterUsers();
  }

  listUsers(): void {
    this.dataSource = this.servers;
    this.criterial = '';
  }

  applyFilter(): void {
    this.dataSource = this.servers.filter((server) =>
      server.name
        .trim()
        .toLowerCase()
        .includes(this.criterial.trim().toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub && sub.unsubscribe());
  }
}
