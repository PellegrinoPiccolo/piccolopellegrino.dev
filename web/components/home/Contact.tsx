import Form from "./ui/Form";
import { MdOutlineEmail } from "react-icons/md";
import { FiLinkedin } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import type { SiteContent } from "@/content/types";
import {
  contactEmail,
  contactPhone,
  siteName,
  socialLinks,
  whatsappUrl,
} from "@/lib/site";
import { FaWhatsapp } from "react-icons/fa6";

const Contacts = [
  {
    icon: MdOutlineEmail,
    link: `mailto:${contactEmail}`,
    title: "Email",
    value: contactEmail,
  },
  {
    icon: FiLinkedin,
    link: socialLinks.linkedin,
    title: "LinkedIn",
    value: siteName,
  },
  {
    icon: FaWhatsapp,
    link: whatsappUrl,
    title: "WhatsApp",
    value: contactPhone,
  },
];

type ContactProps = {
  content: SiteContent;
};

const Contact = ({ content }: ContactProps) => {
  const { contact } = content;

  return (
    <section
      className="w-full bg-page scroll-mt-40"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container my-20 py-10 flex flex-col lg:flex-row lg:items-start bg-section rounded-lg border border-primary/40 gap-8">
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-row items-center justify-between">
            <p className="text-primary font-mono text-base">
              {contact.eyebrow}
            </p>
            <div className="flex flex-row items-center gap-2 bg-green-800/30 border border-green-600 p-2 rounded-full">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <p className="text-green-600 font-mono text-sm font-bold">
                {contact.badge}
              </p>
            </div>
          </div>
          <h2
            id="contact-heading"
            className="text-3xl md:text-5xl font-bold text-heading leading-snug"
          >
            {contact.heading[0]} <br /> {contact.heading[1]}
          </h2>
          <p className="text-description text-lg">{contact.description}</p>
          <div className="flex flex-col border-t border-divider">
            {Contacts.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-4 py-4 border-b border-divider"
              >
                <div className="flex items-center justify-center bg-indicator/20 rounded-lg p-3">
                  <item.icon className="text-indicator text-2xl" />
                </div>
                <div className="flex flex-col">
                  <p className="text-description text-sm font-medium font-mono">
                    {item.title}
                  </p>
                  <a
                    href={item.link}
                    className="text-heading text-base md:text-lg font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
            <div className="flex flex-row items-center gap-2 mt-4">
              <LuMapPin className="text-description text-sm" />
              <p className="text-description text-sm">{contact.location}</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Form content={content.form} locale={content.locale} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
