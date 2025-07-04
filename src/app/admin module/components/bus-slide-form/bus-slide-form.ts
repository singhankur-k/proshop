import { Component, ViewChild , Output,EventEmitter, inject} from '@angular/core';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgForm } from '@angular/forms';
import { BusService } from '../../services/bus-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-bus-slide-form',
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  
  ],
  
  templateUrl: './bus-slide-form.html',
  styleUrl: './bus-slide-form.scss'
})
export class BusSlideForm {
  @ViewChild('drawer') drawer!: MatDrawer;
  @ViewChild('busForm',{static:false}) busFormRef!: NgForm;

  @Output() onClose = new EventEmitter<void>();
  @Output() onOpen = new EventEmitter<void>();
//  @Output() onSubmit = new EventEmitter<any>();
  busService = inject(BusService)
  toaster = inject(ToastrService)

  open(): void {
    this.drawer.open();
  }

  close(): void {
    this.drawer.close();
  }


  submitBusForm(): void {
    if (this.busFormRef?.valid) {
      const formData = this.busFormRef.value;
      console.log('Submitted Bus Data:', formData);
  
      this.busService.AddNewBus(formData).subscribe({
        next: () => {
          this.toaster.success('✅ Bus added successfully');
          this.busFormRef.resetForm();
          this.close();
        },
        error: (err) => {
          console.error('❌ Error adding bus:', err);
          this.toaster.error('Something went wrong. Please try again.');
        }
      });
    } else {
      this.toaster.error('Form is invalid. Please fill all required fields.');
      console.warn('Form is invalid');
    }
  }

}
