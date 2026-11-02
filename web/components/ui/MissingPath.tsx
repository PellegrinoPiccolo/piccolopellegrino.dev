"use client";

import { usePathname } from "next/navigation";

const MissingPath = () => {
  const pathname = usePathname();

  return <span className="break-all text-tag">{pathname ?? "/"}</span>;
};

export default MissingPath;
