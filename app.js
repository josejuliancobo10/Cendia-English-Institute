// Application logic for CENDIA English Institute Website

document.addEventListener('DOMContentLoaded', () => {
    // Header shadow on scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSuccessModal();
            const chatbot = document.getElementById('chatbot-container');
            if (chatbot && !chatbot.classList.contains('hidden')) {
                toggleChatbot();
            }
        }
    });
});

// Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = document.getElementById('submit-btn');
    
    // Extract form data
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const schedule = form.schedule.value;
    const service = form.service.value;

    // Loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-xl">progress_activity</span> Enviando solicitud...`;
    submitBtn.disabled = true;

    setTimeout(() => {
        // Construct WhatsApp message URL
        const whatsappMsg = `¡Hola CENDIA! Mi nombre es ${firstName} ${lastName}.\n` +
            `Quisiera información sobre: ${service}\n` +
            `Horario de interés: ${schedule}\n` +
            `Mi teléfono es: ${phone} y mi correo: ${email}.`;

        const whatsappUrl = `https://wa.me/593998720970?text=${encodeURIComponent(whatsappMsg)}`;

        // Update modal
        const modalMessage = document.getElementById('modal-message');
        modalMessage.innerHTML = `¡Gracias <strong>${firstName}</strong>! Hemos registrado tu interés en <strong>${service}</strong> para el horario <strong>${schedule}</strong>. Te contactaremos al <strong>${phone}</strong> para coordinar tu cita o prueba de ubicación.`;

        const modalWhatsappLink = document.getElementById('modal-whatsapp-link');
        modalWhatsappLink.href = whatsappUrl;

        // Reset submit button & form
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();

        // Show Modal
        const modal = document.getElementById('success-modal');
        modal.classList.remove('hidden');
    }, 600);
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Chatbot Logic
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-container');
    if (chatbot.classList.contains('hidden')) {
        chatbot.classList.remove('hidden');
        setTimeout(() => {
            chatbot.classList.remove('opacity-0', 'scale-95');
            chatbot.classList.add('opacity-100', 'scale-100');
            document.getElementById('chat-input').focus();
        }, 10);
    } else {
        chatbot.classList.remove('opacity-100', 'scale-100');
        chatbot.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            chatbot.classList.add('hidden');
        }, 300);
    }
}

function sendQuickReply(optionText) {
    appendUserMessage(optionText);
    respondToQuery(optionText);
}

function handleChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    appendUserMessage(message);
    input.value = '';
    respondToQuery(message);
}

function appendUserMessage(text) {
    const messagesContainer = document.getElementById('chat-messages');
    const userMsgHtml = `
        <div class="flex items-start justify-end gap-2.5">
            <div class="bg-cendia-red text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-xs sm:text-sm max-w-[80%] leading-relaxed">
                ${escapeHtml(text)}
            </div>
            <div class="w-7 h-7 rounded-full bg-red-100 text-cendia-red flex items-center justify-center flex-shrink-0 text-xs mt-1">
                <span class="material-symbols-outlined text-sm">person</span>
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', userMsgHtml);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function appendBotMessage(htmlContent) {
    const messagesContainer = document.getElementById('chat-messages');
    
    // Typing indicator
    const typingId = 'typing-' + Date.now();
    const typingHtml = `
        <div id="${typingId}" class="flex items-start gap-2.5">
            <div class="w-7 h-7 rounded-full bg-cendia-red text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                <span class="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div class="bg-white text-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm border border-border-subtle text-xs sm:text-sm">
                <span class="inline-block animate-pulse">Escribiendo...</span>
            </div>
        </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHtml);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        const typingElem = document.getElementById(typingId);
        if (typingElem) typingElem.remove();

        const botMsgHtml = `
            <div class="flex items-start gap-2.5">
                <div class="w-7 h-7 rounded-full bg-cendia-red text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <span class="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div class="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-border-subtle text-xs sm:text-sm leading-relaxed max-w-[85%]">
                    ${htmlContent}
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', botMsgHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
}

function respondToQuery(query) {
    const q = query.toLowerCase();
    let reply = '';

    if (q.includes('horario') || q.includes('hora') || q.includes('nivel') || q.includes('programa')) {
        reply = `<strong>Programa Académico CENDIA:</strong><br>
        12 meses con 12 niveles (1 nivel por mes). Clases de 2 horas académicas diarias.<br><br>
        📍 <strong>Presencial (Lunes a Viernes):</strong><br>
        • 7:00 am - 8:40 am<br>
        • 9:00 am - 10:50 am<br>
        • 3:00 pm - 4:50 pm<br><br>
        🗓️ <strong>Sábados (15 Meses):</strong><br>
        • 8:00 am - 1:00 pm<br><br>
        💻 <strong>Online en Vivo (Lunes a Viernes):</strong><br>
        • 5:00 pm - 6:50 pm<br>
        • 7:00 pm - 8:40 pm`;
    } else if (q.includes('precio') || q.includes('costo') || q.includes('valor') || q.includes('cuanto') || q.includes('cuánto')) {
        reply = `<strong>Inversión y Costos Oficiales:</strong><br>
        • <strong>Nivel 1 al 8:</strong> USD $90 mensuales.<br>
        • <strong>Nivel 9 al 12:</strong> USD $100 mensuales.<br>
        • <strong>Sábados (15 meses):</strong> USD $100 mensuales.<br>
        • <strong>Matrícula anual:</strong> USD $70.<br>
        • <strong>Plataforma digital:</strong> USD $36 (para todo el programa).<br>
        • <strong>Prueba de ubicación:</strong> Presencial en oficinas.<br><br>
        <a href="precios.html" class="text-cendia-red font-bold hover:underline">Ver tabla completa de precios →</a>`;
    } else if (q.includes('prueba') || q.includes('ubicacion') || q.includes('ubicación') || q.includes('test')) {
        reply = `<strong>Prueba de Ubicación (en oficinas):</strong><br>
        Se rinde de forma presencial en La Mariscal:<br>
        • <strong>Lunes a Viernes:</strong> 7:00 am a 3:00 pm<br>
        • <strong>Sábados:</strong> 9:00 am a 12:00 pm<br><br>
        <a href="contacto.html" class="inline-block bg-cendia-red text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-cendia-red-dark">Agendar prueba ahora</a>`;
    } else if (q.includes('setec') || q.includes('cambridge') || q.includes('oxford') || q.includes('certificado') || q.includes('aval')) {
        reply = `<strong>Avales y Certificaciones Oficiales:</strong><br>
        • <strong>SETEC:</strong> Instituto avalado. Certificado nacional de Inglés Avanzado.<br>
        • <strong>CAMBRIDGE:</strong> Somos CENTRO EVALUADOR oficial para exámenes Cambridge (FCE).<br>
        • <strong>OXFORD:</strong> Preparación y certificaciones internacionales.`;
    } else if (q.includes('donde') || q.includes('dónde') || q.includes('direccion') || q.includes('dirección') || q.includes('mapa')) {
        reply = `📍 <strong>Sede Principal Quito:</strong><br>
        Baquerizo Moreno E8-26 y Almagro (La Mariscal).<br>
        Teléfono: 022-528-551 | WhatsApp: +593 99 872 0970<br><br>
        <a href="contacto.html" class="text-cendia-red font-bold hover:underline">Ver mapa interactivo →</a>`;
    } else {
        reply = `Con gusto te atendemos. Puedes consultar sobre horarios, los 12 niveles, costos o agendar tu prueba de ubicación.<br><br>
        <a href="https://wa.me/593998720970" target="_blank" class="text-whatsapp-green font-bold hover:underline">💬 Hablar con un asesor por WhatsApp</a>`;
    }

    appendBotMessage(reply);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
