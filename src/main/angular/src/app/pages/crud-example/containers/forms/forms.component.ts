import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudExampleService } from 'src/app/shared/crud-example/crud-example.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { IServer } from 'src/app/shared/model/interface/server';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnDestroy {
  private _subscriptions: Subscription[] = [];

  form: FormGroup = new FormGroup({
    ipAddress: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    memory: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
  });

  constructor(
    private _crudExampleService: CrudExampleService,
    private _dialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    const {
      snapshot: {
        params: { id },
      },
    } = this._route;

    if (!!id) {
      this._getById(id);
    }
  }

  get nameField(): AbstractControl | null {
    return this.form.get('name');
  }

  get ipField(): AbstractControl | null {
    return this.form.get('ipAddress');
  }

  get memoryField(): AbstractControl | null {
    return this.form.get('memory');
  }

  get typeField(): AbstractControl | null {
    return this.form.get('type');
  }

  get statusField(): AbstractControl | null {
    return this.form.get('status');
  }

  private _getById(id: number): void {
    const sub = this._crudExampleService.getById(id).subscribe((item) => {
      this.form.patchValue(item);
    });
    this._subscriptions.push(sub);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (!!value?.id) {
      this._openDialog(false, false, value);
      return;
    }
    this._openDialog(true, false, value);
  }

  private _create(body: IServer): void {
    const sub = this._crudExampleService.create(body).subscribe((item) => {
      this._crudExampleService.openSnackBar('Registro creado con exito');
      this._goList();
    });
    this._subscriptions.push(sub);
  }

  private _openDialog(
    create: boolean,
    back: boolean,
    body: IServer = {} as IServer
  ): void {
    const sub = this._dialog
      .open(DialogComponent, {
        data: back ? 'Volver' : create ? 'Crear' : 'Editar',
      })
      .afterClosed()
      .subscribe((value) => {
        if (!value) return;
        if (back) {
          this._goList();
        }
        if (create) {
          this._create(body);
        }
      });
    this._subscriptions.push(sub);
  }

  back() {
    this._openDialog(false, true);
  }

  private _goList() {
    this._router.navigate(['../']);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub && sub.unsubscribe());
  }
}
