import { client } from '@Root/sanity/lib/client';
import { defineLive } from 'next-sanity';

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: 'vX',
  }),
});
