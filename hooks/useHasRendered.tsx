import { useEffect, useState } from "react";

export const useHasRendered = () => {
  const [hasRendered, setHasRendered] = useState<boolean>(false);
  useEffect(() => {
    setHasRendered(true);
  }, []);
  return hasRendered;
};
