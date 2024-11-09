import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1712738935566 implements MigrationInterface {
    name = 'Migration1712738935566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "announce" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conntent" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_02a142330ce2fa63d84bd13bee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "announce" ADD CONSTRAINT "FK_1401c044258bee95c3e9f315995" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "announce" DROP CONSTRAINT "FK_1401c044258bee95c3e9f315995"`);
        await queryRunner.query(`DROP TABLE "announce"`);
    }

}
