/*
  Warnings:

  - You are about to drop the `ShiftSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `shiftSlotId` on the `UserScheduleDay` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ShiftSlot";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserScheduleDay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userScheduleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "preference" INTEGER NOT NULL,
    "reasonCode" INTEGER NOT NULL,
    "reasonText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserScheduleDay_userScheduleId_fkey" FOREIGN KEY ("userScheduleId") REFERENCES "UserSchedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserScheduleDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserScheduleDay" ("createdAt", "id", "preference", "reasonCode", "reasonText", "updatedAt", "userId", "userScheduleId") SELECT "createdAt", "id", "preference", "reasonCode", "reasonText", "updatedAt", "userId", "userScheduleId" FROM "UserScheduleDay";
DROP TABLE "UserScheduleDay";
ALTER TABLE "new_UserScheduleDay" RENAME TO "UserScheduleDay";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
