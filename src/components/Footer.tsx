import Link from "next/link";
import { BLOG_START_YEAR } from "src/config/constants";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

export default function Footer() {
  const yearRange = () => {
    const currentYear = new Date().getFullYear();
    return `${BLOG_START_YEAR}-${currentYear}`;
  };

  return (
    <footer className="py-5 relative translate-y-full">
      <div className="flex flex-row space-x-2 mb-1">
        <a href="https://github.com/slackjawed12">
          <GithubIcon />
        </a>
        <a href="https://linkedin.com/in/minjae-lee-6851592a0">
          <LinkedinIcon />
        </a>
      </div>
      <div className="flex justify-start">
        <Link href={"/"} className="text-sm sm:text-base">
          © {yearRange()} Lee MinJae blog&nbsp;
        </Link>
        <span className="text-sm sm:text-base">Powered By&nbsp;</span>
        <span className="text-sm sm:text-base">Next.js</span>
      </div>
    </footer>
  );
}
