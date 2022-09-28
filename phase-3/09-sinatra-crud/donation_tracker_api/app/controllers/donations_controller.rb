class DonationsController < ApplicationController
  
  # route to get all donations  
  get '/donations' do
    Donation.all.to_json
  end

end