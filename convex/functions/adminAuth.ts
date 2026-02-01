import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const login = query({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async ({ db }, { username, password }) => {
    const admin = await db
      .query("admins")
      .withIndex("by_username", (q) => q.eq("username", username))
      .first();
    
    if (admin && admin.password === password) {
      return { success: true, adminId: admin._id };
    }
    return { success: false };
  },
});

export const createAdmin = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async ({ db }, { username, password }) => {
    const existing = await db
      .query("admins")
      .withIndex("by_username", (q) => q.eq("username", username))
      .first();
    
    if (existing) {
      throw new Error("Admin already exists");
    }
    
    await db.insert("admins", { username, password });
    return { success: true };
  },
});
