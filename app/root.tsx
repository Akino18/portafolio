import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import React from "react";

import type { Route } from "./+types/root";
import { ScrollToTop } from "./components/ScrollToTop";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

// Componente del menú inferior
function BottomNav() {
  const menuItems = [
    { name: "Inicio", href: "#inicio", icon: "🏠" },
    { name: "Sobre mí", href: "#sobre-mi", icon: "👤" },
    { name: "Proyectos", href: "#proyectos", icon: "💼" },
    { name: "Habilidades", href: "#habilidades", icon: "⚡" },
    { name: "Contacto", href: "#contacto", icon: "📧" },
  ];

  // Función para determinar si un enlace está activo
  const isActiveLink = (href: string) => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      return hash === href || (hash === '' && href === '#inicio');
    }
    return false;
  };

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-content">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`bottom-nav-item ${isActiveLink(item.href) ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-text">{item.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="main-content">
          {children}
        </main>
        
        <BottomNav />
        
        <ScrollToTop />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "¡Ups!";
  let details = "Ocurrió un error inesperado.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "La página solicitada no se pudo encontrar."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-4xl font-bold gold-text mb-4">{message}</h1>
      <p className="text-gray-300 mb-4">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-900 rounded-lg">
          <code className="text-sm">{stack}</code>
        </pre>
      )}
    </main>
  );
}
