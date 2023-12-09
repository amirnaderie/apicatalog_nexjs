-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subMenu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "subMenu_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_subMenu" ("id", "name", "parentId") SELECT "id", "name", "parentId" FROM "subMenu";
DROP TABLE "subMenu";
ALTER TABLE "new_subMenu" RENAME TO "subMenu";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
