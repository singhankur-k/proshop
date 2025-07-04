import { Component, inject, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator }  from '@angular/material/paginator';
import { MatTableDataSource }  from '@angular/material/table';
import { BusService } from '../../services/bus-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { BusSlideForm } from '../bus-slide-form/bus-slide-form';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.html',
  imports:[ CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BusSlideForm,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    BusSlideForm
],
  styleUrls: ['./bus-list.scss']
})
export class BusListComponent implements OnInit {
  displayedColumns = ['regNumber','model','type','capacity','status','actions'];
  dataSource       = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(BusSlideForm,{ static: false }) busSlideForm!: BusSlideForm;

showForm = false;
  constructor(private busService: BusService, private dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  showBusFormData(){
    this.busSlideForm.open();
    //this.busSlideForm.emit(); // Notify parent
    
  }
  open(): void {
  
  }
  
  Close(): void {
    this.busSlideForm.close();
     // Notify parent
  }
  

  ngOnInit() {
    //this.loadBuses();
    this.loadBuses();
  }

  loadBuses() {
    this.busService.getAllBuses().subscribe(buses => {
      this.dataSource.data = buses.data;
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data,buses);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // openBusDialog() {
  //   const dialogRef = this.dialog.open(BusFormComponent, {
  //     width: '600px',
  //     height:'700px',

  //     disableClose: true,
  //     data: { /* optional initial data */ }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log('Form result:', result);
  //       // call API here
  //     }
  //   });
  // }

  edit(bus:any) {
    // navigate to edit form
  }

  delete(busId: string) {
    // if(!confirm('Delete this bus?')) return;
    // this.busService.delete(busId)
    //   .subscribe(() => this.loadBuses());
  }
}