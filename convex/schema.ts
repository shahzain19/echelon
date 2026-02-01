import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    description: v.string(),
    images: v.array(v.string()),
    price: v.number(),
    tags: v.array(v.string()),
  }),
  orders: defineTable({
    customerName: v.string(),
    phone: v.string(),
    address: v.string(),
    productIds: v.array(v.string()),
    total: v.number(),
    status: v.string(),
    createdAt: v.optional(v.number()),
  }),
  admins: defineTable({
    username: v.string(),
    password: v.string(),
  }).index("by_username", ["username"]),
});
