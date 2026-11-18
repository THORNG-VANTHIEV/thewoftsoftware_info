import { publicAsset } from './paths';

export type Project = {
  slug: string;
  title: string;
  category: 'qr-menu';
  status: 'public-demo';
  subtitle: string;
  summary: string;
  image: string;
  imageAlt: string;
  demoUrl: string;
  features: string[];
  detail: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: 'snaca-cafe',
    title: 'SNACA CAFE',
    category: 'qr-menu',
    status: 'public-demo',
    subtitle: 'Digital café menu',
    summary: 'ម៉ឺនុយឌីជីថលសម្រាប់ហាងកាហ្វេ ដែលអតិថិជនអាចមើលលើទូរស័ព្ទបានងាយស្រួល។',
    image: publicAsset('projects/snaca-screen.webp'),
    imageAlt: 'ទំព័រម៉ឺនុយឌីជីថល SNACA CAFE',
    demoUrl: 'https://thorng-vanthiev.github.io/coffe_snaca/',
    features: ['ម៉ឺនុយជាភាសាខ្មែរ និងអង់គ្លេស', 'បង្ហាញតម្លៃជា USD និង KHR', 'រចនាសម្រាប់ការមើលលើទូរស័ព្ទ'],
    detail: 'គំរូម៉ឺនុយកាហ្វេអនឡាញដែលអាចបើកមើលភេសជ្ជៈ និងតម្លៃបានដោយផ្ទាល់។ សាកល្បងកម្មវិធីពិតតាមតំណខាងក្រោម។',
    tags: ['Café', 'Digital menu', 'Mobile'],
  },
  {
    slug: 'lotcha-siemreap',
    title: 'LOTCHA SIEMREAP 1991',
    category: 'qr-menu',
    status: 'public-demo',
    subtitle: 'Restaurant digital menu',
    summary: 'ម៉ឺនុយឌីជីថលសម្រាប់ហាងអាហារ មានការស្វែងរក ចំណូលចិត្ត និងសេចក្តីសង្ខេបការកម្ម៉ង់។',
    image: publicAsset('projects/lotcha-screen.webp'),
    imageAlt: 'ទំព័រម៉ឺនុយឌីជីថល LOTCHA SIEMREAP 1991',
    demoUrl: 'http://lotchasiemreapmenu.online/',
    features: ['ស្វែងរក និងរក្សាទុកមុខម្ហូបចូលចិត្ត', 'សេចក្តីសង្ខេបការកម្ម៉ង់សម្រាប់បង្ហាញបុគ្គលិក', 'បង្ហាញជាភាសាខ្មែរ និងអង់គ្លេស'],
    detail: 'ម៉ឺនុយភោជនីយដ្ឋានដែលជួយអតិថិជនរកមុខម្ហូបដែលចូលចិត្ត និងរៀបចំសេចក្តីសង្ខេបការកម្ម៉ង់។ សេចក្តីសង្ខេបនេះត្រូវបង្ហាញដល់បុគ្គលិក ហើយមិនបញ្ជូនការកម្ម៉ង់ទៅហាងដោយស្វ័យប្រវត្តិទេ។',
    tags: ['Restaurant', 'Digital menu', 'Bilingual'],
  },
];

export const services = [
  {
    number: '01',
    icon: 'database',
    title: 'ប្រព័ន្ធ Offline',
    english: 'Offline systems',
    description: 'កម្មវិធីសម្រាប់ការងារប្រចាំថ្ងៃដែលអាចប្រើបានដោយមិនចាំបាច់មានអ៊ីនធឺណិតជានិច្ច។',
    examples: 'សមស្របសម្រាប់ការគ្រប់គ្រងទិន្នន័យ ឬដំណើរការក្នុងទីតាំងតែមួយ។',
    price: '$350+',
  },
  {
    number: '02',
    icon: 'globe',
    title: 'ប្រព័ន្ធ Online',
    english: 'Online systems',
    description: 'ប្រព័ន្ធតាមអ៊ីនធឺណិតសម្រាប់ក្រុមការងារដែលត្រូវការចូលប្រើទិន្នន័យពីទីតាំងផ្សេងៗ។',
    examples: 'មុខងារ សិទ្ធិអ្នកប្រើ និងការបង្ហោះកំណត់តាមតម្រូវការគម្រោង។',
    price: '$500+',
  },
  {
    number: '03',
    icon: 'qr',
    title: 'QR Digital Menu',
    english: 'Digital menus',
    description: 'ម៉ឺនុយឌីជីថលដែលអតិថិជនអាចស្កេន QR ដើម្បីមើលលើទូរស័ព្ទបានភ្លាមៗ។',
    examples: 'សមស្របសម្រាប់ហាងកាហ្វេ ភោជនីយដ្ឋាន និងអាជីវកម្មអាហារ។',
    price: '$150',
  },
] as const;
