"use client";
import React, { useEffect, useState } from "react";
import Slider, { SliderSkeleton } from "./Slider";
import { isLocalStorageAvailable } from "@/helpers/checkLocalStorageAvailable";

const UnlockableCards = ({ data }) => {
  const [signedIn, setSignedIn] = useState();
  const isSignedIn = () => {
    if (isLocalStorageAvailable) {
      const item = JSON.parse(localStorage.getItem("sign-in-vow"));
      let email = item?.email.length > 0;
      let phone = item?.phone.length > 0;
      return email && phone;
    }
    return false;
  };
  useEffect(() => {
    setSignedIn(isSignedIn());
  });
  return signedIn ? (
    <Slider data={data} soldData={true} />
  ) : (
    <SliderSkeleton data={data} setSignedIn={setSignedIn} />
  );
};

export default UnlockableCards;
