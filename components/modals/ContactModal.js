"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ContactModal = ({ isOpen, onClose, projectName, requestType = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    isRealtor: "No",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    onClose();
  };

  const generateMessage = () => {
    if (requestType) {
      return `Please send me additional ${requestType} information about ${projectName}. Thank You!`;
    }
    return `I'm interested in learning more about ${projectName}. Please send me additional information. Thank You!`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-md font-semibold">
            Request more info - {projectName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-2 items-center justify-between">
            <Input
              placeholder="Name"
              className="text-sm h-14"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Input
              placeholder="Phone"
              type="tel"
              className="text-sm h-14"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <Input
            placeholder="Your email"
            type="email"
            className="text-sm h-14"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <div className="space-y-2">
            <label className="text-sm text-neutral-500">
              Are you a realtor or working with a realtor?
            </label>
            <Select
              value={formData.isRealtor}
              onValueChange={(value) =>
                setFormData({ ...formData, isRealtor: value })
              }
              className="text-sm h-14"
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="Working with realtor">
                  Working with realtor
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="Your message"
            className="text-sm"
            value={formData.message || generateMessage()}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={5}
            required
          />

          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-neutral-800 h-12"
          >
            Contact now
          </Button>

          <p className="text-[0.6rem] text-neutral-500 mt-4">
            Dolphy is an online pre-construction homes database. Dolphy curates
            the list of projects that are publicly available on internet and
            does not take part in any real estate transactions. Be advised the
            information provided on this page could be outdated or inaccurate.
            By submitting above form you consent the real estate agents
            advertising on this page to connect with you. We may share your info
            to our partners or advertisers to help you with your questions. You
            can unsubscribe at any time by emailing us.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
