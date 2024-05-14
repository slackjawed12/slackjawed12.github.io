// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypePrism from 'rehype-prism-plus';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import readingTime from 'reading-time';
export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: '**/*.mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
    tag: {
      type: 'list',
      of: {
        type: 'string',
      },
      required: true,
    },
    thumbnail: {
      type: 'string',
      required: false,
    },
    createdAt: {
      type: 'date',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: 'string',
      resolve: (post) => Math.round(readingTime(post.body.raw).minutes),
    },
  },
}));

export default makeSource({
  contentDirPath: './src/posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      //@ts-ignore
      rehypeKatex,
      //@ts-ignore
      rehypePrettyCode,
      //@ts-ignore
      rehypePrism,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noopener noreferrer'],
        },
      ],
    ],
  },
});
