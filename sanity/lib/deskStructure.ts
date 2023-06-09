const excludes = [
  "author",
  "category",
  "sliderTestimonial",
  "social",
  "accolade",
  "faq",
  "story",
  "testimonial",
   "blogPostCategory",
];
const hiddenDocTypes = (listItem: any) => !excludes.includes(listItem.getId());

export const myStructure = (S: any) =>
  S.list()
    .title("Pages")
    .items([...S.documentTypeListItems().filter(hiddenDocTypes)]);
