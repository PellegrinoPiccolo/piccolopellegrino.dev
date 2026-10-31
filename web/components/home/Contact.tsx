import Form from "./ui/Form";
import { MdOutlineEmail } from "react-icons/md";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";

const Contacts = [
  {
    icon: MdOutlineEmail,
    link: "mailto:piccolopellegrino.dev@gmail.com",
    title: "Email",
    value: "piccolopellegrino.dev@gmail.com",
  },
  {
    icon: FiLinkedin,
    link: "https://www.linkedin.com/in/pellegrino-piccolo-2a6739247",
    title: "LinkedIn",
    value: "Pellegrino Piccolo",
  },
  {
    icon: FiGithub,
    link: "https://github.com/PellegrinoPiccolo",
    title: "GitHub",
    value: "PellegrinoPiccolo",
  },
];

const Contact = () => {
  return (
    <div className="w-full bg-page scroll-mt-20" id="contact">
      <div className="container my-20 py-10 flex flex-row items-center bg-section rounded-lg border border-primary/40">
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-row items-center justify-between">
            <p className="text-primary font-mono text-base">04 — Contact</p>
            <div className="flex flex-row items-center gap-2 bg-green-800/30 border border-green-600 p-2 rounded-full">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <p className="text-green-600 font-mono text-sm font-bold">
                Get in touch
              </p>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-heading">
            Have a project in mind?
          </h2>
          <p className="text-description text-lg">
            Tell me what you're building: an app, a website or a tool. I'll get
            back to you within an hour.
          </p>
          <div className="flex flex-col border-t border-divider">
            {Contacts.map((contact, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-4 py-4 border-b border-divider"
              >
                <div className="flex items-center justify-center bg-indicator/20 rounded-lg p-3">
                  <contact.icon className="text-indicator text-2xl" />
                </div>
                <div className="flex flex-col">
                  <p className="text-description text-sm font-medium font-mono">
                    {contact.title}
                  </p>
                  <a
                    href={contact.link}
                    className="text-heading text-lg font-bold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Contact;
