/*
  Warnings:

  - Added the required column `day` to the `UserScheduleDay` table without a default value. This is not possible if the table is not empty.

*/
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
    "shiftId" INTEGER,
    "day" DATETIME NOT NULL,
    CONSTRAINT "UserScheduleDay_userScheduleId_fkey" FOREIGN KEY ("userScheduleId") REFERENCES "UserSchedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserScheduleDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserScheduleDay_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserScheduleDay" ("createdAt", "id", "preference", "reasonCode", "reasonText", "updatedAt", "userId", "userScheduleId") SELECT "createdAt", "id", "preference", "reasonCode", "reasonText", "updatedAt", "userId", "userScheduleId" FROM "UserScheduleDay";
DROP TABLE "UserScheduleDay";
ALTER TABLE "new_UserScheduleDay" RENAME TO "UserScheduleDay";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
