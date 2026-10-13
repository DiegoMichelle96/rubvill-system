const timeZone = "America/Mexico_City";
const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
const number = new Intl.NumberFormat("es-MX");
const date = new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeZone });
const dateTime = new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short", timeZone });
const month = new Intl.DateTimeFormat("es-MX", { month: "short", year: "2-digit", timeZone });
const isoDay = new Intl.DateTimeFormat("en-CA", { timeZone });

export const formatMoney = (value) => money.format(value);
export const formatNumber = (value) => number.format(value);
export const formatDate = (value) => (value ? date.format(new Date(value)) : "—");
export const formatDateTime = (value) => (value ? dateTime.format(new Date(value)) : "—");
export const formatMonth = (value) => month.format(new Date(value));
export const toIsoDay = (value = new Date()) => isoDay.format(value);
