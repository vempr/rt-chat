import { Link } from "react-router-dom";
import mongodbLogo from "../images/mongodb.png";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-darker-g flex select-none flex-col items-center py-12 text-white">
      <Link to="/" className="font-satoshi-bold text-3xl">
        <div className="flex flex-row items-center">
          <span className="translate-x-2">_rt_</span>
          <img src={mongodbLogo} className="h-8 w-8" />
          <span className="-translate-x-2">_chat_</span>
        </div>
      </Link>
      <hr className="my-4 h-0.5 w-52 bg-white opacity-30"></hr>
      <nav className="font-satoshi-light text-sm">
        <ul className="flex flex-row gap-x-6">
          <li>
            <Link to="/" onClick={scrollToTop}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={scrollToTop}>
              Create Blog
            </Link>
          </li>
          <li>
            <Link to="/sign-in" onClick={scrollToTop}>
              Sign In
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
