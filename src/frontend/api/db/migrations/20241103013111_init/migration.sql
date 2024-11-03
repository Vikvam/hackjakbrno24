-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "occupation" TEXT NOT NULL,
    "stem" TEXT,
    "attestation" TEXT,
    "qualification" TEXT,
    "rtg_preference" REAL,
    "ct_preference" REAL
);

-- CreateTable
CREATE TABLE "UserSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "week" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserScheduleDay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userScheduleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "preference" INTEGER,
    "reasonCode" INTEGER,
    "reasonText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "shiftSlotId" INTEGER NOT NULL,
    CONSTRAINT "UserScheduleDay_userScheduleId_fkey" FOREIGN KEY ("userScheduleId") REFERENCES "UserSchedule" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserScheduleDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserScheduleDay_shiftSlotId_fkey" FOREIGN KEY ("shiftSlotId") REFERENCES "ShiftSlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Shift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "employeeType" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "qualification" TEXT
);

-- CreateTable
CREATE TABLE "ShiftSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ShiftSlot_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShiftSlot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserScheduleDay_shiftSlotId_key" ON "UserScheduleDay"("shiftSlotId");
