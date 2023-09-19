import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/interfaces/Comment';
import { Moment } from 'src/app/interfaces/Moment';
import { CommentService } from 'src/app/services/comment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnInit {
  moment!: Moment;

  commentForm!: FormGroup;

  baseApiUrl = environment.baseApiUrl;

  faEdit = faEdit;
  faTrashCan = faTrashCan;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getMoment();

    this.commentForm = new FormGroup({
      username: new FormControl(''),
      text: new FormControl(''),
    });
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  get text() {
    return this.commentForm.get('text')!;
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

  removeHandler(id: number) {
    this.momentService.removeMoment(id).subscribe(() => {
      this.messagesService.add('Momento excluido com sucesso!');

      this.router.navigate(['/']);
    });
  }

  async onSubmit(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const comment: Comment = {
      ...this.commentForm.value,
      momentId: this.moment.id,
    };

    await this.commentService
      .createComment(comment)
      .subscribe((response) => this.moment.comments?.push(response.data));

    this.messagesService.add('Comentário adicionado com sucesso!');

    this.commentForm.reset();

    formDirective.resetForm();
  }
}
