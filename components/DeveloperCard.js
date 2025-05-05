import Link from "next/link";

export default function DeveloperCard(props) {
  return (
    <>
      <div className="card border-0 rounded-mine my-3 my-md-0 condocard">
        <div className="position-relative is-loading">
          <Link
            href={`/pre-construction-homes/builders/${props.slug}`}
            className="mylinkk"
            target="_blank"
          >
            {props.image ? (
              <img
                loading="lazy"
                src={`${props.image}`}
                layout="responsive"
                className="img-fluid condocard-img-top2"
                alt={`${props.name} builder's logo`}
              />
            ) : (
              <img
                loading="lazy"
                src="/noimage.webp"
                className="img-fluid condocard-img-top2"
                alt={`no image available for ${props.name}`}
              />
            )}
          </Link>
        </div>
        <Link
          href={`/pre-construction-homes/builders/${props.slug}`}
          className="card-body text-decoration-none text-dark bg-white shadow-lgg rounded-mine"
          target="_blank"
        >
          <div className="card-content pt-2">
            <h3 className="mb-1 cardd-title text-dark fs-small text-center">
              {props.name}
            </h3>
            {/* <h4 className="mb-2 cardd-subtitle">{props.website_link}</h4> */}
            {/* <p className="mb-0 project-address-card">{props.details}</p> */}
            {/* <p className="card-secondary-title mb-0">{props.phone}</p> */}
          </div>
        </Link>
      </div>
    </>
  );
}
