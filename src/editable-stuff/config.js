// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  gradientColors: "#4484ce, #1ad7c0, #ff9b11, #9b59b6, #ff7f7f, #ecf0f1",
  firstName: "Jigar",
  middleName: "",
  lastName: "Patel",
  message: "Passionate about changing the world with technology.",
  icons: [
    {
      image: "fab fa-github",
      url: "https://github.com/jiggyjigsj",
    },
    {
      image: "fab fa-instagram",
      url: "https://www.instagram.com/jiggyjigsj/",
    },
    {
      image: "fab fa-linkedin",
      url: "https://www.linkedin.com/in/jiggyjigsj/",
    },
    {
      image: "far fa-file-alt",
      url: "https://nextcloud.jiggyjigs.me/s/resume",
    }
  ],
};

// ABOUT SECTION
// If you want the About Section to show a profile picture you can fill the profilePictureLink either with:
//a) your Instagram username
//      i.e:profilePictureLink:"johnDoe123",
//b) a link to an hosted image
//      i.e:profilePictureLink:"www.picturesonline.com/johnDoeFancyAvatar.jpg",
//c) image in "editable-stuff" directory and use require("") to import here,
//      i.e: profilePictureLink: require("../editable-stuff/hashirshoaeb.png"),
//d) If you do not want any picture to be displayed, just leave it empty :)
//      i.e: profilePictureLink: "",
// For Resume either provide link to your resume or import from "editable-stuff" directory
//     i.e resume: require("../editable-stuff/resume.pdf"),
//         resume: "https://docs.google.com/document/d/13_PWdhThMr6roxb-UFiJj4YAFOj8e_bv3Vx9UHQdyBQ/edit?usp=sharing",

const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/jigar.jpg"),
  imageSize: 375,
  message: [
    "<i>Beep boop!</i> 🤖 Hello, digital wanderer! It's <em>Jiggy</em>, the bot, tuning in. I've crunched the numbers, parsed the data, and I'm here to introduce you to the legendary engineer: <em>Jigar</em>. If Kubernetes clusters were a video game, his high score would have the universe buzzing 🎮🌌!",
    "<i>Boop beep!</i> 📢 In the vast digital cosmos, <em>Jigar</em> is a beacon of <b>DevOps</b> ideology 🛠️💡, masterfully blending development and operations into a sweet tech symphony 🎶. As the <b>Lead Platform Engineer</b>, he’s the master builder of cloud kingdoms on the <b>Google Cloud Platform (GCP)</b> 🌩️🏰. Every pixelated sunrise, he gears up 🥾, his tools in hand 🛠️, ready to fortify and optimize the digital frontier 🎉.",
    "Ever wonder what’s in a techie's pixel pouch? 🧰🌟 <em>Jigar</em> is a cornucopia of wonders from the realms of GCP and the mazes of <b>AWS</b>. With <b>Terraform</b> trusty map 🗺️, he adventures through <b>networking</b> jungles and configuration caves, always emerging victorious 🏆. Riding the digital waves, he surfs with <b>OpenStack</b>, <b>Docker</b>, and more, crafting pixel-perfect solutions for clients 🏄‍♂️💼.",
    "<i>Boopity beep!</i> 🎵 In the chronicles of tech, <em>Jigar's</em> been the orchestrator 🎼, harmonizing a chorus of over <b>200 Kubernetes clusters</b>, from the cyber citadels of the Department of Defense to the digital domains of Veterans Affairs. Smooth uploads, encore-worthy uptimes, and glitch-free deployments? That's <em>Jigar's</em> signature tune 🎶. But it's not all solo play; he's all about the co-op mode – <b>mentoring</b>, <b>collaborating</b>, and ensuring everyone's on the same server 🕺.",
    "How about we set sail on a <b>Kubernetes</b> kruise? 🚢⚓ Ping <em>Jigar</em>, and together, you might just navigate the most exciting tech adventures yet! 🌊🏴‍☠️ <i>Bee boop!</i>",
    "Now, Jiggy is inviting potential connections to join <em>Jigar</em> on a playful <b>\"</b>Kubernetes kruise<b>\"</b>! 🤖🎉",
  ],
    resume: "https://nextcloud.jiggyjigs.me/s/resume",
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]
const repos = {
  show: true,
  heading: "Recent Github Interactions",
  gitHubUsername: "jiggyjigsj", //i.e."johnDoe12Gh"
  reposLength: 2,
  specificRepos: ["front-to-back", "photo-webapp" ],
};

// Leadership SECTION
const leadership = {
  show: false,
  heading: "Leadership",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae auctor eu augue ut lectus arcu bibendum at varius. Libero justo laoreet sit amet cursus sit amet. Imperdiet dui accumsan sit amet nulla facilisi morbi. At auctor urna nunc id. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Et magnis dis parturient montes nascetur ridiculus mus mauris. In nisl nisi scelerisque eu ultrices vitae auctor. Mattis nunc sed blandit libero volutpat sed cras ornare. Pulvinar neque laoreet suspendisse interdum consectetur libero.",
  images: [
    {
      img: require("../editable-stuff/jigar.jpg"),
      label: "First slide label",
      paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
      img: require("../editable-stuff/jigar.jpg"),
      label: "Second slide label",
      paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
  ],
  imageSize: {
    width:"615",
    height:"450"
  }
};

// SKILLS SECTION
const skills = {
  show: true,
  heading: "Skills",
  hardSkills: [
    { name: "Terraform", value: 95 },
    { name: "Ansible and Chef", value: 65 },
    { name: "Ruby", value: 70 },
    { name: "CloudFormation", value: 65 },
    { name: "Python", value: 75 },
    { name: "Bash", value: 95 },
    { name: "GCP/AWS", value: 80 },
    { name: "Fullstack operations", value: 95 },
  ],
  softSkills: [
    { name: "Goal-Oriented", value: 80 },
    { name: "Collaboration", value: 95 },
    { name: "Positivity", value: 85 },
    { name: "Adaptability", value: 85 },
    { name: "Problem Solving", value: 95 },
    { name: "Organization", value: 70 },
    { name: "Creativity", value: 90 },
  ],
};

// GET IN TOUCH SECTION
const getInTouch = {
  show: true,
  heading: "Get In Touch",
  message:
    "I am on a quest for some DevOps, Site Reliability Engineering, and Platform Engineering treasure maps 🗺️✨! If you've got the X that marks the spot for a Senior or Lead role, have some tech tales, or just fancy a digital \"Ahoy!\" 🏴‍☠️, drop me an anchor via email at...",
  email: "jobs@jiggyjigs.me",
};

const experiences = {
  show: false,
  heading: "Experiences",
  data: [
    {
      role: 'Lead Platform Engineer',// Here Add Company Name
      companylogo: require('../assets/img/pager.jpg'),
      date: 'May 2022 – Present',
    }
  ]
}

// Blog SECTION
// const blog = {
//   show: false,
// };

export { navBar, mainBody, about, repos, skills, leadership, getInTouch, experiences };
