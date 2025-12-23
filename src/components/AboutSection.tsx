import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import astronaut from '@/assets/astronaut.png';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '100%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const statsEl = statsRef.current;

    if (!section || !content || !image || !statsEl) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Mobile animations
      mm.add('(max-width: 767px)', () => {
        // Set initial visible state
        gsap.set(content.querySelectorAll('.animate-item'), { opacity: 1, y: 0 });
        gsap.set(image, { opacity: 1, y: 0, scale: 1 });
        gsap.set(statsEl.querySelectorAll('.stat-item'), { opacity: 1, y: 0, scale: 1 });

        gsap.fromTo(
          content.querySelectorAll('.animate-item'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          image,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          statsEl.querySelectorAll('.stat-item'),
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsEl,
              start: 'top 95%',
              end: 'bottom 5%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Desktop animations
      mm.add('(min-width: 768px)', () => {
        // Set initial visible state so section is visible when navigating to it
        gsap.set(content.querySelectorAll('.animate-item'), { opacity: 1, x: 0 });
        gsap.set(image, { opacity: 1, x: 0, rotation: 0 });
        gsap.set(statsEl.querySelectorAll('.stat-item'), { opacity: 1, y: 0 });

        gsap.fromTo(
          content.querySelectorAll('.animate-item'),
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          image,
          { x: 100, opacity: 0, rotation: 10 },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          statsEl.querySelectorAll('.stat-item'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsEl,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.to(image, {
          y: -30,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
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
      id="about"
      className="slide-section py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
          {/* Content */}
          <div ref={contentRef} className="flex-1 max-w-xl order-2 lg:order-1">
            <span className="animate-item inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-3 md:mb-4">
              The Crew
            </span>
            
            <h2 className="animate-item section-title mb-6 md:mb-8 text-2xl md:text-4xl lg:text-5xl">
              <span className="gradient-text">Who Are We?</span>
            </h2>

            <div className="space-y-4 md:space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p className="animate-item">
                Astrocodez Is a Young Passionate Team Of Software Engineers & Designers
                Who Are Turning Digital Ideas Into Reality.
              </p>
              <p className="animate-item">
                We Believe That Everyone Deserves To Make Outcomes From Their Technology
                Investments. Our unique methodology focuses on understanding your business 
                challenges first, before we align the right tech solutions.
              </p>
              <p className="animate-item hidden md:block">
                We Craft The Best Functioning Apps, Websites & Systems That Can Push Your
                Business Forward and Help You Achieve Your Goals!
              </p>
              <p className="animate-item text-base md:text-lg font-semibold text-foreground italic">
                "Accelerate your Brilliance Through The Galaxies."
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-3 md:gap-6 mt-8 md:mt-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item glass-subtle px-4 md:px-6 py-3 md:py-4 text-center flex-1"
                >
                  <div className="text-xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="flex-1 flex justify-center items-center order-1 lg:order-2">
            <div className="relative">
              {/* Glow backdrop */}
              <div className="absolute inset-0 scale-125 bg-gradient-radial opacity-40" />
              
              {/* Decorative elements - hidden on mobile */}
              <div className="hidden md:block absolute -top-8 -right-8 w-16 h-16 border border-primary/30 rounded-full animate-pulse-slow" />
              <div className="hidden md:block absolute -bottom-6 -left-6 w-10 h-10 bg-secondary/20 rounded-full animate-float" />
              
              {/* Astronaut image */}
              <img
                src={astronaut}
                alt="Astrocodez Team"
                className="relative z-10 w-48 h-48 md:w-72 md:h-72 lg:w-[400px] lg:h-[400px] object-contain animate-float-slow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;