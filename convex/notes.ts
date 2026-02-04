import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('notes')
      .withIndex('by_createdAt')
      .order('desc')
      .take(20)
  },
})

export const add = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert('notes', {
      text: args.text,
      createdAt: Date.now(),
    })
  },
})
