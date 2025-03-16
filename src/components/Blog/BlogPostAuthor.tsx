import { Avatar, Stack, Typography } from '@mui/material';

interface BlogPostAuthorProps {
  avatar: string;
  name: string;
  title: string;
}

export const BlogPostAuthor = ({ avatar, name, title }: BlogPostAuthorProps) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar src={avatar} alt={name} />
      <Stack direction="column" spacing={0.25}>
        <Typography variant="body1" color="text.primary" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
};
