import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Términos y condiciones — Agus Martín Academy",
  description: "Condiciones de compra y uso del curso online y de la tienda de Agus Martín Academy.",
};

export default function Page() {
  return (
    <LegalPage title="Términos y condiciones.">
      <h2>1. Quién vende</h2>
      <p>{site.brand} es operado por {legal.owner}, CUIT {legal.cuit}, con domicilio en {legal.address}. Contacto: {legal.email}.</p>

      <h2>2. El curso</h2>
      <p>El curso online es un conjunto de clases grabadas organizadas en módulos. Al comprarlo obtenés acceso de por vida: podés verlo las veces que quieras mientras la academia mantenga la plataforma en funcionamiento. Si algún día la plataforma dejara de funcionar, te avisaremos con al menos 60 días de anticipación.</p>

      <h2>3. Tu cuenta es personal</h2>
      <p>Para comprar y ver el curso necesitás una cuenta con tu mail y una contraseña. La cuenta es personal e intransferible:</p>
      <ul>
        <li>Puede usarse en hasta 2 dispositivos y estar abierta en uno solo a la vez. Si iniciás sesión en otro dispositivo, la sesión anterior se cierra.</li>
        <li>No está permitido compartir la cuenta, prestar la contraseña, grabar las clases ni publicarlas o distribuirlas por ningún medio.</li>
        <li>Si detectamos un uso que no cumple estas reglas, podemos suspender o dar de baja la cuenta sin reembolso, después de avisarte por mail.</li>
      </ul>
      <p>Si cambiás de celular o computadora, escribinos y liberamos el dispositivo anterior.</p>

      <h2>4. Precio y pago</h2>
      <p>Los precios están en pesos argentinos e incluyen impuestos. El pago se procesa a través de Mercado Pago; {site.brand} no guarda los datos de tu tarjeta. El acceso al curso se habilita en tu cuenta apenas se acredita el pago.</p>

      <h2>5. Derecho de arrepentimiento</h2>
      <p>Tenés 10 días corridos desde la compra para arrepentirte sin dar explicaciones (artículo 34 de la Ley 24.240 de Defensa del Consumidor). Podés hacerlo desde el <a href="/arrepentimiento/">botón de arrepentimiento</a>. Te devolvemos el total por el mismo medio de pago y damos de baja el acceso al curso.</p>

      <h2>6. Tienda</h2>
      <p>Los productos de la tienda son físicos. Las condiciones de envío, retiro y costos se informan antes de pagar. Si un producto llega dañado o no es el que compraste, escribinos dentro de los 10 días de recibido. El derecho de arrepentimiento también aplica a estas compras: el producto tiene que volver sin usar y en su envase original.</p>

      <h2>7. Propiedad intelectual</h2>
      <p>Las clases, textos, fotos, videos y la marca {site.brand} pertenecen a {legal.owner}. La compra te da una licencia personal para ver el contenido, no para copiarlo, venderlo ni enseñarlo con este material.</p>

      <h2>8. Resultados</h2>
      <p>El curso enseña un método. El resultado depende de la práctica de cada alumno: no garantizamos un nivel de ingresos ni un resultado determinado.</p>

      <h2>9. Cambios en estas condiciones</h2>
      <p>Podemos actualizar estos términos. Los cambios no afectan las compras ya hechas y se publican en esta página con la fecha de actualización.</p>

      <h2>10. Ley aplicable y reclamos</h2>
      <p>Rigen las leyes de la República Argentina. Ante cualquier reclamo, escribinos primero a {legal.email}. También podés acudir a la <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario" target="_blank" rel="noopener noreferrer">Dirección Nacional de Defensa del Consumidor</a> o a los tribunales de tu domicilio.</p>
    </LegalPage>
  );
}
