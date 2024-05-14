import { Post, allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import GlobalSideNavigation from "src/components/GlobalSideNavigation";

export default function HomePage() {
  return (
    <main>
      <div className="flex">
        <GlobalSideNavigation />
        <RecentPosts />
      </div>
    </main>
  );
}

function RecentPosts() {
  const copiedPost = allPosts.slice();
  return (
    <div className="flex-1">
      <div className="text-center">최근 게시물</div>
      {copiedPost
        .sort((o1, o2) => compareDesc(o1.createdAt, o2.createdAt))
        .map((post, i) => {
          return <PostItem key={i} post={post} />;
        })}
    </div>
  );
}

function PostItem({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div className="my-10 flex flex-col">
        <h2 className="font-bold py-2 text-sm truncate md:text-xl">
          {post.title}
        </h2>
        <span className="text-sm py-1 md:text-lg">{post.description}</span>
        <span className="text-slate-400 text-xs py-1 md:text-sm">
          {post.createdAt.split("T")[0]}
        </span>
      </div>
    </Link>
  );
}
