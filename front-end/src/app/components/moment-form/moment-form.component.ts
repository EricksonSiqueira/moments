import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.scss'],
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Moment>();
  @Input() btnText!: string;
  @Input() momentData: Moment | null = null;

  mommentForm!: FormGroup;
  isSubmiting = false;

  ngOnInit(): void {
    this.mommentForm = new FormGroup({
      id: new FormControl(this.momentData?.id || ''),
      title: new FormControl(this.momentData?.title || '', [
        Validators.required,
      ]),
      description: new FormControl(this.momentData?.description || '', [
        Validators.required,
      ]),
      image: new FormControl(this.momentData?.image || '', [
        Validators.required,
      ]),
    });
  }

  get title() {
    return this.mommentForm.get('title')!;
  }

  get description() {
    return this.mommentForm.get('description')!;
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];

      this.mommentForm.patchValue({ image: file });
    }
  }

  submit() {
    if (this.mommentForm.invalid) {
      return;
    }

    const oldBtnText = this.btnText;

    this.isSubmiting = true;
    this.btnText = 'Enviando...';

    this.onSubmit.emit(this.mommentForm.value);

    this.isSubmiting = false;
    this.btnText = oldBtnText;
  }
}
