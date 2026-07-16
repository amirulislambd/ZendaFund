import type { HeroSlide } from '@/types/hero';

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: 'Crowdfunding, reimagined',
    headingLine1: 'Empower Ideas,',
    headingLine2: 'Ignite Change',
    description:
      'The next generation of secure, transparent crowdfunding. Invest in social and creative impact with institutional-grade security and community-led transparency.',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    primaryCta: { label: 'Explore Campaigns', href: '/explore' },
    secondaryCta: { label: 'Launch a Fund', href: '/dashboard' },
  },
  {
    eyebrow: 'Built on trust',
    headingLine1: 'Fund What You',
    headingLine2: 'Believe In',
    description:
      'Every campaign is vetted, every transaction is on-chain, and every backer has a voice. Transparency isn’t a feature here — it’s the foundation.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    primaryCta: { label: 'Explore Campaigns', href: '/explore' },
    secondaryCta: { label: 'Launch a Fund', href: '/dashboard' },
  },
  {
    eyebrow: 'Community-led',
    headingLine1: 'Small Checks,',
    headingLine2: 'Real Impact',
    description:
      'From neighborhood gardens to grassroots studios, thousands of backers are proving that collective capital moves faster than committees.',
    image:
      'https://images.unsplash.com/photo-1616680214084-22670de1bc82?fm=jpg&q=80&w=1600&auto=format&fit=crop',
    primaryCta: { label: 'Explore Campaigns', href: '/explore' },
    secondaryCta: { label: 'Launch a Fund', href: '/dashboard' },
  },
];
