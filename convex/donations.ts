import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./lib/auth";
import { logAuditAction } from "./auditLog";

export const createDonationIntent = mutation({
  args: {
    amount: v.number(),
    currency: v.string(),
    programmeId: v.id("programmes"),
    method: v.union(v.literal("card"), v.literal("bank"), v.literal("crypto")),
    donorName: v.string(),
    donorEmail: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate programme exists
    const programme = await ctx.db.get(args.programmeId);
    if (!programme) {
      throw new Error("Programme not found");
    }

    // Create pending donation
    const donationId = await ctx.db.insert("donations", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });

    return { donationId };
  },
});

export const getDonationsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db
      .query("donations")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const getDonationById = query({
  args: { id: v.id("donations") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.db.get(args.id);
  },
});

export const verifyDonation = mutation({
  args: {
    donationId: v.id("donations"),
    paystackReference: v.string(),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);

    const donation = await ctx.db.get(args.donationId);
    if (!donation) {
      throw new Error("Donation not found");
    }

    if (donation.status !== "pending") {
      throw new Error("Donation already processed");
    }

    // Update donation status
    await ctx.db.patch(args.donationId, {
      status: "verified",
      paystackReference: args.paystackReference,
      verifiedBy: admin._id,
      verifiedAt: Date.now(),
    });

    // Log audit action
    await logAuditAction(
      ctx,
      admin._id,
      "verify_donation",
      args.donationId,
      `Verified ${donation.currency} ${donation.amount} donation from ${donation.donorName}`
    );

    return await ctx.db.get(args.donationId);
  },
});

export const rejectDonation = mutation({
  args: {
    donationId: v.id("donations"),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);

    const donation = await ctx.db.get(args.donationId);
    if (!donation) {
      throw new Error("Donation not found");
    }

    await ctx.db.patch(args.donationId, {
      status: "failed",
      rejectionReason: args.reason,
    });

    // Log audit action
    await logAuditAction(
      ctx,
      admin._id,
      "reject_donation",
      args.donationId,
      `Rejected donation: ${args.reason}`
    );

    return await ctx.db.get(args.donationId);
  },
});

export const getDonationAggregates = query({
  args: { programmeId: v.optional(v.id("programmes")) },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("donations")
      .withIndex("by_status", (q) => q.eq("status", "verified"));

    const donations = await query.collect();

    let filtered = donations;
    if (args.programmeId) {
      filtered = donations.filter((d) => d.programmeId === args.programmeId);
    }

    const totalAmount = filtered.reduce((sum, d) => sum + d.amount, 0);
    const totalDonations = filtered.length;

    return {
      totalAmount,
      totalDonations,
      currencyBreakdown: filtered.reduce(
        (acc, d) => {
          acc[d.currency] = (acc[d.currency] || 0) + d.amount;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  },
});
