import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSummaryFieldToPostTable1696838573719 implements MigrationInterface {
    name = 'AddSummaryFieldToPostTable1696838573719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
    }

}
