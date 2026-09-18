import React, { useState, useRef } from "react";
import { useDocumentContext, DocType } from "../context/document-context";
import { products, Product } from "../data/products";
import { useLanguage } from "../context/language-context";
import { openDocument } from "../utils/doc-utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  FileText,
  Award,
  ShieldCheck,
  Upload,
  ExternalLink,
  RotateCcw,
  Search,
  LogOut,
  Key,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileUp,
  RefreshCw,
  Copy,
  Sparkles,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";

export function AdminDocsPage() {
  const {
    overrides,
    globalAffidavit,
    getProductDocs,
    updateProductDoc,
    updateGlobalAffidavit,
    resetProductDoc,
    resetAllDocs,
    exportDocsJson,
    importDocsJson,
    isAuthenticated,
    login,
    logout,
    changePassword,
  } = useDocumentContext();

  const { t } = useLanguage();

  // Login State
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");

  // Change Password Modal
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Backup & Code Generator Modal
  const [isBackupOpen, setIsBackupOpen] = useState(false);

  // Local state for temporary inputs before saving per product doc
  const [localDocInputs, setLocalDocInputs] = useState<{ [key: string]: string }>({});

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(passwordInput)) {
      toast.success("¡Bienvenido al Panel de Administración!");
      setLoginError(false);
      setPasswordInput("");
    } else {
      setLoginError(true);
      toast.error("Contraseña incorrecta. Revisa e intenta de nuevo.");
    }
  };

  const handleFileChange = (
    productId: string | "GLOBAL",
    docType: DocType | "globalAffidavit",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Por favor selecciona únicamente archivos en formato PDF.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("El archivo supera los 10MB. Te recomendamos usar un enlace directo o comprimir el PDF.");
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (productId === "GLOBAL") {
        updateGlobalAffidavit(result);
        toast.success("Declaración de Aplicación General actualizada exitosamente.");
      } else {
        updateProductDoc(productId, docType as DocType, result);
        toast.success(`Documento actualizado para ${productId}.`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSave = (productId: string | "GLOBAL", docType: DocType | "globalAffidavit") => {
    const key = `${productId}_${docType}`;
    const url = localDocInputs[key]?.trim();

    if (!url) {
      toast.error("Ingresa un enlace URL válido o sube un archivo.");
      return;
    }

    if (productId === "GLOBAL") {
      updateGlobalAffidavit(url);
      toast.success("Declaración de Aplicación General actualizada.");
    } else {
      updateProductDoc(productId, docType as DocType, url);
      toast.success(`Enlace actualizado para ${productId}.`);
    }

    setLocalDocInputs((prev) => ({ ...prev, [key]: "" }));
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      toast.error("La nueva contraseña y su confirmación no coinciden.");
      return;
    }
    const res = changePassword(currentPass, newPass);
    if (res.success) {
      toast.success(res.message);
      setIsChangingPassword(false);
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    } else {
      toast.error(res.message);
    }
  };

  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportDocsJson());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `minit-documentos-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Copia de seguridad JSON descargada.");
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importDocsJson(content)) {
        toast.success("Respaldo importado correctamente.");
        setIsBackupOpen(false);
      } else {
        toast.error("Archivo JSON inválido o corrupto.");
      }
    };
    reader.readAsText(file);
  };

  const filteredProducts = products.filter((p) => {
    const name = t(p.nameKey).toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || p.id.toLowerCase().includes(query) || p.categoryEs.toLowerCase().includes(query);
  });

  const getDocNameLabel = (type: DocType) => {
    switch (type) {
      case "technicalSheet":
        return "Ficha Técnica";
      case "certificateSheet":
        return "Certificado de Calidad";
      case "safetySheet":
        return "Hoja de Seguridad";
      case "affidavitSheet":
        return "Declaración de Aplicación";
    }
  };

  const getDocIcon = (type: DocType) => {
    switch (type) {
      case "technicalSheet":
        return <FileText className="w-4 h-4 text-[#c23b24]" />;
      case "certificateSheet":
        return <Award className="w-4 h-4 text-[#f6d94b]" />;
      case "safetySheet":
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case "affidavitSheet":
        return <FileUp className="w-4 h-4 text-amber-400" />;
    }
  };

  // Login view if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#140c03] flex items-center justify-center p-6 relative overflow-hidden font-body">
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fcfaf9 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#c23b24]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#f6d94b]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 text-[#fcfaf9]"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c23b24] text-white shadow-lg shadow-[#c23b24]/30 mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold font-heading italic tracking-tight mb-2">Panel de Documentos</h1>
            <p className="text-sm text-[#fcfaf9]/60">Acceso exclusivo para gestión de archivos de productos MINIT</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#fcfaf9]/70 mb-2">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border ${loginError ? "border-red-500 focus:ring-red-500" : "border-white/10 focus:border-[#c23b24]"
                    } rounded-xl px-4 py-3.5 pr-12 text-[#fcfaf9] placeholder-[#fcfaf9]/30 outline-none transition-all`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#fcfaf9]/50 hover:text-[#fcfaf9] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#c23b24] hover:bg-[#c23b24]/90 text-white font-bold py-6 rounded-xl shadow-lg shadow-[#c23b24]/20 transition-all text-base tracking-wide"
            >
              Ingresar al Panel
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-[#140c03] text-[#fcfaf9] font-body relative pb-20">
      {/* Background radial grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none fixed"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fcfaf9 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />

      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-[#140c03]/90 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c23b24] flex items-center justify-center font-bold text-white shadow-md shadow-[#c23b24]/30">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold font-heading italic tracking-tight">MINIT - Gestor de Documentos</h1>
              <p className="text-xs text-[#fcfaf9]/60">Panel de actualización de Fichas Técnicas, Certificados y Hojas de Seguridad</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsChangingPassword(true)}
              className="border-white/10 text-white hover:bg-white/10 bg-transparent text-xs"
            >
              <Key className="w-3.5 h-3.5 mr-1.5 text-[#f6d94b]" />
              Cambiar Contraseña
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm("¿Estás seguro de restablecer todos los documentos a los archivos originales del sistema?")) {
                  resetAllDocs();
                  toast.success("Todos los documentos se restablecieron a los originales.");
                }
              }}
              className="border-white/10 text-rose-400 hover:bg-rose-500/10 bg-transparent text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Restablecer Todo
            </Button>

            <Button
              size="sm"
              onClick={logout}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-10 relative z-10">
        {/* Global Application Document Box */}
        <section className="mb-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f6d94b]/10 border border-[#f6d94b]/30 text-[#f6d94b] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Documento Global
              </div>
              <h2 className="text-2xl font-bold font-heading italic text-[#fcfaf9]">Declaración de Aplicación General</h2>
              <p className="text-sm text-[#fcfaf9]/60">
                Este archivo es la declaración de aplicación descargable en la sección principal del catálogo de productos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => openDocument(globalAffidavit)}
                className="border-white/20 text-white hover:bg-white/10 bg-transparent text-xs font-semibold"
              >
                <ExternalLink className="w-4 h-4 mr-2 text-[#f6d94b]" />
                Ver PDF Actual
              </Button>
              {globalAffidavit !== "/documentos/declaracion de aplicacion.pdf" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    updateGlobalAffidavit("/documentos/declaracion de aplicacion.pdf");
                    toast.success("Declaración Global restablecida.");
                  }}
                  className="border-white/10 text-amber-400 hover:bg-amber-400/10 bg-transparent text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Restablecer
                </Button>
              )}
            </div>
          </div>

          <div className="pt-6">
            {/* Upload File PDF only */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#fcfaf9]/80 mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#c23b24]" />
                  Subir Archivo PDF desde tu computadora
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => handleFileChange("GLOBAL", "globalAffidavit", e)}
                  className="block w-full text-xs text-[#fcfaf9]/80 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#c23b24] file:text-white hover:file:bg-[#c23b24]/90 cursor-pointer transition-all"
                />
              </div>
              <p className="text-xs text-[#fcfaf9]/40 mt-3 italic">Formato únicamente permitido: .pdf (Máx. 10MB)</p>
            </div>
          </div>
        </section>

        {/* Product Documents Section */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold font-heading italic text-[#fcfaf9]">Documentación por Producto</h2>
              <p className="text-sm text-[#fcfaf9]/60">Selecciona o busca el producto para modificar sus 4 documentos técnicos.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#fcfaf9]/40" />
              <input
                type="text"
                placeholder="Buscar producto por nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#fcfaf9] placeholder-[#fcfaf9]/40 outline-none focus:border-[#c23b24]"
              />
            </div>
          </div>

          {/* Products List */}
          <div className="space-y-8">
            {filteredProducts.map((product) => {
              const currentDocs = getProductDocs(product.id);
              const prodOverrides = overrides[product.id] || {};

              return (
                <div
                  key={product.id}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all hover:border-white/20"
                >
                  {/* Product Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 p-2 border border-white/10 flex items-center justify-center flex-shrink-0">
                        <img src={product.image} alt={t(product.nameKey)} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                        <div className="inline-block px-3 py-0.5 rounded-full bg-white/10 text-[#fcfaf9] text-[11px] font-bold uppercase mb-1">
                          {product.categoryEs}
                        </div>
                        <h3 className="text-2xl font-bold font-heading italic text-[#fcfaf9]">{t(product.nameKey)}</h3>
                        <p className="text-xs text-[#fcfaf9]/50">ID: {product.id}</p>
                      </div>
                    </div>

                    {Object.keys(prodOverrides).length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          ["technicalSheet", "certificateSheet", "safetySheet", "affidavitSheet"].forEach((doc) =>
                            resetProductDoc(product.id, doc as DocType)
                          );
                          toast.success(`Se restablecieron todos los documentos de ${t(product.nameKey)}.`);
                        }}
                        className="border-white/10 text-amber-400 hover:bg-amber-400/10 bg-transparent text-xs self-start sm:self-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Restablecer Producto
                      </Button>
                    )}
                  </div>

                  {/* 4 Document Types Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {(["technicalSheet", "certificateSheet", "safetySheet", "affidavitSheet"] as DocType[]).map((docType) => {
                      const activeUrl = currentDocs[docType];
                      const isCustom = Boolean(prodOverrides[docType]);
                      const inputKey = `${product.id}_${docType}`;

                      return (
                        <div
                          key={docType}
                          className="bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-between space-y-4 hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              {getDocIcon(docType)}
                              <span className="font-bold text-sm text-[#fcfaf9]">{getDocNameLabel(docType)}</span>
                            </div>

                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isCustom
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-white/10 text-[#fcfaf9]/60"
                                }`}
                            >
                              {isCustom ? "Actualizado" : "Original"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => openDocument(activeUrl)}
                              className="inline-flex items-center gap-1.5 text-xs text-[#f6d94b] hover:underline font-semibold"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Ver Documento Actual
                            </button>

                            {isCustom && (
                              <button
                                type="button"
                                onClick={() => {
                                  resetProductDoc(product.id, docType);
                                  toast.success(`Se restableció ${getDocNameLabel(docType)}.`);
                                }}
                                className="text-[11px] text-amber-400/80 hover:text-amber-400 hover:underline flex items-center gap-1"
                              >
                                <RotateCcw className="w-3 h-3" /> Revertir
                              </button>
                            )}
                          </div>

                          {/* Upload PDF Field */}
                          <div className="pt-2 border-t border-white/5">
                            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#fcfaf9]/60 mb-1.5">
                              Seleccionar nuevo archivo PDF:
                            </span>
                            <input
                              type="file"
                              accept=".pdf,application/pdf"
                              onChange={(e) => handleFileChange(product.id, docType, e)}
                              className="block w-full text-[11px] text-[#fcfaf9]/70 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-[11px] file:font-bold file:bg-[#c23b24] file:text-white hover:file:bg-[#c23b24]/90 cursor-pointer transition-all"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Modal: Cambiar Contraseña */}
      <AnimatePresence>
        {isChangingPassword && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#140c03] border border-white/15 rounded-3xl p-8 max-w-md w-full shadow-2xl text-[#fcfaf9]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[#f6d94b]/10 text-[#f6d94b]">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading italic">Cambiar Contraseña de Administración</h3>
                  <p className="text-xs text-[#fcfaf9]/60">Actualiza la clave necesaria para ingresar al panel.</p>
                </div>
              </div>

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#fcfaf9]/70 mb-1">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-[#fcfaf9] outline-none focus:border-[#c23b24]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#fcfaf9]/70 mb-1">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-[#fcfaf9] outline-none focus:border-[#c23b24]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#fcfaf9]/70 mb-1">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-[#fcfaf9] outline-none focus:border-[#c23b24]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsChangingPassword(false)}
                    className="border-white/10 text-white hover:bg-white/10 bg-transparent text-xs"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#c23b24] hover:bg-[#c23b24]/90 text-white text-xs font-bold px-5">
                    Guardar Nueva Contraseña
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
