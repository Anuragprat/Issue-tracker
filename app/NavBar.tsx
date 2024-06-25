import Link from "next/link";
import React from "react";
import { GiAlienBug } from "react-icons/gi";
const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
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
            className="text-zinc-900 hover:text-zinc-500 transition-colors"
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
