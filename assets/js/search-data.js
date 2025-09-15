// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of projects I worked on.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "For my complete CV, download the pdf.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-geometry-in-deep-learning-a-primer-on-groups-and-representations",
      
        title: "Geometry in Deep Learning: A Primer on Groups and Representations",
      
      description: "An introduction to the role of geometry, group theory, and representation theory in modern deep learning.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/geometry-in-deep-learning/";
        
      },
    },{id: "news-happy-new-year-champagne",
          title: 'Happy New Year! :champagne:',
          description: "",
          section: "News",},{id: "news-the-day-i-published-this-site-sparkles-smile",
          title: 'The day I published this site! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "news-new-research-project-post-for-lean-reinforcement",
          title: 'New research project post for Lean Reinforcement.',
          description: "",
          section: "News",},{id: "news-new-blog-post-about-geometry-in-deep-learning",
          title: 'New blog post about Geometry in Deep Learning.',
          description: "",
          section: "News",},{id: "projects-automated-political-information-assistant",
          title: 'Automated Political Information Assistant',
          description: "An AI-powered tool to automate the processing of political information from the Dutch House of Representatives.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1-tk-search/";
            },},{id: "projects-lean-reinforcement",
          title: 'Lean Reinforcement',
          description: "A work-in-progress research project applying Reinforcement Learning to automated theorem proving in the Lean mathematical language.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2-lean-reinforcement/";
            },},{id: "projects-geometric-erwin-model",
          title: 'Geometric Erwin Model',
          description: "A research project focused on developing a novel geometric deep learning model for 3D point cloud processing.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3-geo-erwin/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%67%65%72%62%65%6E%6E%6B%6F%6F%70%6D%61%6E@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/GerbenKoopman", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/gerben-koopman", "_blank");
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
