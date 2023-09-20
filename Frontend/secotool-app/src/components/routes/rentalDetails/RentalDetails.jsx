import { useMediaQuery } from "@react-hook/media-query";
import styles from "./RentalDetails.module.css";
import { Rate, Steps } from "rsuite";
import { Link } from "react-router-dom";
import Resume from "../resume/Resume";
import { useState } from "react";
import PersonalInfo from "../personalInfo/PersonalInfo";
import Confirm from "../confirm/Confirm";

const RentalDetails = () => {
  const isScreenSmall = useMediaQuery("(max-width: 767px)");
  const [currentStep, setCurrentStep] = useState(0);

  const handleCurrent = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleCurrentPrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <section className={styles.sectionRentalDetails}>
      <div className={styles.headRentalDetails}>
        <h3>Solicitud de Alquiler</h3>
        {isScreenSmall ? (
          <Steps current={currentStep} className={styles.steps}>
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
          </Steps>
        ) : (
          <Steps current={currentStep} className={styles.steps}>
            <Steps.Item title="Resumen" />
            <Steps.Item title="Tus datos" />
            <Steps.Item title="Confirmación" />
          </Steps>
        )}
      </div>
      <div className={styles.boxSolicitud}>
        <div className={styles.boxEnd}>
          <div className={styles.cardProductDetails}>
            <img src="../src/assets/img/taladro-1.png"></img>
            <h3>
              {/*{product.name}*/}
              Taladro Percutor atornillador Bosch Professional GSB 550 RE Caja
              de cartón - Azul - 220V
            </h3>
            <div className={styles.boxScore}>
              <span>4.5{/*{product.averageScore}*/}</span>
              <Rate
                readOnly
                allowHalf
                max={5}
                defaultValue={4.5 /*product.averageScore*/}
                size="xs"
              />
            </div>
            <hr />
            <div className={styles.boxDates}>
              <div>
                <div>
                  <span>Desde</span>
                </div>
                <div>
                  <i className="fa-regular fa-calendar"></i>
                  <span> 30/08/2023</span>
                </div>
              </div>
              <div>
                <div>
                  <span>Hasta</span>
                </div>
                <div>
                  <i className="fa-regular fa-calendar"></i>
                  <span> 30/08/2023</span>
                </div>
              </div>
            </div>
          </div>
          {currentStep !== 2 ? (
            <div className={styles.boxPriceDetails}>
              <h4>Detalles del precio</h4>
              <div className="d-flex jc-space-bw">
                <span>Alquiler de herramienta</span>
                <span>$7500</span>
              </div>
              <div>
                <span>$7500</span>
                <span> x 1 dia</span>
              </div>
              <hr />
              <div className="d-flex jc-space-bw font-bold">
                <span>Total</span>
                <span>$7500</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {currentStep === 0 ? (
          <Resume className={styles.boxResume} />
        ) : currentStep === 1 ? (
          <PersonalInfo className={styles.boxPersonalInfo}></PersonalInfo>
        ) : (
          <div>
            <Confirm />
            <div className={styles.boxPriceDetails}>
              <h4>Detalles del precio</h4>
              <div className="d-flex jc-space-bw">
                <span>Alquiler de herramienta</span>
                <span>$7500</span>
              </div>
              <div>
                <span>$7500</span>
                <span> x 1 dia</span>
              </div>
              <hr />
              <div className="d-flex jc-space-bw font-bold">
                <span>Total</span>
                <span>$7500</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.boxButtons}>
        <Link className={styles.btnCta} onClick={() => handleCurrent()}>
          {currentStep === 2 ? "Confirmar alquiler" : "Continuar"}
        </Link>
        <Link
          className={styles.btnSecondary}
          onClick={() => handleCurrentPrev()}
        >
          Volver un paso anterior
        </Link>
      </div>
    </section>
  );
};
export default RentalDetails;
