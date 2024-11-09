"use server"

import postgres from "postgres"

const supabaseUrl = process.env.DATABASE_URL!

export const supabaseClient = postgres(supabaseUrl)
