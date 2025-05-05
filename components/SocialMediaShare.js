"use client";

import React from "react";
import { usePathname } from "next/navigation";

import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "next-share";
import {
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  TelegramIcon,
  WhatsappIcon,
} from "next-share";

const SocialMediaShare = ({ title }) => {
  const pathname = usePathname();
  const url = "https://dolphy.ca" + pathname;

  return (
    <div className="flex items-baseline justify-start">
      <div className="flex gap-2 md:gap-3 flex-wrap">
        <div title="Share With Facebook">
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={38} round />
          </FacebookShareButton>
        </div>

        <div title="Share With Twitter">
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={38} round />
          </TwitterShareButton>
        </div>

        <div title="Share With Email">
          <EmailShareButton
            url={url}
            subject={title}
            body="Check out this awesome content!"
          >
            <EmailIcon size={38} round />
          </EmailShareButton>
        </div>

        <div title="Share With Telegram">
          <TelegramShareButton url={url} subject={title}>
            <TelegramIcon size={38} round />
          </TelegramShareButton>
        </div>

        <div title="Share With Whatsapp">
          <WhatsappShareButton url={url} subject={title}>
            <WhatsappIcon size={38} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaShare;
