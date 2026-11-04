"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import type { FormContent, ProjectType } from "@/content/types";
import { localizePath, type Locale } from "@/lib/i18n";

const TYPES: ProjectType[] = ["mobile", "website", "desktop", "other"];

type FormProps = {
  content: FormContent;
  locale: Locale;
};

const Form = ({ content, locale }: FormProps) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const [type, setType] = React.useState<ProjectType>("mobile");
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
      fail(content.errors.invalidEmail);
      return;
    }
    if (name.trim() === "" || message.trim() === "") {
      fail(content.errors.required);
      return;
    }
    if (honeypot !== "") {
      setStatus("success");
      return;
    }
    setStatus("sending");
    try {
      let messageSend = message;
      messageSend += `\nType: ${content.types[type]}`;
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
        setType("mobile");
      } else {
        console.error("Failed to send message:", response.statusText);
        fail(content.errors.failed);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      fail(content.errors.generic);
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
          {content.legend}
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
              {content.types[option]}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-body-light text-base">{content.name}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder={content.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-body-light text-base">{content.email}</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder={content.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            suppressHydrationWarning
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-body-light text-base">{content.message}</span>
        <textarea
          name="message"
          rows={5}
          placeholder={content.messagePlaceholder}
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
            {content.sending}
            <FiSend />
          </>
        ) : (
          <>
            {content.send}
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
          ? content.success
          : status === "error"
            ? error
            : content.idle}
      </p>
      <p className="-mt-4 text-xs text-center text-muted">
        {content.consent.before}
        <Link
          href={localizePath(locale, "/privacy")}
          className="text-link hover:underline"
        >
          {content.consent.link}
        </Link>
        {content.consent.after}
      </p>
    </form>
  );
};

export default Form;
