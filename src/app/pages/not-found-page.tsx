import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Flame, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#140c03] text-[#fcfaf9] flex flex-col items-center justify-center p-6 relative overflow-hidden font-body">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fcfaf9 1px, transparent 0)", backgroundSize: "32px 32px" }}
      />
      <div className="text-center max-w-md relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#c23b24]/10 border border-[#c23b24]/30 text-[#c23b24] mb-6">
          <Flame className="w-10 h-10" />
        </div>
        <h1 className="text-6xl font-bold font-heading italic text-[#fcfaf9] mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-4">Página no encontrada</h2>
        <p className="text-sm text-[#fcfaf9]/60 mb-8 leading-relaxed">
          La página o recurso que buscas no existe o ha sido movido.
        </p>
        <Button asChild className="bg-[#c23b24] hover:bg-[#c23b24]/90 text-white font-bold py-6 px-8 rounded-xl">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}
