import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/interfaces/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.scss'],
})
export class EditMomentComponent implements OnInit {
  moment!: Moment;
  btnText = 'Editar momento';
  isSubmiting = false;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMoment();
  }

  async getMoment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    await this.momentService.getMomentById(id).subscribe((response) => {
      const data = response?.data;
      const threatedMoment = {
        ...data,
        created_at: new Date(data.created_at!).toLocaleString('pt-BR'),
        updated_at: new Date(data.updated_at!).toLocaleString('pt-BR'),
      };

      this.moment = threatedMoment;
    });
  }

  async editHandler(momentData: Moment) {
    const id = this.moment.id;

    const formData = new FormData();
    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    this.btnText = 'Editando...';
    this.isSubmiting = true;

    console.log('texto do botão', this.btnText);

    this.momentService.editMoment(id!, formData).subscribe(() => {
      this.messagesService.add(
        `Momento "${this.moment.title}" editado com sucesso!`
      );
      this.router.navigate([`/moments/${id}`], { skipLocationChange: true });
    });

    this.btnText = 'Editar momento';
    this.isSubmiting = false;
  }
}
