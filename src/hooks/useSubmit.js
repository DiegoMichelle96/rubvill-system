import { useState, useTransition } from "react";

export function useSubmit(submit) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);
    startTransition(async () => {
      try {
        await submit(formData);
      } catch ({ message, fields }) {
        setError({ message, fields });
      }
    });
  }

  return { onSubmit, pending, error: error?.message, fields: error?.fields ?? {}, reset: () => setError(null) };
}
