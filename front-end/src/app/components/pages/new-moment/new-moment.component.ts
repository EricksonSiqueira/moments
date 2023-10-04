import { Component } from '@angular/core';

import { Moment } from 'src/app/interfaces/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss'],
})
export class NewMomentComponent {
  btnText = 'Compartilhar!';
  isSubmiting = false;

  constructor(
    private momentService: MomentService,
    private messageService: MessagesService,
    private router: Router
  ) {}

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);
    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.isSubmiting = true;
    this.btnText = 'Enviando...';

    this.momentService.createMoment(formData).subscribe(() => {
      this.messageService.add('Momento criado com sucesso!');

      this.router.navigate(['/'], { skipLocationChange: true });
    });

    this.isSubmiting = false;
    this.btnText = 'Compartilhar!';
  }
}
