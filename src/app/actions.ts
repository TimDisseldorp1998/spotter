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

/**
 * Haalt een omgevingsvariabele op en haalt er rommel af die je bij plakken
 * zo oppikt: spaties eromheen en aanhalingstekens die mee zijn gekopieerd.
 * Een mailserver weigert daarop zonder te zeggen wat er mis is.
 */
function readEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (raw === undefined) return undefined;

  const cleaned = raw.trim().replace(/^(['"])([\s\S]*)\1$/, "$2");
  return cleaned;
}

const SMTP_HOST = readEnv("SMTP_HOST");
const SMTP_PORT = readEnv("SMTP_PORT");
const SMTP_USER = readEnv("SMTP_USER");
const SMTP_PASSWORD = readEnv("SMTP_PASSWORD");
const SIGNUP_NOTIFY_TO = readEnv("SIGNUP_NOTIFY_TO");

/**
 * Beschrijft een waarde zonder hem prijs te geven: lengte en of er iets
 * afgehaald moest worden. Genoeg om een plakfout te herkennen, te weinig
 * om het wachtwoord uit de logs te vissen.
 */
function describe(name: string): string {
  const raw = process.env[name];
  if (raw === undefined) return `${name}: ONTBREEKT`;

  const cleaned = readEnv(name) ?? "";
  const notes: string[] = [`${cleaned.length} tekens`];
  if (raw !== raw.trim()) notes.push("had spaties eromheen");
  if (/^['"]|['"]$/.test(raw.trim())) notes.push("had aanhalingstekens");
  return `${name}: ${notes.join(", ")}`;
}

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
    // Geen wachtwoorden in de logs, alleen genoeg om een plakfout te zien.
    console.error(
      "[spotter] config —",
      [
        `host: ${SMTP_HOST}`,
        `poort: ${port} (secure: ${port === 465})`,
        `user: ${SMTP_USER}`,
        describe("SMTP_PASSWORD"),
        describe("SMTP_USER"),
      ].join(" | "),
    );
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
