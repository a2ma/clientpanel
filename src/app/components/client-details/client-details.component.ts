import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // get id from URL
    this.id = this.route.snapshot.params.id;
    // get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        this.balanceIndicatorUpdate(client.balance);
      }
      this.client = client;
    });

  }

  updateBalance() {
    console.log(`${this.client.balance}`);
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
    this.balanceIndicatorUpdate(this.client.balance);
  }

  balanceIndicatorUpdate(balance: number) {
    if (balance > 0) {
      this.hasBalance = true;
    } else {
      this.hasBalance = false;
    }
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client removed.', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    } else {
      console.log('shaddup');
    }
  }

}
