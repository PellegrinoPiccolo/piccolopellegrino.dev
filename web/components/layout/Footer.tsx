import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-page border-t border-divider">
      <div className="container py-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        <p className="text-sm lg:text-base text-body">
          <span className="font-mono">/*PellegrinoPiccolo*/</span> · &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <p className="text-sm lg:text-base text-body">
          Built with Next.js & Tailwind ·{" "}
          <Link href="/privacy" className="hover:text-link hover:underline">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
