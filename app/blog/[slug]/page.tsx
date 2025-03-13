import { notFound } from 'next/navigation';
import { Layout } from '@Connected-components/Layout/Layout';
import { client } from '@Root/sanity/lib/client';
import { SanityDocument } from 'next-sanity';
import { GET_BLOG_POST_FOR_BLOG_PAGE } from '@Root/sanity/queries/getBlogPostForBlogPage';
import { BlogPost } from '@Features/BlogPost/BlogPost';

export const revalidate = 30;

async function getSinglePost(slug: string) {
  const post = await client.fetch<SanityDocument | null>(GET_BLOG_POST_FOR_BLOG_PAGE, { slug });
  return post;
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getSinglePost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <BlogPost post={post} />
    </Layout>
  );
}
