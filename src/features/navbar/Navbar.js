import React, { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Categories", href: "#slider" },
  { name: "Trending", href: "#trending" },
  { name: "On Sale", href: "#discount" },
  { name: "Services", href: "/service" }, // Added Services link
  { name: "Contacts", href: "#contact" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const firstChar = localStorage.getItem("firstChar") || "SE";

  const handleSignOut = () => {
    console.log("Signout dabaya");
    localStorage.removeItem("token");
    localStorage.removeItem("firstChar");
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/productlanding?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleNavClick = (href) => {
    setSearchTerm('');

    if (href.startsWith("#")) {
      setTimeout(() => {
        const section = document.querySelector(href);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };


  const handleSearchToggle = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="text-xl font-bold text-black">
                    <Link
                      to={"/"}
                      className="hover:text-blue-500 hover:font-bold p-2"
                    >
                      <div>
                        <span className="block text-3xl leading-none">
                          SUMAN
                        </span>
                        <span className="block tracking-widest text-sm">
                          ENTERPRISES
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 md:hidden">
                <button
                  onClick={handleSearchToggle}
                  className="p-2 text-gray-700 hover:text-black"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {searchVisible && (
                  <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4">
                    <form
                      onSubmit={handleSearchSubmit}
                      className="flex items-center"
                    >
                      <input
                        type="text"
                        placeholder="Search Products"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-md p-2 text-sm w-full"
                      />
                      <button
                        type="submit"
                        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
                      >
                        Search
                      </button>
                    </form>
                  </div>
                )}

                <Link to="/cart">
                  <button className="p-1 text-gray-700 hover:text-black">
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Link>

                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex items-center text-sm rounded-full bg-gray-800 text-white focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
                        {firstChar}
                      </span>
                    </Menu.Button>
                  </div>
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/service-status"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Services
                          </Link>
                        )}
                      </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleSignOut}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>

              <div className="hidden md:flex items-center justify-between w-full">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-md p-2 text-sm w-80 ml-20"
                  />
                  <button
                    type="submit"
                    className="ml-2 p-2 bg-blue-500 text-white rounded-md"
                  >
                    Search
                  </button>
                </form>
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      onClick={() => handleNavClick(item.href)}
                      key={item.name}
                      to={item.href}
                      className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/cart">
                    <button className="relative p-1 text-gray-700 hover:text-black">
                      <ShoppingCartIcon
                        className="h-6 w-6 mr-5"
                        aria-hidden="true"
                      />
                    </button>
                  </Link>

                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="flex items-center text-sm rounded-full bg-gray-800 text-white focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
                          {firstChar}
                        </span>
                      </Menu.Button>
                    </div>
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/service-status"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Services
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-4 pb-3">
              <input
                type="text"
                placeholder="Search"
                className="border rounded-md p-2 text-sm w-full"
              />
            </div>
            <div className="px-4 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="px-4 pb-3">
              <Link to="/cart">
                <button className="block w-full py-2 text-base font-medium text-gray-700 hover:text-black">
                  <ShoppingCartIcon
                    className="h-6 w-6 mr-2 inline"
                    aria-hidden="true"
                  />
                  Cart
                </button>
              </Link>
            </div>
            <div className="px-4 pb-3">
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="flex items-center text-sm rounded-full bg-gray-800 text-white focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <span className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold">
                      {firstChar}
                    </span>
                  </Menu.Button>
                </div>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </Disclosure.Panel>
        </Disclosure>

        <main>{children}</main>
      </div>
    </>
  );
}

export default NavBar;
