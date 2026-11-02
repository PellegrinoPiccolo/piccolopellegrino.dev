"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FiSend } from "react-icons/fi";

const TYPES = [
  "Mobile app",
  "Website",
  "Desktop app",
  "Something else",
] as const;

const Form = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [type, setType] = React.useState<(typeof TYPES)[number]>("Mobile app");
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState("");

  const fail = (text: string) => {
    setError(text);
    setStatus("error");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      fail("Please enter a valid email address.");
      return;
    }
    if (name.trim() === "" || message.trim() === "") {
      fail("Please fill in all required fields.");
      return;
    }
    if (honeypot !== "") {
      setStatus("success");
      return;
    }
    setStatus("sending");
    try {
      let messageSend = message;
      messageSend += `\nType: ${type}`;
      const response = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: messageSend,
          apiKey: process.env.NEXT_PUBLIC_CONTACT_API_KEY,
        }),
      });
      if (response.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setType("Mobile app");
      } else {
        console.error("Failed to send message:", response.statusText);
        fail("Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      fail("An error occurred. Please try again later.");
    }
  };
  const inputClass =
    "w-full bg-page border border-line-card rounded-lg px-4 py-3 text-fg placeholder:text-muted focus:outline-none focus:border-indicator transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 bg-card border border-line-card rounded-2xl p-6 md:p-8"
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="text-body-light text-base mb-3">
          What do you need?
        </legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setType(option)}
              aria-pressed={type === option}
              className={`px-5 py-2 rounded-full border text-base transition-colors ${
                type === option
                  ? "bg-heading text-page border-heading font-semibold"
                  : "border-line-card text-body-light hover:border-line-strong"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-body-light text-base">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-body-light text-base">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-body-light text-base">Message</span>
        <textarea
          name="message"
          rows={5}
          placeholder="A few lines about the project, timeline and goals"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </label>
      <div aria-hidden="true" className="absolute -left-2500 h-px w-px overflow-hidden">
        <label>
          Company
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex items-center justify-center gap-3 w-full rounded-full bg-indicator/90 hover:bg-indicator py-4 text-heading text-lg font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            Sending...
            <FiSend />
          </>
        ) : (
          <>
            Send message
            <FiArrowRight />
          </>
        )}
      </button>
      <p
        className={`text-sm text-center ${
          status === "success"
            ? "text-available"
            : status === "error"
              ? "text-red-400"
              : "text-muted"
        }`}
        aria-live="polite"
      >
        {status === "success"
          ? "Message sent successfully!"
          : status === "error"
            ? error
            : "No spam, no newsletter — your message comes straight to my inbox."}
      </p>
      <p className="-mt-4 text-xs text-center text-muted">
        By sending this form you agree to the{" "}
        <Link href="/privacy" className="text-link hover:underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
};

export default Form;
