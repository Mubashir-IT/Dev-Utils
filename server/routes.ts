import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.stats.list.path, async (_req, res) => {
    const stats = await storage.getAllStats();
    res.json(stats);
  });

  app.post(api.stats.track.path, async (req, res) => {
    try {
      const { toolId } = req.params;
      const input = api.stats.track.input.parse(req.body);
      
      await storage.trackView(toolId, input.name);
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed some initial data for demonstration
  const existingStats = await storage.getAllStats();
  if (existingStats.length === 0) {
    const tools = [
      { id: "age-calculator", name: "Age Calculator" },
      { id: "password-generator", name: "Password Generator" },
      { id: "json-formatter", name: "JSON Formatter" },
      { id: "word-counter", name: "Word Counter" },
      { id: "bmi-calculator", name: "BMI Calculator" },
      { id: "color-generator", name: "Color Generator" },
    ];
    
    for (const tool of tools) {
      // Simulate some random views
      const views = Math.floor(Math.random() * 50) + 10;
      for (let i = 0; i < views; i++) {
        await storage.trackView(tool.id, tool.name);
      }
    }
  }

  return httpServer;
}
