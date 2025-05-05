import Link from "next/link";

export default function FixedContactButton() {
  return (
    <>
      <Link
        href="https://wa.link/w5tqet"
        className="fixed-whatsapp"
        target="_blank"
      >
        <img src="/whatsapp.png" alt="agent pic" className="img-fluid" />
      </Link>
    </>
  );
}
