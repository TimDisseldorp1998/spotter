"use server";

import nodemailer from "nodemailer";

/* Alleen async functies exporteren uit een "use server"-bestand.
   Types mogen wel (die verdwijnen bij het compileren); losse objecten niet —
   daarom staat de begintoestand in de client-component. */
export type SignupState = {
  status: "idle" | "success" | "error";
  message: string;
};

/* SMTP-gegevens komen uit de omgeving, nooit uit de code.
   Zie .env.example voor welke variabelen je moet zetten. */
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  SIGNUP_NOTIFY_TO,
} = process.env;

/**
 * Aanmelden voor de bèta. Stuurt het adres als mailtje naar SIGNUP_NOTIFY_TO.
 *
 * Bewust geen "gelukt" als de mail niet weg kan: dan raken we de aanmelding
 * kwijt zonder dat iemand het merkt.
 */
export async function joinWaitlist(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim();

  if (email.length === 0) {
    return {
      status: "error",
      message: "Vul je e-mailadres in zodat we je kunnen uitnodigen.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return {
      status: "error",
      message:
        "Dit adres klopt nog niet. Controleer of er een @ en een punt in staan.",
    };
  }

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SIGNUP_NOTIFY_TO) {
    // Verkeerd geconfigureerde server: niet doen alsof het gelukt is.
    console.error(
      "[spotter] SMTP-variabelen ontbreken; aanmelding niet verstuurd.",
    );
    return {
      status: "error",
      message:
        "Aanmelden lukt nu even niet. Probeer het later opnieuw of mail ons direct.",
    };
  }

  const port = Number(SMTP_PORT ?? 465);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"Spotter aanmeldingen" <${SMTP_USER}>`,
      to: SIGNUP_NOTIFY_TO,
      replyTo: email,
      subject: "Nieuwe bèta-aanmelding voor Spotter",
      text: `Nieuw aangemeld: ${email}\n\nBinnengekomen: ${new Date().toLocaleString("nl-NL")}`,
    });
  } catch (error) {
    console.error("[spotter] Versturen van de aanmelding mislukt:", error);
    return {
      status: "error",
      message:
        "Aanmelden lukt nu even niet. Probeer het later opnieuw of mail ons direct.",
    };
  }

  return {
    status: "success",
    message: "Gelukt. Je krijgt een mail zodra er plek is in de bèta.",
  };
}
