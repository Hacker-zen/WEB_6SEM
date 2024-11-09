import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711133012317 implements MigrationInterface {
    name = 'Migration1711133012317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "imageUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "imageUrl" SET NOT NULL`);
    }

}
