import { demoPhotos, productPhotos } from './site-assets'

export const journalPosts = [
  {
    slug: 'a-place-for-the-little-things',
    title: 'A place for all the little things.',
    category: 'Everyday moments',
    excerpt: 'A simple care corner, with everyday essentials close at hand.',
    photo: productPhotos[2],
    sections: [
      { title: 'Keep the everyday together', text: 'A small basket or drawer can give the things you reach for most a place of their own. A little organisation makes it easier to see what is ready and what needs replacing.' },
      { title: 'Make the space your own', text: 'Start with the essentials that suit your routine, then leave room for the little things that make the space feel like home. The Bee & Bear preview brings diapers, wipes and cotton buds into one easy-to-explore collection.' },
    ],
    link: '/products',
    action: 'Explore the collection',
  },
  {
    slug: 'meet-the-diaper-collection',
    title: 'A little guide to the collection.',
    category: 'Meet the range',
    excerpt: 'Everyday, Premium, Overnight and Tape: explore the sample ranges.',
    photo: productPhotos[0],
    sections: [
      { title: 'One size, one clear choice', text: 'Each size in our preview has its own product card. The size, pack contents and sample price appear together, so it is easy to compare the collection without opening a separate selector.' },
      { title: 'A preview of what comes next', text: 'The wider range and its additional packaging are concepts for this client preview. Final specifications, fit guidance and prices will be confirmed before launch. Always refer to the final product pack when choosing a size.' },
    ],
    link: '/products?category=Baby%20diapers',
    action: 'See the diaper collection',
  },
  {
    slug: 'the-everyday-bag',
    title: 'Little essentials, ready to go.',
    category: 'Out and about',
    excerpt: 'Give your everyday bag a little order, one small pack at a time.',
    photo: demoPhotos.wipes,
    sections: [
      { title: 'Give small packs their own space', text: 'Keeping smaller items together in a pouch makes it easier to find them when you open your bag. Choose a place for each essential and keep the things you reach for most easy to spot.' },
      { title: 'Find a pack for your routine', text: 'Our sample wipes collection includes travel, single and twin pack concepts. Explore them alongside the diaper and cotton-bud ranges to see how the full Bee & Bear collection could look.' },
    ],
    link: '/products?category=Baby%20wipes',
    action: 'Explore the wipes preview',
  },
]

export function findJournalPost(slug: string) { return journalPosts.find(post => post.slug === slug) }
