import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDescriptionToLongtext1696992160020 implements MigrationInterface {
    name = 'ChangeDescriptionToLongtext1696992160020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`description\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`description\` text NOT NULL`);
    }

}
