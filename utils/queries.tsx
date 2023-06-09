import { groq } from "next-sanity";

export const collectionQuery = () => {
  const query = groq`
 *[_type == "collection"]{
  _id,
  title,
  address,
  description,
  nftCollectionName,
  mainImage{asset},
  previewImage{asset},
  slug{current},
  creator->{
  _id,
  name,
  address,
  bio,
  slug{current},
  }
}`;
  return query;
};

export const collectionIdQuery = () => {
  const query = groq`*[_type == "collection" && slug.current == $id][0]{
  _id,
  title,
  address,
  description,
  nftCollectionName,
  mainImage{asset},
  previewImage{asset},
  slug{current},
  creator->{
  _id,
  name,
  address,
  bio,
  slug{current},
  }
}`;
  return query;
};
