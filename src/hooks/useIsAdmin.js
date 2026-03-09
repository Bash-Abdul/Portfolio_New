import { useMe } from "./useAuth";

export function useIsAdmin() {
    const { data } = useMe()
    return data?.data?.admin ?? false
  }