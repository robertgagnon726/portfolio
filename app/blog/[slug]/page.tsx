import { notFound } from 'next/navigation';
import { Layout } from '@Connected-components/Layout/Layout';
import { client } from '@Root/sanity/lib/client';
import { SanityDocument } from 'next-sanity';
import { GET_BLOG_POST_FOR_BLOG_PAGE } from '@Root/sanity/queries/getBlogPostForBlogPage';
import { BlogPost } from '@Features/BlogPost/BlogPost';
import { Metadata } from 'next';

export const revalidate = 30;

async function getSinglePost(slug: string) {
  const post = await client.fetch<SanityDocument | null>(GET_BLOG_POST_FOR_BLOG_PAGE, { slug });
  return post;
}

interface PostPageProps {
  params: tParams;
}

type tParams = Promise<{ slug: string }>;

// Generate metadata for the page including Open Graph tags
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Fetch data for this specific post
  const post = await getSinglePost(params.slug);

  // If post doesn't exist, return minimal metadata
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This blog post could not be found.',
    };
  }

  // Extract the hero image URL from the post data
  const heroImageUrl = post.mainImage?.asset?.url;

  console.log('heroImageUrl', heroImageUrl);

  // Format the absolute URL for the blog post
  const postUrl = `https://bobbygagnon.com/blog/${params.slug}`;

  return {
    title: post.title,
    description: post.excerpt || post.description || "Read more on Bobby Gagnon's blog",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.description || "Read more on Bobby Gagnon's blog",
      url: postUrl,
      siteName: 'Bobby Gagnon',
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.description || "Read more on Bobby Gagnon's blog",
      images: [heroImageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <BlogPost post={post} />
    </Layout>
  );
}
