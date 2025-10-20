document.getElementById('fitnessForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        goal: document.getElementById('goal').value,
        level: document.getElementById('level').value,
        days: parseInt(document.getElementById('days').value),
        equipment: document.getElementById('equipment').value,
        duration: parseInt(document.getElementById('duration').value),
        specifications: document.getElementById('specifications').value || 'None',
        limitations: document.getElementById('limitations').value || 'None',
        program_duration: parseInt(document.getElementById('program_duration').value)
    };

    // Show loading
    document.getElementById('formCard').style.display = 'none';
    document.getElementById('loading').classList.add('active');

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        // Hide loading
        document.getElementById('loading').classList.remove('active');

        if (data.error) {
            console.error('API Error:', data);
            alert('Error: ' + data.error + (data.details ? '\nDetails: ' + data.details : ''));
            document.getElementById('formCard').style.display = 'block';
            return;
        }

        // Display results
        displayResults(data);
        document.getElementById('results').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        console.error('JavaScript Error:', error);
        document.getElementById('loading').classList.remove('active');
        alert('Error generating plan: ' + error.message + '\n\nCheck browser console (F12) for details.');
        document.getElementById('formCard').style.display = 'block';
    }
});

function displayResults(data) {
    // Display Profile
    const profileGrid = document.getElementById('profileGrid');
    const profile = data.client_profile;
    profileGrid.innerHTML = `
        <div class="profile-item">
            <h4>Goal</h4>
            <p>${profile.goal}</p>
        </div>
        <div class="profile-item">
            <h4>Level</h4>
            <p>${profile.level}</p>
        </div>
        <div class="profile-item">
            <h4>Frequency</h4>
            <p>${profile.days_per_week} days/week</p>
        </div>
        <div class="profile-item">
            <h4>Equipment</h4>
            <p>${profile.equipment}</p>
        </div>
        <div class="profile-item">
            <h4>Session Duration</h4>
            <p>${profile.session_duration_minutes} min</p>
        </div>
        <div class="profile-item">
            <h4>Program Length</h4>
            <p>${profile.program_duration_weeks} weeks</p>
        </div>
    `;

    // Display Program Summary
    const summaryGrid = document.getElementById('summaryGrid');
    const summary = data.program_summary;
    summaryGrid.innerHTML = `
        <div class="summary-item">
            <h3>Overview</h3>
            <p>${summary.overview}</p>
        </div>
        <div class="summary-item">
            <h3>Rationale</h3>
            <p>${summary.rationale}</p>
        </div>
        <div class="summary-item">
            <h3>Training Split</h3>
            <p>${summary.training_split}</p>
        </div>
        <div class="summary-item">
            <h3>Progression</h3>
            <p>${summary.progression_strategy}</p>
        </div>
    `;

    // Display Weekly Plan
    const weeklyPlan = document.getElementById('weeklyPlan');
    let weeksHTML = '';

    const template = data.weekly_template;
    weeksHTML += `
        <div class="week-container">
            <div class="week-header">
                <h3>Weekly Training Schedule</h3>
                <p style="color: #FFFFFF; font-weight: 500;">📋 ${template.repeat_instructions}</p>
            </div>
            <div class="days-grid">
    `;

    template.days.forEach(day => {
            weeksHTML += `
                <div class="day-card">
                    <div class="day-header">
                        <div>
                            <span class="day-title">${day.day_name}</span>
                            <span class="calories-badge">🔥 ${day.estimated_calories_burned} cal</span>
                        </div>
                        <span class="workout-type">${day.workout_type}</span>
                    </div>

                    <div class="exercise-section">
                        <h4>🔥 Warm-up</h4>
                        <div class="exercise-list">
                            ${day.warm_up.map(ex => `
                                <div class="exercise-item">
                                    <span class="exercise-name">${ex.exercise}</span>
                                    <span class="exercise-details">${ex.duration_seconds}s</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="exercise-section">
                        <h4>💪 Main Workout</h4>
                        <div class="exercise-list">
                            ${day.main_workout.map(ex => `
                                <div class="exercise-item">
                                    <span class="exercise-name">${ex.exercise}</span>
                                    <span class="exercise-details">${ex.sets} × ${ex.reps} (${ex.rest_seconds}s rest)</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="exercise-section">
                        <h4>🧘 Cool-down</h4>
                        <div class="exercise-list">
                            ${day.cool_down.map(ex => `
                                <div class="exercise-item">
                                    <span class="exercise-name">${ex.exercise}</span>
                                    <span class="exercise-details">${ex.duration_seconds}s</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="tips-box">
                        <h5>💡 Coaching Tips</h5>
                        <p>${day.coaching_tips}</p>
                        ${day.modifications ? `<p style="margin-top: 0.5rem;"><strong>Modifications:</strong> ${day.modifications}</p>` : ''}
                    </div>
                </div>
            `;
    });

    weeksHTML += `
            </div>
        </div>
    `;

    weeklyPlan.innerHTML = weeksHTML;

    // Display Nutrition
    const nutritionContent = document.getElementById('nutritionContent');
    const nutrition = data.nutrition_guidelines;
    nutritionContent.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Daily Caloric Target: ${nutrition.daily_caloric_target} calories</h3>
        <div class="macro-grid">
            <div class="macro-item">
                <h4>Protein</h4>
                <p>${nutrition.macronutrient_split.protein_g}g</p>
            </div>
            <div class="macro-item">
                <h4>Carbs</h4>
                <p>${nutrition.macronutrient_split.carbs_g}g</p>
            </div>
            <div class="macro-item">
                <h4>Fats</h4>
                <p>${nutrition.macronutrient_split.fats_g}g</p>
            </div>
        </div>
        <h4 style="margin-top: 1.5rem; margin-bottom: 1rem;">Sample Meal Plan</h4>
        <div class="meal-plan-grid">
            ${nutrition.sample_meal_plan.map(meal => `
                <div class="meal-item">
                    <h5>${meal.meal_type}</h5>
                    <p>${meal.example}</p>
                </div>
            `).join('')}
        </div>
    `;

    // Display Habits
    const habitsGrid = document.getElementById('habitsGrid');
    habitsGrid.innerHTML = data.habit_recommendations.map(habit => `
        <div class="tip-card">
            <h4>${habit.habit}</h4>
            <p>${habit.purpose}</p>
        </div>
    `).join('');

    // Display Tracking
    const trackingContent = document.getElementById('trackingContent');
    const tracking = data.tracking_and_metrics;
    trackingContent.innerHTML = `
        <h4 style="color: #1E40AF; margin-bottom: 1rem;">Weekly Checkpoints</h4>
        <div class="checkpoint-grid">
            ${tracking.weekly_checkpoints.map(cp => `
                <div class="checkpoint-item">
                    <strong>Week ${cp.week_number}:</strong> ${cp.focus_metric}<br>
                    <em style="color: #6B7280;">${cp.self_assessment_prompt}</em>
                </div>
            `).join('')}
        </div>
        <h4 style="color: #1E40AF; margin: 1.5rem 0 1rem;">Progress Measures</h4>
        <div class="measures-list">
            ${tracking.progress_measures.map(m => `
                <span class="measure-badge">${m}</span>
            `).join('')}
        </div>
    `;

    // Display Safety
    const safetyContent = document.getElementById('safetyContent');
    const safety = data.safety_notes;
    safetyContent.innerHTML = `
        <div class="safety-item">
            <h4>General Cautions</h4>
            <p>${safety.general_cautions}</p>
        </div>
        <div class="safety-item">
            <h4>Medical Clearance</h4>
            <p>${safety.medical_clearance}</p>
        </div>
    `;
}
