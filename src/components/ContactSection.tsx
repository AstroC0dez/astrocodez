import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'hello@astrocodez.com' },
  { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Visit Us', value: 'Somewhere in the Galaxy' },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const info = infoRef.current;
    const form = formRef.current;

    if (!section || !title || !info || !form) return;

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
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // Mobile animations
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          info.querySelectorAll('.info-item'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: info,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        gsap.fromTo(
          form,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: form,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });

      // Desktop animations
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          info.querySelectorAll('.info-item'),
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: info,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        gsap.fromTo(
          form,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: form,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );

        gsap.fromTo(
          form.querySelectorAll('.form-field'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: form,
              start: 'top 75%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="slide-section py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-10 md:mb-16">
          <span className="animate-item inline-block text-xs md:text-sm font-semibold text-primary uppercase tracking-widest mb-3 md:mb-4">
            Signal Reception
          </span>
          <h2 className="animate-item section-title text-2xl md:text-4xl lg:text-5xl">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="animate-item section-subtitle mx-auto mt-3 md:mt-4 text-sm md:text-base px-4 md:px-0">
            Ready to launch your project? Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div ref={infoRef} className="space-y-4 md:space-y-6 overflow-hidden">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="info-item glass p-4 md:p-6 flex items-center gap-3 md:gap-5 group transition-all duration-500 hover:glow-soft cursor-pointer"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-cosmic flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 flex-shrink-0">
                  <item.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground text-sm md:text-base group-hover:text-primary transition-colors">
                    {item.label}
                  </h4>
                  <p className="text-muted-foreground text-xs md:text-sm truncate">{item.value}</p>
                </div>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 hidden md:block" />
              </div>
            ))}

            {/* CTA Card */}
            <div className="info-item glass p-6 md:p-8">
              <h4 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                Ready to Launch?
              </h4>
              <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-5">
                Join the growing list of businesses we've helped reach new heights.
              </p>
              <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-sm md:text-base">
                <span>Schedule a Call</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass p-6 md:p-8 lg:p-10 space-y-4 md:space-y-6"
          >
            <div className="form-field grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="input-field text-sm md:text-base"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input-field text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-field">
              <label className="block text-xs md:text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                className="input-field text-sm md:text-base"
                placeholder="Project inquiry"
              />
            </div>

            <div className="form-field">
              <label className="block text-xs md:text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                rows={4}
                className="input-field resize-none text-sm md:text-base"
                placeholder="Tell us about your project..."
              />
            </div>

            <button type="submit" className="form-field btn-primary w-full flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base">
              <span>Send Message</span>
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;