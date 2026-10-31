"use client";

import React from "react";

const Form = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState<
    "Mobile App" | "Website" | "Desktop app" | "Something else"
  >("Mobile App");
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
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setType("Mobile App");
      } else {
        console.error("Failed to send message:", response.statusText);
        setStatus("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };
  return <form>{/* Form content goes here */}</form>;
};

export default Form;
