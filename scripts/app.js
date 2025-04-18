// COMP-6062 Final Practical Project
// Vue.js Application

const app = Vue.createApp({
    // Data properties
    data() {
        return {
            // Random User Profile
            userProfile: {
                firstName: '',
                lastName: '',
                age: '',
                profilePhoto: ''
            },
            
            // Weather 
            weather: {
                city: '',
                province: '',
                country: '',
                temperature: '',
                wind: '',
                description: ''
            },
            weatherForm: {
                city: 'London',
                province: 'Ontario',
                country: 'Canada'
            },
            
            // Dictionary 
            word: '',
            dictionary: {
                word: '',
                phonetic: '',
                definition: ''
            },
            dictionaryForm: {
                word:'',
            }
        }
    },
    
    // Methods
    methods: {
        // Fetch a random user profile
        getRandomUser() {
            fetch('https://comp6062.liamstewart.ca/random-user-profile')
                .then(response => response.json()) 
                .then(data => {
                   
                    this.userProfile = {
                        firstName: data.first_name,
                        lastName: data.last_name,
                        age: data.age,
                        profilePhoto: data.profile_picture
                    };
                    
                })
                .catch(error => {
                    console.error('Error fetching random user:', error);
                });
        },
        

        // Fetch weather information
        getWeather() {
            
            fetch(`https://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`)
            .then(response => response.json())
                .then(data => {
                    this.weather = {
                        city: this.weatherForm.city,
                        province: this.weatherForm.province,
                        country: this.weatherForm.country,
                        temperature: data.temperature,
                        wind: data.wind_speed,
                        description: data.weather_description
                    };
                })
                .catch(error => {
                    console.error('Error fetching weather:', error);
                });
        },
        
     
        // fetch word defination
        getDefinition() {
            if (!this.word.trim()) {
                alert("Please enter a word.");
                return;
            }

            fetch(`https://comp6062.liamstewart.ca/define?word=${this.word}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        this.dictionary.word = data[0].word;
                        this.dictionary.phonetic = data[0].phonetic;
                        this.dictionary.definition = data[0].definition;
                    } else {
                        alert("Definition not found. Try another word.");
                    }
                })
                .catch(error => console.error("Error fetching definition:", error));
        }
    },
    

    created() {
        this.getRandomUser();
        this.getWeather();
    },
    
});

// Mount the Vue application to the DOM
app.mount('#app');





