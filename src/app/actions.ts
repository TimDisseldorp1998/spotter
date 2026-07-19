"use server";

/* Alleen async functies exporteren uit een "use server"-bestand.
   Types mogen wel (die verdwijnen bij het compileren); losse objecten niet —
   daarom staat de begintoestand in de client-component. */
export type SignupState = {
  status: "idle" | "success" | "error";
  message: string;
};

/**
 * Aanmelden voor de bèta.
 *
 * TODO: dit slaat nog niets op. Koppel hier je opslag aan (database,
 * mailinglijst of formulier-endpoint) voordat de site live gaat — nu krijgt
 * de bezoeker een bevestiging terwijl het adres nergens terechtkomt.
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

  // Simpele vormcheck; de echte validatie hoort bij je opslag te gebeuren.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return {
      status: "error",
      message:
        "Dit adres klopt nog niet. Controleer of er een @ en een punt in staan.",
    };
  }

  return {
    status: "success",
    message: "Gelukt. Je krijgt een mail zodra er plek is in de bèta.",
  };
}
