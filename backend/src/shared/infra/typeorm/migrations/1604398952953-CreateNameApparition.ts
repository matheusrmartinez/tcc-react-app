import {
  IsNull,
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateNameApparition1604398952953
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'apparitions',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: true,
      }),
    );

    queryRunner.dropColumn('apparitions', 'animal_id');
    queryRunner.addColumn(
      'apparitions',
      new TableColumn({
        name: 'animal_id',
        type: 'uuid',
        isNullable: true,
        default: null,
      }),
    );

    await queryRunner.createForeignKey(
      'apparitions',
      new TableForeignKey({
        name: 'AnimalId',
        columnNames: ['animal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'animals',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('apparitions', 'name');
    await queryRunner.dropForeignKey('apparitions', 'AnimalId');
    await queryRunner.dropColumn('apparitions', 'animal_id');
    await queryRunner.addColumn(
      'apparitions',
      new TableColumn({
        name: 'animal_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
