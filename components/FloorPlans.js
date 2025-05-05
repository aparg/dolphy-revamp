"use client";
/* import LightGallery from "lightgallery/react"; */

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

/* import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom"; */

export default function FloorPlans(props) {
  /* const onInit = () => {
    console.log("lightGallery has been initialized");
  }; */

  return (
    <>
      {props.images &&
        props.images.map((item, no) => (
          <div className="col" key={no}>
            <div className="card shadow-sm">
              <img
                src={`https://api.dolphy.ca${item.floorplan}`}
                className="img-fluid rounded-mine"
                alt="floor plan"
              />
            </div>
          </div>
        ))}
    </>
  );
}
