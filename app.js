// ==================== DATOS DE DEMOSTRACIÓN ====================
const catalogo = [
  { id: 1, nombre: "Consulta Médica General", tipo: "Servicio", precio: 45000, stock: 99, desc: "Valoración clínica completa y orientación médica." },
  { id: 2, nombre: "Vacuna Polivalente (Quíntuple)", tipo: "Vacuna", precio: 55000, stock: 14, desc: "Protección preventiva con registro de próximo refuerzo." },
  { id: 3, nombre: "Vacuna Antirrábica", tipo: "Vacuna", precio: 35000, stock: 18, desc: "Aplicación anual con recordatorio automático por WhatsApp." },
  { id: 4, nombre: "Antipulgas Oral (10-20 kg)", tipo: "Farmacia", precio: 68000, stock: 3, desc: "Tableta masticable de protección mensual." },
  { id: 5, nombre: "Concentrado Adulto 3 kg", tipo: "Tienda", precio: 52000, stock: 9, desc: "Nutrición balanceada para perros adultos." },
  { id: 6, nombre: "Desparasitante Interno", tipo: "Farmacia", precio: 24000, stock: 2, desc: "Control de parásitos internos según peso." }
];

let carrito = [];
let ventasAcumuladas = 245000;

let citas = [
  { id: 1, mascota: "Rocky", dueno: "Carlos Méndez", telefono: "3124567890", servicio: "Vacunación / Refuerzo", fecha: "Hoy", hora: "09:30", origen: "Agenda" },
  { id: 2, mascota: "Luna", dueno: "Valentina Ríos", telefono: "3159876543", servicio: "Consulta General", fecha: "Hoy", hora: "11:00", origen: "Agenda" },
  { id: 3, mascota: "Toby", dueno: "Andrés Castro", telefono: "3002223344", servicio: "Baño y Peluquería", fecha: "Hoy", hora: "14:30", origen: "Agenda" },
  { id: 4, mascota: "Mia", dueno: "Sofía Herrera", telefono: "3187778899", servicio: "Vacunación / Refuerzo", fecha: "Hoy", hora: "16:00", origen: "Agenda" }
];

const pacientes = [
  {
    id: 1,
    nombre: "Rocky",
    especie: "Canino · Labrador",
    edad: "3 años",
    peso: "28.5 kg",
    dueno: "Carlos Méndez",
    telefono: "3124567890",
    vacunaProxima: "Refuerzo Polivalente",
    venceEn: "En 3 días",
    historial: [
      { fecha: "12/10/2026", motivo: "Control general y pesaje", nota: "Estado óptimo, sin novedades." },
      { fecha: "15/11/2025", motivo: "Vacuna Polivalente", nota: "Aplicada sin reacciones adversas." }
    ]
  },
  {
    id: 2,
    nombre: "Luna",
    especie: "Felino · Criolla",
    edad: "2 años",
    peso: "4.1 kg",
    dueno: "Valentina Ríos",
    telefono: "3159876543",
    vacunaProxima: "Triple Felina",
    venceEn: "En 5 días",
    historial: [
      { fecha: "03/11/2026", motivo: "Desparasitación trimestral", nota: "Dosis oral administrada." }
    ]
  },
  {
    id: 3,
    nombre: "Mia",
    especie: "Canino · French Poodle",
    edad: "5 años",
    peso: "6.4 kg",
    dueno: "Sofía Herrera",
    telefono: "3187778899",
    vacunaProxima: "Antirrábica Anual",
    venceEn: "Mañana",
    historial: [
      { fecha: "20/09/2026", motivo: "Limpieza dental", nota: "Recuperación favorable." }
    ]
  }
];

let pacienteSeleccionadoWpp = pacientes[0];

// ==================== UTILIDADES ====================
function formatoPesos(valor) {
  return "$" + valor.toLocaleString("es-CO");
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.remove("opacity-0");
  setTimeout(() => toast.classList.add("opacity-0"), 2800);
}

function obtenerNombreVet() {
  return document.getElementById("nombre-veterinaria").textContent.trim() || "Veterinaria";
}

// ==================== NAVEGACIÓN PÚBLICA (CLIENTES) ====================
function switchPublicSection(secId) {
  document.querySelectorAll(".pub-section").forEach(s => s.classList.add("hidden"));
  const target = document.getElementById(`pub-${secId}`);
  if (target) target.classList.remove("hidden");

  document.querySelectorAll(".pub-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.pub === secId);
  });
}

document.querySelectorAll(".pub-nav-btn").forEach(btn => {
  btn.addEventListener("click", () => switchPublicSection(btn.dataset.pub));
});

// ==================== NAVEGACIÓN INTERNA (EQUIPO) ====================
function abrirModalEquipo() {
  const modal = document.getElementById("modal-equipo");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function cerrarModalEquipo() {
  const modal = document.getElementById("modal-equipo");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function entrarModoEquipo() {
  cerrarModalEquipo();
  document.getElementById("public-portal").classList.add("hidden");
  document.getElementById("staff-portal").classList.remove("hidden");

  document.getElementById("public-nav").classList.add("hidden");
  document.getElementById("public-nav").classList.remove("md:flex");
  document.getElementById("staff-nav").classList.remove("hidden");
  document.getElementById("staff-nav").classList.add("md:flex");

  document.getElementById("mobile-public-nav").classList.add("hidden");
  document.getElementById("mobile-staff-nav").classList.remove("hidden");
  document.getElementById("mobile-staff-nav").classList.add("flex");

  document.getElementById("btn-abrir-equipo").classList.add("hidden");
  document.getElementById("btn-volver-publico").classList.remove("hidden");
  document.getElementById("btn-volver-publico").classList.add("flex");

  switchStaffSection("ventas");
  renderStaffTodo();
  mostrarToast("Acceso al panel del equipo habilitado");
}

function salirModoEquipo() {
  document.getElementById("staff-portal").classList.add("hidden");
  document.getElementById("public-portal").classList.remove("hidden");

  document.getElementById("staff-nav").classList.add("hidden");
  document.getElementById("staff-nav").classList.remove("md:flex");
  document.getElementById("public-nav").classList.remove("hidden");
  document.getElementById("public-nav").classList.add("md:flex");

  document.getElementById("mobile-staff-nav").classList.add("hidden");
  document.getElementById("mobile-staff-nav").classList.remove("flex");
  document.getElementById("mobile-public-nav").classList.remove("hidden");

  document.getElementById("btn-volver-publico").classList.add("hidden");
  document.getElementById("btn-volver-publico").classList.remove("flex");
  document.getElementById("btn-abrir-equipo").classList.remove("hidden");

  switchPublicSection("home");
}

function switchStaffSection(secId) {
  document.querySelectorAll(".staff-section").forEach(s => s.classList.add("hidden"));
  const target = document.getElementById(`staff-${secId}`);
  if (target) target.classList.remove("hidden");

  document.querySelectorAll(".staff-nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.staff === secId);
  });
}

document.querySelectorAll(".staff-nav-btn").forEach(btn => {
  btn.addEventListener("click", () => switchStaffSection(btn.dataset.staff));
});

// ==================== CATÁLOGO PÚBLICO + RESERVA WHATSAPP ====================
function renderCatalogoCliente(filtro = "") {
  const grid = document.getElementById("cliente-catalogo-grid");
  const items = catalogo.filter(item =>
    item.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    item.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  grid.innerHTML = items.map(item => `
    <div class="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-vetPrimary">${item.tipo}</span>
          <span class="text-sm font-bold text-slate-900">${formatoPesos(item.precio)}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-base mt-2.5">${item.nombre}</h4>
        <p class="text-xs text-slate-500 mt-1">${item.desc}</p>
      </div>
      <button onclick="irAReservarConServicio('${item.nombre}')" class="mt-4 w-full py-2 bg-slate-900 hover:bg-vetPrimary text-white text-xs font-semibold rounded-xl transition">
        Agendar / Consultar
      </button>
    </div>
  `).join("");
}

document.getElementById("cliente-buscar").addEventListener("input", (e) => {
  renderCatalogoCliente(e.target.value);
});

function irAReservarConServicio(nombreItem) {
  const select = document.getElementById("res-servicio");
  const lower = nombreItem.toLowerCase();
  if (lower.includes("vacuna")) select.value = "Vacunación / Refuerzo";
  else if (lower.includes("baño")) select.value = "Baño y Peluquería";
  else if (lower.includes("desparasit")) select.value = "Desparasitación";
  else select.value = "Consulta General";

  switchPublicSection("reservar");
}

document.getElementById("form-reserva-cliente").addEventListener("submit", (e) => {
  e.preventDefault();
  const dueno = document.getElementById("res-dueno").value.trim();
  const telefono = document.getElementById("res-wpp").value.trim();
  const mascota = document.getElementById("res-mascota").value.trim();
  const servicio = document.getElementById("res-servicio").value;
  const fecha = document.getElementById("res-fecha").value || "Próxima fecha";
  const hora = document.getElementById("res-hora").value;

  citas.unshift({
    id: Date.now(),
    mascota,
    dueno,
    telefono,
    servicio,
    fecha,
    hora,
    origen: "Web Cliente"
  });

  const vet = obtenerNombreVet();
  const mensaje = `Hola ${vet}, soy ${dueno}. Acabo de solicitar una cita para *${mascota}* (${servicio}) el *${fecha}* a las *${hora}*. Mi WhatsApp para recordatorios es ${telefono}.`;

  document.getElementById("reserva-confirmacion-box").innerHTML = `
    <p class="font-bold text-emerald-700">✓ Solicitud registrada en la agenda</p>
    <p><strong>Mascota:</strong> ${mascota} · <strong>Servicio:</strong> ${servicio}</p>
    <p><strong>Fecha y hora:</strong> ${fecha} · ${hora}</p>
    <p class="pt-2 border-t border-slate-100 whitespace-pre-line text-slate-600">${mensaje}</p>
  `;

  const numeroLimpio = telefono.replace(/\D/g, "");
  const linkWpp = document.getElementById("btn-wpp-directo");
  linkWpp.href = numeroLimpio
    ? `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`
    : `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

  mostrarToast(`Reserva registrada para ${mascota}`);
  e.target.reset();
});

// ==================== MÓDULO EQUIPO: VENTAS E INVENTARIO ====================
function renderStaffProductos(filtro = "") {
  const cont = document.getElementById("staff-lista-productos");
  const filtrados = catalogo.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.tipo.toLowerCase().includes(filtro.toLowerCase())
  );

  cont.innerHTML = filtrados.map(prod => {
    const stockBajo = prod.stock <= 5;
    return `
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">${prod.tipo}</span>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-md ${stockBajo ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-700'}">
              ${prod.tipo === 'Servicio' ? 'Servicio' : `Stock: ${prod.stock}`}
            </span>
          </div>
          <h4 class="font-bold text-slate-900 text-sm mt-2">${prod.nombre}</h4>
          <p class="text-base font-bold text-vetPrimary mt-1">${formatoPesos(prod.precio)}</p>
        </div>
        <button onclick="agregarAlCarrito(${prod.id})" class="mt-3 w-full py-2 bg-slate-900 hover:bg-vetPrimary text-white text-xs font-semibold rounded-xl transition">
          + Agregar a venta
        </button>
      </div>
    `;
  }).join("");
}

document.getElementById("staff-buscar-prod").addEventListener("input", (e) => {
  renderStaffProductos(e.target.value);
});

function agregarAlCarrito(id) {
  const prod = catalogo.find(p => p.id === id);
  if (!prod || (prod.tipo !== "Servicio" && prod.stock <= 0)) {
    return mostrarToast("Producto sin stock");
  }
  const existente = carrito.find(c => c.id === id);
  if (existente) {
    if (prod.tipo === "Servicio" || existente.cantidad < prod.stock) existente.cantidad++;
    else return mostrarToast("Límite de stock alcanzado");
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }
  renderCarrito();
}

function vaciarCarrito() {
  carrito = [];
  renderCarrito();
}

function renderCarrito() {
  const cont = document.getElementById("staff-carrito-items");
  const totalEl = document.getElementById("staff-carrito-total");

  if (carrito.length === 0) {
    cont.innerHTML = `<p class="text-slate-400 text-center py-6">Sin ítems seleccionados.</p>`;
    totalEl.textContent = "$0";
    return;
  }

  let total = 0;
  cont.innerHTML = carrito.map(item => {
    const sub = item.precio * item.cantidad;
    total += sub;
    return `
      <div class="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl">
        <div>
          <p class="font-semibold text-slate-800">${item.nombre}</p>
          <p class="text-[11px] text-slate-500">${item.cantidad} x ${formatoPesos(item.precio)}</p>
        </div>
        <span class="font-bold text-slate-900">${formatoPesos(sub)}</span>
      </div>
    `;
  }).join("");

  totalEl.textContent = formatoPesos(total);
}

function confirmarVenta() {
  if (carrito.length === 0) return mostrarToast("Agrega al menos un ítem");
  let totalVenta = 0;
  carrito.forEach(item => {
    totalVenta += item.precio * item.cantidad;
    const prod = catalogo.find(p => p.id === item.id);
    if (prod && prod.tipo !== "Servicio") prod.stock -= item.cantidad;
  });

  ventasAcumuladas += totalVenta;
  document.getElementById("staff-kpi-ventas").textContent = formatoPesos(ventasAcumuladas);
  carrito = [];
  renderCarrito();
  renderStaffProductos(document.getElementById("staff-buscar-prod").value);
  mostrarToast(`Venta registrada por ${formatoPesos(totalVenta)}`);
}

// ==================== MÓDULO EQUIPO: AGENDA, PACIENTES Y CRM WHATSAPP ====================
function renderStaffAgenda() {
  const cont = document.getElementById("staff-lista-citas");
  document.getElementById("staff-kpi-citas").textContent = citas.length;

  cont.innerHTML = citas.map(c => `
    <div class="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div>
        <p class="font-bold text-sm text-slate-900">${c.mascota} <span class="font-normal text-xs text-slate-500">· ${c.servicio}</span></p>
        <p class="text-xs text-slate-500">Dueño: ${c.dueno} · WhatsApp: ${c.telefono}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[11px] font-semibold bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full">${c.fecha} · ${c.hora}</span>
        <span class="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">${c.origen}</span>
      </div>
    </div>
  `).join("");
}

function renderStaffPacientes() {
  const lista = document.getElementById("staff-lista-pacientes");
  lista.innerHTML = pacientes.map((p, i) => `
    <button onclick="verHistoriaStaff(${p.id})" id="staff-pac-${p.id}" class="staff-pac-card w-full text-left bg-white p-4 rounded-2xl border ${i === 0 ? 'border-vetPrimary ring-1 ring-vetPrimary' : 'border-slate-200'} hover:border-vetPrimary transition shadow-sm">
      <div class="flex justify-between items-center">
        <h4 class="font-bold text-sm text-slate-900">${p.nombre}</h4>
        <span class="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">${p.edad}</span>
      </div>
      <p class="text-xs text-slate-500 mt-0.5">${p.especie}</p>
      <p class="text-[11px] text-slate-400 mt-1.5">Dueño: ${p.dueno}</p>
    </button>
  `).join("");
  verHistoriaStaff(pacientes[0].id);
}

function verHistoriaStaff(id) {
  const pac = pacientes.find(p => p.id === id);
  if (!pac) return;

  document.querySelectorAll(".staff-pac-card").forEach(c => {
    c.classList.remove("border-vetPrimary", "ring-1", "ring-vetPrimary");
    c.classList.add("border-slate-200");
  });
  const card = document.getElementById(`staff-pac-${id}`);
  if (card) {
    card.classList.remove("border-slate-200");
    card.classList.add("border-vetPrimary", "ring-1", "ring-vetPrimary");
  }

  document.getElementById("staff-detalle-historia").innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
      <div>
        <span class="text-xs font-semibold text-vetPrimary uppercase">Historia Clínica</span>
        <h3 class="text-lg font-bold text-slate-900">${pac.nombre} <span class="text-xs font-normal text-slate-500">(${pac.especie})</span></h3>
      </div>
      <span class="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-xl font-medium">
        Próxima: <strong>${pac.vacunaProxima}</strong> (${pac.venceEn})
      </span>
    </div>
    <div class="grid grid-cols-3 gap-3 my-4 text-xs">
      <div class="bg-slate-50 p-3 rounded-xl"><span class="text-slate-400 block">Propietario</span><strong>${pac.dueno}</strong></div>
      <div class="bg-slate-50 p-3 rounded-xl"><span class="text-slate-400 block">WhatsApp</span><strong>${pac.telefono}</strong></div>
      <div class="bg-slate-50 p-3 rounded-xl"><span class="text-slate-400 block">Peso</span><strong>${pac.peso}</strong></div>
    </div>
    <div class="space-y-2.5">
      ${pac.historial.map(h => `
        <div class="p-3 rounded-xl border border-slate-100 bg-slate-50/70 text-xs">
          <div class="flex justify-between font-semibold text-slate-800">
            <span>${h.motivo}</span><span class="text-slate-400">${h.fecha}</span>
          </div>
          <p class="text-slate-600 mt-1">${h.nota}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function renderStaffCrm() {
  const cont = document.getElementById("staff-lista-vencimientos");
  cont.innerHTML = pacientes.map(p => `
    <div onclick="seleccionarWpp(${p.id})" class="cursor-pointer p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/70 flex items-center justify-between transition">
      <div>
        <p class="font-bold text-sm text-slate-900">${p.nombre} <span class="text-xs font-normal text-slate-500">(${p.dueno})</span></p>
        <p class="text-xs text-slate-600">${p.vacunaProxima}</p>
      </div>
      <span class="text-[11px] font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">${p.venceEn}</span>
    </div>
  `).join("");
  actualizarTextoWpp(pacienteSeleccionadoWpp);
}

function seleccionarWpp(id) {
  const pac = pacientes.find(p => p.id === id);
  if (!pac) return;
  pacienteSeleccionadoWpp = pac;
  document.getElementById("wpp-estado-envio").textContent = "Listo para envío";
  actualizarTextoWpp(pac);
}

function actualizarTextoWpp(pac) {
  const vet = obtenerNombreVet();
  document.getElementById("wpp-preview-texto").textContent =
    `¡Hola ${pac.dueno}! Te recordamos desde ${vet} que a *${pac.nombre}* le corresponde *${pac.vacunaProxima}* (${pac.venceEn.toLowerCase()}).\n\nResponde *1* para agendar tu cita.`;
}

function simularEnvioWpp() {
  document.getElementById("wpp-estado-envio").textContent = `Enviado a ${pacienteSeleccionadoWpp.telefono} ✓`;
  mostrarToast(`Recordatorio enviado a ${pacienteSeleccionadoWpp.dueno}`);
}

function renderStaffTodo() {
  renderStaffProductos();
  renderCarrito();
  renderStaffAgenda();
  renderStaffPacientes();
  renderStaffCrm();
}

// ==================== INICIO ====================
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  renderCatalogoCliente();
});