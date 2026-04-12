// ── Resume data for Akash Pillai ─────────────────────────────────────────────

export const personalInfo = {
  name: "Akash Pillai",
  title: "Data Scientist & AI Engineer",
  tagline: "Building intelligent systems at the edge of AI and software engineering.",
  email: "akash.pillai.0810@gmail.com",
  phone: "(979) 739-9310",
  location: "College Station, TX",
  github: "https://github.com/akash-pillai-n",
  linkedin: "https://www.linkedin.com/in/akash-pillai-n/",
};

export const skills = {
  languages: [
    "Python",
    "Java",
    "JavaScript",
    "Node.js",
    "React",
    "Angular",
    "SQL",
    "HTML",
    "CSS",
    "Stata",
  ],
  technologies: [
    "Azure",
    "Kubernetes",
    "Docker",
    "Ubuntu/Linux",
    "webMethods",
    "Hadoop",
    "Pandas",
    "NumPy",
    "PyTorch",
    "TensorFlow",
    "Snowflake",
    "BigQuery",
    "LLMs",
    "RAGs",
    "AI Agents",
    "MCPs",
    "MLOps",
    "AgentOps",
    "AWS",
    "Microsoft Office",
  ],
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
  color: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Texas A&M Institute of Data Science",
    role: "Student Assistant – Operational Data Science Lab",
    location: "College Station, TX",
    period: "Apr 2025 – Present",
    current: true,
    color: "#00b4ff",
    bullets: [
      "Developing models to predict hurricane impact in Texas using FEMA datasets and real-time Twitter data.",
      "Building a computer vision data pipeline for early prediction of Bovine Respiratory Disease (BRD) in beef cattle using behavior monitoring and video analysis.",
    ],
  },
  {
    company: "Xebia Product Engineering",
    role: "Associate Software Engineer",
    location: "Hyderabad, India",
    period: "Jul 2023 – Jul 2024",
    current: false,
    color: "#2979ff",
    bullets: [
      "Built Flow Services to integrate insurance APIs, boosting data-flow efficiency by 25%. Simplified migration and translation processes using Connectors for cross-system communication.",
      "Directed management of containerized environments using Docker and Kubernetes with automatic resource allocation, reducing hardware usage by 60%.",
      "Coordinated with CICD team to automate deployment pipelines on Azure, ensuring scalable infrastructure and reducing bugs by 30%.",
    ],
  },
  {
    company: "coMakeIT (part of Xebia)",
    role: "Engineer Trainee",
    location: "Hyderabad, India",
    period: "Aug 2022 – Jun 2023",
    current: false,
    color: "#1a56db",
    bullets: [
      "Implemented a headless architecture website for the Developer Portal, utilized by 120+ developers weekly for API management and centralized access.",
      "Partnered with senior members to orchestrate creation of 10+ BPM flows, enhancing process clarity across 6 teams including DevOps and UI.",
      "Interacted with clients, addressed product requirements, and efficiently resolved bugs for multiple web applications.",
    ],
  },
];

export type ProjectItem = {
  id: number;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  tech: string[];
  color: string;
  image: string;
  link?: string;
};

export const projects: ProjectItem[] = [
  {
    id: 1,
    name: "CurateX",
    shortName: "CurateX",
    description: "Multi-Source AI Content Creator",
    longDescription:
      "MCP server that automates content generation—from trend mining to script, voice, and video—using Reddit, YouTube, News and OpenRouter LLMs integrated with ElevenLabs and D-ID.",
    tech: ["MCP", "LLMs", "ElevenLabs", "D-ID", "OpenRouter", "Reddit API"],
    color: "#00b4ff",
    image: "/images/curatex.jpg",
    link: "https://github.com/akash-pillai-n/Content-Idea",
  },
  {
    id: 2,
    name: "NimbusNews",
    shortName: "NimbusNews",
    description: "AI Weather Reporter",
    longDescription:
      "Transforms weather charts into video summaries using Llama 3.2 Vision, Llama 3.1 70B, Deepgram AI, Wav2Lip, and AWS/Cloudflare.",
    tech: ["Llama 3.2", "Deepgram", "Wav2Lip", "AWS S3", "AWS Bedrock"],
    color: "#2979ff",
    image: "/images/nimbusnews.jpg",
    link: "https://github.com/akash-pillai-n/WeatherMan",
  },
  {
    id: 3,
    name: "Phoenix",
    shortName: "Phoenix",
    description: "AI-Driven Productivity & Quest System",
    longDescription:
      "Productivity engine that transforms Gmail and Calendar events into quests using AWS Bedrock (Claude Sonnet), with agents for planning, XP tracking, and personalized guidance.",
    tech: ["AWS Bedrock", "Claude Sonnet", "Gmail API", "Google Calendar", "AI Agents"],
    color: "#1a56db",
    image: "/images/phoenix.jpg",
    link: "https://github.com/akash-pillai-n/Phoenix",
  },
  {
    id: 4,
    name: "Dr. Quick",
    shortName: "Dr. Quick",
    description: "AI Patient Intake System",
    longDescription:
      "AI-powered tool using Streamlit, Groq, AWS, and Deepgram to automate patient intake, reduce wait times, and sync records via Notion API.",
    tech: ["Streamlit", "Groq", "AWS", "Deepgram", "Notion API"],
    color: "#00e5ff",
    image: "/images/drquick.jpg",
    link: "https://github.com/akash-pillai-n/Responder",
  },
  {
    id: 5,
    name: "Alzheimer's Detection",
    shortName: "AlzDetect",
    description: "Early ML Detection via Blood Biomarkers",
    longDescription:
      "Leveraged support vector machines to build multivariable models for Alzheimer's detection by analyzing patterns in Amyloid-based biomarkers from blood plasma proteins.",
    tech: ["Python", "SVM", "Scikit-learn", "Pandas", "NumPy"],
    color: "#5c6bc0",
    image: "/images/alzheimers.jpg",
  },
  {
    id: 6,
    name: "FaceAttend",
    shortName: "FaceAttend",
    description: "AI Face Recognition Attendance Tool",
    longDescription:
      "Computer vision-based attendance tool deploying Dlib's CNN-based face detector, achieving high accuracy in low-light environments with minimal training data.",
    tech: ["Python", "Dlib", "CNN", "OpenCV", "Face Recognition"],
    color: "#0077cc",
    image: "/images/faceattend.jpg",
    link: "https://github.com/akash-pillai-n/AI-face-recog-and-attend",
  },
];

export type EducationItem = {
  institution: string;
  degree: string;
  location: string;
  period: string;
  highlight: string;
  color: string;
};

export const education: EducationItem[] = [
  {
    institution: "Texas A&M University",
    degree: "Master of Science in Data Science",
    location: "College Station, TX",
    period: "Aug 2024 – May 2026",
    highlight: "Focusing on AI systems, machine learning, and operational data science.",
    color: "#00b4ff",
  },
  {
    institution: "CMR Institute of Technology",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    location: "Hyderabad, India",
    period: "Aug 2019 – Jul 2023",
    highlight: "Strong foundation in algorithms, distributed systems, and software engineering.",
    color: "#2979ff",
  },
];

export type AchievementItem = {
  title: string;
  event: string;
  venue: string;
  description: string;
  color: string;
  icon: "trophy" | "medal" | "star" | "award" | "zap";
};

export const achievements: AchievementItem[] = [
  {
    title: "1st Place – MCP Challenge\n2nd Place – Dashboard Challenge",
    event: "TAMU Datathon 2025",
    venue: "Texas A&M University",
    description:
      "Won dual placements demonstrating rapid prototyping, creative thinking, and data-driven problem solving.",
    color: "#00b4ff",
    icon: "trophy",
  },
  {
    title: "Mentor & Judge",
    event: "HackMIT25",
    venue: "Massachusetts Institute of Technology",
    description:
      "Selected as mentor and judge, contributing technical guidance and evaluation at one of the world's leading undergrad hackathons.",
    color: "#2979ff",
    icon: "star",
  },
  {
    title: "Grand Prize Winner",
    event: "Build4Good Hackathon",
    venue: "Texas A&M University",
    description:
      "Won the Grand Prize at a fast-paced 8-hour hackathon by developing an impactful social good solution.",
    color: "#1a56db",
    icon: "award",
  },
  {
    title: "Best DevPost Submission\n2nd Place – AWS Challenge",
    event: "TAMUHack2025",
    venue: "Texas A&M University",
    description:
      "Secured dual awards at a 24-hour hackathon through a high-impact, collaborative AWS-powered project.",
    color: "#00e5ff",
    icon: "zap",
  },
  {
    title: "3rd Place",
    event: "Devjam Hackathon",
    venue: "CMR Institute of Technology",
    description:
      "Led a team of 4, securing 3rd place in an overnight hackathon through strong teamwork and innovation.",
    color: "#5c6bc0",
    icon: "medal",
  },
];
