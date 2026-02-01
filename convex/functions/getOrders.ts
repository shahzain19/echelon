import { query } from "../_generated/server";

export const getOrders = query({
  handler: async ({ db }) => {
    return await db.query("orders").order("desc").collect();
  },
});
