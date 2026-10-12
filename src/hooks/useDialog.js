import { useEffect, useRef } from "react";

export function useDialog(open) {
  const ref = useRef(null);

  useEffect(() => {
    if (open) ref.current.showModal();
    else ref.current.close();
  }, [open]);

  return ref;
}
