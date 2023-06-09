interface Image {
  asset: {
    url: string;
  };
}

interface Creator {
  _id: string;
  name: string;
  address: string;
  bio: string;
  slug: {
    current: string;
  };
  image: Image;
}

interface Collection {
  _id: string;
  title: string;
  description: string;
  nftCollectionName: string;
  address: string;
  slug: {
    current: string;
  };
  creator: Creator;
  mainImage: any;
  previewImage: any;
}
