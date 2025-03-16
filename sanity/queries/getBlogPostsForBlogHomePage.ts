export const GET_BLOG_POSTS_FOR_BLOG_HOME_PAGE = `
*[_type == "post"]{ 
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
}, 
}
`;
