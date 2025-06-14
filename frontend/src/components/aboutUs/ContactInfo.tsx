import React, { FC, ReactNode } from "react";

interface ContactInfoProps {
  icon: ReactNode;
  contact: string;
  info: string;
}

const ContactInfo: FC<ContactInfoProps> = ({ icon, contact, info }) => {
  return (
    <div className="flex items-center gap-5 lg:flex-col">
      <span className="text-5xl text-[var(--secondary-color)]">{icon}</span>
      <div className="flex flex-col text-[var(--text-color)] lg:text-center">
        <p className="text-xl font-bold ">{contact}</p>
        <p className="text-base">{info}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
