type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
    telegram: string;
    telegramHandle: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Kian Zarandi — Orbit Desk",
    fullName: "Kian Zarandi",
    email: "kianzarandi701@gmail.com",
    telegram: "https://t.me/Kian_asli",
    telegramHandle: "@Kian_asli",
  },
  hero: {
    name: "Kian",
    p: ["I ship Solidity protocols, Rust services,", "Go gateways & product UIs"],
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Overview.",
      content: `I'm a builder across Solidity protocol labs, Rust systems, Go
      gateways, Flutter apps, and Vue/Node product surfaces. I ship live
      demos, keep the stack practical, and care about defensive security
      edges. Based in Iran · freelance via zyrax.ir — ping me on Telegram
      @Kian_asli.`,
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
    },
    feedbacks: {
      p: "What others say",
      h2: "Testimonials.",
    },
    works: {
      p: "My work",
      h2: "Projects.",
      content: `Flagship labs and product surfaces — each with a live demo.
    From perpetual clearing and ERC-4626 vaults to Rust load forges and
    Go gateways. Click through to the repos and Pages demos.`,
    },
  },
};
