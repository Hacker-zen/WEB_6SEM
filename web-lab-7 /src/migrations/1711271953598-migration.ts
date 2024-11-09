import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711271953598 implements MigrationInterface {
    name = 'Migration1711271953598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."order_orderstatus_enum" AS ENUM('created', 'pending', 'paid', 'completed')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "orderStatus" "public"."order_orderstatus_enum" NOT NULL DEFAULT 'created'`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentMethod"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_paymentmethod_enum" AS ENUM('cash', 'card')`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentMethod" "public"."payment_paymentmethod_enum" NOT NULL DEFAULT 'cash'`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_paymentstatus_enum" AS ENUM('created', 'pending', 'paid')`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentStatus" "public"."payment_paymentstatus_enum" NOT NULL DEFAULT 'created'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`DROP TYPE "public"."payment_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentStatus" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentMethod"`);
        await queryRunner.query(`DROP TYPE "public"."payment_paymentmethod_enum"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "paymentMethod" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderStatus"`);
        await queryRunner.query(`DROP TYPE "public"."order_orderstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "orderStatus" character varying NOT NULL`);
    }

}
