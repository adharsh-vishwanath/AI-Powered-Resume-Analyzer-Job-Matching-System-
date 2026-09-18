import { PresetJob, PresetResume } from '../types';

export const PRESET_RESUMES: PresetResume[] = [
  {
    id: 'alex-ml',
    name: 'Alex Chen',
    title: 'Machine Learning & Python Engineer (4 Years Exp)',
    filename: 'Alex_Chen_ML_Engineer_Resume.txt',
    content: `ALEX CHEN
San Francisco, CA | alex.chen@email.com | linkedin.com/in/alexchen-dev | github.com/alexchen-ai

PROFESSIONAL SUMMARY
Results-driven Machine Learning Engineer with 4+ years of experience designing, training, and deploying predictive models and NLP pipelines into production. Proficient in Python, PyTorch, Scikit-Learn, SQL, and Docker, with a strong background in MLOps and transformer architectures.

TECHNICAL SKILLS
- Programming Languages: Python, SQL, C++, Bash
- ML/AI Frameworks: PyTorch, TensorFlow, Scikit-Learn, Hugging Face Transformers, OpenCV
- Data Processing & Storage: Pandas, NumPy, PostgreSQL, Redis, Apache Spark
- DevOps & Tools: Docker, Git, Linux, FastApi, Weights & Biases, MLflow, CI/CD
- Cloud: AWS (EC2, S3, SageMaker)

WORK EXPERIENCE
Machine Learning Engineer | Apex AI Labs | 2022 - Present
- Built and deployed an end-to-end NLP document classification pipeline using Hugging Face transformers, achieving 94.2% F1 score and reducing manual review time by 65%.
- Optimized deep learning inference latency by 42% through PyTorch quantization (ONNX Runtime) and TensorRT deployment on AWS GPU instances.
- Engineered automated data validation and continuous retraining pipelines with MLflow and Docker, processing 2.5M daily text events with 99.9% uptime.
- Collaborated with product and backend engineers to integrate FastAPI microservices with real-time vector search embeddings.

Data Science Associate | DataSphere Analytics | 2020 - 2022
- Developed predictive churn models using XGBoost and Scikit-Learn, identifying at-risk subscription customers with 83% precision and saving an estimated $320K ARR.
- Designed automated SQL queries and ETL scripts extracting gigabytes of structured behavioral data from PostgreSQL and Snowflake.
- Formulated A/B test experiments and communicated statistical findings to cross-functional stakeholders and executive leadership.

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2016 - 2020
Coursework: Machine Learning, Algorithms & Data Structures, Linear Algebra, Probability Theory, Artificial Intelligence

PROJECTS
- Semantic Search Engine: Built a cosine similarity vector search tool over 100k ArXiv papers using FAISS and Sentence Transformers.
- Automated Image Captioner: Trained a Vision Transformer (ViT) + GPT-2 model with PyTorch Lightning.`
  },
  {
    id: 'sarah-fullstack',
    name: 'Sarah Jenkins',
    title: 'Senior Full-Stack Developer (6 Years Exp)',
    filename: 'Sarah_Jenkins_FullStack_Resume.txt',
    content: `SARAH JENKINS
New York, NY | s.jenkins@example.com | github.com/sarahj-code | portfolio.sarahj.dev

SUMMARY
Passionate Full-Stack Engineer with 6 years of expertise building scalable web applications, REST/GraphQL APIs, and microservices. Specialist in React, TypeScript, Node.js, Next.js, and cloud deployments on GCP and AWS.

SKILLS
- Languages: TypeScript, JavaScript (ES6+), Python, HTML5, CSS3, SQL
- Frontend: React 18, Next.js, Redux Toolkit, Tailwind CSS, Webpack, Vite
- Backend: Node.js, Express.js, NestJS, REST APIs, GraphQL, Prisma ORM
- Databases: PostgreSQL, MongoDB, Redis
- Cloud & DevOps: AWS (Lambda, ECS, S3), Docker, GitHub Actions, Jest, Cypress

EXPERIENCE
Senior Software Engineer | FinStream Digital | 2021 - Present
- Architected high-volume financial analytics dashboard using React 18, TypeScript, and Tailwind CSS serving 150,000 active daily users with 99.95% availability.
- Built scalable Node.js microservices handling 4,000 requests/sec with Redis caching layer, decreasing average API response time from 320ms to 45ms.
- Mentored a squad of 5 junior and mid-level engineers, enforcing strict TypeScript standards and code review best practices.
- Implemented CI/CD pipelines via GitHub Actions reducing production deployment cycles from 2 hours to 8 minutes.

Full-Stack Developer | BrightWave Studios | 2018 - 2021
- Developed dynamic responsive e-commerce web applications utilizing Next.js, Express, and PostgreSQL.
- Authored comprehensive test suites with Jest and Cypress achieving 88% unit and integration test coverage.
- Integrated Stripe payment gateway and OAuth2 authentication across 12 client storefronts.

EDUCATION
B.S. in Software Engineering, Rochester Institute of Technology (2014 - 2018)`
  },
  {
    id: 'marcus-junior',
    name: 'Marcus Vance',
    title: 'Junior Web Developer (1 Year Exp / Career Switcher)',
    filename: 'Marcus_Vance_Resume.txt',
    content: `MARCUS VANCE
Austin, TX | marcus.vance@techmail.com | linkedin.com/in/marcus-vance

OBJECTIVE
Motivated Junior Software Developer seeking an opportunity to contribute frontend skills in JavaScript, React, and CSS, with strong problem-solving skills and rapid learning aptitude.

SKILLS
- Core: JavaScript (ES6), HTML5, CSS3, Responsive Design, Git
- Frameworks: React, Bootstrap, Tailwind CSS, basic Node.js
- Tools: VS Code, npm, Webpack basics, Figma

EXPERIENCE
Junior Frontend Developer | LoneStar Web Solutions | 2023 - Present
- Built landing pages and client websites using HTML, CSS, React, and Tailwind CSS according to design mockups.
- Fixed 40+ cross-browser compatibility issues across Safari, Chrome, and Firefox mobile devices.
- Participated in weekly agile scrums and sprint planning meetings.

Operations Coordinator | Logistics Pro | 2020 - 2023
- Coordinated shipping schedules and automated tracking spreadsheets with Excel formulas and basic Python scripts.

EDUCATION
Full-Stack Web Development Certificate, Austin Coding Academy (2023)
B.A. in Communications, Texas State University (2019)`
  }
];

export const PRESET_JOBS: PresetJob[] = [
  {
    id: 'job-senior-ml',
    title: 'Senior Machine Learning & NLP Engineer',
    company: 'NeuralVentures AI',
    level: 'Senior (4+ Years)',
    description: `About the Role:
We are looking for a Senior Machine Learning Engineer to spearhead our NLP and generative AI team. You will architect production models, fine-tune transformer architectures, and build scalable retrieval-augmented generation (RAG) pipelines.

Responsibilities:
- Train, evaluate, and fine-tune NLP models and deep learning pipelines using Python and PyTorch.
- Implement vector embeddings, semantic search (FAISS/ChromaDB), and LLM orchestration with LangChain or LlamaIndex.
- Containerize models using Docker and orchestrate on Kubernetes (EKS/GKE).
- Deploy high-throughput inference endpoints with FastAPI or Triton Inference Server.
- Collaborate with MLOps to automate retraining workflows and model monitoring (MLflow, Prometheus).

Required Qualifications:
- 4+ years of professional experience in Python, PyTorch or TensorFlow, and Scikit-Learn.
- Strong hands-on experience with NLP, Transformer models (BERT, Hugging Face, LLMs), and vector embeddings.
- Experience with Docker, Linux, and cloud platforms (AWS, GCP, or Azure).
- Solid understanding of SQL, data pipelines, and RESTful API development (FastAPI/Flask).
- Bachelor's or Master's degree in Computer Science, Data Science, or related quantitative field.

Preferred / Nice to Have:
- Hands-on experience with Kubernetes orchestration.
- Knowledge of vector databases such as Milvus, Pinecone, or ChromaDB.
- Experience with model quantization (TensorRT, ONNX) and GPU optimization.
- Contributions to open-source ML packages or published papers.`
  },
  {
    id: 'job-fullstack-lead',
    title: 'Senior Full-Stack TypeScript Engineer',
    company: 'CloudMatrix Technologies',
    level: 'Senior (5+ Years)',
    description: `CloudMatrix is seeking a Senior Full-Stack Engineer to lead frontend and backend service development.

Requirements:
- 5+ years building modern web applications with React, TypeScript, and Node.js.
- Deep expertise with Next.js, state management, and modern CSS (Tailwind CSS).
- Strong backend experience with Express or NestJS, PostgreSQL, Prisma ORM, and Redis caching.
- Production experience with Docker, AWS cloud infrastructure, and CI/CD pipelines.
- Commitment to high test coverage (Jest, Cypress) and clean architectural patterns.
- Excellent communication skills and mentorship experience.`
  },
  {
    id: 'job-data-analyst',
    title: 'Data Analyst / BI Specialist',
    company: 'Global Retail Insights',
    level: 'Mid-Level (2+ Years)',
    description: `Looking for a Data Analyst to transform complex business datasets into actionable dashboards and strategic insights.

Key Requirements:
- 2+ years of experience with SQL, Tableau or PowerBI, and Excel data modeling.
- Working knowledge of Python or R for exploratory data analysis (Pandas, Matplotlib).
- Experience querying cloud data warehouses (Snowflake, BigQuery, or Redshift).
- Strong storytelling, data visualization, and stakeholder presentation skills.`
  }
];
