import { createContext, useContext, type ParentProps } from "solid-js";

type AppState = {};

const AppStateContext = createContext<AppState>();

export function AppStateProvider(props: ParentProps) {
  const value: AppState = {};

  return (
    <AppStateContext.Provider value={value}>
      {props.children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx)
    throw new Error("useAppState must be used inside <AppStateProvider>");
  return ctx;
}
