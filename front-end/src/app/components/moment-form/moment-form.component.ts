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

  mommentForm!: FormGroup;

  ngOnInit(): void {
    this.mommentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
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

    console.log(this.mommentForm.value);

    this.onSubmit.emit(this.mommentForm.value);
  }
}
