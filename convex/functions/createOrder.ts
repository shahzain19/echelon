import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    customerName: v.string(),
    phone: v.string(),
    address: v.string(),
    productIds: v.array(v.string()),
    total: v.number(),
  },
  handler: async ({ db }, { customerName, phone, address, productIds, total }) => {
    await db.insert("orders", {
      customerName,
      phone,
      address,
      productIds,
      total,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});
