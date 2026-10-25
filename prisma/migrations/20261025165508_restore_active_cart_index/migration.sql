-- This is an empty migration.

CREATE UNIQUE INDEX "Cart_one_active_per_user"
ON "Cart" ("userId")
WHERE "cartType" = 'ACTIVE';