export const GET_BLOG_POST_FOR_BLOG_PAGE = `
*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  _id,
  _createdAt,
  body,
  slug,
  author-> {
    _id,
    name,
    currentTitle,
    image {
      asset->{
        url,
        metadata {
          lqip
        }
      }
    }
  },
  mainImage {
    alt,
    asset->{
      url,
      metadata {
        dimensions {
          width,
          height
        },
        lqip
      }
    }
  }
}
`;
