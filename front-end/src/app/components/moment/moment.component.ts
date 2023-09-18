import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent {
  moment!: Moment;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute
  ) {
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
}
