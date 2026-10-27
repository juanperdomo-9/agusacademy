import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidad — Agus Martín Academy",
  description: "Qué datos guarda Agus Martín Academy, para qué los usa y cómo ejercer tus derechos.",
};

export default function Page() {
  return (
    <LegalPage title="Privacidad.">
      <h2>Responsable</h2>
      <p>{legal.owner}, CUIT {legal.cuit}, {legal.address}. Contacto: {legal.email}.</p>

      <h2>Qué datos guardamos</h2>
      <ul>
        <li><strong>Tu cuenta:</strong> mail y contraseña (guardada cifrada; nadie puede leerla).</li>
        <li><strong>Tus compras:</strong> qué compraste, cuándo y el número de operación de Mercado Pago. Los datos de tu tarjeta los procesa Mercado Pago; nosotros no los vemos.</li>
        <li><strong>Seguridad de la cuenta:</strong> los dispositivos desde los que entrás (tipo de equipo y navegador) y la fecha de último uso, para aplicar el límite de 2 dispositivos.</li>
        <li><strong>Tu avance en el curso:</strong> qué clases marcaste como vistas.</li>
        <li><strong>Envíos de la tienda:</strong> nombre, teléfono y dirección, solo si comprás productos con envío.</li>
      </ul>

      <h2>Para qué los usamos</h2>
      <p>Para darte acceso al curso, cobrar, enviar tus compras, proteger tu cuenta y responderte. No vendemos ni prestamos tus datos. Solo te mandamos mails sobre tu cuenta y tus compras; si en algún momento mandamos novedades, vas a poder darte de baja con un clic.</p>

      <h2>Quién más los procesa</h2>
      <p>Usamos servicios de terceros que guardan o procesan datos en nuestro nombre: Supabase (cuentas y base de datos), Render (alojamiento de la web), Mercado Pago (pagos) y YouTube (reproducción de las clases).</p>

      <h2>Datos en tu navegador</h2>
      <p>La web guarda en tu navegador un identificador del dispositivo, tu sesión y tu avance, para que no tengas que iniciar sesión cada vez. No usamos cookies de publicidad.</p>

      <h2>Tus derechos</h2>
      <p>Podés pedir ver, corregir o borrar tus datos escribiendo a {legal.email}. Te respondemos dentro de los 10 días hábiles. Si borrás tu cuenta, perdés el acceso al curso.</p>
      <p className="t-note t-soft">La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.</p>

      <p>Ver también los <a href="/terminos/">términos y condiciones</a> de {site.brand}.</p>
    </LegalPage>
  );
}
