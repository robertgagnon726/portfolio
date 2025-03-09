import { UseTranslations } from '@I18n/useTypedTranslations';

interface TechCategory {
  categoryTitle: string;
  items: string[];
}

export const getTechList = (t: UseTranslations<'TechISpeak'>): TechCategory[] => [
  {
    categoryTitle: t('languagesTitle'),
    items: [
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Java',
      'C#',
      'Groovy',
      'Swift',
      'Objective-C',
      'Shell',
      'Bicep',
      'YAML',
    ],
  },
  {
    categoryTitle: t('frontendFrameworksTitle'),
    items: [
      'React',
      'Next.js',
      'Angular',
      'Redux',
      'Redux Toolkit',
      'React Router',
      'React Hook Form',
      'React Query',
      'Material-UI',
      'Bootstrap',
      'Styled Components',
      'Emotion',
      'GraphQL',
      'Apollo',
    ],
  },
  {
    categoryTitle: t('backendFrameworksTitle'),
    items: ['NestJS', 'Express', 'Spring Boot', 'Dotnet Core'],
  },
  {
    categoryTitle: t('databaseTitle'),
    items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Mongoose', 'Redis', 'Firestore', 'TypeORM', 'Entity Framework'],
  },
  {
    categoryTitle: t('cloudTitle'),
    items: ['AWS', 'Azure', 'Google Cloud', 'Firebase', 'Heroku', 'Netlify', 'Vercel', 'Docker Hub'],
  },
  {
    categoryTitle: t('devOpsTitle'),
    items: [
      'Docker',
      'Jenkins',
      'GitHub Actions',
      'Bitbucket',
      'CircleCI',
      'TravisCI',
      'Azure DevOps',
      'SonarQube',
      'Artifactory',
    ],
  },
  {
    categoryTitle: t('monitoringTitle'),
    items: ['Sentry', 'Fullstory', 'Intercom', 'Posthog', 'Hotjar', 'Google Analytics', 'Google Tag Manager'],
  },
  {
    categoryTitle: t('communicationTitle'),
    items: ['Sendgrid', 'Twilio', 'nodemailer', 'Swagger', 'Postman'],
  },
  {
    categoryTitle: t('testingTitle'),
    items: [
      'Jest',
      'React Testing Library',
      'Cypress',
      'Storybook',
      'Playwright',
      'Puppeteer',
      'Lighthouse',
      'Qase',
      'supertest',
      'Cucumber',
    ],
  },
  {
    categoryTitle: t('buildTitle'),
    items: [
      'Webpack',
      'Vite',
      'Rollup',
      'Babel',
      'npm',
      'Yarn',
      'pnpm',
      'ESLint',
      'Prettier',
      'Husky',
      'Lint Staged',
      'Commitlint',
      'Conventional Commits',
      'Semantic Release',
      'Commander',
      'Lodash',
      'Validator',
      'date-fns',
      'Moment.js',
      'Day.js',
      'next-intl',
      'react-intl',
      'notistack',
      'yup',
      'swr',
      'openai',
      'openapi-generator',
      'class-validator',
      'class-transformer',
      'reselect',
      'socket.io',
      'passport',
      'pm2',
      'Okta',
    ],
  },
];
