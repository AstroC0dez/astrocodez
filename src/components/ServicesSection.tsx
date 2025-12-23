import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Smartphone, Database, Cloud, Palette, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'High-performing websites that orbit around your brand\'s goals.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Intuitive mobile apps for iOS and Android in everyone\'s pocket.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: 'ERP Systems',
    description: 'Custom ERP solutions that integrate processes, data, and teams.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Cloud,
    title: 'SaaS Development',
    description: 'Powerful, scalable Software-as-a-Service solutions in the cloud.',
    color: 'from-pink-500 to-purple-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Interfaces that are visually stunning and feel out of this world.',
    color: 'from-purple-500 to-blue-500',
  },
  {
    icon: Lightbulb,
    title: 'IT Consulting',
    description: 'Expert IT consulting to guide you through the tech cosmos.',
    color: 'from-blue-500 to-purple-500',
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Mobile: simpler stagger animation
      mm.add('(max-width: 767px)', () => {
        const cards = grid.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              delay: index * 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });
      });

      // Desktop: 3D transform animation
      mm.add('(min-width: 768px)', () => {
        const cards = grid.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { 
              y: 80, 
              opacity: 0, 
              scale: 0.9,
              rotationX: 15
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              duration: 0.5,
              delay: index * 0.06,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
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
      id="services"
      className="slide-section py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-10 md:mb-16">
          <span className="animate-item inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-3 md:mb-4">
            The Orbit
          </span>
          <h2 className="animate-item section-title text-2xl md:text-4xl lg:text-5xl">
            <span className="gradient-text">Our Services</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group cursor-pointer p-5 md:p-6"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 md:mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
              >
                <service.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3 transition-colors duration-300 group-hover:text-primary">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;