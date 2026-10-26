import { motion } from "framer-motion";

import { styles } from "../constants/styles";
import { staggerContainer } from "../utils/motion";

interface Props {
  Component: React.ElementType;
  idName: string;
}

const SectionWrapper = (
  Component: Props["Component"],
  idName: Props["idName"]
) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer(0.1, 0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className={`${styles.padding} relative z-0 mx-auto max-w-7xl overflow-x-clip`}
        id={idName}
      >
        <span className="hash-span">&nbsp;</span>

        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
