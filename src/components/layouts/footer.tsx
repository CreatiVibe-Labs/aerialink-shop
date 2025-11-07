import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const footerCardsImages = [
    {
      image: "/assets/icons/visa.png",
      alt: "Visa card",
    },
    {
      image: "/assets/icons/Mastercard.png",
      alt: "Mastercard",
    },
    {
      image: "/assets/icons/jcb_logo.png",
      alt: "JCB logo",
    },
    {
      image: "/assets/icons/stripe.png",
      alt: "Stripe",
    },
    {
      image: "/assets/icons/bitcoin.png",
      alt: "Bitcoin",
    },
  ];
  const socialLinks = [
    {
      href: "#",
      icon: <FaTwitter className="text-primary group-hover:text-white" />,
    },
    {
      href: "#",
      icon: <FaFacebook className="text-primary group-hover:text-white" />,
    },
    {
      href: "#",
      icon: <FaInstagram className="text-primary group-hover:text-white" />,
    },
    {
      href: "#",
      icon: <FaGithub className="text-primary group-hover:text-white" />,
    },
  ];
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-center md:text-left">
          {/* Logo + Description */}
          <div>
            <h2 className="text-2xl font-bold italic">@erialink</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto md:mx-0">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <a href="#" className="text-gray-700 hover:text-primary">
              Terms of service
            </a>
            <a href="#" className="text-gray-700 hover:text-primary">
              Privacy policy
            </a>
            <a href="#" className="text-gray-700 hover:text-primary">
              FAQs
            </a>
          </div>

          {/* Socials + Payments */}
          <div className="flex flex-col gap-4 items-center md:items-end">
            {/* Social icons */}
            <div className="flex gap-4 text-gray-600">
              {socialLinks.map((item, i) => (
                <Link key={i} href={item.href}>
                  <div className="hover:bg-primary border border-primary group cursor-pointer rounded-full size-10 center">
                    {item.icon}
                  </div>
                </Link>
              ))}
            </div>

            {/* Payment logos */}
            <div className="flex gap-3 flex-wrap justify-center md:justify-end">
              {footerCardsImages.map((item, cardIndex) => {
                return (
                  <img
                    key={cardIndex}
                    src={item.image}
                    alt={item.alt}
                    className="size-9 object-contain"
                  />
                );
              })}
            </div>
            {/* Bottom Section */}
            <div className="  pt-4 text-center text-sm text-gray-500">
              Aerialink © 2000–2023, All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
