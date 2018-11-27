class AppointmentsController < ApplicationController
    def create
        @appointment = Appointment.new appointment_params
        @appointment.save
        redirect_to '/historial'
    end

    private
    def appointment_params
        params.require(:appointment).permit(:procedimiento, :paciente, :dia, :hora, :disponible)
    end
end
