import { motion } from "framer-motion";

import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";
import { fadeIn, floatY, staggerContainer, textVariant } from "../../utils/motion";

const Hero = () => {
  return (
    <section className="hero-stage relative mx-auto h-[100svh] min-h-[640px] w-full overflow-hidden sm:h-screen">
      {/* Ambient animated atmosphere */}
      <div className="hero-orbs pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <span className="hero-orb hero-orb--a" />
        <span className="hero-orb hero-orb--b" />
        <span className="hero-orb hero-orb--c" />
        <div className="hero-grid" />
        <div className="hero-vignette" />
      </div>

      <motion.div
        variants={staggerContainer(0.14, 0.15)}
        initial="hidden"
        animate="show"
        className={`absolute inset-0 top-[78px] z-10 mx-auto flex max-w-7xl flex-row items-start gap-4 sm:top-[110px] sm:gap-5 ${styles.paddingX} pointer-events-none`}
      >
        <motion.div
          variants={fadeIn("down", "spring", 0.1, 0.8)}
          className="mt-4 flex flex-col items-center justify-center sm:mt-5"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(34,211,238,0.55)",
                "0 0 0 12px rgba(34,211,238,0)",
                "0 0 0 0 rgba(34,211,238,0.55)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="h-4 w-4 rounded-full bg-[#22d3ee] sm:h-5 sm:w-5"
          />
          <div className="violet-gradient h-24 w-1 sm:h-80" />
        </motion.div>

        <div className="pointer-events-auto max-w-[min(100%,30rem)]">
          <motion.p
            variants={textVariant(0.05)}
            className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#22d3ee]/90 sm:text-xs"
          >
            Orbit Desk
          </motion.p>
          <motion.h1
            variants={textVariant(0.15)}
            className={`${styles.heroHeadText} text-white !text-[34px] !leading-[1.15] xs:!text-[46px] sm:!text-[58px] lg:!text-[78px]`}
          >
            Hi, I'm{" "}
            <span className="hero-name-glow text-[#22d3ee]">{config.hero.name}</span>
          </motion.h1>
          <motion.p
            variants={textVariant(0.3)}
            className={`${styles.heroSubText} text-white-100 mt-2 !text-[14px] !leading-snug sm:!text-[22px] lg:!text-[28px]`}
          >
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </motion.p>

          <motion.div
            variants={fadeIn("up", "spring", 0.45, 0.7)}
            className="mt-5 flex flex-wrap gap-3"
          >
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={config.html.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-primary rounded-xl bg-[#22d3ee] px-4 py-2.5 text-sm font-semibold text-[#042f2e] shadow-md"
            >
              Telegram {config.html.telegramHandle}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${config.html.email}`}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:border-[#22d3ee]/50 hover:bg-white/10"
            >
              Email
            </motion.a>
          </motion.div>

          <motion.p
            variants={fadeIn("up", "tween", 0.7, 0.6)}
            className="mt-4 hidden text-[12px] text-white/45 sm:block"
          >
            Drag the desk to orbit · scroll to explore
          </motion.p>
          <motion.p
            variants={fadeIn("up", "tween", 0.7, 0.6)}
            className="mt-3 text-[11px] text-white/40 sm:hidden"
          >
            Desk auto-orbits · swipe up to explore
          </motion.p>
        </div>
      </motion.div>

      <ComputersCanvas />

      <motion.div
        variants={floatY(8, 2.2)}
        initial="hidden"
        animate="show"
        className="absolute bottom-7 z-10 flex w-full items-center justify-center pb-[env(safe-area-inset-bottom)] xs:bottom-10"
      >
        <a href="#about" aria-label="Scroll to about" className="group">
          <div className="border-secondary/80 group-hover:border-[#22d3ee] flex h-[54px] w-[32px] items-start justify-center rounded-3xl border-4 p-2 transition sm:h-[64px] sm:w-[35px]">
            <motion.div
              animate={{ y: [0, 18, 0], opacity: [1, 0.45, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary group-hover:bg-[#22d3ee] mb-1 h-2.5 w-2.5 rounded-full transition sm:h-3 sm:w-3"
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
