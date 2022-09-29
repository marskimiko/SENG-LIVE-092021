class DonationsController < ApplicationController
  
  # route to get all donations  
  get '/donations' do
    Donation.all.to_json
  end

  post '/donations' do  
    donation = Donation.create(
      amount: params[:amount],
      completed: params[:completed],
      date: params[:date],
      donor: current_user,
      organization_id: params[:organization_id]
    )
    donation.to_json
  end

  patch '/donation/:id/edit' do
    donation = Donation.find(params[:id])
    donation.update(
      amount: params[:amount],
      date: params[:date]
    )
    donation.to_json
  end 

  delete '/donations/:id' do
    donation = Donation.find(params[:id])
    donation.destroy
  end

end