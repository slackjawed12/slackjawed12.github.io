import { format, parseISO } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';
import Giscus from 'src/components/Giscus';

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({ slug: post.slug.split('/') }));
};

export const generateMetadata = ({ params }: { params: { slug: string[] } }) => {
  const post = allPosts.find((post) => post.slug === params.slug.join('/'));
  return { title: post?.title };
};

export default function PostLayout({ params }: { params: { slug: string[] } }) {
  const slugByParams = `${params.slug.join('/')}`;
  const post = allPosts.find((post) => `${post.slug}` === slugByParams);
  const Content = getMDXComponent(post?.body?.code ?? '');

  return (
    <article className="prose prose-sm mx-auto max-w-3xl pt-8 dark:prose-invert sm:prose-base lg:prose-lg">
      <div className="mb-1">
        <h1 className="text-center">{post?.title}</h1>
        <div className="align-center flex justify-center gap-5">
          <time dateTime={post?.createdAt} className="my-auto">
            {format(parseISO(post?.createdAt ?? '0000-00-00'), 'LLLL d, yyyy')}
          </time>
          <p className="">{post?.readingTime}min read</p>
        </div>
      </div>
      <Content />
      <Giscus />
    </article>
  );
}
