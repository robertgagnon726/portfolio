'use client';

import React from 'react';
import { PortableText, PortableTextBlock, PortableTextComponents } from '@portabletext/react';
import { Typography, Box, BoxProps, styled, List, ListItem, ListProps, ListItemProps } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { StyledCodeInline } from '@Components/Blog/CodeInline';
import NextLink from 'next/link';
import { Link as MUILink } from '@mui/material';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Typography variant="body1" paragraph>
        {children}
      </Typography>
    ),
    h1: ({ children }) => (
      <Typography variant="h2" gutterBottom>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h3" gutterBottom>
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h4" gutterBottom>
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography variant="h5" gutterBottom>
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => <StyledBlockQuote variant="body1">{children}</StyledBlockQuote>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <StyledCodeInline>{children}</StyledCodeInline>,
    link: ({ children, value }) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');

      return (
        <MUILink
          component={NextLink}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          // any MUI styling or props
        >
          {children}
        </MUILink>
      );
    },
  },
  list: {
    bullet: ({ children }) => <StyledUL component="ul">{children}</StyledUL>,
    number: ({ children }) => <StyledOL component="ol">{children}</StyledOL>,
  },
  listItem: ({ children }) => <StyledListItem component="li">{children}</StyledListItem>,
  types: {
    image: ({ value }) => <StyledImage component="img" src={value?.asset?.url} alt={value?.alt} />,
    code: ({ value }) => {
      const codeString = value?.code || '';
      const language = value?.language || 'typescript';

      return (
        <StyledSyntaxHighlighterContainer>
          <SyntaxHighlighter language={language} style={materialDark} showLineNumbers wrapLongLines>
            {codeString}
          </SyntaxHighlighter>
        </StyledSyntaxHighlighterContainer>
      );
    },
  },
};

interface MuiPortableTextProps {
  value: PortableTextBlock[];
}

export function MuiPortableText({ value }: MuiPortableTextProps) {
  return (
    <Box>
      <PortableText value={value} components={components} />
    </Box>
  );
}

const StyledImage = styled(Box)<BoxProps<'img'>>(() => ({
  maxWidth: '100%',
}));

const StyledBlockQuote = styled(Typography)(({ theme }) => ({
  fontStyle: 'italic',
  borderLeft: `4px solid ${theme.palette.grey[300]}`,
  paddingLeft: theme.spacing(2),
}));

const StyledSyntaxHighlighterContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const StyledUL = styled(List)<ListProps>(({ theme }) => ({
  listStyleType: 'disc',
  paddingLeft: theme.spacing(4),
}));

const StyledOL = styled(List)<ListProps>(({ theme }) => ({
  listStyleType: 'decimal',
  paddingLeft: theme.spacing(4),
}));

const StyledListItem = styled(ListItem)<ListItemProps>(() => ({
  display: 'list-item',
}));
