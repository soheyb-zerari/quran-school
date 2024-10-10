import { useEffect, useState } from "react";

import { checkAuth } from "@/app/_actions/auth.action";

const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { isAuthenticated } = await checkAuth();
      setIsAuthenticated(isAuthenticated);
    };

    checkAuthStatus();
  }, [isAuthenticated]);

  return isAuthenticated;
};

export default useIsAuthenticated;
