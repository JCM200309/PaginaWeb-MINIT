import { useParams, Link } from "react-router";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";
import { Button } from "../components/ui/button";
import { useLanguage } from "../context/language-context";
import { useDocumentContext } from "../context/document-context";
import { openDocument } from "../utils/doc-utils";
import { products } from "../data/products";
import { ArrowLeft, Package, CheckCircle, Award, FileText, ExternalLink, Store } from "lucide-react";

export function ProductDetailPage() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { getProductDocs } = useDocumentContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = products.find((p) => p.id === id);
  const docs = product ? getProductDocs(product.id) : null;

  if (!product || !docs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/certificates">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const details = language === "en" ? product.detailsEn : product.detailsEs;
  const productCategory = language === "en" ? product.categoryEn : product.categoryEs;

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Product Hero */}
      <section className="min-h-screen flex items-center pt-24 pb-12 bg-[#140c03] relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fcfaf9 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-6 relative z-10">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 text-[#fcfaf9]/60 hover:text-[#fcfaf9] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("product.backToProducts")}
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 400, damping: 25 }}
              className="relative flex items-center justify-center group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#c23b24]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={product.image}
                alt={t(product.nameKey)}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10 relative z-10 transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] group-hover:ring-white/20"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#fcfaf9] text-sm font-semibold tracking-wide shadow-sm mb-4">
                  {productCategory}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#fcfaf9] mb-4 font-heading tracking-tight">
                  {t(product.nameKey)}
                </h1>
                <p className="text-xl text-[#fcfaf9]/70 font-body">
                  {t(product.descKey)}
                </p>
              </div>

              {/* Quick Actions & Buy Options */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Tienda Nube (Primary CTA) */}
                  <a
                    href={product.buyTiendaNube || "https://minitignifugos.mitiendanube.com/productos/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-gradient-to-r from-[#004bbd] via-[#0050ff] to-[#0d6eff] hover:from-[#003ecb] hover:to-[#0050ff] text-white font-extrabold px-6 py-6 rounded-xl shadow-lg shadow-[#0050ff]/30 hover:shadow-xl transition-all duration-300 group/tn border-none">
                      <Store className="w-5 h-5 mr-2 group-hover/tn:scale-110 transition-transform" />
                      <div className="flex flex-col text-left">
                        <span className="text-base leading-none">{t("products.buyTiendaNube")}</span>
                        <span className="text-[10px] text-blue-100 uppercase tracking-widest font-bold mt-1">{t("products.officialStore")}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-3 opacity-80 group-hover/tn:translate-x-1 transition-transform" />
                    </Button>
                  </a>

                  {/* Mercado Libre (Secondary Option) */}
                  <a
                    href={product.buyMercadoLibre || product.buyOnline || "https://www.mercadolibre.com.ar/pagina/minitignifugos"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#fffbda] hover:bg-[#fff7b0] border border-[#ffe600] text-[#2d3277] font-bold px-5 py-6 rounded-xl transition-all shadow-sm hover:shadow group/ml">
                      <img
                        src="/Logos/meliLogo.png"
                        alt="Mercado Libre"
                        className="w-5 h-5 object-contain rounded-full mr-2 border border-[#ffe600]/50"
                      />
                      <span className="text-sm">{t("products.buyMercadoLibre")}</span>
                      <ExternalLink className="w-4 h-4 ml-2 text-[#2d3277]/60 group-hover/ml:text-[#2d3277]" />
                    </Button>
                  </a>

                  {/* Technical Sheet */}
                  <Button
                    onClick={() => openDocument(docs.technicalSheet)}
                    variant="outline"
                    className="border-white/20 text-[#fcfaf9] hover:bg-white/10 bg-transparent font-semibold py-6 rounded-xl shadow-none"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {t("products.technicalSheet")}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => openDocument(docs.certificateSheet)}
                  className="flex items-center gap-2 text-sm text-[#fcfaf9]/70 hover:text-[#fcfaf9] transition-colors font-medium text-left"
                >
                  <Award className="w-4 h-4 text-[#c23b24]" />
                  <span>{t("products.certificates")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openDocument(docs.safetySheet)}
                  className="flex items-center gap-2 text-sm text-[#fcfaf9]/70 hover:text-[#fcfaf9] transition-colors font-medium text-left"
                >
                  <FileText className="w-4 h-4 text-[#c23b24]" />
                  <span>{t("products.safetySheet")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openDocument(docs.affidavitSheet)}
                  className="flex items-center gap-2 text-sm text-[#fcfaf9]/70 hover:text-[#fcfaf9] transition-colors font-medium text-left"
                >
                  <FileText className="w-4 h-4 text-[#c23b24]" />
                  <span>{t("products.affidavit")}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Information Grid */}
      <section className="py-24 bg-[#fcfaf9]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Column: About this product */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 flex"
            >
              <div className="w-full bg-white rounded-3xl border border-[#140c03]/5 shadow-sm p-8 md:p-10 flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-[#140c03] flex items-center justify-center mb-8 shadow-sm">
                  <FileText className="w-6 h-6 text-[#fcfaf9]" />
                </div>
                <h2 className="text-3xl font-bold text-[#140c03] mb-6 font-heading tracking-tight italic text-justify">
                  {t("product.about")}
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p
                    className="text-[#140c03]/80 leading-relaxed text-lg font-body hyphens-auto text-justify"
                    dangerouslySetInnerHTML={{ __html: details.about }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column: Details and Certifications */}
            <div className="lg:col-span-8 flex flex-col gap-8">

              {/* Top Block: Uses, Packaging, Chemical Presentation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl border border-[#140c03]/5 shadow-sm p-8 md:p-10 flex-grow hover:shadow-md transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Uses */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#c23b24]/10 flex items-center justify-center text-[#c23b24]">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-[#140c03] font-heading">{t("product.uses")}</h3>
                    </div>
                    <ul className="grid gap-3">
                      {details.uses.map((use, index) => (
                        <li key={index} className="flex items-start gap-3 bg-[#fcfaf9] p-3 rounded-lg border border-[#140c03]/5 group">
                          <CheckCircle className="w-4 h-4 text-[#c23b24] flex-shrink-0 mt-1" />
                          <span className="text-[#140c03]/80 text-sm font-medium">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Packaging & Chemical */}
                  <div className="space-y-10">
                    {/* Packaging */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#140c03]/5 flex items-center justify-center text-[#140c03]">
                          <Package className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-[#140c03] font-heading">{t("product.packaging")}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {details.packaging.map((pkg, index) => (
                          <div key={index} className="px-4 py-2 rounded-lg bg-[#140c03] text-[#fcfaf9] text-sm font-semibold shadow-sm">
                            {pkg}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Chemical Presentation */}
                    <div className="space-y-4 pt-6 border-t border-[#140c03]/5">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#140c03]/40">
                        {t("product.chemicalPresentation")}
                      </h4>
                      <p className="text-[#140c03]/70 text-sm leading-relaxed italic"
                        dangerouslySetInnerHTML={{ __html: details.chemicalPresentation }}>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Block: Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#140c03] rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden group"
              >
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c23b24]/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#f6d94b]/20 transition-colors duration-500" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="max-w-xs">
                    <h2 className="text-2xl font-bold text-[#fcfaf9] mb-2 font-heading tracking-tight flex items-center gap-3 italic">
                      <Award className="w-6 h-6 text-[#f6d94b]" />
                      {t("product.certifications")}
                    </h2>
                    <p className="text-[#fcfaf9]/50 text-sm">
                      {language === "en" ? "Tested and approved by international standards." : "Testeado y aprobado bajo estándares internacionales."}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    {details.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="relative w-24 h-24 flex items-center justify-center group/seal"
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#f6d94b]/30 group-hover/seal:border-[#f6d94b] transition-all duration-300 scale-100 group-hover/seal:scale-110" />
                        <div className="absolute inset-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10" />
                        <div className="relative z-10 flex flex-col items-center">
                          <span className="text-[10px] font-bold text-white text-center leading-tight">
                            {cert}
                          </span>
                          <div className="h-0.5 w-4 bg-[#f6d94b] mt-1 opacity-50" />
                        </div>
                        {/* Ribbon effect */}
                        <div className="absolute -bottom-1 right-2 w-4 h-6 bg-[#f6d94b]/80 clip-path-ribbon opacity-0 group-hover/seal:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#140c03] relative border-t border-white/5">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fcfaf9 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-[#fcfaf9] mb-6 font-heading tracking-tight italic">
            {language === "en"
              ? "Ready to protect your materials?"
              : "¿Listo para proteger sus materiales?"}
          </h2>
          <p className="text-xl text-[#fcfaf9]/70 mb-10 max-w-2xl mx-auto font-body">
            {language === "en"
              ? "Contact us for a personalized quote and technical advice."
              : "Contáctenos para una cotización personalizada y asesoramiento técnico."}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#c23b24] hover:bg-[#c23b24]/90 text-white font-semibold tracking-wide px-8 py-6 text-lg"
          >
            <Link to="/contact">
              {t("nav.getQuote")}
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
