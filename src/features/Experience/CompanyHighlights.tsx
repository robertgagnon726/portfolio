'use client';

import { List, ListItem, ListItemIcon, ListItemText, styled } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

interface CompanyHighlightsProps {
  highlights: string[];
}

export const CompanyHighlights = ({ highlights }: CompanyHighlightsProps) => {
  return (
    <StyledList>
      {highlights.map((highlight) => (
        <ListItem key={highlight} disablePadding alignItems="flex-start">
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <StyledListItemText
            slotProps={{
              primary: {
                color: 'textSecondary',
                variant: 'subtitle2',
              },
            }}
          >
            {highlight}
          </StyledListItemText>
        </ListItem>
      ))}
    </StyledList>
  );
};

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
}));

const StyledList = styled(List)(() => ({
  padding: 0,
}));
