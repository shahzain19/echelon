import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageStorageIds: v.array(v.id("_storage")),
    price: v.number(),
    tags: v.array(v.string()),
  },
  handler: async ({ db, storage }, { name, description, imageStorageIds, price, tags }) => {
    // Get URLs for all storage IDs
    const images = await Promise.all(
      imageStorageIds.map(async (storageId) => {
        const url = await storage.getUrl(storageId);
        return url || "";
      })
    );
    
    const productId = await db.insert("products", {
      name,
      description,
      images: images.filter(url => url !== ""),
      price,
      tags,
    });
    return productId;
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    description: v.string(),
    images: v.array(v.string()),
    price: v.number(),
    tags: v.array(v.string()),
  },
  handler: async ({ db }, { id, name, description, images, price, tags }) => {
    await db.patch(id, {
      name,
      description,
      images,
      price,
      tags,
    });
  },
});

export const deleteProduct = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  },
});
