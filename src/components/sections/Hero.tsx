import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";

const Hero = () => {
  return (
    <section className={`relative mx-auto h-screen min-h-[640px] w-full overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[88px] sm:top-[120px] z-10 mx-auto max-w-7xl ${styles.paddingX} flex flex-row items-start gap-5 pointer-events-none`}
      >
        <div className="mt-5 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-[#22d3ee]" />
          <div className="violet-gradient h-28 w-1 sm:h-80" />
        </div>

        <div className="pointer-events-auto max-w-[min(100%,28rem)]">
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#22d3ee]">{config.hero.name}</span>
          </h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={config.html.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#22d3ee] px-4 py-2.5 text-sm font-semibold text-[#042f2e] shadow-md"
            >
              Telegram {config.html.telegramHandle}
            </a>
            <a
              href={`mailto:${config.html.email}`}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white backdrop-blur"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      <ComputersCanvas />

      <div className="xs:bottom-10 absolute bottom-8 z-10 flex w-full items-center justify-center pb-[env(safe-area-inset-bottom)]">
        <a href="#about" aria-label="Scroll to about">
          <div className="border-secondary flex h-[54px] w-[32px] items-start justify-center rounded-3xl border-4 p-2 sm:h-[64px] sm:w-[35px]">
            <motion.div
              animate={{
                y: [0, 18, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
