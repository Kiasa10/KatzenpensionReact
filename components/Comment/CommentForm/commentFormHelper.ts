export interface Comment {
  headline: string;
  author: string;
  content: string;
  image?: File;
}

export const transformFormDataToPlainObject = (formData: FormData): Comment => {
  const headline = formData.get("headline")?.toString() || "";
  const author = formData.get("author")?.toString() || "";
  const comment = formData.get("comment")?.toString() || "";
  const imageFile = formData.get("image");

  const commentData = {
    headline,
    author,
    content: comment,
    imageFile,
  };
  return commentData;
};
