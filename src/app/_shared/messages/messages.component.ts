import { Component, inject } from '@angular/core';
import { MessagesService } from '../../_services/messages.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  messagesService = inject(MessagesService);

  message = this.messagesService.message;

  onClose() {
    this.messagesService.clear();
  }
}
