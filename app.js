// Application logic for Cendia English Institute Website

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
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const location = form.location.options[form.location.selectedIndex].text;
    const course = form.course.options[form.course.selectedIndex].text;

    // Loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-xl">progress_activity</span> Enviando solicitud...`;
    submitBtn.disabled = true;

    setTimeout(() => {
        // Construct WhatsApp message URL
        const whatsappMsg = `¡Hola Cendia! Mi nombre es ${firstName} ${lastName}. Me gustaría agendar mi prueba de nivel gratis para el curso: ${course} en la modalidad/sede: ${location}. Mi correo es ${email} y teléfono: ${phone}.`;
        const whatsappUrl = `https://wa.me/593998720970?text=${encodeURIComponent(whatsappMsg)}`;

        // Update modal
        const modalMessage = document.getElementById('modal-message');
        modalMessage.innerHTML = `¡Gracias <strong>${firstName}</strong>! Hemos recibido tu solicitud para <strong>${course}</strong>. Uno de nuestros asesores académicos te contactará al <strong>${phone}</strong> para agendar tu prueba de nivel sin costo.`;

        const modalWhatsappLink = document.getElementById('modal-whatsapp-link');
        modalWhatsappLink.href = whatsappUrl;

        // Reset submit button & form
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();

        // Show Modal
        const modal = document.getElementById('success-modal');
        modal.classList.remove('hidden');
    }, 800);
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
            <div class="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-xs sm:text-sm max-w-[80%] leading-relaxed">
                ${escapeHtml(text)}
            </div>
            <div class="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-xs mt-1">
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
            <div class="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                <span class="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div class="bg-white text-on-surface p-3 rounded-2xl rounded-tl-none shadow-sm border border-border-subtle text-xs sm:text-sm">
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
                <div class="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <span class="material-symbols-outlined text-sm">smart_toy</span>
                </div>
                <div class="bg-white text-on-surface p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-border-subtle text-xs sm:text-sm leading-relaxed max-w-[85%]">
                    ${htmlContent}
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', botMsgHtml);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600);
}

function respondToQuery(query) {
    const q = query.toLowerCase();
    let reply = '';

    if (q.includes('curso') || q.includes('ver cursos') || q.includes('programa')) {
        reply = `En Cendia ofrecemos:
        <ul class="list-disc pl-4 mt-2 space-y-1">
            <li><strong>Inglés General:</strong> Niños, jóvenes y adultos (A1 a C1).</li>
            <li><strong>Exámenes Internacionales:</strong> Preparación oficial Cambridge y Aptis.</li>
            <li><strong>Clases 1 a 1:</strong> Horarios personalizados y avance a tu medida.</li>
            <li><strong>Inglés Corporativo:</strong> Programas para empresas.</li>
        </ul>
        <div class="mt-2.5">
            <a href="#cursos" onclick="toggleChatbot()" class="text-primary font-bold hover:underline">Ver detalles de cursos →</a>
        </div>`;
    } else if (q.includes('prueba') || q.includes('nivel') || q.includes('test')) {
        reply = `¡La <strong>prueba de nivel es 100% gratuita</strong>! Te evalúa un docente en 20-30 minutos y te indica tu nivel exacto según el Marco Común Europeo.<br><br>
        <a href="#contacto" onclick="toggleChatbot()" class="inline-block bg-primary text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-primary-container">Agendar prueba ahora</a>`;
    } else if (q.includes('sede') || q.includes('ubicacion') || q.includes('ubicación') || q.includes('horario') || q.includes('donde') || q.includes('dónde')) {
        reply = `Estamos ubicados en:
        <div class="mt-2 space-y-1">
            📍 <strong>Sede La Mariscal (Quito Norte):</strong> Baquerizo Moreno E8-26 y Almagro.<br>
            📍 <strong>Sede Calderón</strong>.<br>
            💻 <strong>Modalidad Online en vivo</strong> vía Zoom HD.<br>
        </div>
        <p class="mt-2 text-xs text-on-surface-variant">⏰ Horarios disponibles: Lunes a Viernes (Mañana / Tarde / Noche) y Sábados intensivos.</p>`;
    } else if (q.includes('precio') || q.includes('costo') || q.includes('valor') || q.includes('tarifa') || q.includes('promocion') || q.includes('promoción')) {
        reply = `Disponemos de planes accesibles con pago mensual y facilidades con tarjeta de crédito. ¡Además tenemos descuentos especiales por inicio de ciclo este <strong>4 y 6 de junio</strong>!<br><br>
        <a href="https://wa.me/593998720970?text=Hola,%20quisiera%20conocer%20los%20precios%20y%20promociones" target="_blank" class="inline-flex items-center gap-1 text-whatsapp-green font-bold hover:underline">
            <span class="material-symbols-outlined text-sm">chat</span> Consultar tarifas por WhatsApp
        </a>`;
    } else {
        reply = `Con gusto te asesoramos personalmente. ¿Prefieres que te contactemos por WhatsApp o te gustaría agendar tu prueba de nivel gratis?<br><br>
        <div class="flex flex-col gap-1.5 mt-1">
            <a href="https://wa.me/593998720970" target="_blank" class="text-whatsapp-green font-semibold hover:underline">💬 Hablar con un asesor en WhatsApp</a>
            <a href="#contacto" onclick="toggleChatbot()" class="text-primary font-semibold hover:underline">📝 Llenar formulario de contacto</a>
        </div>`;
    }

    appendBotMessage(reply);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
