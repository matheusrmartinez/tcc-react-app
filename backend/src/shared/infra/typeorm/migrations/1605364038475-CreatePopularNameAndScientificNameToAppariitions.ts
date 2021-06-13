import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreatePopularNameAndScientificNameToAppariitions1605364038475
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'apparitions',
      new TableColumn({
        name: 'popular_name',
        type: 'varchar',
        isNullable: true,
        default: null,
      }),
    );
    await queryRunner.addColumn(
      'apparitions',
      new TableColumn({
        name: 'scientific_name',
        type: 'varchar',
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('apparitions', 'popular_name');
    await queryRunner.dropColumn('apparitions', 'scientific_name');
  }
}
