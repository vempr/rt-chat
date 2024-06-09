import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useGetAuthenticationStatusQuery } from "../app/api/usersApi.ts";
import mongodbLogo from "../images/mongodb.png";

export default function Header() {
  const location = useLocation();
  const { data } = useGetAuthenticationStatusQuery(null);
  const [accountDropdownActive, setAccountDropdownActive] = useState(false);
  const [hamburgerActive, setHamburgerActive] = useState(false);

  useEffect(() => {
    setHamburgerActive(false);
    setAccountDropdownActive(false);
  }, [location]);

  const underlineClass = ({ isActive }: { isActive: boolean }): string => {
    return isActive ? "font-satoshi-black" : "";
  };

  const notLoggedInLinks = (
    <>
      <li>
        <NavLink to="/sign-in" className={underlineClass}>
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink to="/sign-up" className={underlineClass}>
          Sign Up
        </NavLink>
      </li>
    </>
  );

  const loggedInLinks = (
    <>
      <li>
        <NavLink to="/account" className={underlineClass}>
          Details
        </NavLink>
      </li>
      <li>
        <NavLink to="/log-out" className={underlineClass}>
          Log Out
        </NavLink>
      </li>
    </>
  );

  const notLoggedInLinksMobile = (
    <>
      <li>
        <NavLink to="/sign-in" className={underlineClass}>
          Sign In
        </NavLink>
      </li>
    </>
  );

  const loggedInLinksMobile = (
    <>
      <li>
        <NavLink to="/account" className={underlineClass}>
          Account
        </NavLink>
      </li>
      <li>
        <NavLink to="/log-out" className={underlineClass}>
          Log Out
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-darker-g flex select-none flex-col px-5 py-5 text-white sm:px-7">
      <div className="flex flex-row items-center justify-between">
        <Link to="/">
          <div className="flex flex-row items-center">
            <img src={mongodbLogo} className="h-8 w-8" />
            <p className="font-satoshi-bold text-3xl">rt_chat_</p>
          </div>
        </Link>

        <button
          className="flex flex-col gap-y-1.5 sm:hidden"
          onClick={() => setHamburgerActive(!hamburgerActive)}
        >
          <div className="h-1 w-8 rounded-md border bg-white"></div>
          <div className="h-1 w-8 rounded-md border bg-white"></div>
          <div className="h-1 w-8 rounded-md border bg-white"></div>
        </button>

        <nav className="font-satoshi-medium hidden sm:block">
          <ul className="flex flex-row gap-x-8">
            <li className="relative">
              <NavLink to="/" className={underlineClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/create" className={underlineClass}>
                Create Blog
              </NavLink>
            </li>
            <li>
              <button
                className={`flex flex-row items-center gap-x-3  ${accountDropdownActive ? "font-satoshi-black" : ""}`}
                onClick={() => setAccountDropdownActive(!accountDropdownActive)}
              >
                Account
                <svg
                  fill="#ffffff"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330 330"
                  xmlSpace="preserve"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      id="XMLID_225_"
                      d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                      strokeWidth={`${accountDropdownActive ? "30" : "20"}`}
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </li>
          </ul>
          <ul
            className={`bg-darker-g absolute right-4 top-16 space-y-3 rounded-lg px-10 py-4 text-center shadow-lg transition-opacity duration-300 ${accountDropdownActive ? "opacity-100" : "opacity-0"}`}
          >
            {data?.user ? loggedInLinks : notLoggedInLinks}
          </ul>
        </nav>
      </div>

      <nav className={`pt-6 ${hamburgerActive ? "block" : "hidden"}`}>
        <ul className="font-satoshi-medium bg-darker-g flex flex-col gap-y-3 text-center text-xl">
          <li>
            <NavLink to="/" className={underlineClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" className={underlineClass}>
              Create Blog
            </NavLink>
          </li>
          {data?.user ? loggedInLinksMobile : notLoggedInLinksMobile}
        </ul>
      </nav>
    </header>
  );
}
