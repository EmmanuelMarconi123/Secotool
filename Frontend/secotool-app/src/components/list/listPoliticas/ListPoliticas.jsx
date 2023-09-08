import styles from "./ListPoliticas.module.css";

const ListPoliticas = ({ policies }) => {
  // const mockPoliticas = [
  //   {
  //     id: 1,
  //     name: "Cancelación estricta",
  //     description:
  //       "Ante la cancelación del alquiler de un producto por parte del usuario, se descontará el 15% del valor del alquiler.  ",
  //   },
  //   {
  //     id: 2,
  //     name: "Garantía",
  //     description:
  //       "Se solicitará enviar foto del frente y dorso del DNI al momento de retirar el producto alquilado. ",
  //   },
  //   {
  //     id: 3,
  //     name: "Tarifas y Pagos",
  //     description:
  //       "Nuestra política de tarifas garantiza que los clientes conozcan el costo exacto del alquiler de la herramienta de construcción desde el principio. No habrá cargos ocultos ni sorpresas en la factura. El pago se realiza por adelantado y se aceptan varios métodos de pago, incluyendo tarjetas de crédito y transferencias bancarias",
  //   },
  //   {
  //     id: 4,
  //     name: "Depósito de Seguridad",
  //     description:
  //       "Para asegurar el uso responsable de nuestras herramientas, requerimos un depósito de seguridad antes del alquiler. Este depósito se reembolsará en su totalidad una vez que la herramienta sea devuelta en condiciones adecuadas. Cualquier daño o pérdida resultante del mal uso puede afectar la cantidad reembolsada.",
  //   },
  //   {
  //     id: 5,
  //     name: "Mantenimiento Post-Alquiler",
  //     description:
  //       "Esperamos que los clientes devuelvan la herramienta en condiciones limpias y funcionales. Si la herramienta se devuelve en mal estado o requiere una limpieza profunda, nos reservamos el derecho de aplicar cargos adicionales. Realizamos inspecciones exhaustivas después de cada alquiler para garantizar su calidad.",
  //   },
  //   {
  //     id: 6,
  //     name: "Seguro de Cobertura Amplia",
  //     description:
  //       "Ofrecemos un seguro opcional que cubre daños accidentales, pérdida y robo de la herramienta alquilada. Los clientes pueden optar por esta cobertura adicional para tener tranquilidad durante el uso. Es importante revisar los términos y condiciones del seguro para comprender plenamente qué situaciones están cubiertas.",
  //   },
  // ];

  return (
    <ul className={styles.listPoliticas}>
      {policies.map((politica) => (
        <li key={politica.id}>
          <h5>{politica.title}</h5>
          <p className="font-sm">{politica.description}</p>
        </li>
      ))}
    </ul>
  );
};
export default ListPoliticas;
