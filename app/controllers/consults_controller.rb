class ConsultsController < ApplicationController
     def create
        @consult = Consult.new consult_params
        @consult.save
        redirect_to '/'
    end

    private
    def consult_params
        params.require(:consult).permit(:paciente, :procedimiento,  :pendiente)
    end
end
