-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "exchangeRate" DOUBLE PRECISION NOT NULL,
    "eurAmount" DOUBLE PRECISION NOT NULL,
    "plnAmount" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

