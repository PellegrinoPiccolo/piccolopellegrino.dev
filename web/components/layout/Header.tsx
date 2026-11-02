"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { navItems } from "@/lib/site";

const sectionIds = [
  ...navItems.map((item) => item.href.slice(item.href.indexOf("#") + 1)),
  "contact",
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

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

  useEffect(() => {
    if (!isHome) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const sorted = [...entries].sort(
          (a, b) => Number(a.isIntersecting) - Number(b.isIntersecting),
        );
        for (const entry of sorted) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActiveSection(id);
          } else {
            setActiveSection((prev) => (prev === id ? null : prev));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const closeMenu = () => setMenuOpen(false);

  const currentSection = isHome ? activeSection : null;
  const isActive = (href: string) =>
    currentSection !== null && href === `/#${currentSection}`;

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
              alt="Pellegrino Piccolo — home"
              width={429}
              height={72}
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
                aria-current={isActive(item.href) ? "location" : undefined}
                className={`relative py-1 transition-colors hover:text-link after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-indicator after:transition-transform after:duration-300 ${
                  isActive(item.href)
                    ? "text-link after:scale-x-100"
                    : "text-fg after:scale-x-0"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              aria-current={isActive("/#contact") ? "location" : undefined}
              className={`border rounded-md p-3 transition-colors hover:bg-card hover:border-line-strong ${
                isActive("/#contact")
                  ? "text-link border-indicator"
                  : "text-fg border-divider"
              }`}
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
              alt="Pellegrino Piccolo — home"
              width={429}
              height={72}
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
              aria-current={isActive(item.href) ? "location" : undefined}
              className={`py-3 text-body-lg border-b border-divider ${
                isActive(item.href) ? "text-link" : "text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            aria-current={isActive("/#contact") ? "location" : undefined}
            className={`mt-6 text-center border rounded-md p-3 transition-colors hover:bg-card hover:border-line-strong ${
              isActive("/#contact")
                ? "text-link border-indicator"
                : "text-fg border-divider"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
