import Link from "next/link";

export default function DeveloperCardDetail(props) {
  return (
    <>
      <div className="card border-0 rounded-mine my-2 my-md-0 pb-5 condocard position-relative mt-5 max-w-mine">
        <div className="builder-logo-detail is-loading">
          {props.image ? (
            <img
              loading="lazy"
              src={`https://api.dolphy.ca${props.image}`}
              layout="responsive"
              className="img-fluid"
              alt={`${props.name} builders logo`}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="mt-4"></div>
        <div className="card-content px-4 developer-desc mt-5">
          <h3 className="mb-1 cardd-title text-dark text-center">
            {props.name}
          </h3>
          <h4 className="mb-2 cardd-subtitle text-center">
            <span className="link-black">Website :</span> {props.website_link}
          </h4>
          {/* {props.phone !== "n/a" ? (
            <Link href={"telto:" + props.phone} className="link-black">
              <i className="bi bi-telephone"></i> {props.phone}
            </Link>
          ) : (
            <>
              <i className="bi bi-telephone"></i>{" "}
              <b className="ms-1">Phone number not available</b>
            </>
          )} */}
          <div
            className="iframe-container mb-0 pt-3 text-center"
            dangerouslySetInnerHTML={{
              __html: props.details,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
