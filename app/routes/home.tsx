import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mi Portafolio - Desarrollador Full Stack" },
    { name: "description", content: "Portafolio profesional de desarrollo web con tecnologías modernas" },
  ];
}

export default function Home() {
  return (
    <div className="portfolio-container">
      {/* Sección Hero/Inicio */}
      <section id="inicio" className="section hero">
        <div className="section-content">
          <div className="hero-content text-center fade-in">
            <h1 className="hero-title">
              <span className="gradient-text">Hola, soy</span>
              <br />
              <span className="gold-text">Edguard</span>
            </h1>
            <p className="hero-subtitle">
              Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales
            </p>
            <div className="hero-buttons">
              <a href="#proyectos" className="btn-primary">
                Ver Proyectos
              </a>
              <a href="#contacto" className="btn-secondary">
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Sobre mí */}
      <section id="sobre-mi" className="section">
        <div className="section-content">
          <div className="about-grid">
            <div className="slide-in-left">
              <h2 className="text-4xl font-bold gold-text mb-6">Sobre mí</h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Soy un desarrollador full stack con más de 3 años de experiencia creando 
                aplicaciones web modernas y escalables. Me especializo en React, Node.js, 
                y tecnologías cloud.
              </p>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Mi pasión es transformar ideas complejas en soluciones elegantes y 
                funcionales que generen valor real para los usuarios.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="card">
                  <h3 className="text-xl font-semibold gold-text mb-2">3+</h3>
                  <p className="text-gray-400">Años de experiencia</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-semibold gold-text mb-2">0+</h3>
                  <p className="text-gray-400">Proyectos completados</p>
                </div>
              </div>
            </div>
            <div className="slide-in-right">
              <div className="card">
                <div className="w-full h-64 mb-4 profile-image-container">
                  <img 
                    src="/foto_portafolio.jpg" 
                    alt="Edguard - Desarrollador Full Stack"
                    className="w-full h-full object-cover object-center profile-image"
                  />
                </div>
                <h3 className="text-xl font-semibold gold-text mb-2">Desarrollador Full Stack</h3>
                <p className="text-gray-400">
                  Especializado en tecnologías modernas y mejores prácticas de desarrollo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Proyectos */}
      <section id="proyectos" className="section">
        <div className="section-content">
          <h2 className="section-title">Mis Proyectos</h2>
          <div className="projects-grid">
            {[
              {
                title: "E-commerce Platform",
                description: "Plataforma de comercio electrónico completa con React y Node.js",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                image: "🛒"
              },
              {
                title: "Task Management App",
                description: "Aplicación de gestión de tareas con funcionalidades avanzadas",
                tech: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
                image: "📋"
              },
              {
                title: "Weather Dashboard",
                description: "Dashboard meteorológico con visualizaciones interactivas",
                tech: ["React", "D3.js", "OpenWeather API", "Tailwind"],
                image: "🌤️"
              }
            ].map((project, index) => (
              <div key={index} className="card fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl mb-4 text-center">{project.image}</div>
                <h3 className="text-xl font-semibold gold-text mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-800 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a href="#" className="btn-primary text-sm">Ver Demo</a>
                  <a href="#" className="btn-secondary text-sm">Código</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Habilidades */}
      <section id="habilidades" className="section">
        <div className="section-content">
          <h2 className="section-title">Habilidades</h2>
          <div className="skills-grid">
            {[
              { category: "Frontend", skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS"] },
              { category: "Backend", skills: ["Node.js", "Express", "Python", "Django"] },
              { category: "Base de Datos", skills: ["MongoDB", "PostgreSQL", "Redis", "MySQL"] },
              { category: "DevOps", skills: ["Docker", "AWS", "CI/CD", "Linux"] }
            ].map((category, index) => (
              <div key={index} className="card text-center">
                <h3 className="text-xl font-semibold gold-text mb-4">{category.category}</h3>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="text-gray-300 py-2 px-3 bg-gray-800 rounded">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto" className="section">
        <div className="section-content">
          <h2 className="section-title">Contacto</h2>
          <div className="contact-grid">
            <div className="slide-in-left">
              <h3 className="text-2xl font-semibold gold-text mb-6">¡Hablemos!</h3>
              <p className="text-gray-300 mb-8 text-lg">
                ¿Tienes un proyecto en mente? Me encantaría escuchar sobre él y 
                cómo puedo ayudarte a hacerlo realidad.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📧</span>
                  <span className="text-gray-300">edguardgoncalves@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📱</span>
                  <span className="text-gray-300">+58 (414) 249-2628</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-4">📍</span>
                  <span className="text-gray-300">Caracas, Venezuela</span>
                </div>
              </div>
            </div>
            <div className="slide-in-right">
              <div className="card">
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Nombre</label>
                    <input 
                      type="text" 
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none"
                      placeholder="tu.email@ejemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Mensaje</label>
                    <textarea 
                      rows={4}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-yellow-500 focus:outline-none"
                      placeholder="Cuéntame sobre tu proyecto..."
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}