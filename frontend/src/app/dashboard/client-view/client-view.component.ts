import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ClientServiceClient} from "../../proto/ClientServiceClientPb";
import {ClientService} from "../services/client.service";
import {EMPTY, Observable} from "rxjs";
import {Client} from "../../proto/client_pb";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CreateClientComponent} from "./create-client/create-client.component";

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})

export class ClientViewComponent implements OnInit {
  clients: Observable<Client[]> = EMPTY;

  constructor(private route: ActivatedRoute, private clientService: ClientService, public dialog: MatDialog) {
    //this.getAllClients()
  }

  ngOnInit(): void {
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

    this.clients = this.clientService.getAllClients(tenantId)
  }
}

