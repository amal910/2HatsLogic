import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

interface Product {
  title: string;
  description: string;
  image: string;
  category: string;
  layout: string
}

interface Project {
  name: string;
  type: string;
  image: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  animations: [
    trigger('fadeInUp', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate(800)
      ])
    ]),
    trigger('fadeInLeft', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'translateX(-30px)'}),
        animate(800)
      ])
    ]),
    trigger('fadeInRight', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'translateX(30px)'}),
        animate(800)
      ])
    ]),
    trigger('scaleIn', [
      state('in', style({opacity: 1, transform: 'scale(1)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'scale(0.95)'}),
        animate(600)
      ])
    ]),
    trigger('slideInBottom', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => *', [
        style({opacity: 0, transform: 'translateY(50px)'}),
        animate(800)
      ])
    ]),
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = '2hatslogic';
  navItems = [
    'HOME',
    'WORKS',
    'PRODUCTS & SERVICES',
    'SHOWROOMS',
    'COMPANY',
    'NEWS',
    'CONTACT'
  ];

  @ViewChild('firstSection', { static: false }) firstSection!: ElementRef;
  @ViewChild('productsSection', { static: false }) productsSection!: ElementRef;
  @ViewChild('projectsSection', { static: false }) projectsSection!: ElementRef;
  @ViewChild('footerSection', { static: false }) footerSection!: ElementRef;

  products: Product[] = [
    {
      title: 'Bathroom Tiles',
      description: 'Ante mus blandit sapien sociosqu per consequat ad.',
      image: '../assets/bathtoom.png',
      category: 'Bathroom',
      layout: 'full-width'
    },
    {
      title: 'Marble',
      description: 'Ante mus blandit sapien sociosqu',
      image: '../assets/marble.png',
      category: 'Marble',
      layout: 'full-width'
    },
    {
      title: 'Kitchen Interior',
      description: 'Ante mus blandit sapien sociosqu per consequat ad.',
      image: '../assets/kitchen.png',
      category: 'Kitchen',
      layout: 'small'
    },
    {
      title: 'Outdoor Flooring',
      description: 'Ante mus blandit sapien sociosqu per consequat ad.',
      image: '../assets/outdoor.png',
      category: 'Outdoor',
      layout: 'small'
    }
  ];

  projects: Project[] = [
    {
      name: 'Kingdom Tower',
      type: 'Marble Flooring',
      image: '../assets/kingdom.png'
    },
    {
      name: 'Dubai Mall',
      type: 'Wood Flooring',
      image: '../assets/dubai.png'
    },
    {
      name: 'King Road Offices',
      type: 'Outdoor Flooring',
      image: '../assets/kingRoad.png'
    },
    {
      name: 'Beach Tower Jeddah',
      type: 'Wood Flooring',
      image: '../assets/beach.png'
    }
  ];

  footerSections = [
    {
      title: 'Products',
      links: ['Sand Stone' , 'Stone', 'Cement', 'Soft Stone']
    },
    {
      title: 'Services',
      links: [ 'Measurement Service' , 'Product Advice', 'Interior Design']
    }
  ];

  isMobileMenuOpen = false;
  isScrolled = false;

    // Animation states
    heroVisible = false;
    productsVisible = false;
    projectsVisible = false;
    footerVisible = false;

    ngOnInit() {
      // Initialize intersection observers for scroll animations
      setTimeout(() => {
        this.setupIntersectionObservers();
      }, 100);
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.isScrolled = window.pageYOffset > 10;
    }

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    private setupIntersectionObservers() {
      const options = {
        threshold: 0.2,
        rootMargin: '0px'
      };

      // Hero section observer
      if (this.firstSection) {
        const heroObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.heroVisible = true;
            }
          });
        }, options);
        heroObserver.observe(this.firstSection.nativeElement);
      }

      // Products section observer
      if (this.productsSection) {
        const productsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.productsVisible = true;
            }
          });
        }, options);
        productsObserver.observe(this.productsSection.nativeElement);
      }

      // Projects section observer
      if (this.projectsSection) {
        const projectsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.projectsVisible = true;
            }
          });
        }, options);
        projectsObserver.observe(this.projectsSection.nativeElement);
      }

      // Footer section observer
      if (this.footerSection) {
        const footerObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.footerVisible = true;
            }
          });
        }, { threshold: 0.1 });
        footerObserver.observe(this.footerSection.nativeElement);
      }
    }

    onImageLoad(event: Event) {
      const img = event.target as HTMLImageElement;
      img.classList.add('loaded');
    }

}
