-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('admin', 'coach', 'player');

-- CreateEnum
CREATE TYPE "public"."PlayerStatus" AS ENUM ('Starter', 'Bench');

-- CreateEnum
CREATE TYPE "public"."PlayerPosition" AS ENUM ('pg', 'sg', 'sf', 'pf', 'c');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pfp_url" TEXT,
    "role" "public"."UserRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "logo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."coaches" (
    "user_id" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,

    CONSTRAINT "coaches_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."players" (
    "user_id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "position" "public"."PlayerPosition" NOT NULL DEFAULT 'pg',
    "status" "public"."PlayerStatus" NOT NULL DEFAULT 'Starter',
    "team_id" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "user_id" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."matches" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "score_team1" INTEGER,
    "score_team2" INTEGER,
    "home_team" TEXT NOT NULL,
    "away_team" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stats" (
    "id" TEXT NOT NULL,
    "points" INTEGER,
    "rebounds" INTEGER,
    "assists" INTEGER,
    "player_id" TEXT NOT NULL,
    "match_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "coaches_team_id_key" ON "public"."coaches"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "stats_player_id_match_id_key" ON "public"."stats"("player_id", "match_id");

-- AddForeignKey
ALTER TABLE "public"."coaches" ADD CONSTRAINT "coaches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."coaches" ADD CONSTRAINT "coaches_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."players" ADD CONSTRAINT "players_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."players" ADD CONSTRAINT "players_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."admins" ADD CONSTRAINT "admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_home_team_fkey" FOREIGN KEY ("home_team") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."matches" ADD CONSTRAINT "matches_away_team_fkey" FOREIGN KEY ("away_team") REFERENCES "public"."teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stats" ADD CONSTRAINT "stats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stats" ADD CONSTRAINT "stats_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
