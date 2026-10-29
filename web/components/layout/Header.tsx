"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const navItems = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-page/70 backdrop-blur-md border-divider"
          : "bg-page border-transparent"
      }`}
    >
      <div className="container flex flex-row items-center justify-between py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={48}
            className="w-65"
            loading="eager"
          />
        </Link>
        <nav className="flex flex-row items-center gap-4">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-fg">
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="text-fg border border-divider rounded-md p-3 transition-colors hover:bg-card hover:border-line-strong"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
