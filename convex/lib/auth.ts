import { QueryCtx, MutationCtx, ConvexError } from "convex/server";

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
  minRole: "reviewer" | "super_admin" = "reviewer"
) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError("Not authenticated");
  }

  const admin = await ctx.db
    .query("admins")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
    .first();

  if (!admin) {
    throw new ConvexError("Not authorized: admin role required");
  }

  if (minRole === "super_admin" && admin.role !== "super_admin") {
    throw new ConvexError("Not authorized: super_admin role required");
  }

  return admin;
}
