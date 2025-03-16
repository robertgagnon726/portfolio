import { Layout } from '@Connected-components/Layout/Layout';
import { BlogHome } from '@Features/BlogHome/BlogHome';
import { client } from '@Root/sanity/lib/client';
import { GET_BLOG_POSTS_FOR_BLOG_HOME_PAGE } from '@Root/sanity/queries/getBlogPostsForBlogHomePage';
import { SanityDocument } from 'next-sanity';

const options = { next: { revalidate: 30 } };

async function getBlogPosts() {
  const posts = await client.fetch<SanityDocument[]>(GET_BLOG_POSTS_FOR_BLOG_HOME_PAGE, {}, options);

  return posts;
}

export default async function BlogHomePage() {
  const posts = await getBlogPosts();

  return (
    <Layout>
      <BlogHome posts={posts} />
    </Layout>
  );
}
