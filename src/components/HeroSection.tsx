import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mainIcon from '@/assets/main-icon.png';
import mainImage from '@/assets/main.png';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const icon = iconRef.current;
    const overlay = overlayRef.current;
    const mobileImage = mobileImageRef.current;

    if (!section || !content || !icon || !overlay) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Initial entrance animations
      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(
        content.querySelectorAll('.animate-item'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );

      // Mobile: animate image on scroll
      mm.add('(max-width: 767px)', () => {
        if (mobileImage) {
          gsap.to(mobileImage, {
            y: -50,
            opacity: 0,
            scale: 0.8,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      });

      // Desktop: animate icon
      mm.add('(min-width: 768px)', () => {
        tl.fromTo(
          icon,
          { scale: 0.5, opacity: 0, rotation: -30 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
          '-=0.6'
        );

        gsap.to(icon, {
          rotation: 180,
          scale: 0.5,
          y: 200,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      // Content scroll animation
      gsap.to(content, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(overlay, {
        opacity: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="slide-section pt-24 md:pt-32 pb-16 md:pb-20"
    >
      {/* Ambient glow - smaller on mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-radial opacity-50 pointer-events-none" />
      
      {/* Overlay for scroll transition */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background/0 pointer-events-none z-10"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
          {/* Content */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Mobile-only image */}
            <div ref={mobileImageRef} className="animate-item block md:hidden mb-4 flex justify-center">
              <img
                src={mainImage}
                alt="Astro Codez"
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="animate-item">
              <span className="inline-block px-3 md:px-4 py-2 glass-subtle text-xs md:text-sm font-medium text-primary mb-4 md:mb-6">
                🚀 Welcome to the Future
              </span>
            </div>

            <h1 className="animate-item section-title mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              <span className="gradient-text">Building Digital</span>
              <br />
              <span className="text-foreground">Universes</span>
            </h1>

            <p className="animate-item section-subtitle mb-8 md:mb-10 text-sm md:text-base px-2 md:px-0">
              Our Vision Is Revolutionary. It's Not Just Coding, It's About Taking 
              Businesses To Other Galaxies!
            </p>

            <div className="animate-item flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 md:px-0">
              <a href="#contact" className="btn-primary text-sm md:text-base py-3 md:py-4">
                <span>Start Your Project</span>
              </a>
              <a href="#services" className="btn-secondary text-sm md:text-base py-3 md:py-4">
                Explore Services
              </a>
            </div>
          </div>

          {/* Icon - Hidden on mobile */}
          <div ref={iconRef} className="hidden md:flex flex-1 justify-center items-center">
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 scale-150 bg-gradient-radial animate-pulse-slow" />
              
              {/* Orbital ring */}
              <div className="absolute -inset-10 border border-primary/20 rounded-full animate-rotate-slow" />
              <div className="absolute -inset-20 border border-secondary/10 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />
              
              {/* Main icon */}
              <img
                src={mainIcon}
                alt="Astro Codez"
                className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-primary animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;