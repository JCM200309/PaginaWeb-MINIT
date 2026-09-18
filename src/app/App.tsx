import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LanguageProvider } from "./context/language-context";
import { DocumentProvider } from "./context/document-context";
import { WhatsAppButton } from "./components/whatsapp-button";
import { Toaster } from "sonner";

export default function App() {
  return (
    <DocumentProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
        <WhatsAppButton />
        <Toaster position="top-right" richColors theme="dark" />
      </LanguageProvider>
    </DocumentProvider>
  );
}