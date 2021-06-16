import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ClientService} from "../services/client.service";
import {Client} from "../../proto/client_pb";
import {MatDialog} from '@angular/material/dialog';
import {CreateClientComponent} from "./create-client/create-client.component";
import {MatTableDataSource} from "@angular/material/table";
import {newArray} from "@angular/compiler/src/util";
import {Observable} from "rxjs";


@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})

export class ClientViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'contact'];

  constructor(private route: ActivatedRoute, private clientService: ClientService, public dialog: MatDialog) {
  }

  async ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateClientComponent, {
      width: '30%',
      height: '50%',
      data: {
        tenantId: this.route.snapshot.params.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getAllClients() {
    let tenantId: string = this.route.snapshot.params.id;

    //return this.clientService.getAllClients(tenantId)

  }
}
