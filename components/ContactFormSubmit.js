import axios from "axios";
import swal from "sweetalert";

function ContactFormSubmit(msgdata, setSubmitbtn, setCredentials) {
  console.log("=== ContactFormSubmit STARTED ===");
  let baseUrl = "https://admin.dolphy.ca";
  setSubmitbtn("Submitting...");

  let form_data = new FormData();

  // Log window object availability
  console.log("Window object available:", typeof window !== "undefined");

  // Get the complete URL with multiple methods for debugging
  let fullUrl = "no-url-captured";

  if (typeof window !== "undefined") {
    try {
      // Method 1: Direct href
      fullUrl = window.location.href;
      console.log("Method 1 - window.location.href:", fullUrl);

      // Method 2: Constructing manually
      const protocol = window.location.protocol;
      const host = window.location.host;
      const pathname = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;

      const constructedUrl = `${protocol}//${host}${pathname}${search}${hash}`;
      console.log("Method 2 - Constructed URL:", constructedUrl);

      // Log individual components
      console.log("URL Components:", {
        protocol,
        host,
        hostname: window.location.hostname,
        pathname,
        search,
        hash,
        origin: window.location.origin,
      });

      // Method 3: Using document.URL
      if (typeof document !== "undefined") {
        console.log("Method 3 - document.URL:", document.URL);
      }
    } catch (error) {
      console.error("Error capturing URL:", error);
      fullUrl = "error-capturing-url";
    }
  }

  console.log("Final URL to be used as source:", fullUrl);

  // Log form data being prepared
  console.log("Form data preparation started");
  form_data.append("name", msgdata.name);
  form_data.append("email", msgdata.email);
  form_data.append("phone", msgdata.phone);
  form_data.append("message", msgdata.message);
  form_data.append("realtor", msgdata.realtor);

  // Send the complete URL as the source
  form_data.append("source", fullUrl);
  console.log("Source value appended to form:", fullUrl);

  // Handle project name
  let newwww = "";
  if (msgdata.project_namee) {
    let neww = msgdata.project_namee.replaceAll("-", " ");
    const words = neww.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    newwww = words.join(" ");
  }
  form_data.append("proj_name", newwww || null);
  form_data.append("cityy", msgdata.cityy || null);
  console.log("Form data preparation completed");

  // Log form data entries if possible
  try {
    console.log("Form data entries:");
    for (let pair of form_data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
  } catch (e) {
    console.log("Could not log form data entries:", e);
  }

  let url = `${baseUrl}/api/contact-form-submit/`;
  console.log("Submitting form to:", url);
  axios
    .post(url, form_data, {
      headers: {
        "content-type": "multipart/form-data",
      },
      mode: "no-cors",
    })
    .then((response) => {
      console.log("Form submission successful:", response.status);

      // Show success message immediately after Dolphy submission
      setSubmitbtn("Successfully Submitted");
      swal(
        `Thank You, ${msgdata.name}`,
        "Please expect an email or call from us shortly",
        "success"
      );
      setCredentials({
        ...msgdata,
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitbtn("Contact Now");
      }, 2000);
    })
    .catch((errr) => {
      console.error("Dolphy submission failed:", errr);
      setSubmitbtn("Contact Now");
      swal("Message Failed", "Cannot send your message", "error");
    })
    .finally(() => {
      console.log("=== ContactFormSubmit COMPLETED ===");
    });
}

export default ContactFormSubmit;
