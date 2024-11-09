import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711233051471 implements MigrationInterface {
    name = 'Migration1711233051471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "totalPrice" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "totalPrice"`);
    }

}
