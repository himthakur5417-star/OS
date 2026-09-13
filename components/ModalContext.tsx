"use client";

import React, { createContext, useContext, useState } from "react";

interface UserSession {
  isLoggedIn: boolean;
  name?: string;
  role?: "cadet" | "scholar" | "junior" | "parent";
  rollNumber?: string;
}

interface ModalContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  isAiOpen: boolean;
  openAi: (initialTab?: "syllabus" | "planner" | "accountability") => void;
  closeAi: () => void;
  aiInitialTab: "syllabus" | "planner" | "accountability";
  isOrientationOpen: boolean;
  openOrientation: (program?: string) => void;
  closeOrientation: () => void;
  orientationDefaultProgram: string;
  user: UserSession;
  loginUser: (data: { name: string; role: "cadet" | "scholar" | "junior" | "parent"; rollNumber?: string }) => void;
  logoutUser: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInitialTab, setAiInitialTab] = useState<"syllabus" | "planner" | "accountability">("syllabus");
  const [isOrientationOpen, setIsOrientationOpen] = useState(false);
  const [orientationDefaultProgram, setOrientationDefaultProgram] = useState("general");
  
  const [user, setUser] = useState<UserSession>({
    isLoggedIn: false,
  });

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openAi = (initialTab?: "syllabus" | "planner" | "accountability") => {
    if (initialTab) setAiInitialTab(initialTab);
    setIsAiOpen(true);
  };
  const closeAi = () => setIsAiOpen(false);

  const openOrientation = (program = "general") => {
    setOrientationDefaultProgram(program);
    setIsOrientationOpen(true);
  };
  const closeOrientation = () => setIsOrientationOpen(false);

  const loginUser = (data: { name: string; role: "cadet" | "scholar" | "junior" | "parent"; rollNumber?: string }) => {
    setUser({
      isLoggedIn: true,
      name: data.name,
      role: data.role,
      rollNumber: data.rollNumber || "OS-2025-084",
    });
    setIsLoginOpen(false);
  };

  const logoutUser = () => {
    setUser({ isLoggedIn: false });
  };

  return (
    <ModalContext.Provider
      value={{
        isLoginOpen,
        openLogin,
        closeLogin,
        isAiOpen,
        openAi,
        closeAi,
        aiInitialTab,
        isOrientationOpen,
        openOrientation,
        closeOrientation,
        orientationDefaultProgram,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
}
