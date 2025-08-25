// Analytics y métricas para Portfolio Data Engineer
// Autor: Jhon Laurens

class PortfolioAnalytics {
  constructor() {
    this.apiUrl = "http://localhost:3001/api";
    this.init();
  }

  async init() {
    await this.trackPageVisit();
    await this.loadBankingMetrics();
    await this.loadAIProjects();
    this.setupRealTimeUpdates();
  }

  // 📊 Registrar visita a la página
  async trackPageVisit() {
    try {
      const visitData = {
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
      };

      await fetch(`${this.apiUrl}/analytics/visit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitData),
      });
    } catch (error) {
      console.log("Analytics offline - modo demo");
    }
  }

  // 🏦 Cargar métricas de Core Banking
  async loadBankingMetrics() {
    try {
      const response = await fetch(`${this.apiUrl}/banking/metrics`);
      const metrics = await response.json();
      this.updateBankingDashboard(metrics);
    } catch (error) {
      // Datos de fallback para modo demo
      const mockMetrics = {
        transactionsMigrated: "1,247,832",
        dataIntegrity: "99.97%",
        systemUptime: "99.95%",
        processingTime: "1.2s",
        dailyTransactions: "45,678",
      };
      this.updateBankingDashboard(mockMetrics);
    }
  }

  // 🤖 Cargar proyectos de IA
  async loadAIProjects() {
    try {
      const response = await fetch(`${this.apiUrl}/ai/projects`);
      const projects = await response.json();
      this.updateAIProjectsSection(projects);
    } catch (error) {
      console.log("AI projects offline - modo demo");
    }
  }

  // 📊 Actualizar dashboard financiero
  updateBankingDashboard(metrics) {
    const dashboard = document.querySelector(".financial-metrics");
    if (!dashboard) return;

    dashboard.innerHTML = `
            <div class="metric-card" data-aos="fade-up" data-aos-delay="100">
                <div class="metric-value">${metrics.transactionsMigrated}</div>
                <div class="metric-label">Transacciones Migradas</div>
            </div>
            <div class="metric-card" data-aos="fade-up" data-aos-delay="200">
                <div class="metric-value">${metrics.dataIntegrity}</div>
                <div class="metric-label">Integridad de Datos</div>
            </div>
            <div class="metric-card" data-aos="fade-up" data-aos-delay="300">
                <div class="metric-value">${metrics.systemUptime}</div>
                <div class="metric-label">Tiempo de Actividad</div>
            </div>
            <div class="metric-card" data-aos="fade-up" data-aos-delay="400">
                <div class="metric-value">${metrics.processingTime}</div>
                <div class="metric-label">Tiempo de Procesamiento</div>
            </div>
        `;

    // Animar números
    this.animateCounters();
  }

  // 🤖 Actualizar sección de proyectos IA
  updateAIProjectsSection(projects) {
    const container = document.querySelector(".ai-projects-container");
    if (!container || !projects) return;

    container.innerHTML = projects
      .map(
        (project, index) => `
            <div class="ai-project-card" data-aos="fade-up" data-aos-delay="${
              (index + 1) * 100
            }">
                <h5><i class="bi bi-robot"></i> ${project.name}</h5>
                <p class="project-desc">${
                  project.description || "Proyecto de IA en desarrollo"
                }</p>
                <div class="project-stats">
                    <span class="tech-tag">Precisión: ${
                      project.accuracy || "N/A"
                    }</span>
                    <span class="tech-tag">Estado: ${
                      project.status || "Activo"
                    }</span>
                </div>
                <div class="project-tech">
                    ${(project.technology || ["Python", "TensorFlow"])
                      .map((tech) => `<span class="tech-tag">${tech}</span>`)
                      .join("")}
                </div>
            </div>
        `
      )
      .join("");
  }

  // 🔄 Configurar actualizaciones en tiempo real
  setupRealTimeUpdates() {
    // Actualizar métricas cada 30 segundos
    setInterval(() => {
      this.loadBankingMetrics();
    }, 30000);

    // Actualizar proyectos cada 5 minutos
    setInterval(() => {
      this.loadAIProjects();
    }, 300000);
  }

  // ✨ Animar contadores numéricos
  animateCounters() {
    const counters = document.querySelectorAll(".metric-value");

    counters.forEach((counter) => {
      const text = counter.textContent;
      const numbers = text.match(/[\d,]+/);

      if (numbers) {
        const finalValue = parseInt(numbers[0].replace(/,/g, ""));
        if (!isNaN(finalValue)) {
          this.animateValue(counter, 0, finalValue, 2000, text);
        }
      }
    });
  }

  // 🔢 Función para animar valores numéricos
  animateValue(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const isPercentage = originalText.includes("%");
    const hasCommas = originalText.includes(",");

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const current = Math.floor(start + (end - start) * progress);
      let displayValue = current.toString();

      if (hasCommas) {
        displayValue = current.toLocaleString();
      }

      if (isPercentage) {
        displayValue += "%";
      }

      element.textContent = displayValue;

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        element.textContent = originalText;
      }
    };

    requestAnimationFrame(updateValue);
  }

  // 📱 Detectar dispositivo
  getDeviceType() {
    const width = window.innerWidth;
    if (width <= 768) return "mobile";
    if (width <= 1024) return "tablet";
    return "desktop";
  }

  // 🎯 Rastrear interacciones
  trackInteraction(action, element) {
    try {
      fetch(`${this.apiUrl}/analytics/interaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          element,
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
        }),
      });
    } catch (error) {
      console.log("Interaction tracking offline");
    }
  }
}

// 🚀 Inicializar analytics cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioAnalytics = new PortfolioAnalytics();

  // Rastrear clics en enlaces importantes
  document
    .querySelectorAll(
      'a[href*="mailto"], a[href*="linkedin"], a[href*="github"]'
    )
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        const action = e.target.href.includes("mailto")
          ? "email_click"
          : e.target.href.includes("linkedin")
          ? "linkedin_click"
          : "github_click";
        window.portfolioAnalytics.trackInteraction(action, e.target.href);
      });
    });

  // Rastrear envío de formularios
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      window.portfolioAnalytics.trackInteraction(
        "form_submit",
        form.id || "contact_form"
      );
    });
  });
});

// 🔄 Función para refrescar métricas manualmente
window.refreshMetrics = () => {
  if (window.portfolioAnalytics) {
    window.portfolioAnalytics.loadBankingMetrics();
    window.portfolioAnalytics.loadAIProjects();
  }
};
