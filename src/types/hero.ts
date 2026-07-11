export interface HeroCta {
  label: string;
  href: string;
}

export interface HeroSlide {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  image: string;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
}
