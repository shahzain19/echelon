import { mutation } from "../_generated/server";

// Run this once to create the default admin account
export const setup = mutation({
  handler: async ({ db }) => {
    const existing = await db.query("admins").first();
    
    if (!existing) {
      await db.insert("admins", {
        username: "admin",
        password: "admin123",
      });
      return { message: "Admin created: username=admin, password=admin123" };
    }
    
    return { message: "Admin already exists" };
  },
});
