import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Zouhaier Alashram',
    role: 'Backend Developer',
    bio: 'Architecting robust systems and APIs that power the cosmos.',
    initials: 'ZA',
    gradient: 'from-purple-500 to-blue-500',
  },
  {
    name: 'Yahya Loulou',
    role: 'Front End Developer',
    bio: 'Crafting stellar user interfaces and experiences.',
    initials: 'YL',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Baraa Sheikha',
    role: 'DevOps Engineer',
    bio: 'Building and maintaining infrastructure that scales across galaxies.',
    initials: 'BS',
    gradient: 'from-cyan-500 to-green-500',
  },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mobileGridRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const mobileGrid = mobileGridRef.current;
    const desktopScroll = desktopScrollRef.current;

    if (!section || !title) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Title animation
      gsap.set(title.querySelectorAll('.animate-item'), { opacity: 1, y: 0 });
      
      gsap.fromTo(
        title.querySelectorAll('.animate-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Mobile: Modern card animation with fade-in and slide-up
      mm.add('(max-width: 767px)', () => {
        if (!mobileGrid) return;
        
        const cards = mobileGrid.querySelectorAll('.mobile-team-card');
        gsap.set(cards, { opacity: 1, y: 0 });
        
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                end: 'bottom 5%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      });

      // Desktop: Horizontal scroll
      mm.add('(min-width: 768px)', () => {
        if (!desktopScroll) return;

        const cards = desktopScroll.querySelectorAll('.team-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              delay: index * 0.05,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: desktopScroll,
                start: 'top 80%',
                toggleActions: 'play reverse play reverse',
              },
            }
          );
        });

        const scrollWidth = desktopScroll.scrollWidth - desktopScroll.clientWidth;
        
        if (scrollWidth > 0) {
          gsap.to(desktopScroll, {
            scrollLeft: scrollWidth,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 20%',
              end: () => `+=${scrollWidth}`,
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
            },
          });
        }
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
      id="team"
      className="slide-section py-12 md:py-24 overflow-hidden"
    >
      {/* Desktop Title */}
      <div className="hidden md:block container mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <div ref={titleRef} className="text-center">
          <span className="animate-item inline-block text-sm font-semibold text-primary uppercase tracking-widest mb-4">
            The Astros
          </span>
          <h2 className="animate-item section-title text-4xl lg:text-5xl">
            <span className="gradient-text">Meet The Team</span>
          </h2>
        </div>
      </div>

      {/* Mobile: Completely Redesigned Section */}
      <div className="md:hidden">
        {/* Mobile Title */}
        <div className="px-4 mb-8 text-center">
          <div className="inline-block mb-2">
            <span className="text-xs font-bold text-primary uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10">
              Our Team
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Meet The Crew</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            The brilliant minds behind our cosmic journey
          </p>
        </div>

        {/* Mobile: Clean Grid Cards */}
        <div
          ref={mobileGridRef}
          className="px-4 space-y-3"
        >
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="mobile-team-card group relative overflow-hidden"
            >
              {/* Card Background with Gradient Border Effect */}
              <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-300">
                {/* Content Container */}
                <div className="flex items-start gap-3">
                  {/* Avatar with Gradient */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-105`}
                    >
                      <span className="text-lg font-bold text-white">{member.initials}</span>
                    </div>
                    {/* Decorative Dot */}
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${member.gradient} animate-pulse`} />
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${member.gradient}`} />
                      <p className="text-xs font-semibold text-primary/80">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Subtle Background Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                  <div className={`w-full h-full bg-gradient-to-br ${member.gradient} rounded-full blur-2xl`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Decoration */}
        <div className="mt-8 px-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <p className="text-center text-xs text-muted-foreground mt-4">
            {teamMembers.length} talented members • Building the future
          </p>
        </div>
      </div>

      {/* Desktop: Horizontal Scroll Gallery */}
      <div
        ref={desktopScrollRef}
        className="hidden md:flex gap-8 px-6 lg:px-12 overflow-x-auto hide-scrollbar"
      >
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card flex-shrink-0 group">
            {/* Avatar */}
            <div
              className={`w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
            >
              <span className="text-3xl font-bold text-white">{member.initials}</span>
            </div>

            {/* Info */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-semibold mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm max-w-[250px]">
                {member.bio}
              </p>
            </div>

            {/* Decorative dot */}
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary/40 animate-pulse-slow" />
          </div>
        ))}
      </div>

      {/* Scroll hint - desktop only */}
      <div className="hidden md:block container mx-auto px-6 mt-10">
        <p className="text-center text-muted-foreground text-sm">
          ← Scroll to explore our team →
        </p>
      </div>
    </section>
  );
};

export default TeamSection;