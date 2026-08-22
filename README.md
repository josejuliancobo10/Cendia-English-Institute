# CENDIA English Institute - Sitio Web Oficial

Proyecto frontend moderno y responsive para **Cendia English Institute (Quito)**.

## 🚀 Cómo ejecutar en Localhost

El servidor web local ya se encuentra activo en segundo plano en:
👉 **[http://localhost:8080](http://localhost:8080)**

Si deseas reiniciarlo o iniciarlo manualmente en cualquier momento desde PowerShell:

```powershell
# Dentro de la carpeta del proyecto
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
```

## 📁 Estructura del Proyecto

```
cendia-website/
├── index.html       # Estructura principal, Tailwind CSS y componentes visuales
├── styles.css       # Animaciones personalizadas, scrollbars y efectos
├── app.js           # Lógica interactiva (Chatbot, formulario, confirmaciones)
├── server.ps1       # Servidor HTTP estático nativo en PowerShell
└── README.md        # Documentación de uso
```

## ✨ Características Principales

- **Fidelidad Visual**: Diseñado siguiendo los estándares de marca, colores institucionales y tipografías oficiales (*Montserrat* & *Inter*).
- **Formulario Inteligente**: Captura de datos para prueba de nivel gratis con validación y confirmación en tiempo real.
- **Chatbot Asistente Virtual**: Asistente interactivo con botones rápidos para consultar cursos, horarios, precios y sedes.
- **Integración con WhatsApp**: Enlace directo y dinámico con mensajes pre-construidos para WhatsApp Web / Móvil.
- **Diseño 100% Adaptable**: Optimizado para pantallas móviles, tablets y escritorios, incluyendo barra de navegación rápida en móviles.
