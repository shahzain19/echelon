import { query } from "../_generated/server";
import { v } from "convex/values";

export const trackOrderByPhone = query({
  args: {
    phone: v.string(),
  },
  handler: async ({ db }, { phone }) => {
    const orders = await db
      .query("orders")
      .filter((q) => q.eq(q.field("phone"), phone))
      .order("desc")
      .collect();
    
    return orders;
  },
});
