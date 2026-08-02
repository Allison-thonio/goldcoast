import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  programmes: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    fullDescription: v.string(),
    whatWeDo: v.array(v.string()),
    imageUrl: v.optional(v.string()),
    active: v.boolean(),
  }).index("by_slug", ["slug"]),

  donations: defineTable({
    amount: v.number(),
    currency: v.string(),
    programmeId: v.id("programmes"),
    method: v.union(v.literal("card"), v.literal("bank"), v.literal("crypto")),
    status: v.union(v.literal("pending"), v.literal("verified"), v.literal("failed")),
    paystackReference: v.optional(v.string()),
    proofRef: v.optional(v.string()),
    receiptStorageId: v.optional(v.string()),
    donorName: v.string(),
    donorEmail: v.string(),
    verifiedBy: v.optional(v.id("admins")),
    verifiedAt: v.optional(v.number()),
    rejectionReason: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_programme", ["programmeId"])
    .index("by_email", ["donorEmail"]),

  volunteerApplications: defineTable({
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
    status: v.union(
      v.literal("applied"),
      v.literal("screening"),
      v.literal("induction"),
      v.literal("placed"),
      v.literal("rejected")
    ),
    rejectionReason: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"]),

  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_date", ["createdAt"]),

  admins: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    role: v.union(v.literal("reviewer"), v.literal("super_admin")),
  }).index("by_clerk_id", ["clerkUserId"]),

  auditLog: defineTable({
    adminId: v.id("admins"),
    action: v.string(),
    targetId: v.optional(v.string()),
    detail: v.string(),
    createdAt: v.number(),
  })
    .index("by_admin", ["adminId"])
    .index("by_date", ["createdAt"]),

  fieldLedgerAggregate: defineTable({
    yearsRunning: v.number(),
    personsUsed: v.number(),
    shelterCapacity: v.number(),
    majorFloodResponses: v.number(),
    lastUpdated: v.number(),
  }),
});
