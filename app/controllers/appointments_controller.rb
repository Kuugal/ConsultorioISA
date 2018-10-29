class AppointmentsController < ApplicationController
    def create
        @appointment = Appointment.new appointment_params
        @appointment.save
        redirect_to '/prueba'
    end

    private
    def appointment_params
        params.require(:appointment).permit(:procedimiento, :paciente, :dia, :hora)
    end
end
