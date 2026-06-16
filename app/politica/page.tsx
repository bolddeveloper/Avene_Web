"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function PoliticasPrivacidadPage() {
  return (
    <>
      <Header />

      <main className="bg-[#f9f9f9] pt-[95px] px-4 pb-16 min-h-screen">
        <article className="mx-auto max-w-3xl bg-white rounded-2xl shadow-sm p-6 md:p-10 prose prose-slate">
          <h1>Política de Privacidad</h1>
          <p className="text-sm text-gray-500">
            Última actualización: <strong>10/09/2025</strong>
          </p>

          <h2>1. ¿Quiénes somos?</h2>
          <p>
            Somos <strong>Avéne</strong> (“nosotros” o “la
            Compañía”), con domicilio en <strong>[Dirección]</strong>. Si
            tienes dudas sobre esta política, escríbenos a{" "}
            <a href="mailto:[eauthermalavene.guatemala@gmail.com]">eauthermalavene.guatemala@gmail.com</a>.
          </p>

          <h2>2. Datos que recopilamos</h2>
          <ul>
            <li>
              <strong>Datos de contacto:</strong> nombre, correo electrónico,
              teléfono.
            </li>
            <li>
              <strong>Datos de navegación:</strong> dirección IP, tipo de
              dispositivo, páginas visitadas, tiempo de visita, cookies y
              tecnologías similares.
            </li>
            <li>
              <strong>Datos de formularios o compras:</strong> mensajes,
              preferencias, dirección de envío y facturación (si aplica).
            </li>
          </ul>

          <h2>3. ¿Para qué usamos tus datos?</h2>
          <ul>
            <li>Responder consultas y brindar soporte.</li>
            <li>Procesar pedidos, pagos y envíos (si aplica).</li>
            <li>
              Mejorar el sitio, la experiencia de usuario y realizar analítica.
            </li>
            <li>
              Enviar comunicaciones comerciales con tu consentimiento
              (podrás darte de baja en cualquier momento).
            </li>
            <li>Cumplir obligaciones legales y de seguridad.</li>
          </ul>

          <h2>4. Base legal</h2>
          <ul>
            <li><strong>Consentimiento</strong> (formularios y boletines).</li>
            <li>
              <strong>Ejecución de un contrato</strong> (ventas/servicios).
            </li>
            <li>
              <strong>Interés legítimo</strong> (mejoras y seguridad del sitio).
            </li>
            <li><strong>Obligación legal</strong> (facturación, fiscal).</li>
          </ul>

          <h2>5. Cookies y tecnologías similares</h2>
          <p>
            Usamos cookies propias y de terceros (p. ej., analítica y
            marketing). Puedes gestionar o desactivar cookies desde tu
            navegador. Consulta nuestra{" "}
            <a href="/politicas/cookies">Política de Cookies</a> para más
            detalle.
          </p>

          <h2>6. Compartición de datos</h2>
          <p>
            Podemos compartir datos con proveedores que nos prestan servicios
            (hosting, analítica, pasarelas de pago, mensajería, soporte), bajo
            contratos que protegen tu información. No vendemos tus datos.
          </p>

          <h2>7. Transferencias internacionales</h2>
          <p>
            Si nuestros proveedores procesan datos fuera de tu país,
            implementamos salvaguardas adecuadas (cláusulas contractuales
            estándar u otros mecanismos reconocidos).
          </p>

          <h2>8. Conservación</h2>
          <p>
            Conservamos tus datos el tiempo necesario para los fines
            indicados y según plazos legales aplicables. Luego, se
            eliminarán o anonimizarán de forma segura.
          </p>

          <h2>9. Tus derechos</h2>
          <ul>
            <li>Acceder a tus datos y obtener copia.</li>
            <li>Rectificar datos inexactos o incompletos.</li>
            <li>Solicitar la supresión (“derecho al olvido”).</li>
            <li>Oponerte o limitar el tratamiento en ciertos casos.</li>
            <li>Portabilidad de datos cuando corresponda.</li>
            <li>Retirar tu consentimiento en cualquier momento.</li>
          </ul>
          <p>
            Para ejercerlos, escríbenos a{" "}
            <a href="mailto:[correo@empresa.com]">[correo@empresa.com]</a> con
            el asunto “Derechos de Datos”.
          </p>

          <h2>10. Seguridad</h2>
          <p>
            Aplicamos medidas técnicas y organizativas razonables para
            proteger tus datos contra accesos no autorizados, pérdida o
            alteración. Ningún sistema es 100% infalible, pero trabajamos para
            mantener altos estándares.
          </p>

          <h2>11. Menores de edad</h2>
          <p>
            Nuestros servicios no están dirigidos a menores de{" "}
            <strong>[edad mínima aplicable]</strong>. Si crees que un menor nos
            proporcionó datos, contáctanos para eliminarlos.
          </p>

          <h2>12. Cambios a esta política</h2>
          <p>
            Podremos actualizar esta política para reflejar cambios legales,
            técnicos o del negocio. Publicaremos la versión vigente e indicaremos
            la fecha de actualización.
          </p>

          <h2>13. Contacto</h2>
          <p>
            <strong>[Nombre de la empresa]</strong>
            <br />
            <span>[Dirección completa]</span>
            <br />
            <a href="mailto:[correo@empresa.com]">[correo@empresa.com]</a> ·{" "}
            <span>[Teléfono]</span>
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
