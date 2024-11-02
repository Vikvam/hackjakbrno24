/*
  Warnings:

  - Added the required column `occupation` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "occupation" TEXT NOT NULL,
    "stem" TEXT,
    "attestation" TEXT,
    "qualification" TEXT,
    "rtg_preference" REAL,
    "ct_preference" REAL
);
INSERT INTO "new_User" ("attestation", "ct_preference", "id", "name", "qualification", "rtg_preference", "stem") SELECT "attestation", "ct_preference", "id", "name", "qualification", "rtg_preference", "stem" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
