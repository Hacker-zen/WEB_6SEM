import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711231596972 implements MigrationInterface {
    name = 'Migration1711231596972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalPrice" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalPrice" integer NOT NULL`);
    }

}
