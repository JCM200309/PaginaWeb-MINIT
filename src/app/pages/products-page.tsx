import { motion } from "motion/react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { ProductCard } from "../components/product-card";
import { products } from "../data/products";
import { useLanguage } from "../context/language-context";
import { useDocumentContext } from "../context/document-context";
import { openDocument } from "../utils/doc-utils";
import { Flame, FileText } from "lucide-react";
import { FireIllusion } from "../components/fire-illusion";
import { Button } from "../components/ui/button";

export function ProductsPage() {
  const { t } = useLanguage();
  const { globalAffidavit } = useDocumentContext();

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
            <p className="text-xl text-[#fcfaf9]/70 font-body leading-relaxed max-w-2xl mx-auto mb-8">
              {t("products.subtitle")}
            </p>
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => openDocument(globalAffidavit)}
                className="bg-[#f6d94b] hover:bg-[#f6d94b]/90 text-[#140c03] font-extrabold text-lg px-10 py-8 shadow-[0_0_40px_-10px_rgba(246,217,75,0.4)] hover:shadow-[0_0_50px_-5px_rgba(246,217,75,0.6)] transition-all duration-300 transform hover:-translate-y-1 rounded-2xl border border-[#f6d94b]/50"
              >
                <FileText className="w-6 h-6 mr-3" />
                {t("products.affidavit")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-[#fcfaf9] relative px-4">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #140c03 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
