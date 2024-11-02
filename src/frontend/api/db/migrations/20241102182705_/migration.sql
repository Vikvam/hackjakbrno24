/*
  Warnings:

  - Added the required column `userId` to the `UserScheduleDay` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserScheduleDay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userScheduleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "day" DATETIME NOT NULL,
    "dayPart" INTEGER NOT NULL,
    "preference" INTEGER NOT NULL,
    "reasonCode" INTEGER NOT NULL,
    "reasonText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserScheduleDay_userScheduleId_fkey" FOREIGN KEY ("userScheduleId") REFERENCES "UserSchedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserScheduleDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserScheduleDay" ("createdAt", "day", "dayPart", "id", "preference", "reasonCode", "reasonText", "updatedAt", "userScheduleId") SELECT "createdAt", "day", "dayPart", "id", "preference", "reasonCode", "reasonText", "updatedAt", "userScheduleId" FROM "UserScheduleDay";
DROP TABLE "UserScheduleDay";
ALTER TABLE "new_UserScheduleDay" RENAME TO "UserScheduleDay";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
