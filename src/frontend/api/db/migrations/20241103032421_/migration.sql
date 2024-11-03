/*
  Warnings:

  - You are about to drop the `ShiftSlot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `shiftSlotId` on the `UserScheduleDay` table. All the data in the column will be lost.
  - Made the column `qualification` on table `Shift` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `schedule` to the `UserSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `UserScheduleDay` table without a default value. This is not possible if the table is not empty.
  - Made the column `preference` on table `UserScheduleDay` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reasonCode` on table `UserScheduleDay` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reasonText` on table `UserScheduleDay` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ShiftSlot";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "employeeType" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL
);
INSERT INTO "new_Shift" ("amount", "department", "employeeType", "id", "qualification", "type") SELECT "amount", "department", "employeeType", "id", "qualification", "type" FROM "Shift";
DROP TABLE "Shift";
ALTER TABLE "new_Shift" RENAME TO "Shift";
CREATE TABLE "new_UserSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "week" INTEGER,
    "schedule" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserSchedule" ("createdAt", "id", "month", "type", "updatedAt", "userId", "week") SELECT "createdAt", "id", "month", "type", "updatedAt", "userId", "week" FROM "UserSchedule";
DROP TABLE "UserSchedule";
ALTER TABLE "new_UserSchedule" RENAME TO "UserSchedule";
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
