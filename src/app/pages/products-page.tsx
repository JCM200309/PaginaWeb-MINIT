import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { ProductCard } from "../components/product-card";
import { products } from "../data/products";
import { useLanguage } from "../context/language-context";
import { Flame, Search, X, PackageSearch } from "lucide-react";
import { FireIllusion } from "../components/fire-illusion";
import { Button } from "../components/ui/button";

export function ProductsPage() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Helper to normalize strings for accent-insensitive and case-insensitive matching
  const normalizeText = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // Filter products by substring in localized name or category
  const filteredProducts = useMemo(() => {
    const cleanQuery = normalizeText(searchQuery);
    if (!cleanQuery) return products;

    const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

    return products.filter((product) => {
      const localizedName = normalizeText(t(product.nameKey));
      const category = normalizeText(language === "es" ? product.categoryEs : product.categoryEn);
      const combined = `${localizedName} ${category}`;

      // Match if all search tokens are found in any portion of the product name or category
      return queryTokens.every((token) => combined.includes(token));
    });
  }, [searchQuery, language, t]);

  const quickSuggestions = language === "es"
    ? ["Maderas", "Textil", "Total", "Laca", "Latex", "Intumescente", "Esmalte"]
    : ["Wood", "Textile", "Total", "Lacquer", "Latex", "Intumescent", "Enamel"];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-[#140c03] relative overflow-hidden border-b border-[#140c03]/10">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fcfaf9 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <FireIllusion />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-[#f6d94b]/10 backdrop-blur-xl border border-[#f6d94b]/20 shadow-xl shadow-[#f6d94b]/10 mb-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
              <Flame className="w-12 h-12 text-[#f6d94b]" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-[#fcfaf9] mb-8 font-heading tracking-tight italic">
              {t("products.title")}
            </h1>
            <p className="text-xl md:text-2xl text-[#fcfaf9]/85 font-body leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
              {t("products.subtitle")}
            </p>

            {/* Documentación que ofrecemos - Bullet points estilizados */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 max-w-3xl mx-auto mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-xs text-xs md:text-sm text-[#fcfaf9]/90 hover:bg-white/[0.08] hover:border-[#f6d94b]/30 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6d94b] shadow-[0_0_8px_rgba(246,217,75,0.8)]" />
                <span className="font-medium">{t("products.certificates")}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-xs text-xs md:text-sm text-[#fcfaf9]/90 hover:bg-white/[0.08] hover:border-[#f6d94b]/30 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6d94b] shadow-[0_0_8px_rgba(246,217,75,0.8)]" />
                <span className="font-medium">{t("products.technicalSheet")}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-xs text-xs md:text-sm text-[#fcfaf9]/90 hover:bg-white/[0.08] hover:border-[#f6d94b]/30 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6d94b] shadow-[0_0_8px_rgba(246,217,75,0.8)]" />
                <span className="font-medium">{t("products.safetySheet")}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md shadow-xs text-xs md:text-sm text-[#fcfaf9]/90 hover:bg-white/[0.08] hover:border-[#f6d94b]/30 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6d94b] shadow-[0_0_8px_rgba(246,217,75,0.8)]" />
                <span className="font-medium">{t("products.affidavit")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid & Search Section */}
      <section className="py-16 bg-[#fcfaf9] relative px-4 min-h-[600px]">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #140c03 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        
        <div className="container mx-auto relative z-10 max-w-7xl">
          {/* Search Bar Container */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#140c03]/40 absolute left-4 pointer-events-none transition-colors" />
              <input
                id="product-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("products.searchPlaceholder")}
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border border-[#140c03]/10 focus:border-[#c23b24] focus:ring-4 focus:ring-[#c23b24]/10 shadow-sm hover:shadow-md transition-all text-[#140c03] placeholder-[#140c03]/40 text-base font-body outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 p-1.5 rounded-xl hover:bg-[#140c03]/5 text-[#140c03]/40 hover:text-[#140c03] transition-colors cursor-pointer"
                  title={t("products.clearSearch")}
                  aria-label={t("products.clearSearch")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick search suggestions & results counter */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 px-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-[#140c03]/50 mr-1 font-body">
                  {language === "es" ? "Sugerencias:" : "Quick tags:"}
                </span>
                {quickSuggestions.map((tag) => {
                  const isActive = normalizeText(searchQuery) === normalizeText(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(isActive ? "" : tag)}
                      className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer font-medium font-body ${
                        isActive
                          ? "bg-[#c23b24] text-white shadow-xs font-bold"
                          : "bg-white hover:bg-[#140c03]/5 border border-[#140c03]/10 text-[#140c03]/70 hover:text-[#140c03]"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-medium text-[#140c03]/60 font-body">
                {language === "es"
                  ? `${filteredProducts.length} de ${products.length} productos`
                  : `${filteredProducts.length} of ${products.length} products`}
              </span>
            </div>
          </div>

          {/* Products Grid or Empty State */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16 px-6 bg-white rounded-3xl border border-[#140c03]/10 max-w-lg mx-auto shadow-sm my-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#c23b24]/10 text-[#c23b24] flex items-center justify-center mx-auto mb-4">
                  <PackageSearch className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#140c03] font-heading mb-2">
                  {t("products.noResultsTitle")}
                </h3>
                <p className="text-sm text-[#140c03]/60 font-body mb-6 max-w-sm mx-auto">
                  {t("products.noResultsDesc")}
                </p>
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                  className="rounded-xl border-[#140c03]/20 hover:bg-[#140c03]/5 text-[#140c03] font-semibold cursor-pointer"
                >
                  <X className="w-4 h-4 mr-2" />
                  {t("products.clearSearch")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
