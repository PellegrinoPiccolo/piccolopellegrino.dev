"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const navItems = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#stack", label: "Stack" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    // Close the menu if the viewport grows to the desktop layout
    const desktop = window.matchMedia("(width >= 48rem)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    closeMenu();
    if (pathname !== "/") return;

    const hash = href.slice(href.indexOf("#"));
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
  };

  return (
    <>
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
              className="w-50 md:w-65"
              loading="eager"
            />
          </Link>
          <nav className="hidden md:flex flex-row items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-fg"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="text-fg border border-divider rounded-md p-3 transition-colors hover:bg-card hover:border-line-strong"
            >
              Contact
            </Link>
          </nav>
          <button
            type="button"
            className="md:hidden -mr-2 p-2 text-fg rounded-md transition-colors hover:bg-card"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            <IoMenu size={24} />
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-60 bg-black/40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`md:hidden fixed inset-y-0 right-0 z-60 flex w-4/5 max-w-xs flex-col bg-page border-l border-divider transition-[translate,visibility] duration-300 ease-in-out ${
          menuOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex justify-between px-4 py-4">
          <Link href="/" className="flex items-center" onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={48}
              className="w-50"
              loading="eager"
            />
          </Link>
          <button
            type="button"
            className="-mr-2 p-2 text-fg rounded-md transition-colors hover:bg-card"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <IoClose size={24} />
          </button>
        </div>
        <nav className="flex flex-col px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="py-3 text-body-lg text-fg border-b border-divider"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            className="mt-6 text-center text-fg border border-divider rounded-md p-3 transition-colors hover:bg-card hover:border-line-strong"
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
