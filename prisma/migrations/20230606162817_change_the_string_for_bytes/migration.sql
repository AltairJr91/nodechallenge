/*
  Warnings:

  - You are about to alter the column `image` on the `Files` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" BLOB NOT NULL
);
INSERT INTO "new_Files" ("id", "image", "name") SELECT "id", "image", "name" FROM "Files";
DROP TABLE "Files";
ALTER TABLE "new_Files" RENAME TO "Files";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
