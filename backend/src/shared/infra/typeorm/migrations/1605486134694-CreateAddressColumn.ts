import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateAddressColumn1605486134694
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'apparitions',
      new TableColumn({
        name: 'address',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('apparitions', 'address');
  }
}
