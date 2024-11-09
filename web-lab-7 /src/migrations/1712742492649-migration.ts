import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712742492649 implements MigrationInterface {
    name = 'Migration1712742492649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_1401c044258bee95c3e9f315995"`);
        await queryRunner.query(`ALTER TABLE "announce" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_1401c044258bee95c3e9f315995" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
