
import { InferColumnsDataTypes, InferInsertModel, InferModel, InferSelectModel, like, relations } from "drizzle-orm";
import { AnyPgColumn, foreignKey, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  username: text("username").unique().notNull(),
  fullName: text("full_name"),
});

export const profilesRealtions = relations(profiles,({many , one}) => ({
  tweets: many(tweets),
  likes: many(likes),
  bookmarks: many(bookmarks),
  replies: many(replies)
}))

export const tweets = pgTable("tweets", {
  id: uuid("id").primaryKey(),
  text: text("text").notNull(),
  profileId: uuid("profile_id").notNull().references(() => profiles.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tweetsRealtions = relations(tweets, ({ many, one }) => ({
  profiles: one(profiles, {
    fields: [tweets.profileId],
    references: [profiles.id]
  })
}));

export const hashtags = pgTable("hashtags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
});

export const tweetHashtag = pgTable("tweet_hashtag", {
  tweetId: uuid("tweet_id").notNull().defaultRandom().references(() => tweets.id),
  hashtagId: uuid("hashtag_id").notNull().defaultRandom().references(() => hashtags.id),
});

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  text: text("text"),
  profileId: uuid("user_id").notNull().references(() => profiles.id),
  tweetId: uuid("tweet_id").references(() => tweets.id),
  replyId: uuid("reply_id").references(():AnyPgColumn => replies.id),
});

export const repliesRealtions = relations(replies, ({ many, one }) => ({
  profiles: one(profiles, {
    fields: [replies.profileId],
    references: [profiles.id],
  }),
}));

export const likes = pgTable("likes", {
  id: uuid("id").primaryKey().notNull(),
  profileId: uuid("user_id").notNull().references(() => profiles.id),
  tweetId: uuid("tweet_id").notNull().references(() => tweets.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
},(likes) => ({
    likeUnique: uniqueIndex('likes__user_id_tweet_id__idx').on(likes.profileId, likes.tweetId)
})
);

export const likesRealtions = relations(likes, ({ many, one }) => ({
  profiles: one(profiles, {
    fields: [likes.profileId],
    references: [profiles.id],
  }),
}));



export const bookmarks = pgTable(
  "bookmarks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("user_id")
      .notNull()
      .references(() => profiles.id),
    tweetId: uuid("tweet_id")
      .notNull()
      .references(() => tweets.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (bookmarks) => ({
    bookmarkUnique: uniqueIndex("bookmarks__user_id_tweet_id__idx").on(
      bookmarks.profileId,
      bookmarks.tweetId
    ),
  })
);

export const bookmarksRealtions = relations(bookmarks, ({ many, one }) => ({
  profiles: one(profiles, {
    fields: [bookmarks.profileId],
    references: [profiles.id],
  }),
}));

export type TweetType = InferSelectModel<typeof tweets>
export type ProfileType = InferSelectModel<typeof profiles>
export type LikesType = InferSelectModel<typeof likes>