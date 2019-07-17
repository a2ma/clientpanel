import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit = true;

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
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Please correctly fill out all fields.', { cssClass: 'alert-danger', timeout: 4000 });
    } else {
      // add id to client coming in from form
      value.id = this.id;
      // update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client Updated.', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/client/' + this.client.id]);
    }
  }

}
