import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.string(),
  },
  handler: async ({ db }, { orderId, status }) => {
    await db.patch(orderId, { status });
  },
});
