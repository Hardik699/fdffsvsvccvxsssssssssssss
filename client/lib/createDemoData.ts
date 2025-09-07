import { Asset, STORAGE_KEY, nextWxId } from "./systemAssets";

export function createDemoSystemAssets(): Asset[] {
  const today = new Date().toISOString();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  const warranty = oneYearLater.toISOString();

  const demoAssets: Asset[] = [
    // Demo Set 1 - High-end gaming setup
    {
      id: "WX-M-001",
      category: "mouse",
      serialNumber: "LOG-MX3-789012",
      vendorName: "Logitech",
      companyName: "Tech Solutions Inc",
      purchaseDate: "2024-01-15",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-K-001",
      category: "keyboard",
      serialNumber: "COR-K70-456789",
      vendorName: "Corsair",
      companyName: "Tech Solutions Inc",
      purchaseDate: "2024-01-15",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-MB-001",
      category: "motherboard",
      serialNumber: "ASU-B550M-123456",
      vendorName: "ASUS",
      companyName: "Tech Solutions Inc",
      purchaseDate: "2024-01-10",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-R-001",
      category: "ram",
      serialNumber: "COR-32GB-789012",
      vendorName: "Corsair",
      companyName: "Tech Solutions Inc",
      purchaseDate: "2024-01-10",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-PS-001",
      category: "power-supply",
      serialNumber: "EVG-750W-345678",
      vendorName: "EVGA",
      companyName: "Tech Solutions Inc",
      purchaseDate: "2024-01-10",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-H-001",
      category: "headphone",
      serialNumber: "SON-WH1000-567890",
      vendorName: "Sony",
      companyName: "Tech Solutions Inc",
      purchaseDate: "2024-01-20",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-C-001",
      category: "camera",
      serialNumber: "LOG-C920-234567",
      vendorName: "Logitech",
      companyName: "Tech Solutions Inc",
      purchaseDate: "2024-01-20",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-MN-001",
      category: "monitor",
      serialNumber: "DEL-U2720Q-890123",
      vendorName: "Dell",
      companyName: "Tech Solutions Inc",
      purchaseDate: "2024-01-15",
      warrantyEndDate: warranty,
      createdAt: today,
    },

    // Demo Set 2 - Office setup
    {
      id: "WX-M-002",
      category: "mouse",
      serialNumber: "HP-WL-mouse-112233",
      vendorName: "HP",
      companyName: "Business Corp",
      purchaseDate: "2024-02-01",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-K-002",
      category: "keyboard",
      serialNumber: "HP-KB-wired-445566",
      vendorName: "HP",
      companyName: "Business Corp",
      purchaseDate: "2024-02-01",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-MB-002",
      category: "motherboard",
      serialNumber: "HP-OFFICE-MB-778899",
      vendorName: "HP",
      companyName: "Business Corp",
      purchaseDate: "2024-02-01",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-R-002",
      category: "ram",
      serialNumber: "HP-16GB-DDR4-998877",
      vendorName: "HP",
      companyName: "Business Corp",
      purchaseDate: "2024-02-01",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-PS-002",
      category: "power-supply",
      serialNumber: "HP-500W-654321",
      vendorName: "HP",
      companyName: "Business Corp",
      purchaseDate: "2024-02-01",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-H-002",
      category: "headphone",
      serialNumber: "HP-STEREO-112244",
      vendorName: "HP",
      companyName: "Business Corp",
      purchaseDate: "2024-02-05",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-C-002",
      category: "camera",
      serialNumber: "HP-WEB-CAM-556677",
      vendorName: "HP",
      companyName: "Business Corp",
      purchaseDate: "2024-02-05",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-MN-002",
      category: "monitor",
      serialNumber: "HP-24inch-334455",
      vendorName: "HP",
      companyName: "Business Corp",
      purchaseDate: "2024-02-01",
      warrantyEndDate: warranty,
      createdAt: today,
    },
    {
      id: "WX-V-001",
      category: "vonage",
      serialNumber: "VON-PHONE-998877",
      vendorName: "Vonage",
      companyName: "Business Corp",
      purchaseDate: "2024-02-10",
      warrantyEndDate: warranty,
      createdAt: today,
      vonageNumber: "+1-555-123-4567",
      vonageExtCode: "101",
      vonagePassword: "demo123!",
    },
  ];

  return demoAssets;
}

export function loadDemoData() {
  const existing = localStorage.getItem(STORAGE_KEY);
  const currentAssets: Asset[] = existing ? JSON.parse(existing) : [];

  // Check if demo data already exists
  const hasDemo = currentAssets.some(
    (asset) => asset.id.includes("WX-M-001") || asset.id.includes("WX-M-002"),
  );

  if (!hasDemo) {
    const demoAssets = createDemoSystemAssets();
    const allAssets = [...currentAssets, ...demoAssets];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allAssets));
    try {
      fetch("/api/hr/assets/upsert-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": "admin" },
        body: JSON.stringify({ items: demoAssets }),
      }).catch(() => {});
    } catch {}
    console.log("Demo system assets loaded:", demoAssets.length);
    return demoAssets;
  }

  console.log("Demo data already exists");
  return [];
}

// --- Demo employees ---
export type DemoEmployee = {
  id: string;
  employeeId: string;
  fullName: string;
  department: string;
  position?: string;
  tableNumber?: string;
  email?: string;
  photo?: string;
  bankPassbook?: string;
  aadhaarCard?: string;
  panCard?: string;
  resume?: string;
};

export function createDemoEmployees(): DemoEmployee[] {
  const img =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAACXBIWXMAAAsTAAALEwEAmpwYAAABKklEQVR4nO3WsQnEIAwF0L7n/6a7lq9gQw5y2U8zJk6h0kQ3mQGx1g9ZgQAAAAAAAAAwGv6f3k1S0l3m1eF7c3QZ3g5rj7m7n+u3wQ8n2FvY8l8n2FvY8l8n2FvY8l8n2FvY8l8n2FvY8l8n2FvY8l8n2FvY8l8n2FvY8l8n2FvY8l8n2FvY8l8n2FfY4r9/sdV2y8AAGAwYwz3Xl8oQAAAABJRU5ErkJggg==";
  const now = Date.now();
  const names = [
    "Rahul Sharma",
    "Priya Verma",
    "Amit Kumar",
    "Sneha Patel",
    "Vikas Gupta",
  ];

  const depts = ["Engineering", "HR", "Sales", "Support", "Finance"];

  const employees: DemoEmployee[] = names.map((name, i) => ({
    id: `${now}-${i}`,
    employeeId: `EMP${(now + i).toString().slice(-4)}`,
    fullName: name,
    department: depts[i % depts.length],
    position: i % 2 === 0 ? "Software Engineer" : "Executive",
    tableNumber: `${i + 1}`,
    email: `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    photo: img,
    bankPassbook: img,
    aadhaarCard: img,
    panCard: img,
    resume: img,
  }));

  return employees;
}

export function loadDemoEmployees() {
  const existing = localStorage.getItem("hrEmployees");
  const current = existing ? JSON.parse(existing) : [];
  if (Array.isArray(current) && current.length >= 5) {
    console.log("Demo employees already present");
    return [];
  }
  const demo = createDemoEmployees();
  const merged = [...demo, ...current];
  localStorage.setItem("hrEmployees", JSON.stringify(merged));
  // also ensure departments exist
  const deptsRaw = localStorage.getItem("departments");
  const depts = deptsRaw ? JSON.parse(deptsRaw) : [];
  const needed = Array.from(new Set(demo.map((d) => d.department))).map((name) => ({ id: `D-${name}`, name }));
  const mergedDepts = [...needed, ...depts];
  localStorage.setItem("departments", JSON.stringify(mergedDepts));

  // attempt to sync to server
  try {
    for (const e of demo) {
      fetch("/api/hr/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-role": "admin" },
        body: JSON.stringify(e),
      }).catch(() => {});
    }
  } catch {}

  console.log("Demo employees loaded:", demo.length);
  return demo;
}
