/*
  Warnings:

  - Added the required column `name` to the `Tomato` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tomato" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Tomato" ("id") SELECT "id" FROM "Tomato";
DROP TABLE "Tomato";
ALTER TABLE "new_Tomato" RENAME TO "Tomato";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
