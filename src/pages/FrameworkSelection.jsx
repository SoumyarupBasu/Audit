import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../components/Icon";
import "../styles/framework.css";

const API_BASE = "http://localhost:3001";

function Section({ title, right, children }) {
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">{title}</div>
        {right ? <div className="section-right">{right}</div> : null}
      </div>
      <div className="section-body">{children}</div>
    </div>
  );
}

export const frameworks = [
  {
    id: "iso27001",
    name: "ISO 27001",
    fullName: "Information Security Management System",
    description:
      "International standard for information security management systems. Provides a framework for managing and protecting sensitive information.",
    icon: "🔒",
    color: "#3b82f6",
    features: [
      "Risk Management",
      "Security Controls",
      "Continuous Improvement",
      "Compliance Monitoring",
    ],
    category: "Information Security",
    sections: [
      {
        id: "A.5",
        title: "Information Security Policies",
        description:
          "Management direction and support for information security",
        requirements: [
          {
            id: "A.5.1",
            title: "Management direction for information security",
            description:
              "To provide management direction and support for information security",
          },
          {
            id: "A.5.2",
            title: "Review of the policies for information security",
            description: "To ensure that policies remain appropriate",
          },
        ],
      },
      {
        id: "A.6",
        title: "Organization of Information Security",
        description: "Internal organization and mobile devices/teleworking",
        requirements: [
          {
            id: "A.6.1",
            title: "Internal organization",
            description:
              "To establish a management framework to initiate and control the implementation and operation of information security",
          },
          {
            id: "A.6.2",
            title: "Mobile devices and teleworking",
            description:
              "To ensure the security of teleworking and use of mobile devices",
          },
        ],
      },
      {
        id: "A.7",
        title: "Human Resource Security",
        description: "Security in employment and disciplinary process",
        requirements: [
          {
            id: "A.7.1",
            title: "Prior to employment",
            description:
              "To ensure that employees and contractors understand their responsibilities",
          },
          {
            id: "A.7.2",
            title: "During employment",
            description:
              "To ensure that employees and contractors are aware of information security threats",
          },
          {
            id: "A.7.3",
            title: "Termination and change of employment",
            description:
              "To protect the organization's interests as part of the process of changing or terminating employment",
          },
        ],
      },
      {
        id: "A.8",
        title: "Asset Management",
        description: "Responsibility for assets and information classification",
        requirements: [
          {
            id: "A.8.1",
            title: "Responsibility for assets",
            description:
              "To identify organizational assets and define appropriate protection responsibilities",
          },
          {
            id: "A.8.2",
            title: "Information classification",
            description:
              "To ensure that information receives an appropriate level of protection",
          },
          {
            id: "A.8.3",
            title: "Media handling",
            description:
              "To prevent unauthorized disclosure, modification, removal or destruction of information stored on media",
          },
        ],
      },
    ],
  },
  {
    id: "nist",
    name: "NIST",
    fullName: "National Institute of Standards and Technology",
    description:
      "Comprehensive cybersecurity framework providing guidelines for improving critical infrastructure cybersecurity.",
    icon: "🛡️",
    color: "#10b981",
    features: ["Identify", "Protect", "Detect", "Respond", "Recover"],
    category: "Cybersecurity Framework",
    sections: [
      {
        id: "ID",
        title: "Identify",
        description:
          "Develop the organizational understanding to manage cybersecurity risk",
        requirements: [
          {
            id: "ID.AM",
            title: "Asset Management",
            description:
              "The data, personnel, devices, systems, and facilities are identified and managed",
          },
          {
            id: "ID.BE",
            title: "Business Environment",
            description:
              "The organization's mission, objectives, and activities are understood",
          },
          {
            id: "ID.GV",
            title: "Governance",
            description:
              "The cybersecurity risk management strategy is established",
          },
          {
            id: "ID.RA",
            title: "Risk Assessment",
            description: "Cybersecurity risk is assessed",
          },
          {
            id: "ID.RM",
            title: "Risk Management Strategy",
            description:
              "Cybersecurity risk management strategy is established",
          },
        ],
      },
      {
        id: "PR",
        title: "Protect",
        description: "Develop and implement appropriate safeguards",
        requirements: [
          {
            id: "PR.AC",
            title: "Identity Management and Access Control",
            description: "Access to assets and facilities is limited",
          },
          {
            id: "PR.AT",
            title: "Awareness and Training",
            description: "Personnel are aware of cybersecurity risks",
          },
          {
            id: "PR.DS",
            title: "Data Security",
            description: "Data-at-rest and data-in-transit are protected",
          },
          {
            id: "PR.IP",
            title: "Information Protection Processes",
            description: "Security policies and procedures are maintained",
          },
          {
            id: "PR.MA",
            title: "Maintenance",
            description: "Maintenance and repairs are performed",
          },
          {
            id: "PR.PT",
            title: "Protective Technology",
            description: "Technical security solutions are managed",
          },
        ],
      },
      {
        id: "DE",
        title: "Detect",
        description: "Develop and implement appropriate activities",
        requirements: [
          {
            id: "DE.AE",
            title: "Anomalies and Events",
            description: "Anomalous activity is detected",
          },
          {
            id: "DE.CM",
            title: "Security Continuous Monitoring",
            description: "The information system and assets are monitored",
          },
          {
            id: "DE.DP",
            title: "Detection Processes",
            description: "Detection processes are maintained",
          },
        ],
      },
      {
        id: "RS",
        title: "Respond",
        description: "Develop and implement appropriate activities",
        requirements: [
          {
            id: "RS.RP",
            title: "Response Planning",
            description: "Response processes are executed",
          },
          {
            id: "RS.CO",
            title: "Communications",
            description: "Response activities are coordinated",
          },
          {
            id: "RS.AN",
            title: "Analysis",
            description: "Analysis is conducted to ensure effective response",
          },
          {
            id: "RS.MI",
            title: "Mitigation",
            description: "Activities are performed to prevent expansion",
          },
          {
            id: "RS.IM",
            title: "Improvements",
            description: "Organizational response activities are improved",
          },
        ],
      },
      {
        id: "RC",
        title: "Recover",
        description: "Develop and implement appropriate activities",
        requirements: [
          {
            id: "RC.RP",
            title: "Recovery Planning",
            description: "Recovery processes are executed",
          },
          {
            id: "RC.IM",
            title: "Improvements",
            description: "Recovery planning and processes are improved",
          },
          {
            id: "RC.CO",
            title: "Communications",
            description: "Restoration activities are coordinated",
          },
        ],
      },
    ],
  },
  {
    id: "cis",
    name: "CIS Controls",
    fullName: "Center for Internet Security Controls",
    description:
      "Prioritized set of actions to protect organizations from cyber threats. Focuses on essential security practices.",
    icon: "⚡",
    color: "#f59e0b",
    features: [
      "Basic CIS Controls",
      "Foundational CIS Controls",
      "Organizational CIS Controls",
    ],
    category: "Security Controls",
    sections: [
      {
        id: "IG1",
        title: "Implementation Group 1",
        description: "Basic cyber hygiene controls",
        requirements: [
          {
            id: "CIS-1",
            title: "Inventory and Control of Enterprise Assets",
            description: "Actively manage all enterprise assets",
          },
          {
            id: "CIS-2",
            title: "Inventory and Control of Software Assets",
            description: "Actively manage all software on the network",
          },
          {
            id: "CIS-3",
            title: "Data Protection",
            description: "Develop processes and technical controls",
          },
          {
            id: "CIS-4",
            title: "Secure Configuration of Enterprise Assets",
            description: "Establish and maintain secure configurations",
          },
          {
            id: "CIS-5",
            title: "Account Management",
            description:
              "Use processes and tools to assign and manage authorization",
          },
          {
            id: "CIS-6",
            title: "Access Control Management",
            description:
              "Use processes and tools to create, assign, manage, and revoke access credentials",
          },
        ],
      },
      {
        id: "IG2",
        title: "Implementation Group 2",
        description: "Foundational security controls",
        requirements: [
          {
            id: "CIS-7",
            title: "Continuous Vulnerability Management",
            description:
              "Develop a plan to continuously assess and track vulnerabilities",
          },
          {
            id: "CIS-8",
            title: "Audit Log Management",
            description: "Collect, alert, review, and retain audit logs",
          },
          {
            id: "CIS-9",
            title: "Email and Web Browser Protections",
            description: "Protect users from email and web-based threats",
          },
          {
            id: "CIS-10",
            title: "Malware Defenses",
            description:
              "Control the installation, spread, and execution of malicious code",
          },
          {
            id: "CIS-11",
            title: "Data Recovery",
            description: "Establish and maintain data recovery capabilities",
          },
          {
            id: "CIS-12",
            title: "Network Infrastructure Management",
            description:
              "Establish, implement, and actively manage network devices",
          },
        ],
      },
      {
        id: "IG3",
        title: "Implementation Group 3",
        description: "Advanced security controls",
        requirements: [
          {
            id: "CIS-13",
            title: "Network Monitoring and Defense",
            description:
              "Operate processes and tooling to establish and maintain network monitoring",
          },
          {
            id: "CIS-14",
            title: "Security Awareness and Skills Training",
            description: "Establish and maintain a security awareness program",
          },
          {
            id: "CIS-15",
            title: "Service Provider Management",
            description:
              "Develop and maintain a service provider management program",
          },
          {
            id: "CIS-16",
            title: "Application Software Security",
            description:
              "Manage the security life cycle of in-house developed applications",
          },
          {
            id: "CIS-17",
            title: "Incident Response Management",
            description:
              "Establish and maintain an incident response capability",
          },
          {
            id: "CIS-18",
            title: "Penetration Testing",
            description:
              "Test the effectiveness and resiliency of enterprise assets",
          },
        ],
      },
    ],
  },
  {
    id: "sox",
    name: "SOX",
    fullName: "Sarbanes-Oxley Act",
    description:
      "U.S. federal law requiring public companies to maintain accurate financial records and implement internal controls.",
    icon: "📈",
    color: "#8b5cf6",
    features: [
      "Financial Reporting",
      "Internal Controls",
      "Audit Requirements",
      "Compliance Monitoring",
    ],
    category: "Financial Compliance",
    sections: [
      {
        id: "Section 302",
        title: "Corporate Responsibility for Financial Reports",
        description: "CEO and CFO certification requirements",
        requirements: [
          {
            id: "302(a)",
            title: "Certification Requirements",
            description:
              "Principal executive and financial officers must certify quarterly and annual reports",
          },
          {
            id: "302(b)",
            title: "Internal Controls",
            description:
              "Officers must certify that internal controls are adequate",
          },
          {
            id: "302(c)",
            title: "Disclosure Controls",
            description:
              "Officers must certify that disclosure controls are effective",
          },
        ],
      },
      {
        id: "Section 404",
        title: "Management Assessment of Internal Controls",
        description:
          "Annual assessment of internal control over financial reporting",
        requirements: [
          {
            id: "404(a)",
            title: "Management Assessment",
            description: "Management must assess internal controls annually",
          },
          {
            id: "404(b)",
            title: "Auditor Attestation",
            description:
              "Independent auditor must attest to management's assessment",
          },
          {
            id: "404(c)",
            title: "Documentation",
            description:
              "Documentation of internal controls must be maintained",
          },
        ],
      },
      {
        id: "Section 802",
        title: "Criminal Penalties for Altering Documents",
        description: "Prohibition against destroying audit work papers",
        requirements: [
          {
            id: "802(a)",
            title: "Destruction Prohibition",
            description: "Prohibits destruction of audit work papers",
          },
          {
            id: "802(b)",
            title: "Retention Requirements",
            description: "Audit work papers must be retained for 5 years",
          },
          {
            id: "802(c)",
            title: "Criminal Penalties",
            description: "Violations carry criminal penalties",
          },
        ],
      },
      {
        id: "Section 906",
        title: "Corporate Responsibility for Financial Reports",
        description: "Criminal penalties for false certifications",
        requirements: [
          {
            id: "906(a)",
            title: "False Certifications",
            description: "Criminal penalties for false certifications",
          },
          {
            id: "906(b)",
            title: "Willful Violations",
            description: "Enhanced penalties for willful violations",
          },
        ],
      },
    ],
  },
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    description:
      "EU regulation on data protection and privacy, governing how personal data is collected, processed, and stored.",
    icon: "🔏",
    color: "#ef4444",
    features: [
      "Data Protection",
      "Privacy Rights",
      "Consent Management",
      "Data Breach Notification",
    ],
    category: "Data Privacy",
    sections: [
      {
        id: "Article 5",
        title: "Principles relating to processing of personal data",
        description: "Fundamental principles for lawful processing",
        requirements: [
          {
            id: "5(1)(a)",
            title: "Lawfulness, fairness and transparency",
            description:
              "Personal data must be processed lawfully, fairly and transparently",
          },
          {
            id: "5(1)(b)",
            title: "Purpose limitation",
            description:
              "Personal data must be collected for specified, explicit and legitimate purposes",
          },
          {
            id: "5(1)(c)",
            title: "Data minimisation",
            description:
              "Personal data must be adequate, relevant and limited to what is necessary",
          },
          {
            id: "5(1)(d)",
            title: "Accuracy",
            description: "Personal data must be accurate and kept up to date",
          },
          {
            id: "5(1)(e)",
            title: "Storage limitation",
            description:
              "Personal data must be kept in a form that permits identification",
          },
          {
            id: "5(1)(f)",
            title: "Integrity and confidentiality",
            description:
              "Personal data must be processed in a manner that ensures appropriate security",
          },
        ],
      },
      {
        id: "Article 6",
        title: "Lawfulness of processing",
        description: "Legal basis for processing personal data",
        requirements: [
          {
            id: "6(1)(a)",
            title: "Consent",
            description: "Data subject has given consent to processing",
          },
          {
            id: "6(1)(b)",
            title: "Contract",
            description:
              "Processing is necessary for performance of a contract",
          },
          {
            id: "6(1)(c)",
            title: "Legal obligation",
            description:
              "Processing is necessary for compliance with legal obligation",
          },
          {
            id: "6(1)(d)",
            title: "Vital interests",
            description: "Processing is necessary to protect vital interests",
          },
          {
            id: "6(1)(e)",
            title: "Public task",
            description:
              "Processing is necessary for performance of a task carried out in public interest",
          },
          {
            id: "6(1)(f)",
            title: "Legitimate interests",
            description: "Processing is necessary for legitimate interests",
          },
        ],
      },
      {
        id: "Article 17",
        title: "Right to erasure",
        description: "Right to be forgotten",
        requirements: [
          {
            id: "17(1)",
            title: "Erasure right",
            description:
              "Data subject has the right to obtain erasure of personal data",
          },
          {
            id: "17(2)",
            title: "Controller obligations",
            description:
              "Controller must erase personal data without undue delay",
          },
          {
            id: "17(3)",
            title: "Exceptions",
            description:
              "Erasure right does not apply in certain circumstances",
          },
        ],
      },
      {
        id: "Article 32",
        title: "Security of processing",
        description: "Technical and organizational measures",
        requirements: [
          {
            id: "32(1)",
            title: "Security measures",
            description:
              "Appropriate technical and organizational measures must be implemented",
          },
          {
            id: "32(2)",
            title: "Risk assessment",
            description: "Measures must be appropriate to the risk",
          },
          {
            id: "32(3)",
            title: "Encryption",
            description: "Encryption of personal data must be considered",
          },
          {
            id: "32(4)",
            title: "Regular testing",
            description: "Security measures must be regularly tested",
          },
        ],
      },
      {
        id: "Article 33",
        title: "Notification of a personal data breach",
        description: "Breach notification requirements",
        requirements: [
          {
            id: "33(1)",
            title: "Supervisory authority notification",
            description:
              "Breach must be notified to supervisory authority within 72 hours",
          },
          {
            id: "33(2)",
            title: "Documentation",
            description: "Breach must be documented",
          },
          {
            id: "33(3)",
            title: "Data subject notification",
            description:
              "Data subjects must be notified if breach poses high risk",
          },
        ],
      },
    ],
  },
  {
    id: "pci-dss",
    name: "PCI DSS",
    fullName: "Payment Card Industry Data Security Standard",
    description:
      "Security standards for organizations that handle credit card information to prevent payment card fraud.",
    icon: "💳",
    color: "#06b6d4",
    features: [
      "Card Data Protection",
      "Network Security",
      "Access Control",
      "Regular Monitoring",
    ],
    category: "Payment Security",
    sections: [
      {
        id: "Requirement 1",
        title: "Install and maintain a firewall configuration",
        description: "Protect cardholder data with firewall configuration",
        requirements: [
          {
            id: "1.1",
            title: "Firewall and router configuration",
            description:
              "Establish firewall and router configuration standards",
          },
          {
            id: "1.2",
            title: "Build firewall and router configurations",
            description:
              "Build firewall and router configurations that restrict connections",
          },
          {
            id: "1.3",
            title: "Prohibit direct public access",
            description:
              "Prohibit direct public access between the Internet and any system component",
          },
          {
            id: "1.4",
            title: "Install personal firewall software",
            description:
              "Install personal firewall software on any mobile and/or employee-owned computers",
          },
        ],
      },
      {
        id: "Requirement 2",
        title: "Do not use vendor-supplied defaults",
        description:
          "Change vendor-supplied defaults and remove unnecessary default accounts",
        requirements: [
          {
            id: "2.1",
            title: "Change vendor-supplied defaults",
            description:
              "Always change vendor-supplied defaults before installing a system",
          },
          {
            id: "2.2",
            title: "Develop configuration standards",
            description:
              "Develop configuration standards for all system components",
          },
          {
            id: "2.3",
            title: "Encrypt all non-console administrative access",
            description:
              "Encrypt all non-console administrative access using strong cryptography",
          },
        ],
      },
      {
        id: "Requirement 3",
        title: "Protect stored cardholder data",
        description: "Protect stored cardholder data",
        requirements: [
          {
            id: "3.1",
            title: "Keep cardholder data storage to a minimum",
            description: "Keep cardholder data storage to a minimum",
          },
          {
            id: "3.2",
            title: "Do not store sensitive authentication data",
            description:
              "Do not store sensitive authentication data after authorization",
          },
          {
            id: "3.3",
            title: "Mask PAN when displayed",
            description: "Mask PAN when displayed",
          },
          {
            id: "3.4",
            title: "Render PAN unreadable",
            description: "Render PAN unreadable anywhere it is stored",
          },
        ],
      },
      {
        id: "Requirement 4",
        title: "Encrypt transmission of cardholder data",
        description:
          "Encrypt transmission of cardholder data across open, public networks",
        requirements: [
          {
            id: "4.1",
            title: "Use strong cryptography",
            description: "Use strong cryptography and security protocols",
          },
          {
            id: "4.2",
            title: "Never send unencrypted PANs",
            description:
              "Never send unencrypted PANs by end-user messaging technologies",
          },
        ],
      },
      {
        id: "Requirement 5",
        title: "Use and regularly update anti-virus software",
        description: "Use and regularly update anti-virus software or programs",
        requirements: [
          {
            id: "5.1",
            title: "Deploy anti-virus software",
            description:
              "Deploy anti-virus software on all systems commonly affected by malicious software",
          },
          {
            id: "5.2",
            title: "Ensure anti-virus programs are current",
            description: "Ensure that all anti-virus programs are current",
          },
          {
            id: "5.3",
            title: "Ensure anti-virus programs perform periodic scans",
            description:
              "Ensure that anti-virus programs perform periodic scans",
          },
        ],
      },
      {
        id: "Requirement 6",
        title: "Develop and maintain secure systems and applications",
        description: "Develop and maintain secure systems and applications",
        requirements: [
          {
            id: "6.1",
            title: "Establish a process to identify security vulnerabilities",
            description:
              "Establish a process to identify security vulnerabilities",
          },
          {
            id: "6.2",
            title:
              "Ensure that all system components and software are protected",
            description:
              "Ensure that all system components and software are protected",
          },
          {
            id: "6.3",
            title: "Develop secure applications",
            description: "Develop secure applications",
          },
          {
            id: "6.4",
            title: "Follow secure coding guidelines",
            description: "Follow secure coding guidelines",
          },
        ],
      },
    ],
  },
  {
    id: "ai-nlp",
    name: "AI NLP Framework",
    fullName: "AI-Processed Composite Security Framework",
    description:
      "AI-processed composite framework combining key controls from ISO 27001, NIST CSF, and SOX for comprehensive security and compliance coverage.",
    icon: "🤖",
    color: "#9333ea",
    features: [
      "AI-Processed Controls",
      "Multi-Framework Coverage",
      "Composite Security",
      "Compliance Integration",
    ],
    category: "Composite Framework",
    sections: [
      {
        id: "Organizational",
        title: "Organizational Controls",
        description: "ISO 27001 organizational security controls",
        requirements: [
          {
            id: "A.5.1",
            title: "Policies for information security",
            description:
              "Information security policy and topic-specific policies",
          },
          {
            id: "A.5.2",
            title: "Information security roles and responsibilities",
            description: "Define and allocate information security roles",
          },
          {
            id: "A.5.4",
            title: "Management responsibilities",
            description: "Define and communicate management responsibilities",
          },
          {
            id: "A.5.5",
            title: "Contact with authorities",
            description:
              "Establish and maintain contact with relevant authorities",
          },
        ],
      },
      {
        id: "AssetManagement",
        title: "Asset Management",
        description: "NIST CSF asset management controls",
        requirements: [
          {
            id: "ID.AM-1",
            title: "Physical devices and systems inventoried",
            description: "Maintain inventory of physical devices and systems",
          },
          {
            id: "ID.AM-2",
            title: "Software platforms and applications inventoried",
            description:
              "Maintain inventory of software platforms and applications",
          },
          {
            id: "ID.AM-3",
            title: "Organizational communication and data flows mapped",
            description: "Document communication pathways and data flows",
          },
          {
            id: "ID.AM-4",
            title: "External information systems catalogued",
            description: "Catalog external information systems",
          },
          {
            id: "ID.AM-5",
            title: "Resources prioritized",
            description:
              "Prioritize resources based on classification and criticality",
          },
          {
            id: "ID.AM-6",
            title: "Cybersecurity roles established",
            description: "Establish cybersecurity roles and responsibilities",
          },
        ],
      },
      {
        id: "FinancialReporting",
        title: "Financial Reporting & Internal Controls",
        description: "SOX compliance controls for financial reporting",
        requirements: [
          {
            id: "SOX-302-1",
            title: "CEO and CFO Certification of Quarterly Reports",
            description: "Certify accuracy of quarterly financial reports",
          },
          {
            id: "SOX-302-2",
            title: "CEO and CFO Certification of Annual Reports",
            description: "Certify accuracy of annual financial reports",
          },
          {
            id: "SOX-302-3",
            title: "Internal Controls Adequacy Certification",
            description: "Certify adequacy of internal controls",
          },
          {
            id: "SOX-302-4",
            title: "Disclosure Controls Effectiveness Certification",
            description: "Certify effectiveness of disclosure controls",
          },
          {
            id: "SOX-302-5",
            title: "Material Weaknesses Disclosure",
            description: "Disclose material weaknesses in internal controls",
          },
          {
            id: "SOX-302-6",
            title: "Fraud Disclosure to Auditors",
            description: "Disclose fraud to auditors",
          },
        ],
      },
    ],
  },
];

export default function FrameworkSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from navigation state or use defaults
  const selectedFile = location.state?.selectedFile || null;
  const uploadedFrameworks = location.state?.uploadedFrameworks || [];

  // Local state
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [customFrameworks, setCustomFrameworks] = useState([]);
  const [loadingCustom, setLoadingCustom] = useState(true);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [frameworkToDelete, setFrameworkToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load custom AI-extracted frameworks
  useEffect(() => {
    async function loadCustomFrameworks() {
      try {
        const response = await fetch(`${API_BASE}/api/custom-frameworks`);
        if (response.ok) {
          const data = await response.json();
          // Transform custom frameworks to match the expected structure
          const transformed = data.frameworks.map((f) => ({
            ...f,
            fullName: f.fullName || f.name,
            features: ["AI-Extracted", "Custom Controls"],
            category: "AI-Extracted",
            isCustom: true,
            isAIExtracted: true,
          }));
          setCustomFrameworks(transformed);
        }
      } catch (error) {
        console.error("Failed to load custom frameworks:", error);
      } finally {
        setLoadingCustom(false);
      }
    }
    loadCustomFrameworks();
  }, []);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Combine predefined, uploaded, and custom AI-extracted frameworks
  const allFrameworks = [
    ...customFrameworks,
    ...uploadedFrameworks,
    ...frameworks,
  ];

  const categories = ["all", ...new Set(allFrameworks.map((f) => f.category))];

  const filteredFrameworks = allFrameworks.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || framework.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  function handleFrameworkSelect(framework) {
    setSelectedFramework(framework);
  }

  function handleContinue() {
    if (selectedFramework) {
      navigate("/details", { state: { selectedFramework, selectedFile } });
    }
  }

  function handleBack() {
    navigate("/upload");
  }

  function handleSeeControls(framework, event) {
    event.stopPropagation(); // Prevent card selection when clicking button
    navigate("/framework-controls", { state: { framework } });
  }

  // Open delete confirmation modal
  function handleDeleteClick(framework, event) {
    event.stopPropagation(); // Prevent card selection
    setFrameworkToDelete(framework);
    setDeleteError(null);
    setDeleteModalOpen(true);
  }

  // Close delete modal
  function handleCloseDeleteModal() {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setFrameworkToDelete(null);
      setDeleteError(null);
    }
  }

  // Confirm and execute deletion
  async function handleConfirmDelete() {
    if (!frameworkToDelete || isDeleting) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(
        `${API_BASE}/api/custom-frameworks/${frameworkToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        // Remove from customFrameworks state
        setCustomFrameworks((prev) =>
          prev.filter((f) => f.id !== frameworkToDelete.id)
        );

        // Clear selection if deleted framework was selected
        if (selectedFramework?.id === frameworkToDelete.id) {
          setSelectedFramework(null);
        }

        // Show success message
        setSuccessMessage(
          `"${frameworkToDelete.name}" has been deleted successfully.`
        );

        // Close modal
        setDeleteModalOpen(false);
        setFrameworkToDelete(null);
      } else {
        setDeleteError(result.error || "Failed to delete framework");
      }
    } catch (error) {
      console.error("Error deleting framework:", error);
      setDeleteError("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="layout-single">
      <main className="content">
        <div className="stack gap-lg">
          <Section title="Document Information">
            <div className="file-info">
              <div className="file-icon">📄</div>
              <div className="file-details">
                <div className="file-name">
                  {selectedFile?.name || "Document.pdf"}
                </div>
                <div className="file-meta">
                  Size: {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB •
                  Type: {selectedFile?.type || "application/pdf"}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Framework Selection">
            <div className="selection-header">
              <div className="search-section">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search frameworks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <div className="search-icon">
                    <span className="icon icon-search"></span>
                  </div>
                </div>
                <div className="category-filter">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="selection-hint">
                Choose the compliance framework that best matches your
                document's requirements
              </div>
            </div>

            <div className="frameworks-grid">
              {filteredFrameworks.map((framework) => (
                <div
                  key={framework.id}
                  className={`framework-card ${
                    selectedFramework?.id === framework.id ? "selected" : ""
                  }`}
                  onClick={() => handleFrameworkSelect(framework)}
                  style={{ position: "relative" }}
                >
                  {/* Delete button for custom frameworks only */}
                  {(framework.isCustom || framework.isAIExtracted) && (
                    <button
                      className="btn-delete-framework"
                      onClick={(e) => handleDeleteClick(framework, e)}
                      title="Delete this custom framework"
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        border: "1px solid var(--line)",
                        background: "var(--bg)",
                        color: "var(--muted)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                        zIndex: 10,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#fee2e2";
                        e.currentTarget.style.borderColor = "#ef4444";
                        e.currentTarget.style.color = "#ef4444";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--bg)";
                        e.currentTarget.style.borderColor = "var(--line)";
                        e.currentTarget.style.color = "var(--muted)";
                      }}
                    >
                      <Icon name="trash" size="16px" />
                    </button>
                  )}
                  <div className="framework-header">
                    <div
                      className="framework-icon"
                      style={{ backgroundColor: framework.color }}
                    >
                      <span style={{ fontSize: "32px" }}>{framework.icon}</span>
                    </div>
                    <div className="framework-info">
                      <div className="framework-name">
                        {framework.name}
                        {framework.isCustom && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "2px 8px",
                              borderRadius: "4px",
                              background: "var(--primary)",
                              color: "white",
                            }}
                          >
                            CUSTOM
                          </span>
                        )}
                      </div>
                      <div className="framework-full-name">
                        {framework.fullName}
                      </div>
                      <div className="framework-category">
                        {framework.category}
                      </div>
                    </div>
                  </div>
                  <div className="framework-description">
                    {framework.description}
                  </div>
                  <div className="framework-features">
                    {framework.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="framework-actions-row">
                    <button
                      className="btn-see-controls"
                      onClick={(e) => handleSeeControls(framework, e)}
                      title="View all controls for this framework"
                    >
                      <Icon name="list" size="16px" />
                      See Controls
                    </button>
                    <div className="framework-selector">
                      <div
                        className={`selector ${
                          selectedFramework?.id === framework.id ? "active" : ""
                        }`}
                      >
                        {selectedFramework?.id === framework.id && (
                          <div className="checkmark">
                            <span className="icon icon-check"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFrameworks.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">
                  <span
                    className="icon icon-search"
                    style={{ fontSize: "64px" }}
                  ></span>
                </div>
                <div className="no-results-text">
                  No frameworks found matching your search
                </div>
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              </div>
            )}
          </Section>

          <div className="actions">
            <button className="ghost" onClick={handleBack}>
              CANCEL
            </button>
            <button
              className="primary"
              onClick={handleContinue}
              disabled={!selectedFramework}
            >
              CONTINUE WITH {selectedFramework?.name || "FRAMEWORK"}
            </button>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      {successMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            padding: "16px 24px",
            background: "#10b981",
            color: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 1000,
            animation: "slideIn 0.3s ease",
          }}
        >
          <span style={{ fontSize: "20px" }}>✓</span>
          <span style={{ fontWeight: 600 }}>{successMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && frameworkToDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.2s ease",
          }}
          onClick={handleCloseDeleteModal}
        >
          <div
            style={{
              background: "var(--bg)",
              borderRadius: "16px",
              padding: "24px",
              maxWidth: "440px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              animation: "scaleIn 0.2s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#fee2e2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Icon name="trash" size="32px" style={{ color: "#ef4444" }} />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                Delete Framework?
              </h3>
            </div>

            {/* Modal Body */}
            <div style={{ marginBottom: "24px" }}>
              <p
                style={{
                  margin: "0 0 16px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                Are you sure you want to delete{" "}
                <strong style={{ color: "var(--text)" }}>
                  "{frameworkToDelete.name}"
                </strong>
                ?
              </p>

              <div
                style={{
                  background: "#fef3c7",
                  border: "1px solid #f59e0b",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "18px" }}>⚠️</span>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#92400e",
                    lineHeight: 1.5,
                  }}
                >
                  <strong>This action cannot be undone.</strong>
                  <br />
                  {frameworkToDelete.controlCount > 0 && (
                    <span>
                      {frameworkToDelete.controlCount} controls will be
                      permanently deleted.
                    </span>
                  )}
                  {!frameworkToDelete.controlCount && (
                    <span>
                      All associated controls will be permanently deleted.
                    </span>
                  )}
                </div>
              </div>

              {deleteError && (
                <div
                  style={{
                    marginTop: "16px",
                    padding: "12px 16px",
                    background: "#fee2e2",
                    border: "1px solid #ef4444",
                    borderRadius: "8px",
                    color: "#dc2626",
                    fontSize: "14px",
                  }}
                >
                  {deleteError}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={handleCloseDeleteModal}
                disabled={isDeleting}
                style={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontWeight: 600,
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  opacity: isDeleting ? 0.6 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                style={{
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "none",
                  background: isDeleting ? "#fca5a5" : "#ef4444",
                  color: "white",
                  fontWeight: 600,
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                {isDeleting ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        border: "2px solid white",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Icon name="trash" size="16px" />
                    Delete Framework
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
