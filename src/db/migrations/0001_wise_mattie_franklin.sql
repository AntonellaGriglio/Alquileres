ALTER TABLE "estadia" ALTER COLUMN "id_estado" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "pago" ALTER COLUMN "importe" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "pago" ALTER COLUMN "id_tipo_pago" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "usuario" ADD COLUMN "nombreUsuario" varchar;--> statement-breakpoint
ALTER TABLE "usuario" DROP COLUMN IF EXISTS "usuario";