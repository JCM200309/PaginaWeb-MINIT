import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { ProductCard } from "../components/product-card";
import { products } from "../data/products";
import { useLanguage } from "../context/language-context";
import { Search, X, PackageSearch, ChevronDown } from "lucide-react";
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
      <section className="pt-24 sm:pt-28 pb-5 bg-[#140c03] relative overflow-hidden border-b border-[#140c03]/10">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fcfaf9 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <FireIllusion />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-[#fcfaf9] mb-2.5 font-heading tracking-tight italic leading-tight">
              {t("products.title")}
            </h1>
            <p
              className="text-base text-[#fcfaf9]/80 font-body leading-relaxed max-w-xl mx-auto mb-4 font-normal [&_strong]:text-white [&_strong]:font-bold"
              dangerouslySetInnerHTML={{ __html: t("products.subtitle") }}
            />

            {/* Search Bar Container inside the Dark Section (Hidden on mobile) */}
            <div className="hidden sm:block max-w-2xl mx-auto text-left">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#140c03]/50 absolute left-3.5 pointer-events-none transition-colors" />
                <input
                  id="product-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("products.searchPlaceholder")}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white text-[#140c03] placeholder-[#140c03]/45 border border-white/20 focus:border-[#f6d94b] focus:ring-3 focus:ring-[#f6d94b]/30 shadow-lg hover:shadow-md transition-all text-sm font-body outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 p-1 rounded-lg hover:bg-[#140c03]/5 text-[#140c03]/50 hover:text-[#140c03] transition-colors cursor-pointer"
                    title={t("products.clearSearch")}
                    aria-label={t("products.clearSearch")}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Quick search suggestions & results counter */}
              <div className="flex flex-wrap items-center justify-between gap-2 mt-2 px-1">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-[11px] font-semibold text-[#fcfaf9]/60 mr-1 font-body">
                    {language === "es" ? "Sugerencias:" : "Quick tags:"}
                  </span>
                  {quickSuggestions.map((tag) => {
                    const isActive = normalizeText(searchQuery) === normalizeText(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSearchQuery(isActive ? "" : tag)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-medium font-body ${
                          isActive
                            ? "bg-[#f6d94b] text-[#140c03] shadow-xs font-bold"
                            : "bg-white/10 hover:bg-white/20 border border-white/15 text-[#fcfaf9]/85 hover:text-[#fcfaf9]"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                <span className="text-[11px] font-medium text-[#fcfaf9]/60 font-body">
                  {language === "es"
                    ? `${filteredProducts.length} de ${products.length} productos`
                    : `${filteredProducts.length} of ${products.length} products`}
                </span>
              </div>
            </div>

            {/* Bouncing scroll indicator */}
            <div className="mt-3.5 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById("products-catalog");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="p-1 rounded-full text-[#f6d94b]/85 hover:text-[#f6d94b] hover:bg-white/5 transition-all cursor-pointer group focus:outline-none"
                title={language === "es" ? "Desplazarse a los productos" : "Scroll to products"}
                aria-label={language === "es" ? "Desplazarse a los productos" : "Scroll to products"}
              >
                <ChevronDown className="w-4.5 h-4.5 animate-bounce group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section id="products-catalog" className="pt-6 pb-12 bg-[#fcfaf9] relative px-4 sm:px-6 min-h-[500px]">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #140c03 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        
        <div className="container mx-auto relative z-10 max-w-7xl">
          {/* Products Grid or Empty State */}
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
