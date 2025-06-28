import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
export interface BookingData {
  passengerName: string;
  contactNo: string;
  email: string;
}

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.html',
  imports:[ReactiveFormsModule,MatDialogModule,MatFormFieldModule,MatInputModule,MatLabel,CommonModule],
  styleUrls: ['./booking-dialog.scss']
})
export class BookingDialogComponent {
  bookingForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Build a reactive form with three fields
    this.bookingForm = this.fb.group({
      passengerName: ['', Validators.required],
      contactNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onBook(): void {
    if (this.bookingForm.valid) {
      // Pass the form values back to the opener
      this.dialogRef.close(this.bookingForm.value);
    }
  }
}