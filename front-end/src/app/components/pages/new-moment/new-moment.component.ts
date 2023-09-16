import { Component } from '@angular/core';

import { Moment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar!';

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);
    if (moment.image) {
      formData.append('image', moment.image);
    }

    // enviar para o service

    // exibir mensagem

    // redirect
  }
}
