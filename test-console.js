// Script de prueba para ejecutar en la consola del navegador
// Copia y pega este código en la consola del navegador en http://localhost:3001/test-quick.html

console.log('=== INICIANDO PRUEBAS DE DIAGNÓSTICO ===');

// Test 1: Variables de entorno
console.log('\n1. Probando variables de entorno...');
try {
    const envInfo = {
        hasImportMeta: typeof import.meta !== 'undefined',
        hasEnv: typeof import.meta !== 'undefined' && !!import.meta.env,
        supabaseUrl: import.meta?.env?.VITE_SUPABASE_URL || 'NO ENCONTRADA',
        supabaseKeyPresent: !!import.meta?.env?.VITE_SUPABASE_ANON_KEY
    };
    console.log('✅ Variables de entorno:', envInfo);
} catch (error) {
    console.error('❌ Error en variables de entorno:', error);
}

// Test 2: Configuración de la app
console.log('\n2. Probando configuración de la app...');
try {
    import('./src/js/config/app.config.js').then(({ APP_CONFIG }) => {
        const configInfo = {
            supabaseUrl: APP_CONFIG.api.supabase.url,
            hasApiKey: !!APP_CONFIG.api.supabase.anonKey,
            apiKeyLength: APP_CONFIG.api.supabase.anonKey?.length || 0
        };
        console.log('✅ Configuración cargada:', configInfo);
    }).catch(error => {
        console.error('❌ Error cargando configuración:', error);
    });
} catch (error) {
    console.error('❌ Error en configuración:', error);
}

// Test 3: Servicio Supabase
console.log('\n3. Probando servicio Supabase...');
try {
    import('./src/js/services/supabase.service.js').then(({ supabase }) => {
        const serviceInfo = {
            clientExists: !!supabase,
            baseUrl: supabase.baseUrl,
            hasApiKey: !!supabase.apiKey,
            headersSet: !!supabase.headers
        };
        console.log('✅ Servicio inicializado:', serviceInfo);
    }).catch(error => {
        console.error('❌ Error inicializando servicio:', error);
    });
} catch (error) {
    console.error('❌ Error en servicio:', error);
}

// Test 4: Conexión directa
console.log('\n4. Probando conexión directa...');
try {
    fetch('https://edtcguoujjysnbasoxsk.supabase.co/rest/v1/', {
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdGNndW91amp5c25iYXNveHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMTY4NjIsImV4cCI6MjA3MDU5Mjg2Mn0.-IsoiGzO-QCPE01pSyclZEF4ZuWggQbwhSHs5JtGlOo'
        }
    }).then(response => {
        const connectionInfo = {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok
        };
        console.log('✅ Conexión exitosa:', connectionInfo);
        return response.text();
    }).then(text => {
        console.log('📄 Respuesta del servidor:', text.substring(0, 200) + '...');
    }).catch(error => {
        console.error('❌ Error de conexión:', error);
    });
} catch (error) {
    console.error('❌ Error en conexión:', error);
}

// Test 5: Función de prueba del formulario
console.log('\n5. Función de prueba del formulario disponible como testContactForm()');
window.testContactForm = async function() {
    console.log('\n🧪 Probando formulario de contacto...');
    try {
        const { DatabaseManager } = await import('./src/js/services/supabase.service.js');
        
        const testData = {
            name: 'Usuario de Prueba',
            email: 'test@example.com',
            subject: 'Prueba de Formulario',
            message: 'Este es un mensaje de prueba para verificar que el formulario funciona correctamente.'
        };
        
        console.log('📤 Enviando datos de prueba:', testData);
        
        const response = await DatabaseManager.saveContact(testData);
        console.log('✅ Mensaje enviado exitosamente:', response);
        
    } catch (error) {
        console.error('❌ Error enviando mensaje:', error);
        console.error('📋 Stack trace:', error.stack);
    }
};

console.log('\n=== PRUEBAS COMPLETADAS ===');
console.log('💡 Para probar el formulario, ejecuta: testContactForm()');
console.log('💡 También puedes usar los botones en la página para pruebas interactivas.');