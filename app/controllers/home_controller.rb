class HomeController < ApplicationController
    def prueba
    end

    def index
        @appointments = Appointment.all
        
    end
    def citasAjax
        @appointments = Appointment.all.order(:dia, hora: :desc)
        json_response(@appointments)
    end
    def procAjax
        @consults = Consult.all
        json_response(@consults)
    end

    def historial

    end
    

end
