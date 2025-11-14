// Make sure these files exist
// export * from "./appointmentUtils.js";
// export * from "./paymentUtils.js";

// Export createPageUrl
export function createPageUrl(page, id = "") {
  return id ? `/${page}/${id}` : `/${page}`;
}
