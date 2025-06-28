import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PointSelectDialogComponent,DialogData } from '../point-select-dialog/point-select-dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BookingDialogComponent,BookingData } from '../booking-dialog/booking-dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  imports:[MatCardModule,MatButtonModule,MatDialogModule,MatFormFieldModule,MatInputModule,CommonModule,FormsModule],
  styleUrls: ['./card.scss']
})
export class CardComponent {
  @Input() busName: string = '';
  @Input() seatNumber: string = '';
  @Input() totalFare: number = 0;
  @Output()  passengerSelected = new EventEmitter();
  
  
  passengerName: string=''
  boardingPoint: string = '';
  droppingPoint: string = '';

  constructor(private dialog: MatDialog) {}

  openBoardingDialog(): void {
    const dialogRef = this.dialog.open<PointSelectDialogComponent, DialogData, string>(
      PointSelectDialogComponent,
      {
        width: '300px',
        data: { title: 'Select Boarding Point', currentValue: this.boardingPoint }
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.boardingPoint = result;
      }
    });
  }
  onNameChange() {
    console.log(this.passengerName);
    this.passengerSelected.emit(this.passengerName);
  }
  
  // bookTicket(): void {
  //   const dialogRef = this.dialog.open(BookingDialogComponent, {
  //     width: '2000px',
  //     data: {currentVale:this.boardingPoint}  // Optional: pass additional data if needed
  //   });

  //   dialogRef.afterClosed().subscribe((result: BookingData) => {
  //     if (result) {
  //       // Process the booking details returned from the dialog
  //       console.log('Booking details:', result);
  //       // You could implement further logic here, like calling an API to confirm the booking.
  //     }
  //   });
  // }


  openDroppingDialog(): void {
    const dialogRef = this.dialog.open<PointSelectDialogComponent, DialogData, string>(
      PointSelectDialogComponent,
      {
        width: '300px',
        data: { title: 'Select Dropping Point', currentValue: this.droppingPoint }
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.droppingPoint = result;
      }
    });
  }
}