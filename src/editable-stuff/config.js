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
  message: " Passionate about changing the world with technology. ",
  icons: [
    {
      image: "fa-github",
      url: "https://github.com/jiggyjigsj",
    },
    {
      image: "fa-facebook",
      url: "https://www.facebook.com/jiggyjigsj",
    },
    {
      image: "fa-instagram",
      url: "https://www.instagram.com/jiggyjigsj/",
    },
    {
      image: "fa-linkedin",
      url: "https://www.linkedin.com/in/jiggyjigsj/",
    },
    {
      image: "fa-file",
      url: "https://nextcloud.jiggyjigs.me/s/s7TSqZdGPz282Gm",
    },
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
  message:
    "Jigar Patel has extensive experience in Agile methodology and best practices, resulting in successful project management with high team velocity and on-time delivery. They closely monitor progress, risks, and blockers to prioritize high sprint completion rates and allocate resources effectively. In addition, he mentors teams, and facilitates knowledge sharing while ensuring customer satisfaction through transparent communication.",
  message2:
    "His expertise includes developing and maintaining Kubernetes infrastructure in a multi-cloud environment utilizing GCP (GKE, CloudArmor, VPCs, Subnets) and AWS (EC2, S3, R53, IAM, Cognito), automating IAM and Access Management using Terraform and AWS Terraform Provider, troubleshooting complex networking, software, and configuration issues, and providing support for production incidents. He also evaluates emerging technologies and design improved architectures utilizing OpenStack, Docker, and Terraform for enhanced client solutions.",
  message3: "Throughout his career, he has overseen weekly patching of over 200 Kubernetes clusters spanning Department of Defense, Veterans Affairs, and on-premises environments, streamlined patching operations and processes to minimize downtime, and ensured high availability of clusters. They have also executed migrations, upgrades, installations, and configurations from development to production environments.",
    resume: "https://nextcloud.jiggyjigs.me/s/jigar-resume",
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]
const repos = {
  show: true,
  heading: "Recent Projects",
  gitHubUsername: "jiggyjigsj", //i.e."johnDoe12Gh"
  reposLength: 2,
  specificRepos: [],
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
    { name: "CloudFormation", value: 65 },
    { name: "Ansible", value: 65 },
    { name: "Ruby", value: 70 },
    { name: "Python", value: 60 },
    { name: "Terraform", value: 95 },
    { name: "Bash", value: 95 },
    { name: "Networking", value: 90 },
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
    "I'm currently looking for full-time Senior DevOps opportunities! If you have any positions available,  questions, or just want to say hi, please feel free to email me at",
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
