import Link from 'next/link';

export function Header() {
  return (
    <header>
      <div className="flex justify-between pt-8">
        <Link href={'/'}>
          <h1>개발자 이민재입니다.</h1>
        </Link>
        <Link href={'https://minjaelee.me'}>
          <h1>새 블로그로 이전했습니다.</h1>
        </Link>
        <Link href={'/posts'}>
          <span>POSTS</span>
        </Link>
      </div>
      <div className="my-8 border border-solid border-slate-500" />
    </header>
  );
}
