import { CSSObject } from '@emotion/styled';
import { Promotion } from '@Features/Experience/CompanyPromotions';
import { UseTranslations } from '@I18n/useTypedTranslations';
import { LowesLogo } from '@Src/icons/LowesLogo';
import { OpendorseLogo } from '@Src/icons/OpendorseLogo';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
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
    ],
    promotions: [
      {
        title: t('item1CurrentPosition'),
        year: t('year2024'),
        highlights: [
          t('staffPromotionHighlight1'),
          t('staffPromotionHighlight2'),
          t('staffPromotionHighlight3'),
          t('staffPromotionHighlight4'),
          t('staffPromotionHighlight5'),
        ],
      },
      {
        title: t('seniorSoftwareEngineer'),
        year: t('year2023'),
        highlights: [t('seniorPromotionHighlight2'), t('seniorPromotionHighlight3')],
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
      t('lowesHighlight1'),
      t('lowesHighlight2'),
      t('lowesHighlight3'),
      t('lowesHighlight4'),
      t('lowesHighlight5'),
      t('lowesHighlight6'),
    ],
    promotions: [],
  },
  {
    timeframe: t('item3Timeframe'),
    currentPosition: t('item3Position'),
    company: t('item3Company'),
    compnanyIcon: <DeveloperModeIcon sx={logoStyle} />,
    tags: [t('tagRemote'), t('tagVeryPartTime')],
    technologies: [
      'React',
      'Nextjs',
      'Nestjs',
      'Postgres',
      'TypeORM',
      'Express',
      'MongoDB',
      'Vitest',
      'Playwright',
      'Dayjs',
      'Momentjs',
      'Webpack',
      'Redux',
      'Redux Toolkit',
      'SWR',
      'React Query',
      'React Hook Form',
      'Material UI',
      'Firebase',
      'Github Actions',
      'Jira',
      'Confluence',
      'Github',
      'CodeRabbit',
      'Netlify',
      'Vercel',
      'Figma',
      'Node.js',
      'TypeScript',
    ],
    highlights: [t('item3Highlight1'), t('item3Highlight2'), t('item3Highlight3'), t('item3Highlight4')],
    promotions: [],
  },
];
