import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712745391796 implements MigrationInterface {
    name = 'Migration1712745391796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" RENAME COLUMN "conntent" TO "content"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" RENAME COLUMN "content" TO "conntent"`);
    }

}
