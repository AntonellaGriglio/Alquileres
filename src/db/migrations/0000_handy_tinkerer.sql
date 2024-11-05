CREATE TABLE IF NOT EXISTS "alojamiento" (
	"id" varchar PRIMARY KEY NOT NULL,
	"id_complejo" varchar,
	"nombre" varchar,
	"cant_personas" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cliente" (
	"id" varchar PRIMARY KEY NOT NULL,
	"nombre_completo" varchar,
	"telefono" varchar,
	"email" varchar,
	"provincia" varchar,
	"localidad" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "complejo_usuario" (
	"id" varchar PRIMARY KEY NOT NULL,
	"id_complejo" varchar,
	"id_usuario" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "complejo" (
	"id" varchar PRIMARY KEY NOT NULL,
	"nombre" varchar,
	"color" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cuenta" (
	"id" varchar PRIMARY KEY NOT NULL,
	"id_complejo" varchar,
	"cbu" varchar,
	"banco" varchar,
	"alias" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estadia" (
	"id" varchar PRIMARY KEY NOT NULL,
	"id_cliente" varchar,
	"fecha_creacion" timestamp DEFAULT now(),
	"id_estado" integer,
	"fecha_ingreso" timestamp,
	"fecha_egreso" timestamp,
	"cant_personas" integer,
	"desayuno" boolean,
	"importe_total" integer,
	"id_alojamiento" varchar,
	"cant_noches" integer,
	"id_usuario" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "estadoEstadia" (
	"id" varchar PRIMARY KEY NOT NULL,
	"nombre" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forma_pago" (
	"id" varchar PRIMARY KEY NOT NULL,
	"nombre" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pago" (
	"id" varchar PRIMARY KEY NOT NULL,
	"importe" varchar,
	"id_forma_pago" varchar,
	"id_tipo_pago" integer,
	"fecha" timestamp DEFAULT now(),
	"id_estadia" varchar,
	"id_cuenta" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tipo_pago" (
	"id" varchar PRIMARY KEY NOT NULL,
	"nombre" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tipo_usuario" (
	"id" varchar PRIMARY KEY NOT NULL,
	"nombre" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usuario" (
	"id" varchar PRIMARY KEY NOT NULL,
	"id_tipo" varchar,
	"nombre_completo" varchar,
	"usuario" integer,
	"contrasenia" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "complejo_usuario" ADD CONSTRAINT "complejo_usuario_id_complejo_complejo_id_fk" FOREIGN KEY ("id_complejo") REFERENCES "public"."complejo"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "complejo_usuario" ADD CONSTRAINT "complejo_usuario_id_usuario_usuario_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cuenta" ADD CONSTRAINT "cuenta_id_complejo_complejo_id_fk" FOREIGN KEY ("id_complejo") REFERENCES "public"."complejo"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pago" ADD CONSTRAINT "pago_id_estadia_estadia_id_fk" FOREIGN KEY ("id_estadia") REFERENCES "public"."estadia"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pago" ADD CONSTRAINT "pago_id_cuenta_cuenta_id_fk" FOREIGN KEY ("id_cuenta") REFERENCES "public"."cuenta"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
