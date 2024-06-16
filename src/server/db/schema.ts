// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { type InferSelectModel, relations, sql } from "drizzle-orm";
import {
  date,
  index,
  jsonb,
  pgTableCreator,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `media-library_${name}`);

export const user = createTable(
  "user",
  {
    id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    firstName: varchar("first_name", { length: 256 }).notNull(),
    middleName: varchar("middle_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }).notNull(),
    email: varchar("email_name", { length: 256 }).unique().notNull(),
    dateOfBirth: date("date_of_birth").notNull(),
    passcodeHash: varchar("passcode_hash", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (_user) => ({
    emailIndex: index("email_index").on(_user.email),
  })
);

export type userInfo = Omit<InferSelectModel<typeof user>, "updatedAt" | "passcodeHash" | "createdAt">;
export type userInsert = Omit<InferSelectModel<typeof user>, "updatedAt" | "createdAt" | "id">;
export type insertedUser = Pick<InferSelectModel<typeof user>, "id" | "email">;

export const album = createTable(
  "album",
  {
    id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: uuid("user_id").references(() => user.id).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
);

export const folder = createTable(
  "folder", 
  {
    id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    albumId: uuid("album_id").references(() => album.id),
    folderId: uuid("folder_id"),
    userId: uuid("user_id").references(() => user.id).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    description: text("description"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
     .default(sql`CURRENT_TIMESTAMP`)
     .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  }
);

export const subFolderReleation = relations(folder, ({one}) => ({
  subFolder: one(folder, {
    fields: [folder.folderId],
    references: [folder.id],
    relationName: "subfolder",
  }),
}));


export const media = createTable(
  "media",
  {
    id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    folderId: uuid("folder_id").references(() => folder.id).notNull(),
    userId: uuid("user_id").references(() => user.id).notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    description: text("description"),
    location: varchar("location", { length: 256 }).notNull(),
    mediaType: varchar("media_type", { length: 256, enum: ["Audio", "Video", "Image"] }).notNull(),
    mediaVisibility: varchar("mediaVisibility", {length: 256, enum: ["Public", "Private"]})
      .$default(() => "Public")
      .notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
     .default(sql`CURRENT_TIMESTAMP`)
     .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  }
);