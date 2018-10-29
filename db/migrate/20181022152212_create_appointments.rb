class CreateAppointments < ActiveRecord::Migration[5.1]
  def change
    create_table :appointments do |t|
      t.string :paciente
      t.string :dia
      t.string :hora
      t.boolean :disponible
      t.string :procedimiento

      t.timestamps
    end
  end
end
