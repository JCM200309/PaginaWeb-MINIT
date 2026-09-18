import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, FileText, Award, ShieldCheck, ExternalLink, Store, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../context/language-context";
import { useDocumentContext } from "../context/document-context";
import { openDocument } from "../utils/doc-utils";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { t, language } = useLanguage();
  const { getProductDocs } = useDocumentContext();
  const docs = getProductDocs(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-white rounded-2xl shadow-sm border border-[#140c03]/10 overflow-hidden hover:border-[#c23b24]/40 hover:shadow-md transition-all duration-500 flex flex-col h-full"
    >
      <div className="flex flex-col p-6 flex-grow">
        {/* Product Image */}
        <div className="relative rounded-xl overflow-hidden bg-[#140c03]/5 border border-[#140c03]/5 flex items-center justify-center p-6 group/img aspect-square">
          <img
            src={product.image}
            alt={t(product.nameKey)}
            className="w-full h-full object-contain rounded-lg group-hover/img:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-4 right-4 z-10">
            <div className="px-4 py-1.5 rounded-full bg-[#c23b24] text-white text-xs font-bold uppercase tracking-widest shadow-sm">
              {language === "es" ? product.categoryEs : product.categoryEn}
            </div>
          </div>

          {/* Simple overlay effect on hover */}
          <div className="absolute inset-0 bg-[#140c03]/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between py-2 flex-grow mt-2">
          <div className="space-y-4 flex flex-col flex-grow">
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-[#140c03] mb-2 font-heading tracking-tight italic group-hover:text-[#c23b24] transition-colors">
                {t(product.nameKey)}
              </h3>
              <p className="text-[#140c03]/70 font-body leading-relaxed text-base line-clamp-3">
                {t(product.descKey)}
              </p>
            </div>

            {/* Affidavit - Highly Requested */}
            <button
              type="button"
              onClick={() => openDocument(docs.affidavitSheet)}
              className="flex items-center justify-between w-full p-3 mb-2 rounded-xl bg-[#f6d94b]/10 hover:bg-[#f6d94b]/20 border border-[#f6d94b]/30 hover:border-[#f6d94b]/60 transition-all group/affidavit font-body shadow-sm text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#f6d94b]/20 group-hover/affidavit:bg-[#f6d94b] group-hover/affidavit:text-[#140c03] text-[#140c03] transition-colors border border-[#f6d94b]/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#140c03] text-sm group-hover/affidavit:text-[#140c03] transition-colors">{t("products.affidavit")}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#140c03]/40 group-hover/affidavit:text-[#140c03] transition-colors mr-1" />
            </button>

            {/* Online Purchase Buttons - Prominent Tienda Nube + Secondary Mercado Libre */}
            <div className="space-y-2 my-2">
              {/* Tienda Nube (Primary Store CTA - Highest Prominence) */}
              <a
                href={product.buyTiendaNube || "https://minitignifugos.mitiendanube.com/productos/"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#004bbd] via-[#0050ff] to-[#0d6eff] hover:from-[#003ecb] hover:to-[#0050ff] text-white shadow-md shadow-[#0050ff]/25 hover:shadow-xl hover:shadow-[#0050ff]/40 transition-all duration-300 group/tn font-body"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-xs group-hover/tn:scale-110 transition-transform">
                    <Store className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-extrabold text-sm tracking-wide">
                      {t("products.buyTiendaNube")}
                    </span>
                    <span className="text-[10px] text-blue-100 font-bold uppercase tracking-widest bg-white/15 px-1.5 py-0.5 rounded-xs mt-0.5">
                      {t("products.officialStore")}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/80 group-hover/tn:translate-x-1 group-hover/tn:text-white transition-all" />
              </a>

              {/* Mercado Libre (Secondary Store Option) */}
              <a
                href={product.buyMercadoLibre || product.buyOnline || "https://www.mercadolibre.com.ar/pagina/minitignifugos"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-2 rounded-xl bg-[#fffbda] hover:bg-[#fff7b0] border border-[#ffe600] text-[#140c03] transition-all group/ml font-body"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src="/Logos/meliLogo.png"
                    alt="Mercado Libre"
                    className="w-5 h-5 object-contain rounded-full border border-[#ffe600]/50"
                  />
                  <span className="font-bold text-xs text-[#2d3277]">
                    {t("products.buyMercadoLibre")}
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#2d3277]/60 group-hover/ml:text-[#2d3277] transition-colors" />
              </a>
            </div>

            {/* Document Sheets Quick Access */}
            <div className="grid grid-cols-3 gap-2 border-t border-[#140c03]/5 pt-3">
              <button
                type="button"
                onClick={() => openDocument(docs.technicalSheet)}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#140c03]/5 hover:bg-[#140c03] hover:text-white text-[#140c03]/70 transition-all group/doc text-center cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 mb-1 group-hover/doc:text-white group-hover/doc:scale-110 transition-transform" />
                <span className="font-semibold text-[10px] leading-tight">{t("products.technicalSheet")}</span>
              </button>
              <button
                type="button"
                onClick={() => openDocument(docs.certificateSheet)}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#140c03]/5 hover:bg-[#140c03] hover:text-white text-[#140c03]/70 transition-all group/doc text-center cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 mb-1 group-hover/doc:text-white group-hover/doc:scale-110 transition-transform" />
                <span className="font-semibold text-[10px] leading-tight">{t("products.certificates")}</span>
              </button>
              <button
                type="button"
                onClick={() => openDocument(docs.safetySheet)}
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#140c03]/5 hover:bg-[#140c03] hover:text-white text-[#140c03]/70 transition-all group/doc text-center cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 mb-1 group-hover/doc:text-white group-hover/doc:scale-110 transition-transform" />
                <span className="font-semibold text-[10px] leading-tight">{t("products.safetySheet")}</span>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <Button
              asChild
              className="w-full bg-[#c23b24] hover:bg-[#c23b24]/90 text-white group/btn py-5 text-base rounded-xl shadow-lg shadow-[#c23b24]/20 border-none relative overflow-hidden"
            >
              <Link to={`/certificates/${product.id}`}>
                <span className="relative z-10 font-bold tracking-wide">{t("products.viewDetails")}</span>
                <ArrowRight className="ml-2 w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
