"use client";
import { useState } from "react";

export default function Accordion(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div className="accordion" id="accordionExample">
      {props.accdata.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button${
                activeIndex === index ? " active" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index + 1}`}
              aria-expanded={activeIndex === index ? "true" : "false"}
              aria-controls={`collapse${index + 1}`}
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
            </button>
          </h2>
          <div
            id={`collapse${index + 1}`}
            className={`accordion-collapse collapse${
              activeIndex === index ? " show" : ""
            }`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
