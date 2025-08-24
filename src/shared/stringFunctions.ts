export const toSentenceCase = (str: string) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export const paymentMethodStringFormat = (str: string) => {
  if (str === "net_banking") return "Net Banking";
  else if (str === "upi") return "UPI";
  else if (str === "debit_card") return "Card";
  else if (str === "wallet") return "Wallet";
  else if (str === "cash") return "Cash";
};
