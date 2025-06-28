import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator }  from '@angular/material/paginator';
import { MatTableDataSource }  from '@angular/material/table';
import { BusService } from '../../services/bus-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.html',
  imports:[ CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
],
  styleUrls: ['./bus-list.scss']
})
export class BusListComponent implements OnInit {
  displayedColumns = ['regNumber','model','type','capacity','status','actions'];
  dataSource       = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private busService: BusService) {}
 

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

  edit(bus:any) {
    // navigate to edit form
  }

  delete(busId: string) {
    // if(!confirm('Delete this bus?')) return;
    // this.busService.delete(busId)
    //   .subscribe(() => this.loadBuses());
  }
}