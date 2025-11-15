import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],   // <--- IMPORTANTE
  templateUrl: './app.html',
  styleUrls: ['./app.css']          // <--- Debe ser plural
})
export class App implements OnInit, OnDestroy {
  title = 'Boda Rosales Perez';

  weddingDate = new Date('2025-12-20T16:30:00');

  countdown: Countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  private intervalId: any;

  rsvpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rsvpForm = this.fb.group({
      attendance: ['yes', Validators.required],
      message: [''],
      guestName: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateCountdown(): void {
    const now = new Date().getTime();
    const diff = this.weddingDate.getTime() - now;

    if (diff <= 0) {
      this.countdown = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
      return;
    }

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    this.countdown = {
      days: this.pad(days),
      hours: this.pad(hours % 24),
      minutes: this.pad(minutes % 60),
      seconds: this.pad(seconds % 60),
    };
  }

  private pad(v: number): string {
    return v < 10 ? `0${v}` : `${v}`;
  }

  onSubmitRSVP(): void {
    if (this.rsvpForm.invalid) {
      this.rsvpForm.markAllAsTouched();
      return;
    }

    console.log('RSVP enviado:', this.rsvpForm.value);
    alert('¡Gracias por confirmar tu asistencia!');
    this.rsvpForm.reset({ attendance: 'yes' });
  }

  openMap(): void {
    window.open('https://ul.waze.com/ul?ll=14.53405018%2C-90.47651052&navigate=yes&zoom=17&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location', '_blank');
  }

  openPhotoQR(): void {
    window.open('https://drive.google.com/drive/folders/1HKOxY0TOMhmWxZVTedoom1COA7FmHpIC', '_blank');
  }
}
