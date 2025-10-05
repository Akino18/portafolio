import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: isVisible && /* @__PURE__ */ jsx(
    "button",
    {
      onClick: scrollToTop,
      className: "scroll-to-top",
      "aria-label": "Volver arriba",
      children: /* @__PURE__ */ jsx(
        "svg",
        {
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M5 10l7-7m0 0l7 7m-7-7v18"
            }
          )
        }
      )
    }
  ) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function BottomNav() {
  const menuItems = [{
    name: "Inicio",
    href: "#inicio",
    icon: "🏠"
  }, {
    name: "Sobre mí",
    href: "#sobre-mi",
    icon: "👤"
  }, {
    name: "Proyectos",
    href: "#proyectos",
    icon: "💼"
  }, {
    name: "Habilidades",
    href: "#habilidades",
    icon: "⚡"
  }, {
    name: "Contacto",
    href: "#contacto",
    icon: "📧"
  }];
  const isActiveLink = (href) => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      return hash === href || hash === "" && href === "#inicio";
    }
    return false;
  };
  return /* @__PURE__ */ jsx("nav", {
    className: "bottom-nav",
    children: /* @__PURE__ */ jsx("div", {
      className: "bottom-nav-content",
      children: menuItems.map((item, index) => /* @__PURE__ */ jsxs("a", {
        href: item.href,
        className: `bottom-nav-item ${isActiveLink(item.href) ? "active" : ""}`,
        children: [/* @__PURE__ */ jsx("span", {
          className: "bottom-nav-icon",
          children: item.icon
        }), /* @__PURE__ */ jsx("span", {
          className: "bottom-nav-text",
          children: item.name
        })]
      }, index))
    })
  });
}
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "es",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("main", {
        className: "main-content",
        children
      }), /* @__PURE__ */ jsx(BottomNav, {}), /* @__PURE__ */ jsx(ScrollToTop, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "¡Ups!";
  let details = "Ocurrió un error inesperado.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "La página solicitada no se pudo encontrar." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold gold-text mb-4",
      children: message
    }), /* @__PURE__ */ jsx("p", {
      className: "text-gray-300 mb-4",
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Mi Portafolio - Desarrollador Full Stack"
  }, {
    name: "description",
    content: "Portafolio profesional de desarrollo web con tecnologías modernas"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("div", {
    className: "portfolio-container",
    children: [/* @__PURE__ */ jsx("section", {
      id: "inicio",
      className: "section hero",
      children: /* @__PURE__ */ jsx("div", {
        className: "section-content",
        children: /* @__PURE__ */ jsxs("div", {
          className: "hero-content text-center fade-in",
          children: [/* @__PURE__ */ jsxs("h1", {
            className: "hero-title",
            children: [/* @__PURE__ */ jsx("span", {
              className: "gradient-text",
              children: "Hola, soy"
            }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("span", {
              className: "gold-text",
              children: "Edguard"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "hero-subtitle",
            children: "Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales"
          }), /* @__PURE__ */ jsxs("div", {
            className: "hero-buttons",
            children: [/* @__PURE__ */ jsx("a", {
              href: "#proyectos",
              className: "btn-primary",
              children: "Ver Proyectos"
            }), /* @__PURE__ */ jsx("a", {
              href: "#contacto",
              className: "btn-secondary",
              children: "Contactar"
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "sobre-mi",
      className: "section",
      children: /* @__PURE__ */ jsx("div", {
        className: "section-content",
        children: /* @__PURE__ */ jsxs("div", {
          className: "about-grid",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "slide-in-left",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-4xl font-bold gold-text mb-6",
              children: "Sobre mí"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-300 mb-6 text-lg leading-relaxed",
              children: "Soy un desarrollador full stack con más de 3 años de experiencia creando aplicaciones web modernas y escalables. Me especializo en React, Node.js, y tecnologías cloud."
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-300 mb-8 text-lg leading-relaxed",
              children: "Mi pasión es transformar ideas complejas en soluciones elegantes y funcionales que generen valor real para los usuarios."
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-2 gap-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "card",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-semibold gold-text mb-2",
                  children: "3+"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-400",
                  children: "Años de experiencia"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "card",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-semibold gold-text mb-2",
                  children: "0+"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-400",
                  children: "Proyectos completados"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "slide-in-right",
            children: /* @__PURE__ */ jsxs("div", {
              className: "card",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-full h-64 mb-4 profile-image-container",
                children: /* @__PURE__ */ jsx("img", {
                  src: "/foto_portafolio.jpg",
                  alt: "Edguard - Desarrollador Full Stack",
                  className: "w-full h-full object-cover object-center profile-image"
                })
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-xl font-semibold gold-text mb-2",
                children: "Desarrollador Full Stack"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-400",
                children: "Especializado en tecnologías modernas y mejores prácticas de desarrollo"
              })]
            })
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "proyectos",
      className: "section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "section-content",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "section-title",
          children: "Mis Proyectos"
        }), /* @__PURE__ */ jsx("div", {
          className: "projects-grid",
          children: [{
            title: "E-commerce Platform",
            description: "Plataforma de comercio electrónico completa con React y Node.js",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            image: "🛒"
          }, {
            title: "Task Management App",
            description: "Aplicación de gestión de tareas con funcionalidades avanzadas",
            tech: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
            image: "📋"
          }, {
            title: "Weather Dashboard",
            description: "Dashboard meteorológico con visualizaciones interactivas",
            tech: ["React", "D3.js", "OpenWeather API", "Tailwind"],
            image: "🌤️"
          }].map((project, index) => /* @__PURE__ */ jsxs("div", {
            className: "card fade-in",
            style: {
              animationDelay: `${index * 0.2}s`
            },
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-4xl mb-4 text-center",
              children: project.image
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold gold-text mb-3",
              children: project.title
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-400 mb-4",
              children: project.description
            }), /* @__PURE__ */ jsx("div", {
              className: "flex flex-wrap gap-2 mb-4",
              children: project.tech.map((tech, techIndex) => /* @__PURE__ */ jsx("span", {
                className: "px-2 py-1 bg-gray-800 text-xs rounded",
                children: tech
              }, techIndex))
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex gap-2",
              children: [/* @__PURE__ */ jsx("a", {
                href: "#",
                className: "btn-primary text-sm",
                children: "Ver Demo"
              }), /* @__PURE__ */ jsx("a", {
                href: "#",
                className: "btn-secondary text-sm",
                children: "Código"
              })]
            })]
          }, index))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "habilidades",
      className: "section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "section-content",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "section-title",
          children: "Habilidades"
        }), /* @__PURE__ */ jsx("div", {
          className: "skills-grid",
          children: [{
            category: "Frontend",
            skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS"]
          }, {
            category: "Backend",
            skills: ["Node.js", "Express", "Python", "Django"]
          }, {
            category: "Base de Datos",
            skills: ["MongoDB", "PostgreSQL", "Redis", "MySQL"]
          }, {
            category: "DevOps",
            skills: ["Docker", "AWS", "CI/CD", "Linux"]
          }].map((category, index) => /* @__PURE__ */ jsxs("div", {
            className: "card text-center",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold gold-text mb-4",
              children: category.category
            }), /* @__PURE__ */ jsx("div", {
              className: "space-y-2",
              children: category.skills.map((skill, skillIndex) => /* @__PURE__ */ jsx("div", {
                className: "text-gray-300 py-2 px-3 bg-gray-800 rounded",
                children: skill
              }, skillIndex))
            })]
          }, index))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      id: "contacto",
      className: "section",
      children: /* @__PURE__ */ jsxs("div", {
        className: "section-content",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "section-title",
          children: "Contacto"
        }), /* @__PURE__ */ jsxs("div", {
          className: "contact-grid",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "slide-in-left",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-semibold gold-text mb-6",
              children: "¡Hablemos!"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-300 mb-8 text-lg",
              children: "¿Tienes un proyecto en mente? Me encantaría escuchar sobre él y cómo puedo ayudarte a hacerlo realidad."
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-2xl mr-4",
                  children: "📧"
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-gray-300",
                  children: "edguardgoncalves@gmail.com"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-2xl mr-4",
                  children: "📱"
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-gray-300",
                  children: "+58 (414) 249-2628"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "text-2xl mr-4",
                  children: "📍"
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-gray-300",
                  children: "Caracas, Venezuela"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: "slide-in-right",
            children: /* @__PURE__ */ jsx("div", {
              className: "card",
              children: /* @__PURE__ */ jsxs("form", {
                className: "space-y-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block text-gray-300 mb-2",
                    children: "Nombre"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "text",
                    className: "w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none",
                    placeholder: "Tu nombre"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block text-gray-300 mb-2",
                    children: "Email"
                  }), /* @__PURE__ */ jsx("input", {
                    type: "email",
                    className: "w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none",
                    placeholder: "tu.email@ejemplo.com"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block text-gray-300 mb-2",
                    children: "Mensaje"
                  }), /* @__PURE__ */ jsx("textarea", {
                    rows: 4,
                    className: "w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none",
                    placeholder: "Cuéntame sobre tu proyecto..."
                  })]
                }), /* @__PURE__ */ jsx("button", {
                  type: "submit",
                  className: "btn-primary w-full",
                  children: "Enviar Mensaje"
                })]
              })
            })
          })]
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const team = UNSAFE_withComponentProps(function team2() {
  return /* @__PURE__ */ jsx("div", {
    children: "Este es el equipo"
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: team,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "https://akino18.github.ioassets/entry.client-tKC4XhlV.js", "imports": ["https://akino18.github.ioassets/chunk-UH6JLGW7-BnjEZNfp.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "https://akino18.github.ioassets/root-B0JwaZJt.js", "imports": ["https://akino18.github.ioassets/chunk-UH6JLGW7-BnjEZNfp.js"], "css": ["https://akino18.github.ioassets/root-CjrNsHvW.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "https://akino18.github.ioassets/home-ClXcQ2Fq.js", "imports": ["https://akino18.github.ioassets/chunk-UH6JLGW7-BnjEZNfp.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "team/team": { "id": "team/team", "parentId": "root", "path": "teams/:teamId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "https://akino18.github.ioassets/team-DDZjrO7g.js", "imports": ["https://akino18.github.ioassets/chunk-UH6JLGW7-BnjEZNfp.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "https://akino18.github.ioassets/manifest-c7ad558f.js", "version": "c7ad558f", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "https://akino18.github.io";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "team/team": {
    id: "team/team",
    parentId: "root",
    path: "teams/:teamId",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
