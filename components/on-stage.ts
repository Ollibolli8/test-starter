"use client";

// True on /stage, where the app runs in a drawn phone with the situations beside it on a desktop. The app reads it
// to leave out what the stage already shows (the situations in its own sheet, say). At / it's false.

import { createContext, useContext } from "react";

export const OnStage = createContext(false);

export function useOnStage() {
  return useContext(OnStage);
}
