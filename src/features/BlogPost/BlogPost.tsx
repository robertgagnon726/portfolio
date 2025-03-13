'use client';

import { Box, CardMedia, Stack, Typography } from '@mui/material';
import { Section } from '@Components/Section';
import { SanityDocument } from 'next-sanity';
import { BlogPostMeta } from '@Components/Blog/BlogPostMeta';
import { BlogPostAuthor } from '@Components/Blog/BlogPostAuthor';
import { MuiPortableText } from '@Components/Blog/MuiPortableText';

interface BlogPostProps {
  post: SanityDocument;
}

export const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <Box>
      <Section firstOnPage sectionId="blogPost" alignItems="flex-start">
        <Stack spacing={3} justifyContent="flex-start" flex={1} maxWidth="100%">
          <BlogPostMeta createdAt={post._createdAt} richTextBlocks={post.body} />
          <BlogPostAuthor
            avatar={post.author.image.asset.url}
            name={post.author.name}
            title={post.author.currentTitle}
          />
          <Typography variant="h1" fontWeight={600}>
            {post.title}
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            {post.description}
          </Typography>
          <CardMedia component="img" image={post.mainImage.asset.url} />
          <MuiPortableText value={post.body} />
        </Stack>
      </Section>
    </Box>
  );
};
