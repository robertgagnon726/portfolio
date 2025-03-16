import { UseTranslations } from '@I18n/useTypedTranslations';

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  mediaUrls: string[];
}

export type ProjectCategory = 'passionProjects' | 'openSourceProjects' | 'revenueProjects' | 'companyProjects';

export type ProjectSection = Record<ProjectCategory, Project[]>;

export const getProjects = (t: UseTranslations<'Projects'>) => ({
  passionProjects: [
    {
      title: t('theAgilePokerTitle'),
      description: t('theAgilePokerDescription'),
      technologies: [
        'React',
        'Material UI',
        'Redux Toolkit',
        'Redux Saga',
        'NestJS',
        'MongoDB',
        'Socket.IO',
        'SendGrid',
        'Digital Ocean',
        'Netlify',
      ],
      mediaUrls: ['/images/the-agile-poker.png', '/videos/agile-poker.mp4'],
    },
    {
      title: t('chronicommWebTitle'),
      description: t('chronicommWebDescription'),
      technologies: [
        'React',
        'Redux Toolkit',
        'Redux Saga',
        'NestJS',
        'PostgreSQL',
        'TypeORM',
        'Socket.IO',
        'SendGrid',
        'Azure Blob Storage',
        'Azure Service Bus',
        'Azure App Service',
      ],
      mediaUrls: [
        '/images/projects/chronicomm-web/moderated-content-review.png',
        '/images/projects/chronicomm-web/emoji-picker.png',
        '/images/projects/chronicomm-web/feature-requests.png',
        '/images/projects/chronicomm-web/login.png',
        '/images/projects/chronicomm-web/signup.png',
        '/images/projects/chronicomm-web/trial.png',
        '/images/projects/chronicomm-web/404.png',
      ],
    },
    {
      title: t('chronicommMobileTitle'),
      description: t('chronicommMobileDescription'),
      technologies: [
        'React Native',
        'NestJS',
        'PostgreSQL',
        'TypeORM',
        'Redux Toolkit',
        'Redux Saga',
        'Socket.IO',
        'SendGrid',
        'Azure Blob Storage',
        'Azure Service Bus',
        'Azure App Service',
      ],
      mediaUrls: [
        '/images/projects/chronicomm-mobile/splash.png',
        '/images/projects/chronicomm-mobile/moderated-content-review.png',
        '/images/projects/chronicomm-mobile/feature-requests.png',
        '/images/projects/chronicomm-mobile/emoji-bottom-sheet.png',
        '/images/projects/chronicomm-mobile/login.png',
        '/images/projects/chronicomm-mobile/signup.png',
        '/images/projects/chronicomm-mobile/treatments.png',
        '/videos/chronicomm-mobile.mp4',
      ],
    },
  ],
  openSourceProjects: [
    {
      title: 'aicodegen',
      description: t('aicodegenDescription'),
      technologies: ['commander', 'openai', 'typescript', 'vite', 'vitest'],
      mediaUrls: [],
    },
    {
      title: 'react-native-fullscreen-animations',
      description: t('reactNativeFullscreenAnimationsDescription'),
      technologies: ['React Native', 'react-native-reanimated'],
      mediaUrls: ['/images/react-native-fullscreen-animations.png', '/images/react-native-fullscreen-animations.gif'],
    },
  ],
  revenueProjects: [
    {
      title: t('terraOSTitle'),
      description: t('terraOSDescription'),
      technologies: [
        'Next.js',
        'Material UI',
        'Redux Toolkit',
        'PostgreSQL',
        'TypeORM',
        'SendGrid',
        'vitest',
        'Firebase Auth',
        'Azure Key Vault',
        'Azure DevOps',
        'Azure App Service',
        'Azure PostgreSQL',
        'Sentry',
        'Twilio',
      ],
      mediaUrls: ['/images/terra-os.webp'],
    },
  ],
  companyProjects: [
    {
      title: t('opendorsePlatformTitle'),
      description: t('opendorsePlatformDescription'),
      technologies: ['React', 'SQL Server', 'Too Much Azure To List'],
      mediaUrls: ['/images/platform.png', '/videos/opendorse-platform.mp4', '/videos/opendorse-platform-deals.mp4'],
    },
    {
      title: t('opendorseMobileTitle'),
      description: t('opendorseMobileDescription'),
      technologies: ['React Native'],
      mediaUrls: ['/images/mobile-app.png', '/videos/opendorse-mobile.mp4', '/videos/opendorse-mobile-arc.mp4'],
    },
    {
      title: t('opendorseTeamBuilderTitle'),
      description: t('opendorseTeamBuilderDescription'),
      technologies: ['Next.js', 'Material UI', 'Redux Toolkit', 'swr', 'SQL Server', 'Snowflak', 'Dotnet core'],
      mediaUrls: ['/images/team-builder.png', '/videos/team-builder.mp4'],
    },
    {
      title: t('lowesManifestTitle'),
      description: t('lowesManifestDescription'),
      technologies: ['React', 'Material UI', 'Node.js', 'Express', 'MongoDB', 'RHEL'],
      mediaUrls: [],
    },
    {
      title: t('lowesAPFacialRecognitionTitle'),
      description: t('lowesAPFacialRecognitionDescription'),
      technologies: ['Azure AD'],
      mediaUrls: [],
    },
  ],
});
