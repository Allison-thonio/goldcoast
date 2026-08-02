import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";
import { QueryCtx, MutationCtx } from "convex/server";

export const logAuditAction = async (
  ctx: MutationCtx | QueryCtx,
  adminId: any,
  action: string,
  targetId: string | undefined,
  detail: string
) => {
  if (ctx.db) {
    // Only insert if we have db context
    try {
      await (ctx as MutationCtx).db.insert("auditLog", {
        adminId,
        action,
        targetId,
        detail,
        createdAt: Date.now(),
      });
    } catch (e) {
      // Silently fail if not in mutation context
    }
  }
};

export const getAuditLog = query({
  args: {
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, "super_admin");

    const limit = args.limit || 50;
    const offset = args.offset || 0;

    const allEntries = await ctx.db
      .query("auditLog")
      .order("desc")
      .collect();

    return {
      entries: allEntries.slice(offset, offset + limit),
      total: allEntries.length,
      hasMore: offset + limit < allEntries.length,
    };
  },
});

export const getAuditLogForTarget = query({
  args: { targetId: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const entries = await ctx.db.query("auditLog").collect();
    return entries
      .filter((e) => e.targetId === args.targetId)
      .sort((a, b) => b.createdAt - a.createdAt);
  },
});
