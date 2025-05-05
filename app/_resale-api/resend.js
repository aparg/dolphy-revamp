"use server";

export const sendEmail = async ({ content, page = null, title = null }) => {
  const emailApi = "http://api.dolphy.ca/api/contact-form-resale-submit/";
  const emailObj = {
    full_name: content.name,
    email: content.email,
    phone: content.phoneNumber,
    message: content.message,
    cityy: content.city,
    source: "dolphy",
    form_type: "resale",
  };

  const response = await fetch(emailApi, {
    method: "POST",
    body: JSON.stringify(emailObj),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return true;
  }
};
