/*
  Warnings:

  - You are about to drop the `subMenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "subMenu";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SubMenu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "SubMenu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_API" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "API_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "SubMenu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_API" ("desc", "id", "name", "parentId", "title", "type") SELECT "desc", "id", "name", "parentId", "title", "type" FROM "API";
DROP TABLE "API";
ALTER TABLE "new_API" RENAME TO "API";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
