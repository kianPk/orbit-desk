import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

interface IServiceCard {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<IServiceCard> = ({ index, title, icon }) => (
  <Tilt
    glareEnable
    tiltEnable
    tiltMaxAngleX={18}
    tiltMaxAngleY={18}
    glareMaxOpacity={0.35}
    glareColor="#22d3ee"
    transitionSpeed={1200}
  >
    <div className="w-full max-w-[250px] xs:w-[250px]">
      <motion.div
        variants={fadeIn("right", "spring", index * 0.2, 0.65)}
        whileHover={{ y: -6 }}
        className="green-pink-gradient shadow-card w-full rounded-[20px] p-[1px]"
      >
        <div className="bg-tertiary flex min-h-[240px] flex-col items-center justify-evenly rounded-[20px] px-10 py-5 sm:min-h-[280px] sm:px-12">
          <motion.img
            src={icon}
            alt={title}
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.2 + index * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          />

          <h3 className="text-center text-[18px] font-bold text-white sm:text-[20px]">
            {title}
          </h3>
        </div>
      </motion.div>
    </div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.about} />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary mt-4 max-w-3xl text-[15px] leading-[26px] sm:text-[17px] sm:leading-[30px]"
      >
        {config.sections.about.content}
      </motion.p>

      <div className="mt-12 flex flex-wrap justify-center gap-6 sm:mt-20 sm:justify-start sm:gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
