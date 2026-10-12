export const jobStatuses = ["PENDING", "PROCESSING", "COMPLETED", "COMPLETED_WITH_ERRORS", "FAILED"];
export const jobSteps = ["CFDI_PROCESSING", "CFDI_ARCHIVING", "CLEANUP", "REMOVE_KEY_FROM_S3", "COMPLETED", "FAILED"];
export const jobItemStatuses = ["PENDING", "RETRY_PENDING", "PROCESSING", "CFDI_SAVED", "COMPLETED", "FAILED"];
export const requestTypes = ["Emitidos", "Recibidos"];

export const statusLabels = {
  PENDING: "Pendiente",
  RETRY_PENDING: "Reintento pendiente",
  PROCESSING: "Procesando",
  CFDI_SAVED: "CFDI guardado",
  COMPLETED: "Completado",
  COMPLETED_WITH_ERRORS: "Con errores",
  FAILED: "Fallido",
};

export const statusTones = {
  PENDING: "neutral",
  RETRY_PENDING: "warning",
  PROCESSING: "brand",
  CFDI_SAVED: "brand",
  COMPLETED: "success",
  COMPLETED_WITH_ERRORS: "warning",
  FAILED: "danger",
};

export const stepLabels = {
  CFDI_PROCESSING: "Procesando CFDI",
  CFDI_ARCHIVING: "Archivando",
  CLEANUP: "Limpieza",
  REMOVE_KEY_FROM_S3: "Eliminando llaves",
  COMPLETED: "Completado",
  FAILED: "Fallido",
};

export const voucherTypes = { I: "Ingreso", E: "Egreso", T: "Traslado", N: "Nómina", P: "Pago" };

export const activeStatuses = ["PENDING", "RETRY_PENDING", "PROCESSING"];
