import { Post } from "contentlayer/generated";

type PostCategoryInfo = {
  mainCategory: string;
  branchCategory: string;
  posts: Post[];
};

export const classifyByCategory = (posts: Post[]) => {
  const store = posts.reduce((prev, cur) => {
    const tokens = cur.slug.split("/");
    const categoryByPath = tokens.slice(0, tokens.length - 1);
    if (categoryByPath.length < 1) {
      const unclassifiedPosts = prev.get("unclassified");

      prev.set(
        "unclassified",
        unclassifiedPosts ? [...unclassifiedPosts, cur] : [cur]
      );

      return prev;
    }
    const key = categoryByPath.join("/");
    const before = prev.get(key);
    prev.set(categoryByPath.join("/"), before ? [...before, cur] : [cur]);
    return prev;
  }, new Map<string, Post[]>());

  return Array.from(store);
};

type PostDateInfo = {};

const classifyByDate = () => {};
