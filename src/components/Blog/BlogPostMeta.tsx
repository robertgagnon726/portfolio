import { Stack, Typography } from '@mui/material';
import { getReadLength } from '@Utils/getReadLength';
import { format } from 'date-fns';
import { PortableTextBlock } from 'next-sanity';

interface BlogPostMetaProps {
  createdAt: string;
  richTextBlocks: PortableTextBlock[];
}

export const BlogPostMeta = ({ createdAt, richTextBlocks }: BlogPostMetaProps) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography gutterBottom variant="body2" color="text.secondary" fontWeight={600}>
        {format(new Date(createdAt), 'MMM dd, yyyy')}
      </Typography>
      <Typography gutterBottom variant="body2" color="text.secondary" fontWeight={600}>
        {`•`}
      </Typography>
      <Typography gutterBottom variant="body2" color="text.secondary" fontWeight={600}>
        {`${getReadLength(richTextBlocks)} min read`}
      </Typography>
    </Stack>
  );
};
