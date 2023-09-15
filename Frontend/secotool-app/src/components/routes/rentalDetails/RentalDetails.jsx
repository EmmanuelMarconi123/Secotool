import { useMediaQuery } from "@react-hook/media-query";
import styles from "./RentalDetails.module.css";
import { Steps } from 'rsuite';

const RentalDetails = () => {
const isScreenSmall = useMediaQuery("(max-width: 767px)");

  return (
    <section className={styles.sectionRentalDetails}>
      <div className={styles.headRentalDetails}>
        <h3>Solicitud de Alquiler</h3>
        {isScreenSmall ? <Steps current={0}>
          <Steps.Item />
          <Steps.Item />
          <Steps.Item />
        </Steps> : <Steps current={0}>
          <Steps.Item title="Resumen" />
          <Steps.Item title="Tus datos" />
          <Steps.Item title="Confirmación" />
        </Steps>}
      </div>
    </section>
  );
};
export default RentalDetails;
