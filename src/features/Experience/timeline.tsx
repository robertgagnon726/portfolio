import { CSSObject } from '@emotion/styled';
import { Promotion } from '@Features/Experience/CompanyPromotions';
import { UseTranslations } from '@I18n/useTypedTranslations';
import { LowesLogo } from '@Src/icons/LowesLogo';
import { OpendorseLogo } from '@Src/icons/OpendorseLogo';
import { JSX } from 'react';

interface TimelineItem {
  promotions: Promotion[];
  timeframe: string;
  currentPosition: string;
  company: string;
  compnanyIcon: JSX.Element;
  tags: string[];
  technologies: string[];
  highlights: string[];
}

const logoStyle: CSSObject = {
  height: 32,
  width: 'auto',
  opacity: 0.3,
};

export const getExperienceTimeline = (t: UseTranslations<'Experience'>): TimelineItem[] => [
  {
    timeframe: t('item1Timframe'),
    currentPosition: t('item1CurrentPosition'),
    company: 'Opendorse',
    compnanyIcon: <OpendorseLogo style={logoStyle} />,
    tags: [t('tagRemote'), t('tagFullTime')],
    technologies: [
      'React',
      'React Native',
      'Nextjs',
      'Dayjs',
      'Momentjs',
      'Webpack',
      'Rollup',
      'Jest',
      'Enzyme',
      'Vitest',
      'Redux',
      'Redux Saga',
      'Redux Toolkit',
      'SWR',
      'React Query',
      'React Hook Form',
      'Formik',
      'Material UI',
      'Firebase',
      'Azure',
      'Bicep',
      'Azure DevOps',
      'Figma',
      'C#',
      'Dotnet',
      'SQL Server',
      'Entity Framework',
      'Node.js',
      'TypeScript',
    ],
    highlights: [
      t('item1Highlight1'),
      t('item1Highlight2'),
      t('item1Highlight3'),
      t('item1Highlight4'),
      t('item1Highlight5'),
      t('item1Highlight6'),
    ],
    promotions: [
      {
        title: t('item1CurrentPosition'),
        year: t('year2024'),
        highlights: t('item1Promotion1Highlight'),
      },
      {
        title: t('seniorSoftwareEngineer'),
        year: t('year2023'),
        highlights: t('item1Promotion2Highlight'),
      },
    ],
  },
  {
    timeframe: t('item2Timeframe'),
    currentPosition: t('item2Position'),
    company: 'Lowes Home Improvement',
    compnanyIcon: <LowesLogo style={logoStyle} />,
    tags: [t('tagRemote'), t('tagFullTime')],
    technologies: [
      'React',
      'Node.js',
      'JavaScript',
      'Java',
      'Spring',
      'Postgres',
      'Express',
      'MongoDB',
      'Azure',
      'Jenkins',
      'Jira',
      'Confluence',
      'Figma',
      'Git',
      'Bitbucket',
      'Jest',
      'Enzyme',
      'React Testing Library',
      'Cypress',
      'Material UI',
      'HTML',
      'CSS',
      'Junit',
      'Mockito',
      'Cucumber',
      'Redux',
    ],
    highlights: [
      t('item2Highlight1'),
      t('item2Highlight2'),
      t('item2Highlight3'),
      t('item2Highlight4'),
      t('item2Highlight5'),
      t('item2Highlight6'),
      t('item2Highlight7'),
      t('item2Highlight8'),
    ],
    promotions: [],
  },
  {
    timeframe: t('item3Timeframe'),
    currentPosition: t('item3Position'),
    company: t('item3Company'),
    compnanyIcon: <LowesLogo style={logoStyle} />,
    tags: [t('tagRemote'), t('tagVeryPartTime')],
    technologies: [
      'React',
      'React Native',
      'Nextjs',
      'Nestjs',
      'Postgres',
      'TypeORM',
      'Express',
      'MongoDB',
      'Vitest',
      'Cypress',
      'Playwright',
      'Dayjs',
      'Momentjs',
      'Webpack',
      'Rollup',
      'Jest',
      'Enzyme',
      'Redux',
      'Redux Saga',
      'Redux Toolkit',
      'SWR',
      'React Query',
      'React Hook Form',
      'Formik',
      'Material UI',
      'Firebase',
      'Azure',
      'Google Cloud',
      'AWS',
      'Github Actions',
      'Digital Ocean',
      'Jenkins',
      'Jira',
      'Confluence',
      'Github',
      'CodeRabbit',
      'Heroku',
      'Netlify',
      'Vercel',
      'Bicep',
      'Azure DevOps',
      'Figma',
      'C#',
      'Dotnet',
      'Entity Framework',
      'Node.js',
      'TypeScript',
    ],
    highlights: [t('item3Highlight1'), t('item3Highlight2'), t('item3Highlight3')],
    promotions: [],
  },
];
