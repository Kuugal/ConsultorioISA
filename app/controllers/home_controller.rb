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
    

end
