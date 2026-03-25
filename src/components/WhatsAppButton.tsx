import { WhatsAppIcon } from "./WhatsAppIcon";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/917990416940?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7 text-[#fff]" />
    </a>
  );
};

export default WhatsAppButton;
