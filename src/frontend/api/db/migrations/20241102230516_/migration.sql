/*
  Warnings:

  - You are about to drop the column `amount` on the `ShiftSlot` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `ShiftSlot` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `ShiftSlot` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ShiftSlot` table. All the data in the column will be lost.
  - Added the required column `shiftId` to the `ShiftSlot` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Shift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "employeeType" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShiftSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "shiftId" INTEGER NOT NULL,
    CONSTRAINT "ShiftSlot_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShiftSlot" ("date", "id") SELECT "date", "id" FROM "ShiftSlot";
DROP TABLE "ShiftSlot";
ALTER TABLE "new_ShiftSlot" RENAME TO "ShiftSlot";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
