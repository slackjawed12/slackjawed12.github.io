"use client";

import { allPosts } from "contentlayer/generated";
import { classifyByCategory } from "src/util/classifier";

export default function GlobalSideNavigation() {
  const classifiedPosts = classifyByCategory(allPosts);
  classifiedPosts.sort();
  return (
    <div className="hidden md:flex flex-col mr-6">
      <span className="mb-8 text-center">주제별 카테고리</span>
      <CategoryList classified={classifiedPosts} />
    </div>
  );
}

function CategoryList({ classified }: { classified: any[] }) {
  return (
    <>
      {classified.map((post, index) => {
        return (
          <div key={index}>
            <span>{post[0].toUpperCase()}</span>
          </div>
        );
      })}
      <div className="flex"></div>
    </>
  );
}
