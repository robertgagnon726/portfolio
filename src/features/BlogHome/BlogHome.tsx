'use client';

import Grid, { GridSize } from '@mui/material/Grid2';
import {
  Breakpoint,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardMediaProps,
  Link,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { Section } from '@Components/Section';
import { SanityDocument } from 'next-sanity';
import { BlogPostAuthor } from '@Components/Blog/BlogPostAuthor';
import { BlogPostMeta } from '@Components/Blog/BlogPostMeta';
import { useTranslations } from 'next-intl';

type ResponsiveStyleValue<T> =
  | T
  | Array<T | null>
  | {
      [key in Breakpoint]?: T | null;
    };

interface BlogHomeProps {
  posts: SanityDocument[];
}

export const BlogHome = ({ posts }: BlogHomeProps) => {
  const t = useTranslations('BlogHome');

  return (
    <Section sectionId="blog" firstOnPage title={t('title')} subtitle={t('subtitle')}>
      <StyledStack spacing={3}>
        <Grid container justifyContent="center" rowGap={3} spacing={2} alignItems="stretch">
          {posts.map((post, index) => {
            if (index === 0) {
              return <Post containerSize={{ xs: 12 }} key={post._id} post={post} />;
            }
            return <Post containerSize={{ xs: 12, sm: 6, md: 4 }} key={post._id} post={post} />;
          })}
        </Grid>
      </StyledStack>
    </Section>
  );
};

interface PostProps {
  post: SanityDocument;
  containerSize?: ResponsiveStyleValue<GridSize>;
}

const Post = ({ post, containerSize }: PostProps) => {
  return (
    <StyledCardContainer size={containerSize}>
      <CardActionArea component={Link} href={`/blog/${post.slug.current}`}>
        <StyledCard>
          <StyledCardMedia component="img" image={post.mainImage.asset.url} />
          <StyledCardContent>
            <Stack spacing={2}>
              <BlogPostMeta createdAt={post._createdAt} richTextBlocks={post.body} />
              <Typography gutterBottom variant="h5" component="div" fontWeight={600}>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {post.description}
              </Typography>

              <BlogPostAuthor
                avatar={post.author.image.asset.url}
                name={post.author.name}
                title={post.author.currentTitle}
              />
            </Stack>
          </StyledCardContent>
        </StyledCard>
      </CardActionArea>
    </StyledCardContainer>
  );
};

const StyledStack = styled(Stack)(() => ({
  width: '100%',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  margin: theme.spacing(2),
}));

const StyledCardMedia = styled(CardMedia)<CardMediaProps>(() => ({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  maxHeight: 350,
}));

const StyledCard = styled(Card)(() => ({
  padding: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardContainer = styled(Grid)(() => ({
  display: 'flex',
}));
