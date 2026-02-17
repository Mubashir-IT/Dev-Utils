import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We'll track usage statistics for the tools to add some backend functionality
export const toolStats = pgTable("tool_stats", {
  id: serial("id").primaryKey(),
  toolId: text("tool_id").notNull().unique(), // e.g., 'json-formatter', 'bmi-calculator'
  name: text("name").notNull(),
  views: integer("views").default(0).notNull(),
  lastAccessed: timestamp("last_accessed").defaultNow(),
});

export const insertToolStatSchema = createInsertSchema(toolStats).omit({ 
  id: true, 
  views: true, 
  lastAccessed: true 
});

export type ToolStat = typeof toolStats.$inferSelect;
export type InsertToolStat = z.infer<typeof insertToolStatSchema>;
