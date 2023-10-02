import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameFieldsToUserTable1696238676519 implements MigrationInterface {
    name = 'RenameFieldsToUserTable1696238676519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`frist_name\` \`first_name\` varchar(500) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`first_name\` \`frist_name\` varchar(500) NOT NULL`);
    }

}
