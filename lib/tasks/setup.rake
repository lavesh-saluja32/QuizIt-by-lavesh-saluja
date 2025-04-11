# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

desc "Populates sample data without after resetting the database"
task reset_and_populate_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data"
  elsif Rails.env.staging?
    puts "Skipping deleting and populating sample data"
  else
    delete_all_records_from_all_tables
    Rake::Task["populate_sample_data"].invoke
  end
end

#
# DO NOT CHANGE ANYTHING IN THIS METHOD
# This is last layer of defense against deleting data in production
# If you need to delete data in staging or in production
# please execute the command manually and do not change this method
#
def delete_all_records_from_all_tables
  if Rails.env.production?
    raise "deleting all records in production is not alllowed"
  else
    Rake::Task["db:schema:load"].invoke
  end
end

def create_sample_data!
  puts "Seeding sample data..."
  users = create_users!
  categories = create_categories!
  quizzes = create_quizzes!(categories, users[:admin])
  create_questions_with_options!(quizzes)
  create_submissions!(quizzes, users[:standard])
  puts "Sample data has been seeded successfully."
end

def create_users!
  puts "Creating users..."
  admin = create_user!(name: "Oliver Smith", email: "oliver@example.com", role: "admin_user")
  luna = create_user!(name: "Luna Smith", email: "luna@example.com")
  sam = create_user!(name: "Sam Smith", email: "sam@example.com")
  { admin: admin, standard: [luna, sam] }
end

def create_user!(options = {})
  default_attrs = {
    password: "welcome",
    password_confirmation: "welcome",
    role: "standard_user",
    organization_name: "BigBinary Academy"
  }
  User.create!(default_attrs.merge(options))
end

def create_categories!
  puts "Creating categories..."
  [
    Category.create!(name: "Science"),
    Category.create!(name: "History"),
    Category.create!(name: "Technology")
  ]
end


def create_quizzes!(categories, admin)
  puts "Creating quizzes..."
  quiz_data = {
    "Science" => ["Basics of Biology", "Physics Fundamentals"],
    "History" => ["World War Facts", "Ancient Civilizations"],
    "Technology" => ["Intro to Programming", "Tech Innovations 2020s"]
  }

  quizzes = []
  categories.each do |category|
    quiz_data[category.name].each do |quiz_name|
      quizzes << Quiz.create!(
        name: quiz_name,
        user: admin,
        category: category,
        status: %w[draft published].sample,
        total_questions: 5
      )
    end
  end
  quizzes
end

def create_questions_with_options!(quizzes)
  puts "Creating questions with realistic options..."

  question_data = {
  "Basics of Biology" => [
    {
      text: "What is the basic unit of life?",
      options: ["Cell", "Atom", "Organ", "Molecule"],
      correct: "Cell"
    },
    {
      text: "What do plants use for photosynthesis?",
      options: ["Chlorophyll", "Water", "Oxygen", "Carbon dioxide"],
      correct: "Chlorophyll"
    },
    {
      text: "Which organ pumps blood?",
      options: ["Heart", "Lungs", "Kidney", "Brain"],
      correct: "Heart"
    },
    {
      text: "What is DNA?",
      options: ["Genetic material", "Protein", "Enzyme", "Cell wall"],
      correct: "Genetic material"
    },
    {
      text: "Which gas do humans breathe in?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"],
      correct: "Oxygen"
    }
  ],
  "Physics Fundamentals" => [
    {
      text: "What is the force that pulls objects toward the Earth?",
      options: ["Gravity", "Magnetism", "Friction", "Inertia"],
      correct: "Gravity"
    },
    {
      text: "What is the speed of light in vacuum?",
      options: ["300,000 km/s", "150,000 km/s", "30,000 km/s", "3,000 km/s"],
      correct: "300,000 km/s"
    },
    {
      text: "Who formulated the laws of motion?",
      options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
      correct: "Isaac Newton"
    },
    {
      text: "What does a thermometer measure?",
      options: ["Temperature", "Pressure", "Humidity", "Mass"],
      correct: "Temperature"
    },
    {
      text: "What is the unit of electric current?",
      options: ["Ampere", "Volt", "Ohm", "Watt"],
      correct: "Ampere"
    }
  ],
  "World War Facts" => [
    {
      text: "When did WW2 end?",
      options: ["1945", "1939", "1942", "1950"],
      correct: "1945"
    },
    {
      text: "Who was the British PM during most of WW2?",
      options: ["Winston Churchill", "Neville Chamberlain", "Tony Blair", "Margaret Thatcher"],
      correct: "Winston Churchill"
    },
    {
      text: "Which countries formed the Axis powers?",
      options: ["Germany, Italy, Japan", "USA, UK, USSR", "France, Poland, China", "India, Australia, Canada"],
      correct: "Germany, Italy, Japan"
    },
    {
      text: "What event started WW1?",
      options: ["Assassination of Archduke Franz Ferdinand", "Invasion of Poland", "Pearl Harbor attack", "Battle of Somme"],
      correct: "Assassination of Archduke Franz Ferdinand"
    },
    {
      text: "What treaty ended WW1?",
      options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Tordesillas", "Treaty of London"],
      correct: "Treaty of Versailles"
    }
  ],
  "Ancient Civilizations" => [
    {
      text: "Which civilization built pyramids?",
      options: ["Egyptians", "Greeks", "Romans", "Mesopotamians"],
      correct: "Egyptians"
    },
    {
      text: "Where was Mesopotamia located?",
      options: ["Between the Tigris and Euphrates rivers", "Along the Nile", "In the Indus Valley", "In the Andes"],
      correct: "Between the Tigris and Euphrates rivers"
    },
    {
      text: "Who was the first emperor of Rome?",
      options: ["Augustus", "Julius Caesar", "Nero", "Caligula"],
      correct: "Augustus"
    },
    {
      text: "What writing system did ancient Egypt use?",
      options: ["Hieroglyphics", "Cuneiform", "Latin", "Sanskrit"],
      correct: "Hieroglyphics"
    },
    {
      text: "Which civilization had city-states like Athens and Sparta?",
      options: ["Greeks", "Romans", "Babylonians", "Persians"],
      correct: "Greeks"
    }
  ],
  "Intro to Programming" => [
    {
      text: "What does HTML stand for?",
      options: ["HyperText Markup Language", "HighText Machine Language", "HyperTool Multi Language", "HyperText Machine Language"],
      correct: "HyperText Markup Language"
    },
    {
      text: "What is a loop in programming?",
      options: ["A control structure for repetition", "A function", "An array", "A class"],
      correct: "A control structure for repetition"
    },
    {
      text: "Which symbol is used for comments in Ruby?",
      options: ["#", "//", "/*", "<!--"],
      correct: "#"
    },
    {
      text: "What is an array?",
      options: ["A collection of elements", "A string", "A method", "A number"],
      correct: "A collection of elements"
    },
    {
      text: "What does `puts` do in Ruby?",
      options: ["Prints output", "Defines variable", "Starts a loop", "Checks condition"],
      correct: "Prints output"
    }
  ],
  "Tech Innovations 2020s" => [
    {
      text: "Which company makes the iPhone?",
      options: ["Apple", "Samsung", "Google", "Microsoft"],
      correct: "Apple"
    },
    {
      text: "What is AI short for?",
      options: ["Artificial Intelligence", "Automated Interface", "Active Input", "Advanced Integration"],
      correct: "Artificial Intelligence"
    },
    {
      text: "What is 5G used for?",
      options: ["Faster mobile data", "TV broadcasting", "Bluetooth connection", "Home appliances"],
      correct: "Faster mobile data"
    },
    {
      text: "What device is used in VR?",
      options: ["VR headset", "Smartphone", "Laptop", "Tablet"],
      correct: "VR headset"
    },
    {
      text: "What does IoT stand for?",
      options: ["Internet of Things", "Input of Technology", "Interface of Things", "Internet over Telecom"],
      correct: "Internet of Things"
    }
  ]
}


  quizzes.each do |quiz|
    subject = question_data.keys.find { |k| quiz.name.include?(k.split.first) }
    questions = question_data[subject] || generate_fallback_questions(quiz.name)

    questions.each do |question|
      options = question[:options].sample(rand(3..4))
      correct = question[:correct]
      options |= [correct] # Ensure correct answer is included

      options.shuffle!

      quiz.questions.create!(
        question_text: question[:text],
        options_attributes: options.map { |opt_text|
          {
            option_text: opt_text,
            is_correct: opt_text == correct
          }
        }
      )
    end
  end
end

def generate_fallback_questions(quiz_name)
  (1..5).map do |i|
    {
      text: "Sample question #{i} for #{quiz_name}",
      options: ["Answer A", "Answer B", "Answer C"],
      correct: "Answer A"
    }
  end
end



def create_submissions!(quizzes, users)
  puts "Creating submissions..."
  quizzes.sample(3).each do |quiz|
    2.times do
      Submission.create!(
        user: users.sample,
        quiz: quiz,
        correct_answers: rand(1..5),
        wrong_answers: rand(0..3),
        unanswered: rand(0..2),
        status: "completed",
        submission_time: Time.current
      )
    end
  end
end
