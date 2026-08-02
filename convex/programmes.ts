import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";

export const getProgrammes = query({
  handler: async (ctx) => {
    return await ctx.db.query("programmes").collect();
  },
});

export const getProgrammeBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("programmes")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const createProgramme = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    fullDescription: v.string(),
    whatWeDo: v.array(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, "super_admin");
    return await ctx.db.insert("programmes", {
      ...args,
      active: true,
    });
  },
});

export const updateProgramme = mutation({
  args: {
    id: v.id("programmes"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    fullDescription: v.optional(v.string()),
    whatWeDo: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, "super_admin");
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return await ctx.db.get(id);
  },
});
