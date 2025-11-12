// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "news-i-m-beginning-a-research-internship-at-epic-games-with-iain-matthews",
          title: 'I’m beginning a research internship at Epic Games with Iain Matthews',
          description: "",
          section: "News",},{id: "news-our-paper-investigating-generalization-by-controlling-normalized-margin-was-accepted-at-icml",
          title: 'Our paper Investigating Generalization by Controlling Normalized Margin was accepted at ICML',
          description: "",
          section: "News",},{id: "news-our-work-using-transformers-for-agent-control-in-video-games-was-accepted-at-the-ieee-conference-on-games-cog-humanlike-behavior-in-a-third-person-shooter-with-imitation-learning",
          title: 'Our work using transformers for agent control in video games was accepted at...',
          description: "",
          section: "News",},{id: "news-our-work-using-llm-agents-for-writing-scientific-preprocessing-code-for-biological-image-processing-was-presented-at-the-colm-lm4sci-workshop-paper",
          title: 'Our work using LLM agents for writing scientific preprocessing code for biological image...',
          description: "",
          section: "News",},{id: "projects-humanlike-behavior-in-a-third-person-shooter-with-imitation-learning",
          title: 'Humanlike Behavior in a Third-Person Shooter with Imitation Learning',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/humanlikebehavior";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%66%61%72%68%61%6E%67@%63%61%6C%74%65%63%68.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/alexfarhang", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/alexfarhang", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=FP5_7p8AAAAJ&hl", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/alex_farhang", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
