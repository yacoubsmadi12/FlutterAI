import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password"),
  displayName: text("display_name"),
  photoURL: text("photo_url"),
  provider: text("provider").default("email"), // 'email' | 'google'
  language: text("language").default("en"), // 'en' | 'ar'
  theme: text("theme").default("light"), // 'light' | 'dark'
  credits: integer("credits").default(100),
  subscription: text("subscription").default("free"), // 'free' | 'pro' | 'enterprise'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  theme: text("theme").default("modern"),
  language: text("language").default("en"),
  status: text("status").default("draft"), // 'draft' | 'generating' | 'completed' | 'error'
  generatedCode: jsonb("generated_code"),
  assets: jsonb("assets"),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const generations = pgTable("generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull().references(() => projects.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  prompt: text("prompt").notNull(),
  generatedCode: jsonb("generated_code"),
  creditsUsed: integer("credits_used").default(0),
  status: text("status").default("pending"), // 'pending' | 'completed' | 'error'
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  plan: text("plan").notNull(), // 'free' | 'pro' | 'enterprise'
  status: text("status").default("active"), // 'active' | 'cancelled' | 'expired'
  creditsRemaining: integer("credits_remaining").default(0),
  paypalSubscriptionId: text("paypal_subscription_id"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGenerationSchema = createInsertSchema(generations).omit({
  id: true,
  createdAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Generation = typeof generations.$inferSelect;
export type InsertGeneration = z.infer<typeof insertGenerationSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
