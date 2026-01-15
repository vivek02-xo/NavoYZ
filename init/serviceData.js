const mongoose = require("mongoose");
const Service = require("../model/service");

const MONGO_URL = "mongodb://127.0.0.1:27017/novayz";

async function seedServices() {
  await mongoose.connect(MONGO_URL);
  console.log("MongoDB connected");

  await Service.deleteMany({});
  console.log("Old services removed");

  const services = [
    {
      title: "Static / Basic Website",
      slug: "static-website",
      shortDescription: "Simple, fast websites for portfolios and small businesses.",
      longDescription:
        "Perfect for individuals and small businesses who need a clean online presence without complexity.",
      whatYouGet: [
        "Landing page or small business site",
        "Mobile responsive design",
        "Fast loading performance",
      ],
      deliverables: ["Deployed website", "Source code"],
      techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      pricing: [{ minPrice: 8000, maxPrice: 15000 }],
      estimatedTimeline: "3–5 days",
      category: "website",
      order: 1,
    },

    {
      title: "Business Website (Dynamic)",
      slug: "business-website",
      shortDescription: "Dynamic multi-page websites with admin control.",
      longDescription:
        "A scalable business website with backend support, admin panel, and database integration.",
      whatYouGet: [
        "Multiple pages",
        "Forms & admin dashboard",
        "Database integration",
      ],
      deliverables: ["Admin panel", "Live website"],
      techStack: ["Node.js", "Express", "MongoDB", "MERN"],
      pricing: [{ minPrice: 25000, maxPrice: 40000 }],
      estimatedTimeline: "1–2 weeks",
      category: "website",
      order: 2,
    },

    {
      title: "Full-Stack Web App / MVP",
      slug: "fullstack-web-app",
      shortDescription: "End-to-end product development for startups.",
      longDescription:
        "From idea to launch — authentication, dashboards, APIs, and scalable architecture.",
      whatYouGet: [
        "Authentication & roles",
        "Dashboard & CRUD",
        "Scalable architecture",
      ],
      deliverables: ["MVP app", "Deployment", "Documentation"],
      techStack: ["MERN", "Node.js", "MongoDB"],
      pricing: [{ minPrice: 80000, maxPrice: 150000 }],
      estimatedTimeline: "3–6 weeks",
      isPopular: true,
      category: "website",
      order: 3,
    },

    {
      title: "Website Redesign / Fixing",
      slug: "website-redesign",
      shortDescription: "Improve UI, fix bugs, and boost performance.",
      longDescription:
        "Ideal for existing websites that need a visual upgrade or technical fixes.",
      whatYouGet: [
        "UI/UX improvements",
        "Bug fixing",
        "Performance optimization",
      ],
      deliverables: ["Redesigned UI", "Optimized code"],
      pricing: [
        { label: "Small Fixes", minPrice: 3000, maxPrice: 7000 },
        { label: "Full Redesign", minPrice: 20000, maxPrice: 40000 },
      ],
      estimatedTimeline: "3–10 days",
      category: "website",
      order: 4,
    },

    {
      title: "Monthly Website Maintenance",
      slug: "website-maintenance",
      shortDescription: "Ongoing support, updates, and backups.",
      longDescription:
        "Hands-free website maintenance so you can focus on your business.",
      whatYouGet: [
        "Bug fixes",
        "Regular updates",
        "Backups & monitoring",
      ],
      deliverables: ["Monthly reports", "Priority support"],
      pricing: [
        { label: "Basic", minPrice: 2000, billingType: "monthly" },
        { label: "Standard", minPrice: 5000, billingType: "monthly" },
      ],
      estimatedTimeline: "Ongoing",
      isRecurring: true,
      category: "maintenance",
      order: 5,
    },

    {
      title: "AI Chatbot for Website",
      slug: "ai-chatbot",
      shortDescription: "ChatGPT-style chatbot for customer support.",
      longDescription:
        "AI chatbot trained on your business data to handle support and leads 24/7.",
      whatYouGet: [
        "AI-powered responses",
        "Website integration",
        "Custom knowledge base",
      ],
      deliverables: ["Deployed chatbot", "Training setup"],
      techStack: ["OpenAI", "Node.js", "MongoDB"],
      pricing: [{ minPrice: 15000, maxPrice: 30000 }],
      estimatedTimeline: "1 week",
      category: "ai",
      order: 6,
    },

    {
      title: "E-commerce Website",
      slug: "ecommerce-website",
      shortDescription: "Sell products online with payments & inventory.",
      longDescription:
        "Complete e-commerce solution with cart, checkout, and payment gateways.",
      whatYouGet: [
        "Product listing",
        "Cart & checkout",
        "Payment integration",
      ],
      deliverables: ["Live store", "Admin dashboard"],
      pricing: [
        { label: "Shopify", minPrice: 25000 },
        { label: "Custom MERN", minPrice: 50000, maxPrice: 100000 },
      ],
      estimatedTimeline: "2–4 weeks",
      category: "ecommerce",
      order: 7,
    },
  ];

  await Service.insertMany(services);
  console.log("All services seeded successfully");

  await mongoose.connection.close();
}

seedServices();
