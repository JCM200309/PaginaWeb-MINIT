import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { HomePage } from "./pages/home-page";
import { ProductsPage } from "./pages/products-page";
import { ProductDetailPage } from "./pages/product-detail-page";
import { AboutPage } from "./pages/about-page";
import { ContactPage } from "./pages/contact-page";
import { AdminDocsPage } from "./pages/admin-docs-page";
import { NotFoundPage } from "./pages/not-found-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    ),
    ErrorBoundary: NotFoundPage,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/certificates",
        Component: ProductsPage,
      },
      {
        path: "/es/certificates",
        Component: ProductsPage,
      },
      {
        path: "/certificates/:id",
        Component: ProductDetailPage,
      },
      {
        path: "/es/certificates/:id",
        Component: ProductDetailPage,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
      {
        path: "/panel-documentos",
        Component: AdminDocsPage,
      },
      {
        path: "/admin-docs",
        Component: AdminDocsPage,
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);