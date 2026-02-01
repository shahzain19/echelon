import { query } from "../_generated/server";

export const getProducts = query({
  handler: async ({ db }) => {
    return await db.query("products").collect();
  },
});
