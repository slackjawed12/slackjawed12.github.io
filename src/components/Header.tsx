import Link from "next/link";

export function Header() {
  return (
    <header>
      <div className="pt-8 flex justify-between">
        <Link href={"/"}>
          <h1>개발자 이민재입니다.</h1>
        </Link>
        <Link href={"/posts"}>
          <span>POSTS</span>
        </Link>
      </div>
      <div className="my-8 border border-solid border-slate-500" />
    </header>
  );
}
