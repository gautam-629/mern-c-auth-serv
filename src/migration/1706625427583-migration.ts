import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706625427583 implements MigrationInterface {
    name = "Migration1706625427583";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "User" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "RefreshToken" ("id" SERIAL NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_e5efef1572bd829464edc903d19" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "RefreshToken" ADD CONSTRAINT "FK_3a4d068289fa6c2038fb2101e5b" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "RefreshToken" DROP CONSTRAINT "FK_3a4d068289fa6c2038fb2101e5b"`,
        );
        await queryRunner.query(`DROP TABLE "RefreshToken"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }
}
