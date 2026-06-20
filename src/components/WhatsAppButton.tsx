import { WhatsAppIcon } from "./WhatsAppIcon";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Blinking border effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
      <a
        href="https://wa.me/917990416940?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex w-14 h-14 rounded-full bg-[#25D366] items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 text-[#fff]" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
