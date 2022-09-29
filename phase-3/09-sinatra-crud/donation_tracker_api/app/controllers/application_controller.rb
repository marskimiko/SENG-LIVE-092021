class ApplicationController < Sinatra::Base
    set :default_content_type, 'application/json'
    
    get '/' do 
        "Hello World"
    end

    private

    def current_user
        Donor.first
    end

end