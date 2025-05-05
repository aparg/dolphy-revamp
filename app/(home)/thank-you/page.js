"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();

  return (
    <>
      {/* <div className="py-5"></div> */}
      <div className="container-fluid">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img
            src="/thankyou.gif"
            alt="dolphy logo icon"
            className="img-fluid icon-img"
          />
          <h4 className="text-center fs-md-2 fw-bold mb-0">
            Thank you for reaching out to us!
          </h4>
          <p className="text-center text-green fs-small fs-md-5 mt-2 fw-bold mt-md-0 mb-4">
            We have received yoor message and will get back to you soon.
          </p>
        </div>
        <div className="py-1 py-md-3 d-flex justify-content-center">
          <button
            onClick={() => router.back()}
            className="btn btn-lg shadow-lg fs-5"
          >
            <i class="bi bi-arrow-left"></i>
            <span className="mx-2"></span>
            Get back to previous page
          </button>
        </div>
      </div>
      <div className="py-5"></div>
    </>
  );
}
