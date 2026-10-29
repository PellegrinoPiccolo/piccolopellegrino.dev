import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="bg-page">
      <div className="container flex flex-row justify-between py-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={48}
          className="w-65"
          loading="eager"
        />
      </div>
    </header>
  );
};

export default Header;