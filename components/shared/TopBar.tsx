"use client";

import Image from "next/image";
import Link from "next/link";
import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames";

const TopBar = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const links = [
    { label: "Home", href: "/" },
    { label: "Compose", href: "/compose" },
    { label: "Profile", href: "/profile" },
  ];
  return (
    <nav className="bg-dark-1 py-5 px-36">
      <div className="w-full flex items-center justify-between gap-30">
        <Link href="/">
          <Image src="/logo.png" width={40} height={40} alt="Threads Logo" />
        </Link>
        <div className="flex gap-14">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={classNames({
                "font-bold text-white": link.href == currentPath,
                "font-normal": link.href !== currentPath,
                "hover:text-white text-light-2 hover:font-medium transition-colors text-lg":
                  true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <Image
              src="/Logout.svg"
              width={30}
              height={30}
              alt="Logout Button"
              className="cursor-pointer"
            />
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default TopBar;
