//import ListCaracteristicas from "../../list/ListCaracteristicas";
//import ListPoliticas from "../../list/listPoliticas/ListPoliticas";
import styles from "./Resume.module.css";

const Resume = () => {
    return(
      <div className={styles.sectionResume}>
        <h4>Detalles del producto</h4>
        <div className={styles.boxDescription}>
          <h5 className={styles.h5}>Descripción</h5>
          <p className={styles.p}>
            Lorem ipsum dolor sit amet consectetur. Vitae eu viverra tristique
            elit potenti non. Nec fames risus at tristique amet pellentesque
            faucibus pellentesque. Habitasse ultrices eros duis hac tortor amet
            interdum nec turpis at purus pellentesque bibendum.
          </p>
        </div>
        <div>
          <h5 className={styles.h5}>Características</h5>
          {/*data.productFeatures ? (
                  <ListCaracteristicas
                    caracteris={data.productFeatures}
                  ></ListCaracteristicas>
                ) : (
                  <p className="font-sm">
                    El producto no posee características.
                  </p>
                )*/}
        </div>
        <div>
          <h5 className={styles.h5}>Políticas</h5>
          {/*<ListPoliticas policies={policies} />*/}
        </div>
      </div>
    );
};
export default Resume;