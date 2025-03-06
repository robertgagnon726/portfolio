'use client';

import Stack from '@mui/material/Stack';
import { Button, Chip, Divider, styled } from '@mui/material';
import { useState } from 'react';

interface MultiChipsProps {
  labels: string[];
}

export const MultiChips = ({ labels }: MultiChipsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Show all techs if expanded; otherwise, show the first 10
  const displayedlabels = isExpanded ? labels : labels.slice(0, 10);

  return (
    <Stack gap={1}>
      <Stack direction="row" gap={1} flexWrap={'wrap'}>
        {displayedlabels.map((label) => (
          <StyledChip key={label} label={label} />
        ))}
      </Stack>
      {labels.length > 10 && (
        <Divider>
          <Button variant="text" size="small" onClick={handleToggleExpand}>
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </Divider>
      )}
    </Stack>
  );
};

const StyledChip = styled(Chip)(() => ({
  borderRadius: `4px`,
}));
