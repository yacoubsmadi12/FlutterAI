import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertProjectSchema, insertGenerationSchema } from "@shared/schema";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { generateFlutterApp } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user", error });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser(req.params.id, updates);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user", error });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId || typeof userId !== 'string') {
        return res.status(400).json({ message: "userId is required" });
      }
      
      const projects = await storage.getProjectsByUserId(userId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to get projects", error });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: "Invalid project data", error });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to get project", error });
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const updates = req.body;
      const project = await storage.updateProject(req.params.id, updates);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project", error });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const success = await storage.deleteProject(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project", error });
    }
  });

  // Generation routes
  app.post("/api/generate", async (req, res) => {
    try {
      const { projectId, userId, prompt, theme, language } = req.body;
      
      if (!projectId || !userId || !prompt) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check user credits
      const user = await storage.getUser(userId);
      if (!user || (user.credits || 0) < 10) {
        return res.status(400).json({ message: "Insufficient credits" });
      }

      // Create generation record
      const generation = await storage.createGeneration({
        projectId,
        userId,
        prompt,
        status: "pending",
        creditsUsed: 0,
      });

      // Generate Flutter code with Gemini
      try {
        const generatedCode = await generateFlutterApp(prompt, theme, language);
        const creditsUsed = 10; // Base cost

        // Update generation with results
        await storage.updateGeneration(generation.id, {
          generatedCode,
          creditsUsed,
          status: "completed",
        });

        // Update user credits
        await storage.updateUser(userId, {
          credits: (user.credits || 0) - creditsUsed,
        });

        // Update project with generated code
        await storage.updateProject(projectId, {
          generatedCode,
          status: "completed",
        });

        res.json({ generation: { ...generation, generatedCode, creditsUsed, status: "completed" } });
      } catch (geminiError) {
        await storage.updateGeneration(generation.id, {
          status: "error",
          errorMessage: geminiError instanceof Error ? geminiError.message : "Generation failed",
        });
        
        res.status(500).json({ message: "Code generation failed", error: geminiError });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to generate code", error });
    }
  });

  app.get("/api/generations/:projectId", async (req, res) => {
    try {
      const generations = await storage.getGenerationsByProjectId(req.params.projectId);
      res.json(generations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get generations", error });
    }
  });

  // PayPal routes
  app.get("/api/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/api/paypal/order", async (req, res) => {
    await createPaypalOrder(req, res);
  });

  app.post("/api/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  // Subscription routes
  app.get("/api/subscriptions/:userId", async (req, res) => {
    try {
      const subscription = await storage.getSubscriptionByUserId(req.params.userId);
      res.json(subscription);
    } catch (error) {
      res.status(500).json({ message: "Failed to get subscription", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
