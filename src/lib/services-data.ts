// ─────────────────────────────────────────────
//  Central data for all 6 service detail pages
// ─────────────────────────────────────────────

export type Challenge = { title: string; description: string };
export type Solution  = { iconName: string; title: string; description: string; tags: string[] };
export type Benefit   = { iconName: string; stat: string; title: string; description: string; color: string };
export type FAQ       = { question: string; answer: string };

export type ServiceConfig = {
  slug: string;
  meta: { title: string; description: string };
  hero: {
    badge:       string;
    title:       string;
    subtitle:    string;
    ctaText:     string;
    image?:      string;
    accent:      string;   // hex
    accentRgb:   string;   // "r,g,b" for rgba()
    dark?:       boolean;  // hero uses dark bg (default true)
  };
  overview: {
    heading:    string;
    intro:      string;
    challenges: Challenge[];
    value:      string;
  };
  solutions: Solution[];
  benefits:  Benefit[];
  faqs:      FAQ[];
};

// ─── CYBERSECURITY ───────────────────────────────────────────────────────────
const cybersecurity: ServiceConfig = {
  slug: "cybersecurity",
  meta: {
    title:       "Cybersecurity Services | NYC GravityNet",
    description: "Enterprise-grade cybersecurity — assessments, threat detection, compliance, and 24/7 SOC monitoring to protect your business.",
  },
  hero: {
    badge:     "Cybersecurity Services",
    title:     "Secure Your Business Against Evolving Cyber Threats",
    subtitle:  "Comprehensive, proactive security that protects your data, people, and reputation — from vulnerability assessments to 24/7 threat monitoring and rapid incident response.",
    ctaText:   "Protect Your Business Today",
    image:     "/images/cybersecurity-command-center.png",
    accent:    "#ef4444",
    accentRgb: "239,68,68",
  },
  overview: {
    heading: "The Cybersecurity Imperative",
    intro:
      "The average cost of a data breach has reached $4.45M — yet most organizations remain under-protected. Threats evolve faster than internal teams can track, compliance requirements grow more complex every year, and a single breach can permanently damage customer trust.",
    challenges: [
      { title: "Sophisticated Threat Landscape",     description: "Ransomware, nation-state actors, and supply-chain attacks demand enterprise-grade defenses that go far beyond traditional perimeter security." },
      { title: "Regulatory Complexity",              description: "HIPAA, SOC 2, PCI-DSS, GDPR, and CMMC requirements create overlapping compliance obligations that strain internal teams." },
      { title: "Talent & Resource Gaps",             description: "Building and retaining an in-house security team is costly and difficult. Most organizations lack the coverage needed to operate around the clock." },
      { title: "Expanding Attack Surface",           description: "Cloud infrastructure, remote workforces, IoT devices, and third-party integrations multiply the number of entry points attackers can exploit." },
    ],
    value:
      "NYC GravityNet's cybersecurity practice provides the expertise, processes, and technology to build a proactive security posture — detecting threats before they become incidents, ensuring regulatory compliance, and giving your leadership team confidence that critical assets are protected.",
  },
  solutions: [
    { iconName: "ScanSearch",    title: "Security Assessments & Risk Analysis",    description: "Comprehensive evaluation of your current security posture — identifying vulnerabilities, gaps in controls, and prioritized remediation roadmaps.", tags: ["Risk Assessment", "Pen Testing", "Gap Analysis"] },
    { iconName: "Bug",           title: "Vulnerability Management",                description: "Continuous scanning, prioritization, and remediation tracking to keep your environment free from known exploits and configuration weaknesses.", tags: ["CVE Scanning", "Patch Mgmt", "CVSS Scoring"] },
    { iconName: "Eye",           title: "Security Monitoring & Threat Detection",  description: "24/7 SOC-as-a-Service with SIEM, EDR, and threat intelligence integration — detecting and responding to incidents before they escalate.", tags: ["SOC", "SIEM", "EDR", "Threat Intel"] },
    { iconName: "ShieldCheck",   title: "Compliance & Governance",                 description: "Expert guidance through SOC 2, HIPAA, PCI-DSS, GDPR, and CMMC frameworks — building durable compliance programs that satisfy auditors.", tags: ["SOC 2", "HIPAA", "PCI-DSS", "GDPR"] },
    { iconName: "Siren",         title: "Incident Response Planning",              description: "Develop, test, and rehearse incident response playbooks so your team can contain breaches quickly and communicate with confidence.", tags: ["IR Planning", "Tabletop Exercises", "Forensics"] },
  ],
  benefits: [
    { iconName: "TrendingDown", stat: "70%",  title: "Threat Reduction",         description: "Proactive monitoring and hardening significantly reduce your exposure to successful cyberattacks.",        color: "#ef4444" },
    { iconName: "CheckCircle2", stat: "100%", title: "Audit-Ready Compliance",   description: "Structured compliance programs mean you're always prepared for audits — eliminating last-minute scrambles.", color: "#22c55e" },
    { iconName: "Clock",        stat: "24/7", title: "Continuous Monitoring",    description: "Round-the-clock SOC coverage ensures threats are identified and neutralized at any hour, any day.",           color: "#06b6d4" },
    { iconName: "DollarSign",   stat: "5×",   title: "Breach Cost Avoidance",    description: "Prevention is dramatically cheaper than remediation — proactive security pays for itself many times over.",   color: "#f59e0b" },
    { iconName: "Users",        stat: "98%",  title: "Client Retention Rate",    description: "Clients trust NYC GravityNet as their long-term security partner — because our results speak for themselves.",  color: "#a78bfa" },
  ],
  faqs: [
    { question: "What is zero-trust architecture and do I need it?",              answer: "Zero trust is a security model that requires every user, device, and application to continuously verify identity and authorization — rather than trusting anything inside the network perimeter. Most enterprises benefit from a zero-trust approach, especially with distributed workforces and cloud infrastructure." },
    { question: "How long does a security assessment take?",                       answer: "A comprehensive security assessment typically takes 2–4 weeks depending on your environment's size and complexity. We provide a detailed findings report with prioritized remediation steps within 5 business days of completing the assessment." },
    { question: "Which compliance frameworks do you support?",                     answer: "We support SOC 2 Type I & II, HIPAA, PCI-DSS, GDPR, CCPA, NIST CSF, ISO 27001, CMMC, and FedRAMP. Our consultants hold active certifications including CISSP, CISM, CISA, and CEH." },
    { question: "What happens if we experience a breach during our engagement?",   answer: "Our incident response team is available 24/7 to existing clients. We provide immediate triage, containment, forensic analysis, regulatory notification guidance, and remediation — with full documentation for post-incident review." },
    { question: "Can you work with our existing security tools?",                  answer: "Yes. We integrate with all major SIEM, EDR, and SOAR platforms including Splunk, Microsoft Sentinel, CrowdStrike, SentinelOne, Palo Alto, and more. We can augment your existing team or operate as your full security function." },
    { question: "Do you offer managed security services (MSSP)?",                  answer: "Yes — our Managed Security Services include continuous monitoring, threat hunting, vulnerability management, and monthly executive reporting. Packages are sized for SMBs through Fortune 500 enterprises." },
  ],
};

// ─── AI & INTELLIGENT AUTOMATION ─────────────────────────────────────────────
const aiAutomation: ServiceConfig = {
  slug: "ai-automation",
  meta: {
    title:       "AI & Intelligent Automation | NYC GravityNet",
    description: "Enterprise AI strategy and deployment — LLMs, predictive analytics, automation, and AI-powered products that drive efficiency and innovation.",
  },
  hero: {
    badge:     "AI & Intelligent Automation",
    title:     "Transform Operations with Artificial Intelligence",
    subtitle:  "Deploy enterprise-grade AI that improves efficiency, accelerates innovation, and enables smarter decision-making — from strategy and pilot through full-scale production.",
    ctaText:   "Accelerate Innovation with AI",
    image:     "/images/ai-operations-dashboard.png",
    accent:    "#06b6d4",
    accentRgb: "6,182,212",
  },
  overview: {
    heading: "The AI Opportunity",
    intro:
      "AI is no longer experimental — it's the defining competitive differentiator of the next decade. Yet most organizations struggle to move beyond pilots. The gap between AI potential and AI value is bridged by the right strategy, the right data foundation, and experienced delivery teams.",
    challenges: [
      { title: "From Pilot to Production",        description: "90% of AI pilots never reach production. Building reliable, scalable, and governed AI systems requires engineering depth that most teams lack." },
      { title: "Data Readiness",                  description: "AI quality depends entirely on data quality. Many organizations carry fragmented, unclean data that undermines model accuracy from the start." },
      { title: "Model Governance & Risk",         description: "Bias, hallucinations, and regulatory risk require robust MLOps, monitoring, and explainability frameworks before AI touches business decisions." },
      { title: "Integration with Core Systems",   description: "AI that lives outside your ERP, CRM, or workflow tools creates friction rather than removing it. Seamless integration is critical to adoption." },
    ],
    value:
      "NYC GravityNet delivers end-to-end AI engagements — from opportunity identification and data audits through model development, MLOps, and production operations. We build AI that works reliably at enterprise scale, governed by the controls your stakeholders require.",
  },
  solutions: [
    { iconName: "Sparkles",    title: "Generative AI Solutions",          description: "Custom LLM applications, RAG pipelines, and enterprise copilots built on OpenAI, Anthropic, Google Gemini, and open-source models — grounded in your proprietary data.", tags: ["LLMs", "RAG", "Copilots", "Fine-tuning"] },
    { iconName: "Bot",         title: "Business Process Automation",      description: "Intelligent automation that handles complex, judgment-intensive workflows — RPA augmented with ML to handle exceptions, not just rules.", tags: ["RPA", "Workflow AI", "Intelligent OCR"] },
    { iconName: "MessageSquare",title: "AI Chatbots & Virtual Assistants", description: "Context-aware conversational AI for customer service, internal knowledge management, and sales enablement — integrated with your existing platforms.", tags: ["NLP", "Conversational AI", "CRM Integration"] },
    { iconName: "TrendingUp",  title: "Predictive Analytics & Forecasting", description: "Machine learning models that forecast demand, detect anomalies, score leads, and surface insights hidden in your operational data.", tags: ["Forecasting", "Anomaly Detection", "ML Models"] },
    { iconName: "Lightbulb",   title: "AI Strategy & Consulting",         description: "Executive-level AI roadmapping, use-case prioritization, build-vs-buy analysis, and change management to ensure your AI investments create lasting value.", tags: ["AI Roadmap", "Use-Case Scoring", "Governance"] },
  ],
  benefits: [
    { iconName: "Zap",         stat: "40%",  title: "Efficiency Gains",            description: "Intelligent automation removes repetitive, time-consuming tasks — freeing your people for higher-value, strategic work.",          color: "#06b6d4" },
    { iconName: "Brain",       stat: "3×",   title: "Faster Decision-Making",      description: "AI-powered dashboards and recommendation engines surface the right insight at the right moment, for better and faster decisions.", color: "#a78bfa" },
    { iconName: "DollarSign",  stat: "35%",  title: "Operational Cost Reduction",  description: "Automating manual processes and reducing errors drives significant, measurable cost savings across operations.",                   color: "#22c55e" },
    { iconName: "Rocket",      stat: "5×",   title: "Innovation Acceleration",     description: "AI capabilities shorten development cycles, enable rapid experimentation, and unlock new product and service possibilities.",       color: "#f59e0b" },
    { iconName: "Clock",       stat: "24/7", title: "Always-On Intelligence",      description: "AI systems operate continuously — monitoring, analyzing, and acting without the limitations of human working hours.",              color: "#ef4444" },
  ],
  faqs: [
    { question: "How do we know which AI use cases are right for our business?",   answer: "We begin every AI engagement with a structured use-case discovery workshop — evaluating business value, data readiness, and implementation feasibility. This ensures you invest in AI where the ROI is clearest." },
    { question: "How long does it take to implement an AI solution?",              answer: "A focused pilot typically takes 6–10 weeks from kickoff to demonstration. Full production deployment depends on complexity — most enterprise-grade AI solutions are live within 4–6 months." },
    { question: "How do you ensure our data remains private and secure?",          answer: "We architect AI solutions with data privacy at the core — private model deployments, data anonymisation, role-based access, and full audit trails. We comply with GDPR, HIPAA, and your organization's data governance policies." },
    { question: "Can AI integrate with our existing ERP, CRM, and tools?",        answer: "Yes. We have deep integration experience with Salesforce, SAP, Microsoft Dynamics, ServiceNow, and all major enterprise platforms. Integration is a core part of every AI delivery, not an afterthought." },
    { question: "What is MLOps and why does it matter?",                           answer: "MLOps is the discipline of operating AI models reliably in production — monitoring for drift, retraining pipelines, versioning, and governance. Without MLOps, AI models degrade silently and create business risk." },
    { question: "Do you work with open-source models or only commercial LLMs?",   answer: "Both. We evaluate every use case objectively — recommending open-source (Llama, Mistral, Falcon) when appropriate for cost or data-privacy reasons, and commercial models (GPT-4, Claude, Gemini) when their capabilities justify the cost." },
  ],
};

// ─── CLOUD & DEVOPS ───────────────────────────────────────────────────────────
const cloudDevops: ServiceConfig = {
  slug: "cloud-devops",
  meta: {
    title:       "Cloud & DevOps Solutions | NYC GravityNet",
    description: "Cloud migration, infrastructure modernization, DevOps automation, and CI/CD pipeline engineering for resilient, scalable enterprise systems.",
  },
  hero: {
    badge:     "Cloud & DevOps Solutions",
    title:     "Build a Scalable and Agile Cloud Environment",
    subtitle:  "Modernize your infrastructure, automate your delivery pipeline, and operate with the speed and resilience that modern business demands — across AWS, Azure, and Google Cloud.",
    ctaText:   "Modernize Your Infrastructure",
    accent:    "#2563eb",
    accentRgb: "37,99,235",
  },
  overview: {
    heading: "The Case for Cloud Transformation",
    intro:
      "Legacy infrastructure slows innovation, inflates costs, and creates reliability risks. Organizations that modernize to cloud-native architectures operate faster, scale more cost-effectively, and recover from failures in minutes rather than days.",
    challenges: [
      { title: "Legacy Infrastructure Constraints",  description: "On-premise systems can't scale dynamically, create single points of failure, and require costly maintenance that diverts budget from innovation." },
      { title: "Slow Software Delivery",             description: "Manual deployments, siloed teams, and lack of automation mean weeks between releases — while competitors ship daily." },
      { title: "Cloud Cost Sprawl",                  description: "Without proper governance, cloud spending grows unchecked. Most organizations overspend by 30–40% due to underutilized resources and poor architecture." },
      { title: "Security in the Cloud",              description: "Misconfigured cloud resources are the leading cause of data breaches. Security and compliance must be native to cloud architecture, not retrofitted." },
    ],
    value:
      "We design and execute cloud transformations that deliver real business outcomes — not just infrastructure migration. Our DevOps engineering practice automates everything from code commit to production deployment, giving your teams the velocity to innovate continuously.",
  },
  solutions: [
    { iconName: "Cloud",          title: "Cloud Migration",                      description: "Structured 6R migration methodology — rehost, replatform, refactor, repurchase, retain, retire — executed with minimal disruption and full risk management.", tags: ["AWS", "Azure", "GCP", "6R Migration"] },
    { iconName: "Server",         title: "Cloud Infrastructure Management",      description: "Infrastructure-as-Code, automated scaling, cost optimization, and ongoing operations management for cloud-native and hybrid environments.", tags: ["Terraform", "IaC", "Cost Optimization"] },
    { iconName: "GitMerge",       title: "DevOps Automation",                    description: "Transform your engineering culture with automated testing, deployment pipelines, and observability that accelerate delivery and reduce incidents.", tags: ["GitOps", "Ansible", "Automation"] },
    { iconName: "Workflow",       title: "CI/CD Pipeline Implementation",        description: "Design and build end-to-end CI/CD pipelines with automated testing gates, security scanning, and progressive deployment strategies.", tags: ["GitHub Actions", "ArgoCD", "Jenkins"] },
    { iconName: "ShieldCheck",    title: "Cloud Security & Compliance",          description: "Security baselines, IAM governance, network segmentation, and compliance automation to ensure your cloud environment meets your security requirements.", tags: ["IAM", "Zero Trust", "CSPM", "SOC 2"] },
  ],
  benefits: [
    { iconName: "Rocket",       stat: "10×", title: "Deployment Frequency",      description: "Automated CI/CD pipelines dramatically increase the number of safe, reliable releases your team can ship.",             color: "#2563eb" },
    { iconName: "TrendingDown", stat: "40%", title: "Infrastructure Cost Saving", description: "Right-sized cloud resources and FinOps practices typically reduce cloud spend by 30–45% within the first year.",         color: "#22c55e" },
    { iconName: "Activity",     stat: "99.9%",title: "Uptime & Reliability",     description: "Multi-AZ, multi-region architectures with automated failover ensure your services stay available for customers.",           color: "#06b6d4" },
    { iconName: "Zap",          stat: "5×",  title: "Faster Time-to-Market",     description: "Removing manual handoffs and automating environments gives engineering teams the speed to ship features quickly.",          color: "#f59e0b" },
    { iconName: "Scale",        stat: "∞",   title: "Elastic Scalability",        description: "Cloud-native architectures scale automatically with demand — so you never pay for idle capacity or turn away traffic.",      color: "#a78bfa" },
  ],
  faqs: [
    { question: "Which cloud platform do you recommend — AWS, Azure, or GCP?",   answer: "The right platform depends on your existing ecosystem, team skills, workload requirements, and licensing agreements. We conduct an objective evaluation and can support any major cloud provider — or a multi-cloud strategy." },
    { question: "How do you minimize disruption during cloud migration?",          answer: "We use a phased migration approach with parallel environments, thorough testing at each stage, and rollback procedures. Most migrations are completed with zero planned downtime using traffic shifting and blue/green deployment strategies." },
    { question: "What is FinOps and how can it reduce our cloud bill?",           answer: "FinOps is the practice of optimizing cloud financial management — identifying waste, right-sizing instances, leveraging reserved capacity, and building accountability for cloud spending. We typically reduce cloud spend by 30–45% for new clients." },
    { question: "How long does a cloud migration project take?",                   answer: "A focused application migration takes 8–16 weeks. A full enterprise data-center migration is typically a 6–18 month program, depending on the number of applications and complexity of dependencies." },
    { question: "Can you help us adopt Kubernetes and container orchestration?",   answer: "Yes. We have deep Kubernetes expertise across EKS, AKS, and GKE — handling cluster architecture, service mesh, observability, and security hardening for containerized workloads at scale." },
  ],
};

// ─── CUSTOM SOFTWARE DEVELOPMENT ─────────────────────────────────────────────
const softwareDevelopment: ServiceConfig = {
  slug: "software-development",
  meta: {
    title:       "Custom Software Development | NYC GravityNet",
    description: "Enterprise software engineering — web and mobile applications, APIs, microservices, and platform modernization delivered by expert agile teams.",
  },
  hero: {
    badge:     "Custom Software Development",
    title:     "Software Built Around Your Business",
    subtitle:  "We engineer high-performance, secure, and scalable software — from greenfield platforms to complex legacy modernizations — that adapts to your business and compounds value over time.",
    ctaText:   "Build Your Next Digital Solution",
    image:     "/images/software-engineering-collaboration.jpeg",
    accent:    "#a78bfa",
    accentRgb: "167,139,250",
  },
  overview: {
    heading: "Why Custom Software Wins",
    intro:
      "Off-the-shelf software forces your business to adapt to technology. Custom software adapts to your business — built precisely around your processes, data, and users, with no licensing dependencies or feature compromises.",
    challenges: [
      { title: "Rigid Off-the-Shelf Limitations",     description: "Generic software never fits perfectly. Organizations waste enormous time working around limitations that custom software would eliminate." },
      { title: "Technical Debt Accumulation",         description: "Aging codebases slow new feature development to a crawl, raise operational risk, and make it difficult to attract engineering talent." },
      { title: "Integration Complexity",              description: "Connecting disparate systems — CRMs, ERPs, payment processors, data platforms — requires expert API design and robust integration architecture." },
      { title: "Scaling Development Teams",           description: "Building and retaining the right engineering talent is expensive and time-consuming. Gaps in delivery lead to missed market opportunities." },
    ],
    value:
      "NYC GravityNet provides embedded engineering teams that work as an extension of your organization — delivering quality code, maintaining rigorous standards, and building software that scales gracefully from prototype to enterprise grade.",
  },
  solutions: [
    { iconName: "Building2",    title: "Enterprise Software Development",    description: "Complex, multi-tenant enterprise platforms built for performance, security, and operational reliability — including ERP extensions, internal tooling, and core business systems.", tags: ["Enterprise Architecture", "Multi-tenant", "SSO"] },
    { iconName: "Globe",        title: "Web Application Development",        description: "Full-stack web applications built with modern frameworks (React, Next.js, Node.js, Python) with performance optimization, accessibility, and SEO at the core.", tags: ["React", "Next.js", "TypeScript", "Node.js"] },
    { iconName: "Smartphone",   title: "Mobile App Development",             description: "Cross-platform and native iOS/Android applications that deliver polished, performant user experiences and seamlessly integrate with backend services.", tags: ["React Native", "iOS", "Android", "Flutter"] },
    { iconName: "Plug",         title: "API Development & System Integration", description: "Design and build robust RESTful and GraphQL APIs, event-driven microservices, and integration middleware that connects your entire technology ecosystem.", tags: ["REST", "GraphQL", "gRPC", "Event-Driven"] },
    { iconName: "RefreshCw",    title: "Software Modernization",             description: "Systematically migrate legacy monoliths to modern architectures — strangler-fig patterns, containerization, and cloud-native redesigns that reduce risk and increase velocity.", tags: ["Legacy Migration", "Microservices", "Refactoring"] },
  ],
  benefits: [
    { iconName: "Target",       stat: "100%", title: "Perfect Business Fit",        description: "Software designed specifically for your workflows — no compromises, no workarounds, and no wasted features you'll never use.",      color: "#a78bfa" },
    { iconName: "TrendingUp",   stat: "60%",  title: "Faster Feature Delivery",     description: "Modern architectures and agile delivery pipelines let your team ship new capabilities in days rather than months.",                color: "#06b6d4" },
    { iconName: "ShieldCheck",  stat: "Enterprise", title: "Security Built In",     description: "Security requirements are defined in the design phase and verified throughout development — not bolted on after release.",           color: "#ef4444" },
    { iconName: "Scale",        stat: "∞",    title: "Built to Scale",              description: "Architectures that handle 10 users today and 10 million tomorrow — without costly rewrites as your business grows.",               color: "#22c55e" },
    { iconName: "DollarSign",   stat: "3×",   title: "Long-Term ROI",               description: "Custom software eliminates recurring licensing fees and adapts to business change without expensive vendor lock-in.",               color: "#f59e0b" },
  ],
  faqs: [
    { question: "How do you ensure the software meets our business requirements?",  answer: "We start every engagement with a structured discovery phase — requirements workshops, user journey mapping, and technical architecture planning. Requirements are documented, reviewed, and sign-off is obtained before development begins." },
    { question: "What development methodology do you follow?",                      answer: "We follow an agile methodology with 2-week sprints, continuous integration, and regular client demos. You see working software every two weeks — not just status reports." },
    { question: "Do you provide ongoing support after launch?",                     answer: "Yes. We offer flexible post-launch support including bug-fix SLAs, performance monitoring, feature development retainers, and dedicated support teams. Most clients continue working with us long-term." },
    { question: "Who owns the code at the end of the project?",                    answer: "You do. All code, architecture documentation, and IP created for your project transfers to you at project completion. You are never locked into NYC GravityNet for continued access to your own software." },
    { question: "How do you handle changes in scope during development?",          answer: "We use a lightweight change-control process. Small changes are absorbed within sprint capacity; larger scope changes are scoped, estimated, and approved before implementation. We always communicate impact transparently." },
    { question: "Can you work with our existing development team?",                answer: "Absolutely. We frequently embed with existing engineering teams — adding specialized skills, extra capacity, or technical leadership. We adapt to your team's tools, workflows, and standards." },
  ],
};

// ─── DATA & ANALYTICS ────────────────────────────────────────────────────────
const dataAnalytics: ServiceConfig = {
  slug: "data-analytics",
  meta: {
    title:       "Data & Analytics | NYC GravityNet",
    description: "Modern data platforms, business intelligence, data engineering, and predictive analytics that transform raw data into competitive advantage.",
  },
  hero: {
    badge:     "Data & Analytics",
    title:     "Turn Data into Business Intelligence",
    subtitle:  "We build the data infrastructure, analytics platforms, and predictive models that transform scattered, underutilized data into a strategic asset that drives every business decision.",
    ctaText:   "Unlock the Power of Your Data",
    accent:    "#f59e0b",
    accentRgb: "245,158,11",
  },
  overview: {
    heading: "Your Data Has More Value Than You're Extracting",
    intro:
      "Most organizations collect far more data than they can effectively analyze. Fragmented systems, poor data quality, and lack of analytical infrastructure leave enormous business value untapped — while competitors who invest in data capabilities make faster, smarter decisions.",
    challenges: [
      { title: "Data Silos & Fragmentation",          description: "Critical data trapped in disconnected systems — CRMs, ERPs, spreadsheets, and cloud tools — makes unified analysis impossible without a modern data platform." },
      { title: "Poor Data Quality",                   description: "Inconsistent formats, duplicates, and missing values undermine trust in reporting. Leaders make decisions based on flawed numbers without even knowing it." },
      { title: "No Real-Time Visibility",             description: "Batch-based reporting creates blind spots. Modern businesses need streaming pipelines and real-time dashboards to respond to change as it happens." },
      { title: "Lack of Predictive Capability",       description: "Historical reporting tells you what happened. Predictive analytics tells you what will happen — giving you the lead time to act proactively." },
    ],
    value:
      "NYC GravityNet builds modern data ecosystems — cloud-native warehouses, governed pipelines, self-service BI platforms, and ML-powered analytics — that make data your competitive edge rather than your operational burden.",
  },
  solutions: [
    { iconName: "LayoutDashboard", title: "Business Intelligence Dashboards",  description: "Interactive, self-service dashboards in Power BI, Looker, Tableau, or custom-built — giving every stakeholder the metrics that matter most, in real time.", tags: ["Power BI", "Looker", "Tableau", "Self-Service"] },
    { iconName: "Database",        title: "Data Warehousing & Lakehouse",      description: "Design and build scalable, governed data warehouses and lakehouses on Snowflake, BigQuery, Databricks, or Redshift — the single source of truth for your organization.", tags: ["Snowflake", "BigQuery", "Databricks", "Redshift"] },
    { iconName: "Workflow",        title: "Data Engineering & Pipeline Design", description: "Robust ETL/ELT pipelines, streaming data ingestion with Kafka or Kinesis, and orchestration with Airflow or dbt that ensure clean, timely data delivery.", tags: ["dbt", "Airflow", "Kafka", "ELT/ETL"] },
    { iconName: "BarChart2",       title: "Advanced Analytics",                description: "Statistical modelling, cohort analysis, attribution modelling, and data science projects that answer the business questions standard BI can't touch.", tags: ["Python", "R", "Statistical Modelling"] },
    { iconName: "TrendingUp",      title: "Predictive Insights & ML Models",   description: "Churn prediction, demand forecasting, recommendation engines, and anomaly detection models deployed into production and integrated with business workflows.", tags: ["Forecasting", "Churn Models", "Recommendations"] },
  ],
  benefits: [
    { iconName: "Eye",          stat: "360°",  title: "Unified Business View",      description: "Break down data silos and give every team a consistent, trustworthy view of the metrics that drive decisions.",                 color: "#f59e0b" },
    { iconName: "Zap",          stat: "10×",   title: "Faster Reporting Cycles",    description: "Automated pipelines and self-service dashboards reduce report generation time from days to seconds.",                           color: "#06b6d4" },
    { iconName: "TrendingUp",   stat: "25%",   title: "Revenue Growth Opportunity", description: "Data-driven organizations consistently identify upsell, cross-sell, and pricing opportunities that manual analysis misses.",     color: "#22c55e" },
    { iconName: "Target",       stat: "3×",    title: "Better Forecast Accuracy",   description: "ML-powered forecasting models typically outperform spreadsheet-based projections by a factor of three or more.",               color: "#a78bfa" },
    { iconName: "DollarSign",   stat: "30%",   title: "Operational Cost Visibility", description: "Clear cost attribution and operational metrics surface savings opportunities that were previously hidden in fragmented data.", color: "#ef4444" },
  ],
  faqs: [
    { question: "What is a data warehouse and do we need one?",                   answer: "A data warehouse is a centralized repository that integrates data from all your systems into a consistent, queryable format. If your team currently uses multiple spreadsheets or struggles to get consistent numbers from different reports, a data warehouse will transform how you operate." },
    { question: "How long does it take to build a data platform?",                answer: "A foundational data platform with core pipelines and a BI layer is typically live within 8–12 weeks. We use a rapid-iteration approach — delivering working dashboards early and expanding coverage over time." },
    { question: "Which BI tool do you recommend?",                                answer: "It depends on your team's skills, data complexity, and budget. We work with Power BI, Looker, Tableau, Metabase, and custom React-based dashboards. We assess your needs and recommend the best fit — without vendor bias." },
    { question: "How do you ensure data quality?",                                answer: "We implement automated data quality testing at every pipeline stage using tools like dbt tests and Great Expectations. Data quality dashboards provide real-time visibility into completeness, accuracy, and freshness metrics." },
    { question: "Can you work with our existing data stack?",                      answer: "Yes. We work with whatever you have and help you evolve it. Whether you're on legacy tools or a modern cloud stack, we assess your current state objectively and chart a pragmatic path to where you want to be." },
  ],
};

// ─── DIGITAL TRANSFORMATION CONSULTING ───────────────────────────────────────
const digitalTransformation: ServiceConfig = {
  slug: "digital-transformation",
  meta: {
    title:       "Digital Transformation Consulting | NYC GravityNet",
    description: "Technology strategy, enterprise modernization, process optimization, and change management that positions your organization as a digital leader.",
  },
  hero: {
    badge:     "Digital Transformation Consulting",
    title:     "Transform Your Business for the Digital Future",
    subtitle:  "We help executive teams define bold technology visions, build comprehensive roadmaps, and execute transformations that create lasting competitive advantage across every dimension of the enterprise.",
    ctaText:   "Start Your Digital Transformation Journey",
    image:     "/images/technology-strategy-workshop.png",
    accent:    "#22c55e",
    accentRgb: "34,197,94",
  },
  overview: {
    heading: "The Digital Imperative",
    intro:
      "Digital transformation isn't a single project — it's a fundamental reimagining of how your organization creates value. Companies that lead their industry in five years will be those making the right technology investments today. Those that wait will find themselves chasing competitors who moved first.",
    challenges: [
      { title: "Strategy Without Execution",          description: "Many organizations have digital visions but lack the execution muscle to turn strategy into realized value. Plans sit on shelves while competitors ship." },
      { title: "Change Resistance",                   description: "Technology adoption fails when change management is neglected. People, process, and culture must transform alongside the technology itself." },
      { title: "Legacy System Entanglement",          description: "Decades of technical debt create architectural constraints that make modernization feel too risky to begin — yet too costly to defer." },
      { title: "Misaligned Investments",              description: "Without a clear roadmap, technology investments scatter across disconnected initiatives that individually succeed but collectively fail to move the needle." },
    ],
    value:
      "NYC GravityNet bridges the gap between digital vision and digital reality. We partner with C-suite leaders to design transformations that are ambitious in scope, rigorous in execution, and measured by business outcomes — not technology deliverables.",
  },
  solutions: [
    { iconName: "Map",          title: "Technology Strategy & Roadmapping",    description: "Co-develop a multi-year digital strategy aligned to board priorities — including investment cases, initiative sequencing, and executive-ready business cases for every capability.", tags: ["Executive Strategy", "Investment Planning", "OKRs"] },
    { iconName: "SlidersHorizontal", title: "Process Optimization",            description: "Identify, redesign, and automate business processes that are creating friction, cost, or delay — using lean methodologies, process mining, and intelligent automation.", tags: ["Lean", "Process Mining", "BPM", "Automation"] },
    { iconName: "Building2",    title: "Enterprise Modernization",             description: "Structured programs to modernize core enterprise systems — ERP, CRM, and middleware — replacing technical debt with scalable, integrated platforms.", tags: ["ERP Modernization", "CRM Strategy", "Integration"] },
    { iconName: "Users2",       title: "Change Management",                    description: "Structured change programs that build digital capability, create adoption momentum, and embed new ways of working across the organization.", tags: ["OCM", "Training", "Culture Change", "Adoption"] },
    { iconName: "Network",      title: "Systems Integration",                  description: "Architect and implement integration layers that connect disparate systems — creating the unified data and workflow foundation that transformation depends on.", tags: ["API Strategy", "ESB", "iPaaS", "Data Fabric"] },
  ],
  benefits: [
    { iconName: "TrendingUp",   stat: "40%",  title: "Revenue Growth Enablement",  description: "Digital leaders grow revenue 1.5–2× faster than peers by unlocking new business models and improving customer experience.",        color: "#22c55e" },
    { iconName: "Zap",          stat: "50%",  title: "Operational Efficiency",     description: "Process optimization and automation programs consistently deliver 30–50% efficiency gains in targeted operations.",                   color: "#06b6d4" },
    { iconName: "Users",        stat: "85%",  title: "Employee Adoption Rate",     description: "Our change management approach drives above-industry adoption rates — ensuring technology investments are actually used.",            color: "#a78bfa" },
    { iconName: "Target",       stat: "2×",   title: "Strategic Decision Speed",   description: "Better data, clearer processes, and more capable systems give leadership the information to decide faster and more confidently.",     color: "#2563eb" },
    { iconName: "Globe2",       stat: "∞",    title: "Future-Proof Foundation",    description: "A well-executed transformation builds architectural flexibility — so your organization can adapt quickly as market conditions change.", color: "#f59e0b" },
  ],
  faqs: [
    { question: "How do you define digital transformation?",                      answer: "For us, digital transformation means fundamentally reimagining how your organization creates, delivers, and captures value using technology. It encompasses strategy, people, process, and technology — not just software implementation." },
    { question: "Where do you typically start a transformation engagement?",      answer: "We start with a 4–6 week discovery and assessment phase — interviewing stakeholders, auditing current capabilities, benchmarking against industry peers, and developing a clear picture of the gaps and opportunities." },
    { question: "How do you handle resistance to change within organizations?",   answer: "Change management is central to every transformation program we run. We identify change champions, build communication plans, create training pathways, and measure adoption continuously — adjusting interventions based on real feedback." },
    { question: "How long does a digital transformation take?",                   answer: "Meaningful transformation is a multi-year journey, but organizations begin seeing measurable value within 3–6 months of focused execution. We design programs with early wins that build momentum for longer-term initiatives." },
    { question: "How do you measure the success of a transformation?",            answer: "We define success metrics in the strategy phase — revenue growth, cost reduction, employee productivity, customer satisfaction, and system uptime. We report against these KPIs throughout the engagement, not just at the end." },
    { question: "Can you help us build an internal digital capability?",          answer: "Yes. Many clients want to build in-house digital capability alongside the transformation. We offer capability-building programs, technology academies, and leadership development to ensure you're not dependent on external consultants forever." },
  ],
};

// ─── Export map ──────────────────────────────────────────────────────────────
export const servicesMap: Record<string, ServiceConfig> = {
  cybersecurity:          cybersecurity,
  "ai-automation":        aiAutomation,
  "cloud-devops":         cloudDevops,
  "software-development": softwareDevelopment,
  "data-analytics":       dataAnalytics,
  "digital-transformation": digitalTransformation,
};

export const allServices = Object.values(servicesMap);
