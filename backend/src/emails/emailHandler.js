import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Chattify",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Error sending the email:", error);
    throw new Error("Failed to send welcome Email");
  }

  console.log("Welcome Email sent successfully", data);
};

/**
 *
 *yes, exactly — in your current setup:

from → is the dummy sender email address you own or control, usually tied to your domain or verified email.

to → is the actual recipient (the user you're sending the email to, like your customer).
 */
