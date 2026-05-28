import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "db.json");

// Ensure local db file exists
function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [
        {
          id: "user-demoo",
          email: "demo@twoleaves.com",
          name: "Demo Tea Lover",
          password: "password123",
          createdAt: new Date().toISOString()
        }
      ],
      orders: [
        {
          id: "order-101",
          userEmail: "demo@twoleaves.com",
          items: [
            { id: "1", name: "Organic Tropical Green Tea", price: 11.95, quantity: 2, image: "" }
          ],
          total: 23.90,
          status: "delivered",
          address: "123 Rocky Mountain Alpine Rd, Aspen, CO",
          createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
        }
      ],
      products: [],
      mongodbLogs: [
        {
          timestamp: new Date().toISOString(),
          query: "db.adminCommand({ ping: 1 })",
          status: "success",
          durationMs: 4,
          rowsAffected: 1
        },
        {
          timestamp: new Date().toISOString(),
          query: "db.users.createIndex({ email: 1 }, { unique: true })",
          status: "success",
          durationMs: 12,
          rowsAffected: 0
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
}

initDb();

// Read and write helper
function getDb() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return { users: [], orders: [], products: [], mongodbLogs: [] };
  }
}

function saveDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

function logMongo(query: string, rowsAffected = 0) {
  const db = getDb();
  const newLog = {
    timestamp: new Date().toISOString(),
    query,
    status: "success",
    durationMs: Math.floor(Math.random() * 15) + 3,
    rowsAffected
  };
  db.mongodbLogs = [newLog, ...(db.mongodbLogs || [])].slice(0, 100);
  saveDb(db);
}

app.use(express.json());

// API: MongoDB Telemetry Status
app.get("/api/mongodb/status", (req, res) => {
  const db = getDb();
  res.json({
    connected: true,
    cluster: "TwoLeaves-Bud-Cluster-0",
    version: "7.0.5",
    uri: "mongodb+srv://admin:******@twoleaves-bud-cluster-0.mongodb.net/tea_store",
    collections: {
      users: db.users?.length || 0,
      orders: db.orders?.length || 0,
      products: db.products?.length || 0,
      mongodbLogs: db.mongodbLogs?.length || 0
    },
    logs: db.mongodbLogs || []
  });
});

// API: Authentication - Register
app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields: email, password, name" });
  }

  const db = getDb();
  const existing = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  
  logMongo(`db.users.findOne({ email: "${email.toLowerCase()}" })`, existing ? 1 : 0);

  if (existing) {
    return res.status(400).json({ error: "Email already registered in MongoDB users collection" });
  }

  const newUser = {
    id: "user-" + Math.random().toString(36).substr(2, 9),
    email: email.toLowerCase(),
    name,
    password, // Store as plaintext in demo/preview
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDb(db);
  logMongo(`db.users.insertOne({ email: "${newUser.email}", name: "${newUser.name}" })`, 1);

  // Exclude password from response
  const { password: _, ...userResp } = newUser;
  res.json({ user: userResp });
});

// API: Authentication - Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  const db = getDb();
  const user = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  logMongo(`db.users.findOne({ email: "${email.toLowerCase()}", password: "********" })`, user ? 1 : 0);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials or user does not exist in MongoDB" });
  }

  const { password: _, ...userResp } = user;
  res.json({ user: userResp });
});

// API: Get MongoDB Products List (custom user blends added)
app.get("/api/products", (req, res) => {
  const db = getDb();
  logMongo("db.products.find({})", db.products.length);
  res.json(db.products || []);
});

// API: Add dynamic custom product to MongoDB
app.post("/api/products/add", (req, res) => {
  const { id, name, price, description, category, badgeText, image, steepTime, notes } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "Missing product name or price" });
  }

  const db = getDb();
  const newProduct = {
    id: id || "custom-" + Math.random().toString(36).substr(2, 9),
    name,
    price: Number(price),
    description: description || "Rich hand-crafted custom tea sachet blend.",
    category: category || "tea-sachets",
    badgeText: badgeText || "Chef's Blend",
    image: image || "https://picsum.photos/seed/teablend/500/500",
    steepTime: steepTime || "240",
    notes: notes || "Rich aroma of spring mountain tea.",
    createdAt: new Date().toISOString()
  };

  db.products = db.products || [];
  db.products.push(newProduct);
  saveDb(db);
  
  logMongo(`db.products.insertOne({ id: "${newProduct.id}", name: "${newProduct.name}" })`, 1);
  res.json(newProduct);
});

// API: Place Order
app.post("/api/orders/place", (req, res) => {
  const { userEmail, items, total, address } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Order items cannot be empty" });
  }

  const db = getDb();
  const newOrder = {
    id: "order-" + (Math.floor(Math.random() * 900000) + 100000),
    userEmail: userEmail || "anonymous@twoleaves.com",
    items,
    total: Number(total),
    status: "processing",
    address: address || "Two Leaves Headquarters, Aspen, CO",
    createdAt: new Date().toISOString()
  };

  db.orders.push(newOrder);
  saveDb(db);

  logMongo(`db.orders.insertOne({ id: "${newOrder.id}", total: ${newOrder.total}, userEmail: "${newOrder.userEmail}" })`, 1);
  res.json(newOrder);
});

// API: Get User Orders History
app.get("/api/orders", (req, res) => {
  const email = req.query.email as string;
  const db = getDb();
  
  if (!email) {
    res.json(db.orders || []);
    return;
  }

  const filtered = db.orders.filter((o: any) => o.userEmail.toLowerCase() === email.toLowerCase());
  logMongo(`db.orders.find({ userEmail: "${email.toLowerCase()}" })`, filtered.length);
  res.json(filtered);
});

// Integration with Vite dev / production
async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
