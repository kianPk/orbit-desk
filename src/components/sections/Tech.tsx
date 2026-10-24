import { useEffect, useState } from "react";
import { BallCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-10">
      {technologies.map((technology) => (
        <div
          className="flex h-16 w-16 flex-col items-center justify-center sm:h-28 sm:w-28"
          key={technology.name}
        >
          {isMobile ? (
            <img
              src={technology.icon}
              alt={technology.name}
              className="h-12 w-12 object-contain"
              loading="lazy"
            />
          ) : (
            <BallCanvas icon={technology.icon} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
