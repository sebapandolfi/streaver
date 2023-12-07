/*
  Warnings:

  - You are about to drop the column `latitude` on the `GeoLocation` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `GeoLocation` table. All the data in the column will be lost.
  - Added the required column `lat` to the `GeoLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `GeoLocation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GeoLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lat" TEXT NOT NULL,
    "lng" TEXT NOT NULL
);
INSERT INTO "new_GeoLocation" ("id") SELECT "id" FROM "GeoLocation";
DROP TABLE "GeoLocation";
ALTER TABLE "new_GeoLocation" RENAME TO "GeoLocation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
