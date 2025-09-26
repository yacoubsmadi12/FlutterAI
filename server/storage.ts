import { type User, type InsertUser, type Project, type InsertProject, type Generation, type InsertGeneration, type Subscription, type InsertSubscription } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // Projects
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByUserId(userId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Generations
  getGeneration(id: string): Promise<Generation | undefined>;
  getGenerationsByProjectId(projectId: string): Promise<Generation[]>;
  createGeneration(generation: InsertGeneration): Promise<Generation>;
  updateGeneration(id: string, updates: Partial<Generation>): Promise<Generation | undefined>;
  
  // Subscriptions
  getSubscriptionByUserId(userId: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: string, updates: Partial<Subscription>): Promise<Subscription | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private generations: Map<string, Generation>;
  private subscriptions: Map<string, Subscription>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.generations = new Map();
    this.subscriptions = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      password: insertUser.password ?? null,
      displayName: insertUser.displayName ?? null,
      photoURL: insertUser.photoURL ?? null,
      provider: insertUser.provider ?? null,
      credits: insertUser.credits ?? 100,
      subscription: insertUser.subscription ?? "free",
      language: insertUser.language ?? "en",
      theme: insertUser.theme ?? "light",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Projects
  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.userId === userId);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      status: insertProject.status ?? "draft",
      theme: insertProject.theme ?? "modern",
      language: insertProject.language ?? "en",
      generatedCode: insertProject.generatedCode ?? null,
      assets: insertProject.assets ?? null,
      settings: insertProject.settings ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updates, updatedAt: new Date() };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Generations
  async getGeneration(id: string): Promise<Generation | undefined> {
    return this.generations.get(id);
  }

  async getGenerationsByProjectId(projectId: string): Promise<Generation[]> {
    return Array.from(this.generations.values()).filter(gen => gen.projectId === projectId);
  }

  async createGeneration(insertGeneration: InsertGeneration): Promise<Generation> {
    const id = randomUUID();
    const generation: Generation = {
      ...insertGeneration,
      id,
      status: insertGeneration.status ?? "pending",
      creditsUsed: insertGeneration.creditsUsed ?? 0,
      generatedCode: insertGeneration.generatedCode ?? null,
      errorMessage: insertGeneration.errorMessage ?? null,
      createdAt: new Date(),
    };
    this.generations.set(id, generation);
    return generation;
  }

  async updateGeneration(id: string, updates: Partial<Generation>): Promise<Generation | undefined> {
    const generation = this.generations.get(id);
    if (!generation) return undefined;
    
    const updatedGeneration = { ...generation, ...updates };
    this.generations.set(id, updatedGeneration);
    return updatedGeneration;
  }

  // Subscriptions
  async getSubscriptionByUserId(userId: string): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(sub => sub.userId === userId);
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = randomUUID();
    const subscription: Subscription = {
      ...insertSubscription,
      id,
      status: insertSubscription.status ?? "active",
      creditsRemaining: insertSubscription.creditsRemaining ?? 0,
      paypalSubscriptionId: insertSubscription.paypalSubscriptionId ?? null,
      expiresAt: insertSubscription.expiresAt ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async updateSubscription(id: string, updates: Partial<Subscription>): Promise<Subscription | undefined> {
    const subscription = this.subscriptions.get(id);
    if (!subscription) return undefined;
    
    const updatedSubscription = { ...subscription, ...updates, updatedAt: new Date() };
    this.subscriptions.set(id, updatedSubscription);
    return updatedSubscription;
  }
}

export const storage = new MemStorage();
