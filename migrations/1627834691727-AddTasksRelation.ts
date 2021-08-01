import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTasksRelation1627834691727 implements MigrationInterface {
    name = 'AddTasksRelation1627834691727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."task" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "public"."task" DROP COLUMN "userId"`);
    }

}
