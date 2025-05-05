"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EventBanner() {
  const pathname = usePathname();
  if (
    pathname.includes("brampton") ||
    pathname.includes("calgary") ||
    pathname.includes("mississauga") ||
    pathname.includes("toronto") ||
    pathname.includes("vaughan") ||
    pathname.includes("whitby")
  ) {
    return (
      <>
        {/* <div className="container-fluid mb-md-4 mt-md-3">
        <Link
          href="https://mo1j6p872s4.typeform.com/to/RKmSiQTb"
          target="_blank"
        >
          <img
            src="/trumanhomes.png"
            alt="Truman is coming to brampton ontario event banner"
            className="img-fluid pointer-c"
          />
        </Link>
      </div> */}
      </>
    );
  } else {
    return <></>;
  }
}
