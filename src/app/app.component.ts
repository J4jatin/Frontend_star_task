import { Component,OnInit,OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'Starportal';
  
  timeLeft: { days: string; hours: string; minutes: string; seconds: string } = {
    days: '00',
    hours: '12',
    minutes: '00',
    seconds: '00'
  };
  private countDownDate: number;
  private timerId: any;

  videoUrls: string[] = [
    'https://www.youtube.com/embed/dQw4w9WgXcQ.',
    'https://www.youtube.com/embed/-kmxV_JO7eY',
    'https://www.youtube.com/embed/9fyVLvY3P14',
    'https://www.youtube.com/embed/kYeFSwvt1sQ'
  ];
  sanitizedVideoUrls: SafeResourceUrl[] = [];
  isPlaying: boolean[] = [];

  constructor(private cdr: ChangeDetectorRef,private sanitizer: DomSanitizer) {
    this.countDownDate = new Date().getTime() +   12 * 60 * 60 * 1000;
    
  }

  isPanelExpanded = false;
  quests = [
    { 
      title: '#1: But what is crypto and...', 
      tasks: 11, 
      image: '../assets/4eeb6ff08f6640b8bd2edf23864d21c0.png',
      expanded: false,
      taskList: ['Task 1', 'Task 2', 'Task 3'] // Add more tasks as needed
    },
    { 
      title: '#2: Setting up your own web...', 
      tasks: 8, 
      image: '../assets/67e4ee7d187545ccbd28b4a159076068.jpg',
      expanded: false,
      taskList: ['Task 1', 'Task 2', 'Task 3'] // Add more tasks as needed
    },
    { 
      title: '#3: What the heck is a...', 
      tasks: 8, 
      image: '../assets/85903745c34d42d684a2dc505768afa7.png',
      expanded: false,
      taskList: ['Task 1', 'Task 2', 'Task 3'] // Add more tasks as needed
    },
    { 
      title: '#3: What the heck is a...', 
      tasks: 8, 
      image: '../assets/85903745c34d42d684a2dc505768afa7.png',
      expanded: false,
      taskList: ['Task 1', 'Task 2', 'Task 3'] // Add more tasks as needed
    },
    { 
      title: '#2: Setting up your own web...', 
      tasks: 8, 
      image: '../assets/67e4ee7d187545ccbd28b4a159076068.jpg',
      expanded: false,
      taskList: ['Task 1', 'Task 2', 'Task 3'] // Add more tasks as needed
    },
  ];

  startCountdown() {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = this.countDownDate - now;

      if (distance < 0) {
        this.timeLeft = { days: '00', hours: '00', minutes: '00', seconds: '00' };
        this.cdr.detectChanges();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timeLeft = {
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      };

      console.log('Timer updated:', this.timeLeft);
      this.cdr.detectChanges();

      this.timerId = setTimeout(updateTimer, 1000);
    };

    updateTimer();
  }
  
  togglePanel() {
    this.isPanelExpanded = !this.isPanelExpanded;
    this.startCountdown()
  }
  
  toggleVideo(index: number) {
    this.isPlaying[index] = !this.isPlaying[index];
    this.cdr.detectChanges();
  }
  ngOnInit(){
    this.sanitizedVideoUrls = this.videoUrls.map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url));
    this.isPlaying = new Array(this.videoUrls.length).fill(false);
    console.log('Component initialized');

  }



  ngOnDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }


  playVideo(index: number): void {
    this.isPlaying[index] = true;
  }
}

