-- CreateTable
CREATE TABLE "ShiftSlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "qualification" TEXT NOT NULL
);
