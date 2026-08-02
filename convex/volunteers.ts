import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";
import { logAuditAction } from "./auditLog";

export const submitVolunteerApplication = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    areaOfInterest: v.union(
      v.literal("health"),
      v.literal("education"),
      v.literal("youth")
    ),
    availability: v.string(),
    experience: v.string(),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert("volunteerApplications", {
      ...args,
      status: "applied",
      createdAt: Date.now(),
    });

    return { applicationId, status: "applied" };
  },
});

export const getVolunteerApplications = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    if (args.status) {
      return await ctx.db
        .query("volunteerApplications")
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .collect();
    }

    return await ctx.db.query("volunteerApplications").collect();
  },
});

export const getVolunteerApplicationById = query({
  args: { id: v.id("volunteerApplications") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.get(args.id);
  },
});

export const updateVolunteerStatus = mutation({
  args: {
    applicationId: v.id("volunteerApplications"),
    newStatus: v.union(
      v.literal("applied"),
      v.literal("screening"),
      v.literal("induction"),
      v.literal("placed"),
      v.literal("rejected")
    ),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);

    const application = await ctx.db.get(args.applicationId);
    if (!application) {
      throw new Error("Volunteer application not found");
    }

    await ctx.db.patch(args.applicationId, {
      status: args.newStatus,
      rejectionReason:
        args.newStatus === "rejected" ? args.notes : undefined,
    });

    // Log audit action
    await logAuditAction(
      ctx,
      admin._id,
      "update_volunteer_status",
      args.applicationId,
      `Status changed to ${args.newStatus}${args.notes ? ": " + args.notes : ""}`
    );

    return await ctx.db.get(args.applicationId);
  },
});

export const getVolunteerStats = query({
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const allApplications = await ctx.db
      .query("volunteerApplications")
      .collect();

    return {
      total: allApplications.length,
      byStatus: allApplications.reduce(
        (acc, app) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      byArea: allApplications.reduce(
        (acc, app) => {
          acc[app.areaOfInterest] = (acc[app.areaOfInterest] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  },
});
