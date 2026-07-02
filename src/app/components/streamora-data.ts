export type ContentItem = {
  id: string;
  title: string;
  genres: string[];
  rating: string;
  year: number;
  duration: string;
  language: string;
  backdrop: string;
  poster: string;
  description: string;
  cast: Array<{ name: string; role: string; photo: string }>;
  isNew?: boolean;
  isTrending?: boolean;
  isDownloaded?: boolean;
  type: 'movie' | 'series';
  seasons?: number;
  episodes?: number;
  progress?: number;
  downloadSize?: string;
};

const u = (id: string, w = 400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const CAST_PHOTOS = [
  u('1637059880830-59a90102de77', 200),
  u('1505274664176-44ccaa7969a8', 200),
  u('1511812201571-630da3a98887', 200),
  u('1558683018-e0e6e20f2bdb', 200),
  u('1495581600346-93f223866d0a', 200),
  u('1543124037-6237ede05991', 200),
];

export const HERO_ITEMS: ContentItem[] = [
  {
    id: 'h1',
    title: 'Echoes of Tomorrow',
    genres: ['Sci-Fi', 'Thriller'],
    rating: '8.4',
    year: 2024,
    duration: '2h 18m',
    language: 'English',
    backdrop: u('1628093218069-0d095423e463', 1080),
    poster: u('1667857431230-3fbd21c56e62', 400),
    description: 'In a dystopian future where memories can be sold and stolen, one detective must uncover a conspiracy that reaches into the highest corridors of power — before her own past is erased forever.',
    cast: [
      { name: 'Elara Quinn', role: 'Detective Mara Voss', photo: CAST_PHOTOS[0] },
      { name: 'Damon Reeves', role: 'Director Hale', photo: CAST_PHOTOS[1] },
      { name: 'Yuki Tanaka', role: 'Dr. Lyra Chen', photo: CAST_PHOTOS[2] },
      { name: 'Marcus Webb', role: 'The Architect', photo: CAST_PHOTOS[3] },
    ],
    isTrending: true,
    type: 'movie',
  },
  {
    id: 'h2',
    title: 'The Last Signal',
    genres: ['Mystery', 'Drama'],
    rating: '7.9',
    year: 2024,
    duration: '1h 54m',
    language: 'English',
    backdrop: u('1667857431728-00884201d629', 1080),
    poster: u('1489846986031-7cea03ab8fd0', 400),
    description: 'A lone radio operator intercepts a distress signal from a vessel that disappeared 40 years ago. As she digs deeper into its origin, the line between past and present begins to blur.',
    cast: [
      { name: 'Senna Hall', role: 'Clara Moss', photo: CAST_PHOTOS[2] },
      { name: 'Theo Farris', role: 'Captain Vane', photo: CAST_PHOTOS[5] },
      { name: 'Ingrid Sole', role: 'Dr. Petra', photo: CAST_PHOTOS[0] },
    ],
    isNew: true,
    type: 'movie',
  },
  {
    id: 'h3',
    title: 'The Phantom Hour',
    genres: ['Thriller', 'Action'],
    rating: '8.1',
    year: 2023,
    duration: '2h 05m',
    language: 'English',
    backdrop: u('1482424917728-d82d29662023', 1080),
    poster: u('1544502062-f82887f03d1c', 400),
    description: 'When elite operative Kira Nox goes missing during a covert mission, her twin sister — a civilian — must infiltrate the same shadow organization to bring her home alive.',
    cast: [
      { name: 'Lena Cross', role: 'Kira / Raia Nox', photo: CAST_PHOTOS[1] },
      { name: 'Viktor Marsh', role: 'Director Crane', photo: CAST_PHOTOS[3] },
      { name: 'Darius Kell', role: 'Agent Zero', photo: CAST_PHOTOS[5] },
    ],
    isTrending: true,
    type: 'movie',
  },
  {
    id: 'h4',
    title: 'Cold Pursuit',
    genres: ['Drama', 'Crime'],
    rating: '7.6',
    year: 2024,
    duration: '1h 48m',
    language: 'English',
    backdrop: u('1489708631777-b35c5e75d4c8', 1080),
    poster: u('1679590373888-9363db416357', 400),
    description: 'Set against the frozen landscapes of the far north, a disgraced detective hunts a serial killer who leaves no traces — and may be closer than he thinks.',
    cast: [
      { name: 'Andres Blom', role: 'Detective Hakon', photo: CAST_PHOTOS[4] },
      { name: 'Freya Norn', role: 'Chief Sigrid', photo: CAST_PHOTOS[2] },
    ],
    type: 'movie',
  },
];

export const TRENDING: ContentItem[] = [
  {
    id: 't1',
    title: 'Crimson Code',
    genres: ['Action', 'Spy'],
    rating: '8.2',
    year: 2024,
    duration: '2h 10m',
    language: 'English',
    backdrop: u('1767823608836-980209ad69ab', 1080),
    poster: u('1767823608836-980209ad69ab', 400),
    description: 'An elite assassin discovers her entire identity is a fabrication engineered by the agency that created her. Now hunted by her own handlers, she must find the truth before they erase her.',
    cast: [
      { name: 'Vera Kane', role: 'Agent Seven', photo: CAST_PHOTOS[0] },
      { name: 'Hugo Stern', role: 'The Handler', photo: CAST_PHOTOS[3] },
    ],
    isTrending: true,
    type: 'movie',
  },
  {
    id: 't2',
    title: 'Lunar Descent',
    genres: ['Sci-Fi', 'Adventure'],
    rating: '8.6',
    year: 2024,
    duration: '2h 32m',
    language: 'English',
    backdrop: u('1634361522365-72d91d5dec85', 1080),
    poster: u('1634361522365-72d91d5dec85', 400),
    description: 'The first crewed mission to the lunar south pole uncovers evidence of an ancient civilization — and a force that does not want them to leave.',
    cast: [
      { name: 'James Orion', role: 'Commander Hayes', photo: CAST_PHOTOS[5] },
      { name: 'Mina Park', role: 'Dr. Yuna Ko', photo: CAST_PHOTOS[2] },
    ],
    isTrending: true,
    type: 'movie',
  },
  {
    id: 't3',
    title: 'Zero Point',
    genres: ['Sci-Fi', 'Thriller'],
    rating: '7.8',
    year: 2023,
    duration: '1h 59m',
    language: 'English',
    backdrop: u('1692871480784-4fd78f25459f', 1080),
    poster: u('1692871480784-4fd78f25459f', 400),
    description: 'Stranded on an uncharted planet with dwindling oxygen, an astronaut must solve the mystery of why her crewmates are disappearing one by one.',
    cast: [
      { name: 'Sasha Voss', role: 'Commander Reyes', photo: CAST_PHOTOS[1] },
    ],
    type: 'movie',
  },
  {
    id: 't4',
    title: 'Night Protocol',
    genres: ['Action', 'Crime'],
    rating: '7.5',
    year: 2024,
    duration: '1h 44m',
    language: 'English',
    backdrop: u('1679590373888-9363db416357', 1080),
    poster: u('1679590373888-9363db416357', 400),
    description: 'A veteran cop is pulled back into an underworld operation she thought she left behind when a former informant surfaces with evidence that could topple the city.',
    cast: [
      { name: 'Dana Cross', role: 'Detective Ramos', photo: CAST_PHOTOS[4] },
    ],
    type: 'movie',
  },
  {
    id: 't5',
    title: 'The Ascent',
    genres: ['Thriller', 'Survival'],
    rating: '8.0',
    year: 2024,
    duration: '2h 04m',
    language: 'English',
    backdrop: u('1774016591222-d22640650adc', 1080),
    poster: u('1774016591222-d22640650adc', 400),
    description: 'Six strangers wake in an underground facility with no memory of how they got there. Their only way out: climb to the surface — one treacherous level at a time.',
    cast: [
      { name: 'Eli Nash', role: 'Marcus', photo: CAST_PHOTOS[3] },
    ],
    type: 'movie',
  },
  {
    id: 't6',
    title: 'Shadow Walk',
    genres: ['Mystery', 'Drama'],
    rating: '7.7',
    year: 2023,
    duration: '1h 51m',
    language: 'English',
    backdrop: u('1495581600346-93f223866d0a', 1080),
    poster: u('1495581600346-93f223866d0a', 400),
    description: 'After inheriting a remote estate, a woman discovers her late grandmother led a secret double life — and that some of those secrets are still very much alive.',
    cast: [
      { name: 'Nora Blaine', role: 'Isla', photo: CAST_PHOTOS[1] },
    ],
    type: 'movie',
  },
];

export const CONTINUE_WATCHING: ContentItem[] = [
  {
    id: 'c1',
    title: 'Dark Matter',
    genres: ['Sci-Fi', 'Series'],
    rating: '8.5',
    year: 2024,
    duration: '45m per ep',
    language: 'English',
    backdrop: u('1517405030045-45f7ad942106', 1080),
    poster: u('1637059880830-59a90102de77', 400),
    description: 'A physicist is abducted and wakes in an alternate version of his life, forced to navigate a multiverse of impossible choices to find his way home.',
    cast: [
      { name: 'Joel Carver', role: 'Jason Dessen', photo: CAST_PHOTOS[0] },
      { name: 'Lyra Simms', role: 'Amanda Lucas', photo: CAST_PHOTOS[2] },
    ],
    type: 'series',
    seasons: 2,
    episodes: 16,
    progress: 62,
    isDownloaded: true,
  },
  {
    id: 'c2',
    title: 'Cave of Stars',
    genres: ['Adventure', 'Sci-Fi'],
    rating: '7.9',
    year: 2023,
    duration: '2h 08m',
    language: 'English',
    backdrop: u('1725834518927-0e3444887039', 1080),
    poster: u('1725834518927-0e3444887039', 400),
    description: 'Deep inside a Martian lava tube, a geologist discovers bioluminescent lifeforms that communicate through light — and need her help to survive.',
    cast: [
      { name: 'Mira Chen', role: 'Dr. Osei', photo: CAST_PHOTOS[1] },
    ],
    type: 'movie',
    progress: 35,
  },
  {
    id: 'c3',
    title: 'Wildfire',
    genres: ['Action', 'Drama'],
    rating: '7.4',
    year: 2024,
    duration: '1h 57m',
    language: 'English',
    backdrop: u('1633885274919-04b5af171f8c', 1080),
    poster: u('1633885274919-04b5af171f8c', 400),
    description: 'A hotshot firefighter returns to her hometown to battle a supernatural blaze that seems to be guided by an unseen intelligence.',
    cast: [
      { name: 'Petra Storm', role: 'Captain Dani', photo: CAST_PHOTOS[4] },
    ],
    type: 'movie',
    progress: 80,
  },
];

export const NEW_RELEASES: ContentItem[] = [
  {
    id: 'n1',
    title: 'Pale Mirror',
    genres: ['Horror', 'Mystery'],
    rating: '7.3',
    year: 2024,
    duration: '1h 49m',
    language: 'English',
    backdrop: u('1511812201571-630da3a98887', 1080),
    poster: u('1511812201571-630da3a98887', 400),
    description: 'A photographer develops a series of pictures that show reflections of events that haven\'t happened yet — each one darker than the last.',
    cast: [
      { name: 'Helena Vaux', role: 'Sam', photo: CAST_PHOTOS[2] },
    ],
    isNew: true,
    type: 'movie',
  },
  {
    id: 'n2',
    title: 'The Reckoning',
    genres: ['Action', 'Drama'],
    rating: '7.8',
    year: 2024,
    duration: '2h 15m',
    language: 'English',
    backdrop: u('1543124037-6237ede05991', 1080),
    poster: u('1543124037-6237ede05991', 400),
    description: 'After spending 12 years in prison for a crime he didn\'t commit, a man emerges with one purpose: to dismantle the organization that framed him — piece by piece.',
    cast: [
      { name: 'Rico Vega', role: 'Marcus Lowe', photo: CAST_PHOTOS[3] },
    ],
    isNew: true,
    type: 'movie',
  },
  {
    id: 'n3',
    title: 'Into the Woods',
    genres: ['Horror', 'Thriller'],
    rating: '7.1',
    year: 2024,
    duration: '1h 46m',
    language: 'English',
    backdrop: u('1489846986031-7cea03ab8fd0', 1080),
    poster: u('1489846986031-7cea03ab8fd0', 400),
    description: 'A group of hikers venture into a forest that has swallowed entire villages — and discover the forest is very much aware of their presence.',
    cast: [
      { name: 'Soren Blake', role: 'Finn', photo: CAST_PHOTOS[5] },
    ],
    isNew: true,
    type: 'movie',
  },
  ...TRENDING.slice(0, 2).map(x => ({ ...x, isNew: true })),
];

export const TOP_RATED: ContentItem[] = [
  ...HERO_ITEMS.slice(0, 2),
  ...TRENDING.slice(0, 4),
];

export const DOWNLOADS: ContentItem[] = [
  { ...CONTINUE_WATCHING[0], isDownloaded: true, downloadSize: '2.1 GB' },
  { ...TRENDING[1], isDownloaded: true, downloadSize: '3.4 GB', progress: undefined },
  { ...HERO_ITEMS[2], isDownloaded: true, downloadSize: '1.8 GB', progress: undefined },
];

export const GENRES = [
  'Action', 'Adventure', 'Animation', 'Anime', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance',
  'Sci-Fi', 'Thriller', 'War', 'Western',
];

export const SEARCH_SUGGESTIONS = [
  'Echoes of Tomorrow', 'Lunar Descent', 'Dark Matter', 'Crimson Code',
  'Night Protocol', 'The Ascent', 'Zero Point', 'Shadow Walk',
];

export const ALL_CONTENT: ContentItem[] = [
  ...HERO_ITEMS,
  ...TRENDING,
  ...CONTINUE_WATCHING,
  ...NEW_RELEASES.filter(x => !TRENDING.find(t => t.id === x.id)),
];
