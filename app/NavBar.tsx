"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { GiAlienBug } from "react-icons/gi";
import { text } from "stream/consumers";

const NavBar = () => {
  const path = usePathname();
  console.log(path);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex border-b px-5 space-x-6 h-14 items-center">
      <Link href={"/"}>
        <GiAlienBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-zinc-950": path === link.href,
              "text-zinc-500": path !== link.href,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
