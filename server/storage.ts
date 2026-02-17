import { db } from "./db";
import { toolStats, type ToolStat } from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getAllStats(): Promise<ToolStat[]>;
  trackView(toolId: string, name: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAllStats(): Promise<ToolStat[]> {
    return await db.select().from(toolStats);
  }

  async trackView(toolId: string, name: string): Promise<void> {
    // Upsert: Increment views if exists, otherwise insert with views=1
    await db
      .insert(toolStats)
      .values({ toolId, name, views: 1 })
      .onConflictDoUpdate({
        target: toolStats.toolId,
        set: { 
          views: sql`${toolStats.views} + 1`,
          lastAccessed: new Date()
        },
      });
  }
}

export const storage = new DatabaseStorage();
