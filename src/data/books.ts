export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  coverGradient: string;
  chapters: string[];
  tags: string[];
  gumroadLink: string;
  featured?: boolean;
}

export const books: Book[] = [
  {
    slug: 'medicaid-estate-recovery',
    title: 'Precious Fix My Life',
    subtitle: 'Medicaid Estate Recovery Edition',
    description: 'A practical guide to protecting your assets from Medicaid estate recovery. If you or a loved one has ever received Medicaid benefits, this book walks you through what estate recovery is, which states enforce it, which assets are exempt, and exactly what steps you can take NOW to shield your family\'s wealth — without expensive attorneys.',
    price: 29,
    coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    chapters: [
      'What Medicaid Estate Recovery Actually Is',
      'Which States Enforce It (And Which Don\'t)',
      'The Exempt Assets List — What They Can\'t Touch',
      'Strategies to Protect Your Home',
      'Ladybird Deeds Explained Simply',
      'Medicaid Divestment and the Look-Back Rule',
      'Irrevocable Trusts for Asset Protection',
      'How to Qualify for Medicaid Without Losing Everything',
      'State-Specific Recovery Rules Cheat Sheet',
      'What to Do If You\'re Already Under Review',
    ],
    tags: ['Medicaid', 'Asset Protection', 'Estate Planning'],
    gumroadLink: 'https://psantana.gumroad.com/l/gfzlzy',
    featured: true,
  },
  {
    slug: 'fmla-edition',
    title: 'Precious Fix My Life',
    subtitle: 'FMLA Edition',
    description: 'Know your workplace rights — and use them without fear. This guide explains the Family and Medical Leave Act in plain language: who qualifies, how long job protection lasts, how to file paperwork correctly, what to do if your employer retaliates, and how to navigate medical leave without destroying your career.',
    price: 29,
    coverGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    chapters: [
      'Understanding FMLA: Your Rights at a Glance',
      'Who Qualifies and How the 12-Month Rule Works',
      'Serious Health Conditions: What Counts and What Doesn\'t',
      'How to File FMLA Paperwork the Right Way',
      'Intermittent Leave: Using FMLA in Pieces',
      'What Your Employer Can and Cannot Do',
      'If You\'re Retaliated Against: Your Legal Options',
      'FMLA vs. ADA vs. State Leave Laws — Knowing the Difference',
      'Returning to Work: Your Job Protection Explained',
      'State FMLA Laws That Go Further Than Federal',
    ],
    tags: ['FMLA', 'Employment Law', 'Workplace Rights'],
    gumroadLink: 'https://psantana.gumroad.com/l/arwpqx',
  },
];

export const LEAD_MAGNET = {
  title: 'The Medicaid Asset Protection Checklist',
  description: 'A free one-page checklist of exempt assets and actionable protection steps for anyone with Medicaid in their future.',
  tag: 'Free Download',
};