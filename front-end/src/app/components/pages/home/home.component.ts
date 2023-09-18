import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  moments: Moment[] = [];
  filteredMoments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  //todo search

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((response) => {
      const data = response?.data;
      const threatedMoments = data?.map((moment) => ({
        ...moment,
        created_at: new Date(moment.created_at!).toLocaleString('pt-BR'),
        updated_at: new Date(moment.updated_at!).toLocaleString('pt-BR'),
      }));

      console.log('momentos', response);

      this.moments = threatedMoments;
      this.filteredMoments = threatedMoments;
    });
  }
}
