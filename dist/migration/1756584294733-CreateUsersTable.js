"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1756584294733 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1756584294733 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "situationId",
                    type: "int",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));
        // criar chave estrangeira
        await queryRunner.createForeignKey("users", new typeorm_1.TableForeignKey({
            columnNames: ["situationId"],
            referencedTableName: "situations",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("users");
        const foreingKey = table?.foreignKeys.find((fk) => fk.columnNames.includes("situationId"));
        if (foreingKey) {
            await queryRunner.dropForeignKey("users", foreingKey);
        }
        await queryRunner.dropTable("users");
    }
}
exports.CreateUsersTable1756584294733 = CreateUsersTable1756584294733;
