import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreatePendingAnalysisColumnToApparition1605002049821
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'apparitions',
      new TableColumn({
        name: 'pending_analysis',
        type: 'boolean',
        isNullable: false,
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('apparitions', 'pending_analysis');
  }
}
