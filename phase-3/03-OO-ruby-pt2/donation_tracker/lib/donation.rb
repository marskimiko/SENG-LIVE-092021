class Donation
    
    @@all = [] #class variable: 

    attr_accessor :amount, :organization, :date, :completed
    attr_reader :id

    def self.all # class method, it is called on the class itself
        # self: will return the class bc/ inside scope of a class method
        @@all
    end

    # to invoke .all => Donation.all

    def self.create(attributes)
       self.new(attributes).save     
    end

    def self.primary_key
        # Build some logic
        #  if its the first element, make id = 1
        # else increment by 1

        if @@all.empty?
            1
        else
            @@all[-1].id + 1
        end
    end

    def self.find_by_id(id)
        # I want to check all of the instances and find the one that maatches the given id
        # mapping to return an array
        # find, or filter
        @@all.find do |donation|
            donation.id == id
        end
    end

    def self.pending
        # return an array of all donations with a completed:false
        @@all.filter do |donation|
            donation.completed == false
        end
    end

    def initialize(id:, organization:, amount:, date:, completed:)
        @id = Donation.primary_key
        @organization = organization 
        @amount = amount 
        @date = date 
        @completed = completed 
    end

    def read_donation
        puts "Organization: #{@organization}"
        puts "Amount: #{@amount}"
        puts "Date: #{@date}"
        puts "Completed? #{@completed}"
    end

    # create a save method, that saves each new instance

    def save
        @@all << self
        self
    end

end 