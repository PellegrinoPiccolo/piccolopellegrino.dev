"use client";

import React from "react";

const Contact = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) {
        setStatus("Please enter a valid email address.");
        return;
      }
      if (name.trim() === "" || message.trim() === "") {
        setStatus("Please fill in all required fields.");
        return;
      }
      const response = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          apiKey: process.env.NEXT_PUBLIC_CONTACT_API_KEY,
        }),
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        console.error("Failed to send message:", response.statusText);
        setStatus("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="w-full bg-page scroll-mt-20" id="contact">
      <div className="container py-20"></div>
    </div>
  );
};

export default Contact;
