-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_API" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_API" ("desc", "id", "name", "parentId", "title", "type") SELECT "desc", "id", "name", "parentId", "title", "type" FROM "API";
DROP TABLE "API";
ALTER TABLE "new_API" RENAME TO "API";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
