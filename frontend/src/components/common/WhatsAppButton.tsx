import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

const WHATSAPP_NUMBER = "5512982983083";
const WHATSAPP_MESSAGE = "Olá, estou interessado nos seus serviços!";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const WhatsAppButton = () => {
  return (
    <Link className="fixed z-5 bottom-5 right-5 cursor-pointer w-12 h-12 text-2xl rounded-full text-white bg-green-600 flex items-center justify-center" target="_blank" href={whatsappLink}>
      <BsWhatsapp />
    </Link>
  );
};

export default WhatsAppButton;
