// Main JavaScript for Portfolio Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initNavigation();
    initProjectEmbeds();
    //initRowingAnalytics();
    //initGreekConjugator();
    //initNLPTaskScheduler();
    initProjectLazyLoading();
    initAccessibility();
    initContactForm();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });
    }
}

// Project embed functionality
function initProjectEmbeds() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.embed-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the parent embed container
            const embedContainer = this.closest('.project-embed');
            
            // Remove active class from all tabs in this container
            embedContainer.querySelectorAll('.embed-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get target panel
            const targetPanel = this.getAttribute('data-target');
            
            // Hide all panels in this container
            embedContainer.querySelectorAll('.embed-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show target panel
            embedContainer.querySelector(`.${targetPanel}`).classList.add('active');
        });
    });
    
    // Help button functionality
    const helpButtons = document.querySelectorAll('.embed-control-btn');
    
    helpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const embedContainer = this.closest('.project-embed');
            const infoTab = embedContainer.querySelector('.embed-tab:not(.active)');
            
            if (infoTab) {
                infoTab.click();
            }
        });
    });
    
    // Project link functionality to show embeds
    const projectLinks = document.querySelectorAll('a[href^="#"][href$="-embed"]');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetEmbed = document.querySelector(targetId);
            
            if (targetEmbed) {
                // Show the embed
                targetEmbed.style.display = 'block';
                
                // Scroll to it
                targetEmbed.scrollIntoView({ behavior: 'smooth' });
                
                // Update URL hash
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Handle direct URL access with hash
    if (window.location.hash && window.location.hash.endsWith('-embed')) {
        const targetEmbed = document.querySelector(window.location.hash);
        if (targetEmbed) {
            targetEmbed.style.display = 'block';
            setTimeout(() => {
                targetEmbed.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
}

// Rowing Analytics functionality with enhanced interactivity
function initRowingAnalytics() {
    // Expanded sample data for demonstration
    const rowingData = {
        rowers: [
            { 
                name: "Alex Smith", 
                avgPercentGMS: 92.5, 
                races: 15,
                raceResults: [
                    { date: "2024-03-15", percentGMS: 93.2, time: "6:12.4", distance: 2000 },
                    { date: "2024-02-28", percentGMS: 91.8, time: "16:42.1", distance: 5000 },
                    { date: "2024-02-10", percentGMS: 92.5, time: "6:10.8", distance: 2000 },
                    { date: "2024-01-20", percentGMS: 92.4, time: "16:45.3", distance: 5000 }
                ]
            },
            { 
                name: "Jordan Lee", 
                avgPercentGMS: 94.8, 
                races: 12,
                raceResults: [
                    { date: "2024-03-15", percentGMS: 95.1, time: "6:05.2", distance: 2000 },
                    { date: "2024-02-28", percentGMS: 94.5, time: "16:22.7", distance: 5000 },
                    { date: "2024-02-10", percentGMS: 94.9, time: "6:04.8", distance: 2000 },
                    { date: "2024-01-20", percentGMS: 94.7, time: "16:23.5", distance: 5000 }
                ]
            },
            { 
                name: "Taylor Johnson", 
                avgPercentGMS: 91.2, 
                races: 14,
                raceResults: [
                    { date: "2024-03-15", percentGMS: 91.5, time: "6:18.3", distance: 2000 },
                    { date: "2024-02-28", percentGMS: 90.8, time: "16:58.2", distance: 5000 },
                    { date: "2024-02-10", percentGMS: 91.3, time: "6:17.5", distance: 2000 },
                    { date: "2024-01-20", percentGMS: 91.2, time: "16:57.1", distance: 5000 }
                ]
            },
            { 
                name: "Casey Williams", 
                avgPercentGMS: 93.7, 
                races: 13,
                raceResults: [
                    { date: "2024-03-15", percentGMS: 93.9, time: "6:08.7", distance: 2000 },
                    { date: "2024-02-28", percentGMS: 93.5, time: "16:32.4", distance: 5000 },
                    { date: "2024-02-10", percentGMS: 93.8, time: "6:09.1", distance: 2000 },
                    { date: "2024-01-20", percentGMS: 93.6, time: "16:33.2", distance: 5000 }
                ]
            },
            { 
                name: "Morgan Brown", 
                avgPercentGMS: 90.5, 
                races: 11,
                raceResults: [
                    { date: "2024-03-15", percentGMS: 90.8, time: "6:22.5", distance: 2000 },
                    { date: "2024-02-28", percentGMS: 90.2, time: "17:05.8", distance: 5000 },
                    { date: "2024-02-10", percentGMS: 90.6, time: "6:23.1", distance: 2000 },
                    { date: "2024-01-20", percentGMS: 90.4, time: "17:06.4", distance: 5000 }
                ]
            }
        ],
        races: [
            { date: "2024-03-15", location: "Boston River", distance: 2000 },
            { date: "2024-02-28", location: "Lake Washington", distance: 5000 },
            { date: "2024-02-10", location: "Charles River", distance: 2000 },
            { date: "2024-01-20", location: "Hudson River", distance: 5000 }
        ]
    };
    
    let chart = null;
    let currentRower = "";
    let currentRace = "";
    
    // Initialize chart if element exists
    const chartCanvas = document.getElementById('rowing-chart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: rowingData.rowers.map(r => r.name),
                datasets: [{
                    label: 'Average % of Gold Medal Standard',
                    data: rowingData.rowers.map(r => r.avgPercentGMS),
                    backgroundColor: 'rgba(0, 159, 253, 0.7)',
                    borderColor: 'rgba(0, 159, 253, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 85,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Populate rower select dropdown
    const rowerSelect = document.getElementById('rowing-rower-select');
    if (rowerSelect) {
        // Clear existing options
        rowerSelect.innerHTML = '<option value="">All Rowers</option>';
        
        // Add rower options
        rowingData.rowers.forEach(rower => {
            const option = document.createElement('option');
            option.value = rower.name;
            option.textContent = rower.name;
            rowerSelect.appendChild(option);
        });
    }
    
    // Populate race select dropdown
    const raceSelect = document.getElementById('rowing-race-select');
    if (raceSelect) {
        // Clear existing options
        raceSelect.innerHTML = '<option value="">All Races</option>';
        
        // Add race options
        rowingData.races.forEach(race => {
            const option = document.createElement('option');
            option.value = race.date;
            option.textContent = `${race.date} - ${race.location}`;
            raceSelect.appendChild(option);
        });
    }
    
    // Update table with rower data
    updateTable();
    
    // Add event listeners for filtering
    if (rowerSelect && raceSelect) {
        rowerSelect.addEventListener('change', function() {
            currentRower = this.value;
            filterRowingData();
        });
        
        raceSelect.addEventListener('change', function() {
            currentRace = this.value;
            filterRowingData();
        });
    }
    
    // Function to filter rowing data based on selections
    function filterRowingData() {
        updateChart();
        updateTable();
        
        // Show filter notification
        const filterNotification = document.getElementById('rowing-filter-notification');
        if (filterNotification) {
            let message = "Showing data for ";
            
            if (currentRower && currentRace) {
                message += `${currentRower} in the race on ${currentRace}`;
            } else if (currentRower) {
                message += `${currentRower} across all races`;
            } else if (currentRace) {
                message += `all rowers in the race on ${currentRace}`;
            } else {
                message += "all rowers across all races";
            }
            
            filterNotification.textContent = message;
            filterNotification.style.display = 'block';
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                filterNotification.style.display = 'none';
            }, 3000);
        }
    }
    
    // Function to update the chart based on selections
    function updateChart() {
        if (!chart) return;
        
        let labels = [];
        let data = [];
        let title = 'Average % of Gold Medal Standard';
        
        if (currentRower && currentRace) {
            // Specific rower and race
            const rower = rowingData.rowers.find(r => r.name === currentRower);
            if (rower) {
                const raceResult = rower.raceResults.find(r => r.date === currentRace);
                if (raceResult) {
                    labels = ['2k Split', 'Average Split', 'Best Split', 'Projected Split'];
                    
                    // Generate some varied data based on the race result
                    const basePercent = raceResult.percentGMS;
                    data = [
                        basePercent,
                        basePercent - 0.3,
                        basePercent + 1.2,
                        basePercent + 0.5
                    ];
                    
                    title = `${currentRower}'s Performance Metrics for ${currentRace}`;
                }
            }
        } else if (currentRower) {
            // Specific rower across all races
            const rower = rowingData.rowers.find(r => r.name === currentRower);
            if (rower) {
                labels = rower.raceResults.map(r => r.date);
                data = rower.raceResults.map(r => r.percentGMS);
                title = `${currentRower}'s Performance Across Races`;
            }
        } else if (currentRace) {
            // All rowers for specific race
            labels = rowingData.rowers.map(r => r.name);
            data = rowingData.rowers.map(r => {
                const raceResult = r.raceResults.find(result => result.date === currentRace);
                return raceResult ? raceResult.percentGMS : 0;
            });
            title = `All Rowers' Performance for ${currentRace}`;
        } else {
            // All rowers across all races (default view)
            labels = rowingData.rowers.map(r => r.name);
            data = rowingData.rowers.map(r => r.avgPercentGMS);
            title = 'Average % of Gold Medal Standard';
        }
        
        // Update chart data
        chart.data.labels = labels;
        chart.data.datasets[0].label = title;
        chart.data.datasets[0].data = data;
        chart.update();
    }
    
    // Function to update the table based on selections
    function updateTable() {
        const tableBody = document.getElementById('rowing-table-body');
        if (!tableBody) return;
        
        // Clear existing rows
        tableBody.innerHTML = '';
        
        if (currentRower && currentRace) {
            // Specific rower and race
            const rower = rowingData.rowers.find(r => r.name === currentRower);
            if (rower) {
                const raceResult = rower.raceResults.find(r => r.date === currentRace);
                if (raceResult) {
                    // Show detailed metrics for this specific race
                    const race = rowingData.races.find(r => r.date === currentRace);
                    const distance = race ? race.distance : 0;
                    
                    // Row 1: Time
                    const timeRow = document.createElement('tr');
                    const timeLabel = document.createElement('td');
                    timeLabel.textContent = 'Time';
                    const timeValue = document.createElement('td');
                    timeValue.textContent = raceResult.time;
                    const timeEmpty = document.createElement('td');
                    timeRow.appendChild(timeLabel);
                    timeRow.appendChild(timeValue);
                    timeRow.appendChild(timeEmpty);
                    tableBody.appendChild(timeRow);
                    
                    // Row 2: Distance
                    const distanceRow = document.createElement('tr');
                    const distanceLabel = document.createElement('td');
                    distanceLabel.textContent = 'Distance';
                    const distanceValue = document.createElement('td');
                    distanceValue.textContent = `${distance}m`;
                    const distanceEmpty = document.createElement('td');
                    distanceRow.appendChild(distanceLabel);
                    distanceRow.appendChild(distanceValue);
                    distanceRow.appendChild(distanceEmpty);
                    tableBody.appendChild(distanceRow);
                    
                    // Row 3: % GMS
                    const gmsRow = document.createElement('tr');
                    const gmsLabel = document.createElement('td');
                    gmsLabel.textContent = '% of GMS';
                    const gmsValue = document.createElement('td');
                    gmsValue.textContent = `${raceResult.percentGMS}%`;
                    const gmsEmpty = document.createElement('td');
                    gmsRow.appendChild(gmsLabel);
                    gmsRow.appendChild(gmsValue);
                    gmsRow.appendChild(gmsEmpty);
                    tableBody.appendChild(gmsRow);
                    
                    // Row 4: Rank
                    const rankRow = document.createElement('tr');
                    const rankLabel = document.createElement('td');
                    rankLabel.textContent = 'Rank in Race';
                    const rankValue = document.createElement('td');
                    
                    // Calculate rank
                    const allResults = rowingData.rowers.map(r => {
                        const result = r.raceResults.find(res => res.date === currentRace);
                        return result ? result.percentGMS : 0;
                    }).sort((a, b) => b - a);
                    
                    const rank = allResults.indexOf(raceResult.percentGMS) + 1;
                    rankValue.textContent = `${rank} of ${allResults.filter(r => r > 0).length}`;
                    
                    const rankEmpty = document.createElement('td');
                    rankRow.appendChild(rankLabel);
                    rankRow.appendChild(rankValue);
                    rankRow.appendChild(rankEmpty);
                    tableBody.appendChild(rankRow);
                }
            }
        } else if (currentRower) {
            // Specific rower across all races
            const rower = rowingData.rowers.find(r => r.name === currentRower);
            if (rower) {
                // Show all race results for this rower
                rower.raceResults.forEach(result => {
                    const race = rowingData.races.find(r => r.date === result.date);
                    
                    const row = document.createElement('tr');
                    
                    const dateCell = document.createElement('td');
                    dateCell.textContent = result.date;
                    
                    const percentCell = document.createElement('td');
                    percentCell.textContent = `${result.percentGMS}%`;
                    
                    const timeCell = document.createElement('td');
                    timeCell.textContent = `${result.time} (${race ? race.distance : 0}m)`;
                    
                    row.appendChild(dateCell);
                    row.appendChild(percentCell);
                    row.appendChild(timeCell);
                    
                    tableBody.appendChild(row);
                });
            }
        } else if (currentRace) {
            // All rowers for specific race
            // Sort rowers by performance in this race
            const rowersInRace = [...rowingData.rowers]
                .map(rower => {
                    const raceResult = rower.raceResults.find(r => r.date === currentRace);
                    return {
                        name: rower.name,
                        percentGMS: raceResult ? raceResult.percentGMS : 0,
                        time: raceResult ? raceResult.time : '-'
                    };
                })
                .filter(r => r.percentGMS > 0)
                .sort((a, b) => b.percentGMS - a.percentGMS);
            
            rowersInRace.forEach((rower, index) => {
                const row = document.createElement('tr');
                
                const rankCell = document.createElement('td');
                rankCell.textContent = `${index + 1}`;
                
                const nameCell = document.createElement('td');
                nameCell.textContent = rower.name;
                
                const percentCell = document.createElement('td');
                percentCell.textContent = `${rower.percentGMS}%`;
                
                row.appendChild(rankCell);
                row.appendChild(nameCell);
                row.appendChild(percentCell);
                
                tableBody.appendChild(row);
            });
        } else {
            // All rowers across all races (default view)
            // Sort rowers by average performance
            const sortedRowers = [...rowingData.rowers].sort((a, b) => b.avgPercentGMS - a.avgPercentGMS);
            
            sortedRowers.forEach((rower, index) => {
                const row = document.createElement('tr');
                
                const rankCell = document.createElement('td');
                rankCell.textContent = `${index + 1}`;
                
                const nameCell = document.createElement('td');
                nameCell.textContent = rower.name;
                
                const percentCell = document.createElement('td');
                percentCell.textContent = `${rower.avgPercentGMS}%`;
                
                row.appendChild(rankCell);
                row.appendChild(nameCell);
                row.appendChild(percentCell);
                
                tableBody.appendChild(row);
            });
        }
    }
}

// Greek Conjugator functionality with multiple choice practice
function initGreekConjugator() {
    // Sample data for modern Greek verbs
    const greekVerbs = [
        { name: "μιλάω", meaning: "to speak", stem: "μιλ" },
        { name: "αγαπάω", meaning: "to love", stem: "αγαπ" },
        { name: "διαβάζω", meaning: "to read", stem: "διαβάζ" },
        { name: "γράφω", meaning: "to write", stem: "γράφ" },
        { name: "τρώω", meaning: "to eat", stem: "τρώ" }
    ];

    const tenses = ["Present", "Past", "Future"];
    const persons = ["1st Person Singular", "2nd Person Singular", "3rd Person Singular", 
                    "1st Person Plural", "2nd Person Plural", "3rd Person Plural"];
    
    // Conjugation patterns for modern Greek
    const conjugationPatterns = {
        present: {
            "μιλάω": ["μιλάω", "μιλάς", "μιλάει", "μιλάμε", "μιλάτε", "μιλάνε"],
            "αγαπάω": ["αγαπάω", "αγαπάς", "αγαπάει", "αγαπάμε", "αγαπάτε", "αγαπάνε"],
            "διαβάζω": ["διαβάζω", "διαβάζεις", "διαβάζει", "διαβάζουμε", "διαβάζετε", "διαβάζουν"],
            "γράφω": ["γράφω", "γράφεις", "γράφει", "γράφουμε", "γράφετε", "γράφουν"],
            "τρώω": ["τρώω", "τρως", "τρώει", "τρώμε", "τρώτε", "τρώνε"]
        },
        past: {
            "μιλάω": ["μίλησα", "μίλησες", "μίλησε", "μιλήσαμε", "μιλήσατε", "μίλησαν"],
            "αγαπάω": ["αγάπησα", "αγάπησες", "αγάπησε", "αγαπήσαμε", "αγαπήσατε", "αγάπησαν"],
            "διαβάζω": ["διάβασα", "διάβασες", "διάβασε", "διαβάσαμε", "διαβάσατε", "διάβασαν"],
            "γράφω": ["έγραψα", "έγραψες", "έγραψε", "γράψαμε", "γράψατε", "έγραψαν"],
            "τρώω": ["έφαγα", "έφαγες", "έφαγε", "φάγαμε", "φάγατε", "έφαγαν"]
        },
        future: {
            "μιλάω": ["θα μιλήσω", "θα μιλήσεις", "θα μιλήσει", "θα μιλήσουμε", "θα μιλήσετε", "θα μιλήσουν"],
            "αγαπάω": ["θα αγαπήσω", "θα αγαπήσεις", "θα αγαπήσει", "θα αγαπήσουμε", "θα αγαπήσετε", "θα αγαπήσουν"],
            "διαβάζω": ["θα διαβάσω", "θα διαβάσεις", "θα διαβάσει", "θα διαβάσουμε", "θα διαβάσετε", "θα διαβάσουν"],
            "γράφω": ["θα γράψω", "θα γράψεις", "θα γράψει", "θα γράψουμε", "θα γράψετε", "θα γράψουν"],
            "τρώω": ["θα φάω", "θα φας", "θα φάει", "θα φάμε", "θα φάτε", "θα φάνε"]
        }
    };
    
    // Variables to track current practice state
    let currentVerb = null;
    let currentTense = null;
    let currentPerson = null;
    let correctAnswer = null;
    let score = 0;
    let totalQuestions = 0;
    
    // Populate verb select dropdown
    const verbSelect = document.getElementById('greek-verb-select');
    if (verbSelect) {
        // Clear existing options
        verbSelect.innerHTML = '';
        
        // Add Random Verb option as the first choice
        const randomOption = document.createElement('option');
        randomOption.value = 'random';
        randomOption.textContent = 'Random Verb';
        verbSelect.appendChild(randomOption);
        
        // Add verb options
        greekVerbs.forEach(verb => {
            const option = document.createElement('option');
            option.value = verb.name;
            option.textContent = `${verb.name} (${verb.meaning})`;
            verbSelect.appendChild(option);
        });
    }
    
    // Populate tense select dropdown
    const tenseSelect = document.getElementById('greek-tense-select');
    if (tenseSelect) {
        // Clear existing options
        tenseSelect.innerHTML = '';
        
        // Add Random Tense option as the first choice
        const randomOption = document.createElement('option');
        randomOption.value = 'random';
        randomOption.textContent = 'Random Tense';
        tenseSelect.appendChild(randomOption);
        
        // Add tense options
        tenses.forEach(tense => {
            const option = document.createElement('option');
            option.value = tense.toLowerCase();
            option.textContent = tense;
            tenseSelect.appendChild(option);
        });
    }
    
    // Set up practice mode
    const startPracticeBtn = document.getElementById('greek-start-practice');
    if (startPracticeBtn) {
        startPracticeBtn.addEventListener('click', startPractice);
    }
    
    // Function to start practice mode
    function startPractice() {
        const verbSelect = document.getElementById('greek-verb-select');
        const tenseSelect = document.getElementById('greek-tense-select');
        const modeSelect = document.getElementById('greek-mode-select');
        const practiceContainer = document.getElementById('greek-practice-container');
        const setupContainer = document.getElementById('greek-setup-container');
        
        if (!verbSelect || !tenseSelect || !modeSelect || !practiceContainer || !setupContainer) {
            return;
        }
        
        // Get selected verb, tense and practice mode
        let selectedVerb = verbSelect.value;
        let selectedTense = tenseSelect.value.toLowerCase();
        let practiceMode = modeSelect.value;
        
        // Handle random verb selection
        if (selectedVerb === 'random') {
            const randomIndex = Math.floor(Math.random() * greekVerbs.length);
            selectedVerb = greekVerbs[randomIndex].name;
        }
        
        // Handle random tense selection
        if (selectedTense === 'random') {
            const randomIndex = Math.floor(Math.random() * tenses.length);
            selectedTense = tenses[randomIndex].toLowerCase();
        }
        
        // Set current verb and tense
        currentVerb = selectedVerb;
        currentTense = selectedTense;
        
        // Hide setup, show practice
        setupContainer.style.display = 'none';
        practiceContainer.style.display = 'block';
        
        // Reset score
        score = 0;
        totalQuestions = 0;
        updateScore();
        
        // Generate first question based on mode
        if (practiceMode === 'fill-in-blank') {
            generateFillInBlankQuestion();
        } else {
            generateQuestion(); // Default to multiple choice
        }
    }
    
    // Function to generate a new practice question
    function generateQuestion() {
        const questionElement = document.getElementById('greek-question');
        const optionsContainer = document.getElementById('greek-options-container');
        
        if (!questionElement || !optionsContainer) {
            return;
        }
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Randomly select a person
        const personIndex = Math.floor(Math.random() * persons.length);
        currentPerson = persons[personIndex];
        
        // Get correct answer
        correctAnswer = conjugationPatterns[currentTense][currentVerb][personIndex];
        
        // Set question text
        questionElement.textContent = `What is the ${currentTense} tense conjugation of "${currentVerb}" for ${currentPerson}?`;
        
        // Generate options (including the correct one)
        const options = [correctAnswer];
        
        // Add incorrect options from other verbs or persons
        while (options.length < 4) {
            // Randomly decide whether to use a different verb or different person
            if (Math.random() > 0.5 && greekVerbs.length > 1) {
                // Different verb, same person
                const otherVerbs = greekVerbs.filter(v => v.name !== currentVerb);
                const randomVerb = otherVerbs[Math.floor(Math.random() * otherVerbs.length)].name;
                const option = conjugationPatterns[currentTense][randomVerb][personIndex];
                
                if (!options.includes(option)) {
                    options.push(option);
                }
            } else {
                // Same verb, different person
                const otherPersonIndices = Array.from({length: persons.length}, (_, i) => i).filter(i => i !== personIndex);
                const randomPersonIndex = otherPersonIndices[Math.floor(Math.random() * otherPersonIndices.length)];
                const option = conjugationPatterns[currentTense][currentVerb][randomPersonIndex];
                
                if (!options.includes(option)) {
                    options.push(option);
                }
            }
        }
        
        // Shuffle options
        shuffleArray(options);
        
        // Create option buttons
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'greek-option-btn';
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });
    }
    
    // Function to check the selected answer
    function checkAnswer(selectedAnswer) {
        const feedbackElement = document.getElementById('greek-feedback');
        const optionButtons = document.querySelectorAll('.greek-option-btn');
        
        if (!feedbackElement) {
            return;
        }
        
        totalQuestions++;
        
        // Disable all option buttons
        optionButtons.forEach(button => {
            button.disabled = true;
            
            // Highlight correct and incorrect answers
            if (button.textContent === correctAnswer) {
                button.classList.add('correct-answer');
            } else if (button.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
                button.classList.add('incorrect-answer');
            }
        });
        
        // Check if answer is correct
        if (selectedAnswer === correctAnswer) {
            feedbackElement.textContent = 'Correct! Well done!';
            feedbackElement.className = 'feedback-correct';
            score++;
        } else {
            feedbackElement.textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
            feedbackElement.className = 'feedback-incorrect';
        }
        
        // Update score
        updateScore();
        
        // Show next button
        const nextButton = document.getElementById('greek-next-btn');
        if (nextButton) {
            nextButton.style.display = 'block';
        }
    }
    
    // Function to move to the next question
    function nextQuestion() {
        const feedbackElement = document.getElementById('greek-feedback');
        const nextButton = document.getElementById('greek-next-btn');
        const modeSelect = document.getElementById('greek-mode-select');
        
        if (!modeSelect) {
            return;
        }
        
        if (feedbackElement) {
            feedbackElement.textContent = '';
            feedbackElement.className = '';
        }
        
        if (nextButton) {
            nextButton.style.display = 'none';
        }
        
        // Generate next question based on mode
        if (modeSelect.value === 'fill-in-blank') {
            generateFillInBlankQuestion();
        } else {
            generateQuestion();
        }
    }
    
    // Function to update the score display
    function updateScore() {
        const scoreElement = document.getElementById('greek-score');
        if (scoreElement) {
            scoreElement.textContent = `Score: ${score}/${totalQuestions}`;
        }
    }
    
    // Function to reset practice and return to setup
    function resetPractice() {
        const practiceContainer = document.getElementById('greek-practice-container');
        const setupContainer = document.getElementById('greek-setup-container');
        
        if (practiceContainer && setupContainer) {
            practiceContainer.style.display = 'none';
            setupContainer.style.display = 'block';
        }
    }
    
    // Set up reset button
    const resetButton = document.getElementById('greek-reset-btn');
    if (resetButton) {
        resetButton.addEventListener('click', resetPractice);
    }
    
    // Helper function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Set up random verb button
    const randomVerbBtn = document.getElementById('greek-random-verb');
    if (randomVerbBtn) {
        randomVerbBtn.addEventListener('click', function() {
            const verbSelect = document.getElementById('greek-verb-select');
            if (verbSelect) {
                verbSelect.value = 'random';
            }
        });
    }

    // Function to generate a fill-in-the-blank question
    function generateFillInBlankQuestion() {
        const questionElement = document.getElementById('greek-question');
        const optionsContainer = document.getElementById('greek-options-container');
        
        if (!questionElement || !optionsContainer) {
            return;
        }
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Randomly select a person
        const personIndex = Math.floor(Math.random() * persons.length);
        currentPerson = persons[personIndex];
        
        // Get correct answer
        correctAnswer = conjugationPatterns[currentTense][currentVerb][personIndex];
        
        // Set question text
        questionElement.textContent = `What is the ${currentTense} tense conjugation of "${currentVerb}" for ${currentPerson}?`;
        
        // Create input field
        const inputContainer = document.createElement('div');
        inputContainer.className = 'fill-in-blank-container';
        
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.className = 'greek-input';
        inputField.placeholder = 'Type your answer...';
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkFillInBlankAnswer(this.value);
            }
        });
        
        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.className = 'greek-submit-btn';
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', function() {
            checkFillInBlankAnswer(inputField.value);
        });
        
        inputContainer.appendChild(inputField);
        inputContainer.appendChild(submitButton);
        optionsContainer.appendChild(inputContainer);
        
        // Focus on the input field
        setTimeout(() => {
            inputField.focus();
        }, 100);
    }

    // Function to check fill-in-the-blank answer
    function checkFillInBlankAnswer(answer) {
        const feedbackElement = document.getElementById('greek-feedback');
        const inputField = document.querySelector('.greek-input');
        const submitButton = document.querySelector('.greek-submit-btn');
        
        if (!feedbackElement || !inputField || !submitButton) {
            return;
        }
        
        totalQuestions++;
        
        // Disable input
        inputField.disabled = true;
        submitButton.disabled = true;
        
        // Check if answer is correct (trim whitespace and ignore case)
        const userAnswer = answer.trim();
        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        
        // Provide feedback
        if (isCorrect) {
            feedbackElement.textContent = 'Correct! Well done!';
            feedbackElement.className = 'feedback-correct';
            inputField.className = 'greek-input correct-answer';
            score++;
        } else {
            feedbackElement.textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
            feedbackElement.className = 'feedback-incorrect';
            inputField.className = 'greek-input incorrect-answer';
        }
        
        // Update score
        updateScore();
        
        // Show next button
        const nextButton = document.getElementById('greek-next-btn');
        if (nextButton) {
            nextButton.style.display = 'block';
        }
    }

    // Set up next button
    const nextButton = document.getElementById('greek-next-btn');
    if (nextButton) {
        nextButton.addEventListener('click', nextQuestion);
    }
}

// NLP Task Scheduler functionality
function initNLPTaskScheduler() {
    // Sample tasks for demonstration
    const sampleTasks = [
        { 
            text: "Meeting with team tomorrow at 2pm", 
            parsed: {
                type: "Meeting",
                date: "2025-04-07",
                time: "14:00",
                duration: "1 hour"
            }
        },
        { 
            text: "Submit project proposal by Friday", 
            parsed: {
                type: "Deadline",
                date: "2025-04-11",
                time: "23:59",
                priority: "High"
            }
        },
        { 
            text: "Call John about the presentation next Monday", 
            parsed: {
                type: "Call",
                date: "2025-04-14",
                time: "09:00",
                contact: "John"
            }
        }
    ];
    
    // Display sample tasks
    displaySampleTasks();
    
    // Set up form handling
    const taskForm = document.getElementById('nlp-task-form');
    if (taskForm) {
        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const taskInput = document.getElementById('nlp-task-input');
            if (taskInput && taskInput.value.trim() !== '') {
                parseTask(taskInput.value.trim());
                taskInput.value = '';
            }
        });
    }
    
    // Function to display sample tasks
    function displaySampleTasks() {
        const taskResults = document.getElementById('nlp-task-results');
        if (!taskResults) return;
        
        // Clear existing tasks
        taskResults.innerHTML = '';
        
        // Sort tasks by date and time
        sampleTasks.sort((a, b) => {
            const dateA = new Date(`${a.parsed.date}T${a.parsed.time}`);
            const dateB = new Date(`${b.parsed.date}T${b.parsed.time}`);
            return dateA - dateB;
        });
        
        // Display sorted tasks
        sampleTasks.forEach(task => {
            displayTask(task);
        });
    }
    
    // Function to parse task using simple rules (simulation)
    function parseTask(text) {
        // This is a simplified simulation of NLP parsing
        // In a real app, this would use a proper NLP library
        
        let taskType = "Task";
        let date = "2025-04-07"; // Default to tomorrow
        let time = "00:00";
        let priority = "Normal";
        
        // Very simple pattern matching
        if (text.toLowerCase().includes("meeting")) {
            taskType = "Meeting";
        } else if (text.toLowerCase().includes("call")) {
            taskType = "Call";
        } else if (text.toLowerCase().includes("deadline") || text.toLowerCase().includes("submit")) {
            taskType = "Deadline";
            priority = "High";
        }
        
        // Simple date extraction
        if (text.toLowerCase().includes("tomorrow")) {
            date = "2025-04-07"; // Assuming today is April 6, 2025
        } else if (text.toLowerCase().includes("tonight") || text.toLowerCase().includes("today")) {
            date = "2025-04-06"; // Assuming today is April 6, 2025
        } else if (text.toLowerCase().includes("wednesday")) {
            date = "2025-04-09"; // Assuming the next Wednesday
        } else if (text.toLowerCase().includes("thursday")) {
            date = "2025-04-10"; // Assuming the next Thursday
        } else if (text.toLowerCase().includes("friday")) {
            date = "2025-04-11";
        } else if (text.toLowerCase().includes("monday")) {
            date = "2025-04-14";
        }
        
        // Improved time extraction with regex
        let timeRegex = /(\d{1,2})(?::(\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?/i;
        let timeMatch = text.match(timeRegex);
        
        if (timeMatch) {
            let hours = parseInt(timeMatch[1]);
            let minutes = timeMatch[2] ? parseInt(timeMatch[2]) : 0;
            let period = timeMatch[3] ? timeMatch[3].toLowerCase() : null;
            
            // Convert to 24-hour format
            if (period && (period === 'pm' || period === 'p.m.') && hours < 12) {
                hours += 12;
            } else if (period && (period === 'am' || period === 'a.m.') && hours === 12) {
                hours = 0;
            }
            
            // Handle common time phrases
            if (text.toLowerCase().includes("evening") || text.toLowerCase().includes("tonight")) {
                if (hours < 12 && !period) hours += 12;
            }
            
            time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        }
        
        // Priority determination from text
        if (text.toLowerCase().includes("urgent") || 
            text.toLowerCase().includes("important") || 
            text.toLowerCase().includes("asap") || 
            text.toLowerCase().includes("high priority")) {
            priority = "High";
        } else if (text.toLowerCase().includes("low priority") || 
                   text.toLowerCase().includes("if time")) {
            priority = "Low";
        }
        
        // Create parsed task object
        const parsedTask = {
            text: text,
            parsed: {
                type: taskType,
                date: date,
                time: time,
                priority: priority
            }
        };
        
        // Display the parsed task
        displayTask(parsedTask);
    }
    
    // Function to display task in the results area
    function displayTask(task) {
        const taskResults = document.getElementById('nlp-task-results');
        if (!taskResults) return;
        
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        const taskTitle = document.createElement('div');
        taskTitle.className = 'task-title';
        taskTitle.textContent = task.text;
        
        const taskDate = document.createElement('div');
        taskDate.className = 'task-date';
        taskDate.textContent = `${task.parsed.date} ${task.parsed.time}`;
        
        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';
        
        // Add task type
        const typeDetail = document.createElement('span');
        typeDetail.className = 'task-detail';
        typeDetail.textContent = `Type: ${task.parsed.type}`;
        taskDetails.appendChild(typeDetail);
        
        // Add priority if available
        if (task.parsed.priority) {
            const priorityDetail = document.createElement('span');
            priorityDetail.className = 'task-detail';
            priorityDetail.textContent = `Priority: ${task.parsed.priority}`;
            taskDetails.appendChild(priorityDetail);
        }
        
        // Add contact if available
        if (task.parsed.contact) {
            const contactDetail = document.createElement('span');
            contactDetail.className = 'task-detail';
            contactDetail.textContent = `Contact: ${task.parsed.contact}`;
            taskDetails.appendChild(contactDetail);
        }
        
        // Add duration if available
        if (task.parsed.duration) {
            const durationDetail = document.createElement('span');
            durationDetail.className = 'task-detail';
            durationDetail.textContent = `Duration: ${task.parsed.duration}`;
            taskDetails.appendChild(durationDetail);
        }
        
        // Assemble the task card
        taskCard.appendChild(taskTitle);
        taskCard.appendChild(taskDate);
        taskCard.appendChild(taskDetails);
        
        // Get all existing tasks and add the new one
        const allTasks = document.querySelectorAll('.task-card');
        const newTaskDate = new Date(`${task.parsed.date}T${task.parsed.time}`);
        
        // If no tasks exist, just append
        if (allTasks.length === 0) {
            taskResults.appendChild(taskCard);
            return;
        }
        
        // Find the right position to insert the task based on date
        let inserted = false;
        for (let i = 0; i < allTasks.length; i++) {
            const existingTask = allTasks[i];
            const dateText = existingTask.querySelector('.task-date').textContent;
            const [datePart, timePart] = dateText.split(' ');
            const existingDate = new Date(`${datePart}T${timePart}`);
            
            if (newTaskDate < existingDate) {
                taskResults.insertBefore(taskCard, existingTask);
                inserted = true;
                break;
            }
        }
        
        // If the new task is the latest, append it to the end
        if (!inserted) {
            taskResults.appendChild(taskCard);
        }
    }
}

function initProjectLazyLoading() {
    // Create IntersectionObserver for lazy loading
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectCard = entry.target;
                const projectId = projectCard.id;
                
                // Load project embed when it comes into view
                if (!projectCard.dataset.loaded) {
                    loadProjectEmbed(projectId);
                    projectCard.dataset.loaded = 'true';
                }
                
                // Stop observing once loaded
                projectObserver.unobserve(projectCard);
            }
        });
    }, {
        rootMargin: '100px', // Start loading when within 100px of viewport
        threshold: 0.1
    });
    
    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        projectObserver.observe(card);
    });
}

function loadProjectEmbed(projectId) {
    // Show loading indicator
    const embed = document.querySelector(`#${projectId}-embed`);
    if (embed) {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = '<div class="spinner"></div><p>Loading...</p>';
        embed.appendChild(loadingIndicator);
        
        // Simulate loading (remove this in production)
        setTimeout(() => {
            loadingIndicator.remove();
            
            // Initialize the specific project
            switch(projectId) {
                case 'rowing-analytics':
                    initRowingAnalytics();
                    break;
                case 'greek-conjugator':
                    initGreekConjugator();
                    break;
                case 'nlp-task-scheduler':
                    initNLPTaskScheduler();
                    break;
            }
        }, 500);
    }
}

function initAccessibility() {
    // Make tabs keyboard navigable
    document.querySelectorAll('.embed-tab').forEach(tab => {
        tab.addEventListener('keydown', function(e) {
            // Enter or Space activates the tab
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow keys for navigation between tabs
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                
                const tabs = Array.from(this.parentElement.querySelectorAll('.embed-tab'));
                const currentIndex = tabs.indexOf(this);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % tabs.length;
                } else {
                    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                
                tabs[nextIndex].focus();
            }
        });
    });
    
    // Enhance button focus states
    document.querySelectorAll('button, .project-link, input, select').forEach(el => {
        // Already handled by CSS focus states
    });
}


function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = this.querySelector('input[placeholder="Your Name"]');
            const emailInput = this.querySelector('input[placeholder="Your Email"]');
            const messageInput = this.querySelector('textarea');
            
            // Reset previous error states
            this.querySelectorAll('.error-message').forEach(el => el.remove());
            this.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
            
            // Validate form
            let isValid = true;
            
            // Name validation
            if (!nameInput.value.trim()) {
                addErrorMessage(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            if (!validateEmail(emailInput.value.trim())) {
                addErrorMessage(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                addErrorMessage(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                const formControls = contactForm.querySelectorAll('.form-control, button');
                formControls.forEach(el => el.disabled = true);
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.appendChild(successMessage);
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    formControls.forEach(el => el.disabled = false);
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Helper function to add error message
    function addErrorMessage(inputElement, message) {
        inputElement.classList.add('error');
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        inputElement.parentNode.appendChild(errorMessage);
    }
}