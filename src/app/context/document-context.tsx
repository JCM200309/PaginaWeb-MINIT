import React, { createContext, useContext, useState, useEffect } from "react";
import { products as defaultProducts, Product } from "../data/products";

export type DocType = "technicalSheet" | "certificateSheet" | "safetySheet" | "affidavitSheet";

export interface ProductDocOverrides {
  [productId: string]: {
    technicalSheet?: string;
    certificateSheet?: string;
    safetySheet?: string;
    affidavitSheet?: string;
  };
}

interface DocumentContextType {
  overrides: ProductDocOverrides;
  globalAffidavit: string;
  getProductDocs: (productId: string) => {
    technicalSheet: string;
    certificateSheet: string;
    safetySheet: string;
    affidavitSheet: string;
  };
  updateProductDoc: (productId: string, docType: DocType, newUrlOrData: string) => void;
  updateGlobalAffidavit: (newUrlOrData: string) => void;
  resetProductDoc: (productId: string, docType: DocType) => void;
  resetAllDocs: () => void;
  exportDocsJson: () => string;
  importDocsJson: (jsonString: string) => boolean;
  verifyPassword: (password: string) => boolean;
  changePassword: (currentPass: string, newPass: string) => { success: boolean; message: string };
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const STORAGE_KEY_DOCS = "minit_doc_overrides";
const STORAGE_KEY_GLOBAL_AFFIDAVIT = "minit_global_affidavit";
const STORAGE_KEY_PASSWORD = "minit_admin_password";
const SESSION_KEY_AUTH = "minit_admin_session";
const DEFAULT_PASSWORD = "minit2026";
const DEFAULT_GLOBAL_AFFIDAVIT = "/documentos/declaracion de aplicacion.pdf";

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [overrides, setOverrides] = useState<ProductDocOverrides>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DOCS);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Error loading document overrides from localStorage", e);
      return {};
    }
  });

  const [globalAffidavit, setGlobalAffidavit] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GLOBAL_AFFIDAVIT);
      return stored || DEFAULT_GLOBAL_AFFIDAVIT;
    } catch (e) {
      return DEFAULT_GLOBAL_AFFIDAVIT;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY_AUTH) === "true";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    // Fetch initial document overrides from Vercel Serverless API if available
    const fetchServerDocs = async () => {
      try {
        const res = await fetch(`/api/documents?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.overrides && Object.keys(data.overrides).length > 0) {
            setOverrides(data.overrides);
          }
          if (data.globalAffidavit) {
            setGlobalAffidavit(data.globalAffidavit);
          }
        }
      } catch (e) {
        // Fallback to localStorage if offline or dev
      }
    };
    fetchServerDocs();
  }, []);

  const syncToServer = async (newOverrides: ProductDocOverrides, newGlobalAffidavit: string) => {
    try {
      await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overrides: newOverrides, globalAffidavit: newGlobalAffidavit }),
      });
    } catch (e) {
      console.warn("Could not sync documents to server API", e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(overrides));
    } catch (e) {
      console.error("Error saving document overrides to localStorage", e);
    }
  }, [overrides]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GLOBAL_AFFIDAVIT, globalAffidavit);
    } catch (e) {
      console.error("Error saving global affidavit to localStorage", e);
    }
  }, [globalAffidavit]);

  const getProductDocs = (productId: string) => {
    const product = defaultProducts.find((p) => p.id === productId);
    const prodOverrides = overrides[productId] || {};

    return {
      technicalSheet: prodOverrides.technicalSheet || product?.technicalSheet || "",
      certificateSheet: prodOverrides.certificateSheet || product?.certificateSheet || "",
      safetySheet: prodOverrides.safetySheet || product?.safetySheet || "",
      affidavitSheet: prodOverrides.affidavitSheet || globalAffidavit || product?.affidavitSheet || "",
    };
  };

  const updateProductDoc = (productId: string, docType: DocType, newUrlOrData: string) => {
    setOverrides((prev) => {
      const updated = {
        ...prev,
        [productId]: {
          ...(prev[productId] || {}),
          [docType]: newUrlOrData,
        },
      };
      syncToServer(updated, globalAffidavit);
      return updated;
    });
  };

  const updateGlobalAffidavit = (newUrlOrData: string) => {
    setGlobalAffidavit(newUrlOrData);
    syncToServer(overrides, newUrlOrData);
  };

  const resetProductDoc = (productId: string, docType: DocType) => {
    setOverrides((prev) => {
      const updatedProd = { ...(prev[productId] || {}) };
      delete updatedProd[docType];
      let newOverrides = { ...prev };
      if (Object.keys(updatedProd).length === 0) {
        delete newOverrides[productId];
      } else {
        newOverrides[productId] = updatedProd;
      }
      syncToServer(newOverrides, globalAffidavit);
      return newOverrides;
    });
  };

  const resetAllDocs = () => {
    setOverrides({});
    setGlobalAffidavit(DEFAULT_GLOBAL_AFFIDAVIT);
    localStorage.removeItem(STORAGE_KEY_DOCS);
    localStorage.removeItem(STORAGE_KEY_GLOBAL_AFFIDAVIT);
    syncToServer({}, DEFAULT_GLOBAL_AFFIDAVIT);
  };

  const exportDocsJson = () => {
    return JSON.stringify({ overrides, globalAffidavit }, null, 2);
  };

  const importDocsJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.overrides && typeof parsed.overrides === "object") {
        setOverrides(parsed.overrides);
      }
      if (parsed.globalAffidavit && typeof parsed.globalAffidavit === "string") {
        setGlobalAffidavit(parsed.globalAffidavit);
      }
      return true;
    } catch (e) {
      console.error("Failed to import docs JSON", e);
      return false;
    }
  };

  const getStoredPassword = () => {
    try {
      return localStorage.getItem(STORAGE_KEY_PASSWORD) || DEFAULT_PASSWORD;
    } catch (e) {
      return DEFAULT_PASSWORD;
    }
  };

  const verifyPassword = (password: string) => {
    return password === getStoredPassword();
  };

  const login = (password: string) => {
    if (verifyPassword(password)) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(SESSION_KEY_AUTH, "true");
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(SESSION_KEY_AUTH);
    } catch (e) {}
  };

  const changePassword = (currentPass: string, newPass: string) => {
    if (!verifyPassword(currentPass)) {
      return { success: false, message: "La contraseña actual es incorrecta." };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: "La nueva contraseña debe tener al menos 4 caracteres." };
    }
    try {
      localStorage.setItem(STORAGE_KEY_PASSWORD, newPass.trim());
      return { success: true, message: "Contraseña actualizada exitosamente." };
    } catch (e) {
      return { success: false, message: "Error al guardar la nueva contraseña." };
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        overrides,
        globalAffidavit,
        getProductDocs,
        updateProductDoc,
        updateGlobalAffidavit,
        resetProductDoc,
        resetAllDocs,
        exportDocsJson,
        importDocsJson,
        verifyPassword,
        changePassword,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocumentContext must be used within a DocumentProvider");
  }
  return context;
};
