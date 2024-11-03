/*
  Warnings:

  - You are about to drop the column `schedule` on the `UserSchedule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "week" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserSchedule" ("createdAt", "id", "month", "type", "updatedAt", "userId", "week") SELECT "createdAt", "id", "month", "type", "updatedAt", "userId", "week" FROM "UserSchedule";
DROP TABLE "UserSchedule";
ALTER TABLE "new_UserSchedule" RENAME TO "UserSchedule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
