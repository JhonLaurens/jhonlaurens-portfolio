-- Inicialización de Base de Datos para Portfolio Analytics
-- Autor: Jhon Laurens - Data Engineer
-- Fecha: Agosto 2025

-- Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Tabla para registrar visitas al portfolio
CREATE TABLE IF NOT EXISTS page_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page VARCHAR(255) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id VARCHAR(255),
    country VARCHAR(100),
    city VARCHAR(100)
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_page_visits_page ON page_visits(page);
CREATE INDEX IF NOT EXISTS idx_page_visits_date ON page_visits(visited_at);
CREATE INDEX IF NOT EXISTS idx_page_visits_ip ON page_visits(ip_address);

-- Tabla para contactos del portfolio
CREATE TABLE IF NOT EXISTS portfolio_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'pending',
    responded_at TIMESTAMP WITH TIME ZONE
);

-- Tabla para proyectos destacados
CREATE TABLE IF NOT EXISTS featured_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    technologies JSONB,
    github_url VARCHAR(500),
    demo_url VARCHAR(500),
    image_url VARCHAR(500),
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla para métricas de performance
CREATE TABLE IF NOT EXISTS performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(255) NOT NULL,
    metric_value NUMERIC,
    metric_unit VARCHAR(50),
    category VARCHAR(100),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar datos iniciales de proyectos
INSERT INTO featured_projects (title, description, technologies, category, github_url) VALUES
('Core Banking Migration', 'Migración completa de 1.2M+ transacciones con 99.9% de integridad', 
 '["PostgreSQL", "Python", "Apache Airflow", "Docker"]', 'banking', 'https://github.com/jhonlaurens'),
('AI Fraud Detection', 'Sistema de detección de fraudes en tiempo real con 96.8% de precisión', 
 '["Python", "TensorFlow", "Kafka", "Redis"]', 'ai', 'https://github.com/jhonlaurens'),
('Financial Dashboard', 'Dashboard ejecutivo para análisis de métricas financieras en tiempo real', 
 '["React", "D3.js", "PostgreSQL", "WebSocket"]', 'analytics', 'https://github.com/jhonlaurens'),
('Data Pipeline Automation', 'Pipeline ETL automatizado para procesos críticos de Core Banking', 
 '["Apache Airflow", "Python", "Docker", "Kubernetes"]', 'engineering', 'https://github.com/jhonlaurens'),
('Compliance Monitoring', 'Sistema de monitoreo para cumplimiento SARLAFT e ISO 27001', 
 '["Python", "Elasticsearch", "Kibana", "PostgreSQL"]', 'security', 'https://github.com/jhonlaurens');

-- Insertar métricas iniciales
INSERT INTO performance_metrics (metric_name, metric_value, metric_unit, category) VALUES
('Transactions Migrated', 1247832, 'count', 'banking'),
('Data Integrity', 99.97, 'percentage', 'quality'),
('System Uptime', 99.95, 'percentage', 'performance'),
('Average Processing Time', 1.2, 'seconds', 'performance'),
('AI Model Accuracy', 96.8, 'percentage', 'ai'),
('Security Incidents', 0, 'count', 'security');

-- Función para limpiar datos antiguos
CREATE OR REPLACE FUNCTION cleanup_old_data()
RETURNS void AS $$
BEGIN
    -- Eliminar visitas mayores a 90 días
    DELETE FROM page_visits WHERE visited_at < NOW() - INTERVAL '90 days';
    
    -- Eliminar métricas mayores a 1 año
    DELETE FROM performance_metrics WHERE recorded_at < NOW() - INTERVAL '1 year';
    
    RAISE NOTICE 'Limpieza de datos completada';
END;
$$ LANGUAGE plpgsql;

-- Vista para estadísticas rápidas
CREATE OR REPLACE VIEW portfolio_stats AS
SELECT 
    (SELECT COUNT(*) FROM page_visits) as total_visits,
    (SELECT COUNT(DISTINCT ip_address) FROM page_visits) as unique_visitors,
    (SELECT COUNT(*) FROM page_visits WHERE visited_at >= CURRENT_DATE) as today_visits,
    (SELECT COUNT(*) FROM portfolio_contacts WHERE status = 'pending') as pending_contacts,
    (SELECT COUNT(*) FROM featured_projects WHERE status = 'active') as active_projects;

-- Comentarios para documentación
COMMENT ON TABLE page_visits IS 'Registro de visitas al portfolio para analytics';
COMMENT ON TABLE portfolio_contacts IS 'Contactos recibidos a través del formulario del portfolio';
COMMENT ON TABLE featured_projects IS 'Proyectos destacados del portfolio';
COMMENT ON TABLE performance_metrics IS 'Métricas de rendimiento y KPIs del portfolio';

-- Conceder permisos al usuario de la aplicación
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO analyst;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO analyst;
