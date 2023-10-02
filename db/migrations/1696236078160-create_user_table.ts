import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1696236078160 implements MigrationInterface {
    name = 'CreateUserTable1696236078160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`frist_name\` varchar(500) NOT NULL, \`last_name\` text NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
