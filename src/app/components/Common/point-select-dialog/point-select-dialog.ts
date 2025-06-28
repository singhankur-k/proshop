import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  title: string;
  currentValue: string;
}

@Component({
  selector: 'app-point-select-dialog',
  templateUrl: './point-select-dialog.html',
  imports:[ReactiveFormsModule,MatDialogModule,MatFormFieldModule,MatInputModule],
  styleUrls: ['./point-select-dialog.scss']
})
export class PointSelectDialogComponent {
  pointForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PointSelectDialogComponent, string>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    this.pointForm = this.fb.group({
      point: [data.currentValue, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.pointForm.valid) {
      const point = this.pointForm.value.point;
      this.dialogRef.close(point);
    }
  }
}