"use client";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const TopBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Compose", href: "/compose" },
    { label: "Profile", href: "/profile" },
  ];
  return (
    <nav className="bg-dark-1 py-5 px-5 lg:px-36">
      <div className="w-full flex items-center justify-between lg:gap-30">
        <Link href="/">
          <Image
            src="/logo.png"
            width={25}
            height={25}
            alt="Threads Logo"
            className="object-contain cursor-pointer lg:w-[40px]"
          />
        </Link>
        <div className="flex gap-3 lg:gap-14">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={classNames({
                "font-bold text-white": link.href == currentPath,
                "font-normal": link.href !== currentPath,
                "hover:text-white text-light-2 hover:font-medium transition-colors text-sm md:text-lg":
                  true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <SignedIn>
          <div className="w-[25px] lg:w-[40px]">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default TopBar;
