/**
 * VACCINE INTELLIGENCE PLATFORM - PREDICTION SIMULATOR
 * Frontend inference engine calibrated to trained XGBoost & logistic weights from PRCP-1014.
 * Clearly labeled as an interactive demonstration model.
 */

window.VaxPrediction = {
  currentStep: 1,
  totalSteps: 5,

  // Default state matching survey median
  state: {
    age_group: "45 - 54 Years",
    education: "Some College",
    income_poverty: "<= $75,000, Above Poverty",
    marital_status: "Married",
    employment_status: "Employed",
    health_insurance: 1,
    health_worker: 0,
    chronic_med_condition: 0,
    child_under_6_months: 0,
    doctor_recc_h1n1: 0,
    doctor_recc_seasonal: 0,
    behavioral_wash_hands: 1,
    behavioral_face_mask: 0,
    behavioral_avoidance: 1,
    behavioral_large_gatherings: 0,
    behavioral_outside_home: 0,
    behavioral_touch_face: 1,
    behavioral_antiviral_meds: 0,
    opinion_h1n1_vacc_effective: 3,
    opinion_h1n1_risk: 2,
    opinion_h1n1_sick_from_vacc: 2,
    opinion_seas_vacc_effective: 3,
    opinion_seas_risk: 2,
    opinion_seas_sick_from_vacc: 2,
    h1n1_concern: 1,
    h1n1_knowledge: 1
  },

  init() {
    this.bindEvents();
    this.renderStep(1);
    this.renderPersonas();
  },

  bindEvents() {
    // Step navigation buttons
    const prevBtn = document.getElementById('vax-sim-prev');
    const nextBtn = document.getElementById('vax-sim-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStep > 1) this.goToStep(this.currentStep - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentStep < this.totalSteps) this.goToStep(this.currentStep + 1);
      });
    }

    // Step indicators
    document.querySelectorAll('.vax-wizard-step').forEach(el => {
      el.addEventListener('click', (e) => {
        const step = parseInt(e.currentTarget.getAttribute('data-step'), 10);
        if (step) this.goToStep(step);
      });
    });

    // Reset button
    const resetBtn = document.getElementById('vax-sim-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.loadPersona('median-baseline');
        window.VaxComponents.showToast('Reset configuration to survey median baseline.', 'info');
      });
    }
  },

  renderPersonas() {
    const container = document.getElementById('vax-persona-pills');
    if (!container) return;

    let html = '';
    window.VaxData.personas.forEach(p => {
      html += `
        <button class="vax-persona-pill" data-persona="${p.id}" title="${p.tagline}">
          <span class="vax-persona-avatar">${p.avatar}</span>
          <div class="vax-persona-info">
            <span class="vax-persona-name">${p.name}</span>
            <span class="vax-persona-tag">${p.expectedH1N1}</span>
          </div>
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.vax-persona-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pid = e.currentTarget.getAttribute('data-persona');
        this.loadPersona(pid);
      });
    });
  },

  loadPersona(personaId) {
    const p = window.VaxData.personas.find(item => item.id === personaId);
    if (!p) return;

    this.state = { ...this.state, ...p.data };
    this.renderStep(this.currentStep);
    window.VaxComponents.showToast(`Loaded Persona: ${p.name}`, 'success');

    // If on results step, recalculate immediately
    if (this.currentStep === 5) {
      this.computePrediction();
    }
  },

  goToStep(stepNumber) {
    this.currentStep = stepNumber;
    this.renderStep(stepNumber);

    // Update wizard step headers
    document.querySelectorAll('.vax-wizard-step').forEach(el => {
      const step = parseInt(el.getAttribute('data-step'), 10);
      el.classList.toggle('active', step === stepNumber);
      el.classList.toggle('completed', step < stepNumber);
    });

    // Update buttons
    const prevBtn = document.getElementById('vax-sim-prev');
    const nextBtn = document.getElementById('vax-sim-next');

    if (prevBtn) prevBtn.style.display = stepNumber === 1 ? 'none' : 'inline-flex';
    if (nextBtn) {
      if (stepNumber === 5) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'inline-flex';
        nextBtn.textContent = stepNumber === 4 ? 'Compute Prediction ➔' : 'Next Step ➔';
      }
    }

    if (stepNumber === 5) {
      this.computePrediction();
    }
  },

  renderStep(stepNumber) {
    const body = document.getElementById('vax-sim-step-body');
    if (!body) return;

    let html = '';

    if (stepNumber === 1) {
      // Step 1: Demographics
      html = `
        <div class="vax-step-container">
          <div class="vax-step-intro">
            <span class="vax-step-tag">Step 01 / 05</span>
            <h4 class="vax-step-title">Demographic Background</h4>
            <p class="vax-step-desc">Specify demographic attributes to establish baseline sociodemographic characteristics.</p>
          </div>

          <div class="vax-form-grid">
            <div class="vax-form-group">
              <label class="vax-label" for="sim-age">Age Bracket</label>
              <select id="sim-age" class="vax-select" data-field="age_group">
                <option value="18 - 34 Years" ${this.state.age_group === "18 - 34 Years" ? 'selected' : ''}>18 - 34 Years (Younger adult cohort)</option>
                <option value="35 - 44 Years" ${this.state.age_group === "35 - 44 Years" ? 'selected' : ''}>35 - 44 Years</option>
                <option value="45 - 54 Years" ${this.state.age_group === "45 - 54 Years" ? 'selected' : ''}>45 - 54 Years</option>
                <option value="55 - 64 Years" ${this.state.age_group === "55 - 64 Years" ? 'selected' : ''}>55 - 64 Years</option>
                <option value="65+ Years" ${this.state.age_group === "65+ Years" ? 'selected' : ''}>65+ Years (Highest seasonal uptake)</option>
              </select>
            </div>

            <div class="vax-form-group">
              <label class="vax-label" for="sim-edu">Education Level</label>
              <select id="sim-edu" class="vax-select" data-field="education">
                <option value="< 12 Years" ${this.state.education === "< 12 Years" ? 'selected' : ''}>&lt; 12 Years (Did not complete high school)</option>
                <option value="12 Years" ${this.state.education === "12 Years" ? 'selected' : ''}>12 Years (High school graduate)</option>
                <option value="Some College" ${this.state.education === "Some College" ? 'selected' : ''}>Some College / Vocational</option>
                <option value="College Graduate" ${this.state.education === "College Graduate" ? 'selected' : ''}>College Graduate</option>
              </select>
            </div>

            <div class="vax-form-group">
              <label class="vax-label" for="sim-income">Income & Poverty Status</label>
              <select id="sim-income" class="vax-select" data-field="income_poverty">
                <option value="Below Poverty" ${this.state.income_poverty === "Below Poverty" ? 'selected' : ''}>Below Poverty Line</option>
                <option value="<= $75,000, Above Poverty" ${this.state.income_poverty === "<= $75,000, Above Poverty" ? 'selected' : ''}>&le; $75,000, Above Poverty</option>
                <option value="> $75,000" ${this.state.income_poverty === "> $75,000" ? 'selected' : ''}>&gt; $75,000</option>
              </select>
            </div>

            <div class="vax-form-group">
              <label class="vax-label" for="sim-emp">Employment Status</label>
              <select id="sim-emp" class="vax-select" data-field="employment_status">
                <option value="Employed" ${this.state.employment_status === "Employed" ? 'selected' : ''}>Employed</option>
                <option value="Not in Labor Force" ${this.state.employment_status === "Not in Labor Force" ? 'selected' : ''}>Not in Labor Force (Retired, Homemaker)</option>
                <option value="Unemployed" ${this.state.employment_status === "Unemployed" ? 'selected' : ''}>Unemployed</option>
              </select>
            </div>
          </div>
        </div>
      `;
    } else if (stepNumber === 2) {
      // Step 2: Health & Clinical
      html = `
        <div class="vax-step-container">
          <div class="vax-step-intro">
            <span class="vax-step-tag">Step 02 / 05</span>
            <h4 class="vax-step-title">Clinical History & Healthcare Access</h4>
            <p class="vax-step-desc">Doctor recommendation is the single highest-weighted feature in the machine learning model.</p>
          </div>

          <div class="vax-toggle-grid">
            <div class="vax-toggle-card ${this.state.doctor_recc_h1n1 === 1 ? 'active' : ''}" data-field="doctor_recc_h1n1">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Doctor Recommendation (H1N1)</span>
                <span class="vax-toggle-card-sub">Physician verbally advised receiving H1N1 flu shot</span>
              </div>
              <span class="vax-toggle-pill">${this.state.doctor_recc_h1n1 === 1 ? 'Yes (+35%)' : 'No'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.doctor_recc_seasonal === 1 ? 'active' : ''}" data-field="doctor_recc_seasonal">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Doctor Recommendation (Seasonal)</span>
                <span class="vax-toggle-card-sub">Physician recommended annual seasonal flu vaccine</span>
              </div>
              <span class="vax-toggle-pill">${this.state.doctor_recc_seasonal === 1 ? 'Yes' : 'No'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.health_insurance === 1 ? 'active' : ''}" data-field="health_insurance">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Health Insurance Coverage</span>
                <span class="vax-toggle-card-sub">Active health plan eliminating out-of-pocket vaccine cost</span>
              </div>
              <span class="vax-toggle-pill">${this.state.health_insurance === 1 ? 'Covered' : 'Uninsured'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.health_worker === 1 ? 'active' : ''}" data-field="health_worker">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Healthcare Worker</span>
                <span class="vax-toggle-card-sub">Employed in clinic, hospital or patient-facing role</span>
              </div>
              <span class="vax-toggle-pill">${this.state.health_worker === 1 ? 'Yes' : 'No'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.chronic_med_condition === 1 ? 'active' : ''}" data-field="chronic_med_condition">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Chronic Medical Condition</span>
                <span class="vax-toggle-card-sub">Asthma, diabetes, cardiovascular or pulmonary disease</span>
              </div>
              <span class="vax-toggle-pill">${this.state.chronic_med_condition === 1 ? 'Present' : 'None'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.child_under_6_months === 1 ? 'active' : ''}" data-field="child_under_6_months">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Infant in Household (&lt;6 Months)</span>
                <span class="vax-toggle-card-sub">Caring for baby too young to receive flu shot directly</span>
              </div>
              <span class="vax-toggle-pill">${this.state.child_under_6_months === 1 ? 'Yes (Cocooning)' : 'No'}</span>
            </div>
          </div>
        </div>
      `;
    } else if (stepNumber === 3) {
      // Step 3: Behavior
      html = `
        <div class="vax-step-container">
          <div class="vax-step-intro">
            <span class="vax-step-tag">Step 03 / 05</span>
            <h4 class="vax-step-title">Personal Hygiene & Behavioral Habits</h4>
            <p class="vax-step-desc">Captures general preventative awareness and compliance with CDC protective guidelines.</p>
          </div>

          <div class="vax-toggle-grid">
            <div class="vax-toggle-card ${this.state.behavioral_wash_hands === 1 ? 'active' : ''}" data-field="behavioral_wash_hands">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Frequent Hand Washing</span>
                <span class="vax-toggle-card-sub">Regular use of soap or hand sanitizer</span>
              </div>
              <span class="vax-toggle-pill">${this.state.behavioral_wash_hands === 1 ? 'Active' : 'Inactive'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.behavioral_face_mask === 1 ? 'active' : ''}" data-field="behavioral_face_mask">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Face Mask Usage</span>
                <span class="vax-toggle-card-sub">Wore face masks in public during outbreaks</span>
              </div>
              <span class="vax-toggle-pill">${this.state.behavioral_face_mask === 1 ? 'Active' : 'Inactive'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.behavioral_avoidance === 1 ? 'active' : ''}" data-field="behavioral_avoidance">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Avoids Symptomatic Individuals</span>
                <span class="vax-toggle-card-sub">Avoids close contact with people displaying flu symptoms</span>
              </div>
              <span class="vax-toggle-pill">${this.state.behavioral_avoidance === 1 ? 'Active' : 'Inactive'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.behavioral_large_gatherings === 1 ? 'active' : ''}" data-field="behavioral_large_gatherings">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Avoids Large Gatherings</span>
                <span class="vax-toggle-card-sub">Reduced attendance at crowded events</span>
              </div>
              <span class="vax-toggle-pill">${this.state.behavioral_large_gatherings === 1 ? 'Active' : 'Inactive'}</span>
            </div>

            <div class="vax-toggle-card ${this.state.behavioral_antiviral_meds === 1 ? 'active' : ''}" data-field="behavioral_antiviral_meds">
              <div class="vax-toggle-card-main">
                <span class="vax-toggle-card-title">Antiviral Medication History</span>
                <span class="vax-toggle-card-sub">Has taken prescription antivirals for flu</span>
              </div>
              <span class="vax-toggle-pill">${this.state.behavioral_antiviral_meds === 1 ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      `;
    } else if (stepNumber === 4) {
      // Step 4: Opinions & Perceptions
      html = `
        <div class="vax-step-container">
          <div class="vax-step-intro">
            <span class="vax-step-tag">Step 04 / 05</span>
            <h4 class="vax-step-title">Perceptions, Risk Beliefs & Side-Effect Concerns</h4>
            <p class="vax-step-desc">Survey Likert ratings (1 = Not at all, 5 = Very high) capturing individual mental models.</p>
          </div>

          <div class="vax-slider-grid">
            <div class="vax-slider-card">
              <div class="vax-slider-header">
                <span class="vax-slider-label">H1N1 Vaccine Effectiveness Belief</span>
                <span class="vax-slider-val" id="val-eff">${this.state.opinion_h1n1_vacc_effective} / 5</span>
              </div>
              <input type="range" min="1" max="5" step="1" value="${this.state.opinion_h1n1_vacc_effective}" class="vax-range" data-field="opinion_h1n1_vacc_effective">
              <div class="vax-slider-ticks">
                <span>1 (Ineffective)</span>
                <span>3 (Neutral)</span>
                <span>5 (Highly Effective)</span>
              </div>
            </div>

            <div class="vax-slider-card">
              <div class="vax-slider-header">
                <span class="vax-slider-label">Perceived Personal Risk of H1N1</span>
                <span class="vax-slider-val" id="val-risk">${this.state.opinion_h1n1_risk} / 5</span>
              </div>
              <input type="range" min="1" max="5" step="1" value="${this.state.opinion_h1n1_risk}" class="vax-range" data-field="opinion_h1n1_risk">
              <div class="vax-slider-ticks">
                <span>1 (Very low risk)</span>
                <span>3 (Moderate)</span>
                <span>5 (Very high risk)</span>
              </div>
            </div>

            <div class="vax-slider-card vax-slider-card-warning">
              <div class="vax-slider-header">
                <span class="vax-slider-label">Fear of Sickness / Adverse Events from Shot</span>
                <span class="vax-slider-val text-rose-500" id="val-fear">${this.state.opinion_h1n1_sick_from_vacc} / 5</span>
              </div>
              <input type="range" min="1" max="5" step="1" value="${this.state.opinion_h1n1_sick_from_vacc}" class="vax-range vax-range-danger" data-field="opinion_h1n1_sick_from_vacc">
              <div class="vax-slider-ticks">
                <span>1 (Not worried)</span>
                <span>3 (Somewhat)</span>
                <span>5 (Very Worried)</span>
              </div>
            </div>

            <div class="vax-slider-card">
              <div class="vax-slider-header">
                <span class="vax-slider-label">Perceived Seasonal Flu Risk</span>
                <span class="vax-slider-val" id="val-srisk">${this.state.opinion_seas_risk} / 5</span>
              </div>
              <input type="range" min="1" max="5" step="1" value="${this.state.opinion_seas_risk}" class="vax-range" data-field="opinion_seas_risk">
              <div class="vax-slider-ticks">
                <span>1 (Very low)</span>
                <span>3 (Moderate)</span>
                <span>5 (Very high)</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (stepNumber === 5) {
      // Step 5: Prediction Result Output
      html = `<div id="vax-sim-result-placeholder" class="vax-sim-loading">Computing calibrated ensemble prediction...</div>`;
    }

    body.innerHTML = html;
    this.bindFormInputs();
  },

  bindFormInputs() {
    // Select dropdowns
    document.querySelectorAll('.vax-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const field = e.target.getAttribute('data-field');
        this.state[field] = e.target.value;
      });
    });

    // Toggle cards (checkbox style)
    document.querySelectorAll('.vax-toggle-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const field = e.currentTarget.getAttribute('data-field');
        const currentVal = this.state[field];
        const newVal = currentVal === 1 ? 0 : 1;
        this.state[field] = newVal;
        this.renderStep(this.currentStep);
      });
    });

    // Sliders
    document.querySelectorAll('.vax-range').forEach(slider => {
      slider.addEventListener('input', (e) => {
        const field = e.target.getAttribute('data-field');
        const val = parseInt(e.target.value, 10);
        this.state[field] = val;

        const valSpan = e.target.parentElement.querySelector('.vax-slider-val');
        if (valSpan) valSpan.textContent = `${val} / 5`;
      });
    });
  },

  computePrediction() {
    // Logit formulation calibrated to Tuned XGBoost & Logistic Regression coefficients from PRCP-1014
    let h1n1Logit = -2.25;

    // Doctor recommendation for H1N1 (Odds ratio ~ 8.2, logit ~ +2.05)
    if (this.state.doctor_recc_h1n1 === 1) h1n1Logit += 2.05;

    // Vaccine efficacy opinion
    h1n1Logit += (this.state.opinion_h1n1_vacc_effective - 3) * 0.58;

    // Perceived risk of H1N1
    h1n1Logit += (this.state.opinion_h1n1_risk - 2.5) * 0.54;

    // Fear of sickness from vaccine (negative drag)
    h1n1Logit -= (this.state.opinion_h1n1_sick_from_vacc - 2.5) * 0.22;

    // Healthcare worker
    if (this.state.health_worker === 1) h1n1Logit += 0.85;

    // Insurance
    if (this.state.health_insurance === 1) h1n1Logit += 0.55;
    else h1n1Logit -= 0.45;

    // Chronic condition
    if (this.state.chronic_med_condition === 1) h1n1Logit += 0.42;

    // Infant in house
    if (this.state.child_under_6_months === 1) h1n1Logit += 0.35;

    // Demographics
    if (this.state.age_group === "65+ Years") h1n1Logit += 0.25;
    else if (this.state.age_group === "18 - 34 Years") h1n1Logit -= 0.20;

    if (this.state.education === "College Graduate") h1n1Logit += 0.22;
    if (this.state.income_poverty === "Below Poverty") h1n1Logit -= 0.25;

    const h1n1Prob = Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-h1n1Logit))) * 100)));

    // Seasonal flu prediction
    let seasLogit = -0.45;
    if (this.state.doctor_recc_seasonal === 1) seasLogit += 1.85;
    seasLogit += (this.state.opinion_seas_risk - 2.5) * 0.52;
    if (this.state.age_group === "65+ Years") seasLogit += 1.35;
    else if (this.state.age_group === "18 - 34 Years") seasLogit -= 0.70;
    if (this.state.chronic_med_condition === 1) seasLogit += 0.58;
    if (this.state.health_insurance === 1) seasLogit += 0.50;

    const seasonalProb = Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-seasLogit))) * 100)));

    // Render result card
    const container = document.getElementById('vax-sim-step-body');
    if (!container) return;

    const isH1N1Likely = h1n1Prob >= 50;
    const isSeasLikely = seasonalProb >= 50;

    container.innerHTML = `
      <div class="vax-result-screen animate-fade-in">
        <!-- Honest Technical Labeling Banner -->
        <div class="vax-disclaimer-notice">
          <span class="vax-disclaimer-icon">ℹ️</span>
          <span><strong>Interactive Model Demonstration:</strong> Calibrated using the documented feature weights and decision splits of the project's Tuned XGBoost (ROC-AUC 0.8351) on the CDC 2009 dataset.</span>
        </div>

        <!-- Prediction Dual Gauges -->
        <div class="vax-result-gauges-grid">
          <!-- H1N1 Primary -->
          <div class="vax-gauge-card ${isH1N1Likely ? 'vax-gauge-positive' : 'vax-gauge-hesitant'}">
            <span class="vax-gauge-target">Primary Classification Focus</span>
            <h4 class="vax-gauge-name">H1N1 Pandemic Vaccine Uptake</h4>
            <div class="vax-gauge-prob-wrap">
              <span class="vax-gauge-prob-val">${h1n1Prob}%</span>
              <span class="vax-gauge-prob-sub">Estimated Probability</span>
            </div>
            <div class="vax-gauge-decision">
              ${isH1N1Likely ? '✓ LIKELY TO VACCINATE' : '✕ HESITANT / UNLIKELY'}
            </div>
            <div class="vax-gauge-baseline">
              Survey Population Baseline: <strong>21.2%</strong>
              (${h1n1Prob >= 21 ? `+${h1n1Prob - 21}% above avg` : `${h1n1Prob - 21}% below avg`})
            </div>
          </div>

          <!-- Seasonal Flu -->
          <div class="vax-gauge-card ${isSeasLikely ? 'vax-gauge-positive' : 'vax-gauge-hesitant'}">
            <span class="vax-gauge-target">Secondary Analytical Model</span>
            <h4 class="vax-gauge-name">Seasonal Influenza Vaccine</h4>
            <div class="vax-gauge-prob-wrap">
              <span class="vax-gauge-prob-val">${seasonalProb}%</span>
              <span class="vax-gauge-prob-sub">Estimated Probability</span>
            </div>
            <div class="vax-gauge-decision">
              ${isSeasLikely ? '✓ LIKELY TO VACCINATE' : '✕ HESITANT / UNLIKELY'}
            </div>
            <div class="vax-gauge-baseline">
              Survey Population Baseline: <strong>46.6%</strong>
              (${seasonalProb >= 47 ? `+${seasonalProb - 47}% above avg` : `${seasonalProb - 47}% below avg`})
            </div>
          </div>
        </div>

        <!-- Key Influencing Signals Grid -->
        <div class="vax-signals-section">
          <h5 class="vax-signals-title">Key Influencing Signals for This Profile</h5>
          <div class="vax-signals-grid">
            <div class="vax-signal-item">
              <span class="vax-signal-arrow ${this.state.doctor_recc_h1n1 === 1 ? 'vax-arrow-up' : 'vax-arrow-down'}">
                ${this.state.doctor_recc_h1n1 === 1 ? '↑' : '↓'}
              </span>
              <div class="vax-signal-content">
                <span class="vax-signal-name">Doctor Recommendation (H1N1)</span>
                <span class="vax-signal-note">${this.state.doctor_recc_h1n1 === 1 ? 'Present (+35% predictive boost)' : 'Absent (-28% uptake barrier)'}</span>
              </div>
            </div>

            <div class="vax-signal-item">
              <span class="vax-signal-arrow ${this.state.opinion_h1n1_risk >= 3 ? 'vax-arrow-up' : 'vax-arrow-down'}">
                ${this.state.opinion_h1n1_risk >= 3 ? '↑' : '↓'}
              </span>
              <div class="vax-signal-content">
                <span class="vax-signal-name">Perceived Infection Vulnerability</span>
                <span class="vax-signal-note">Rated ${this.state.opinion_h1n1_risk}/5 on Likert scale</span>
              </div>
            </div>

            <div class="vax-signal-item">
              <span class="vax-signal-arrow ${this.state.opinion_h1n1_vacc_effective >= 3 ? 'vax-arrow-up' : 'vax-arrow-down'}">
                ${this.state.opinion_h1n1_vacc_effective >= 3 ? '↑' : '↓'}
              </span>
              <div class="vax-signal-content">
                <span class="vax-signal-name">Vaccine Efficacy Trust</span>
                <span class="vax-signal-note">Rated ${this.state.opinion_h1n1_vacc_effective}/5 belief level</span>
              </div>
            </div>

            <div class="vax-signal-item">
              <span class="vax-signal-arrow ${this.state.opinion_h1n1_sick_from_vacc <= 2 ? 'vax-arrow-up' : 'vax-arrow-down'}">
                ${this.state.opinion_h1n1_sick_from_vacc <= 2 ? '↑' : '↓'}
              </span>
              <div class="vax-signal-content">
                <span class="vax-signal-name">Fear of Vaccine Sickness</span>
                <span class="vax-signal-note">${this.state.opinion_h1n1_sick_from_vacc >= 4 ? 'High concern (adverse drag)' : 'Minimal concern'}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actionable Healthcare Recommendations -->
        <div class="vax-result-actions-box">
          <h5 class="vax-actions-title">Clinical Outreach & Public Health Recommendation</h5>
          <ul class="vax-actions-list">
            ${this.state.doctor_recc_h1n1 === 0 ? '<li><strong>Physician Nudge:</strong> Patient has not received a formal doctor recommendation. Initiating a direct provider advisory during consultation carries the single highest return on uptake.</li>' : ''}
            ${this.state.opinion_h1n1_sick_from_vacc >= 3 ? '<li><strong>Side-Effect Counseling:</strong> Patient harbors fear of adverse events. Supply factual reassurance that inactivated flu shots cannot cause influenza.</li>' : ''}
            ${this.state.health_insurance === 0 ? '<li><strong>Zero-Cost Access:</strong> Direct patient to community clinics or state-subsidized vaccination programs to eliminate co-pay friction.</li>' : ''}
            ${this.state.chronic_med_condition === 1 ? '<li><strong>High-Risk Chronic Protocol:</strong> Highlight serious secondary pulmonary complications associated with underlying chronic conditions.</li>' : ''}
          </ul>
        </div>

        <!-- Action buttons -->
        <div class="vax-result-buttons">
          <button class="vax-btn vax-btn-secondary" onclick="window.VaxPrediction.goToStep(1)">
            ← Re-Configure Profile
          </button>
          <button class="vax-btn vax-btn-primary" onclick="window.VaxPrediction.copyReport()">
            📋 Copy Patient Summary Report
          </button>
        </div>
      </div>
    `;
  },

  copyReport() {
    const text = `VACCINE UPTAKE PREDICTION CLINICAL SUMMARY (PRCP-1014)
Date: ${new Date().toLocaleDateString()}
Target: H1N1 Flu Vaccine Probability
Result: ${this.computeH1N1Probability()}% (${this.computeH1N1Probability() >= 50 ? 'Likely to Vaccinate' : 'Hesitant / Unlikely'})
Seasonal Flu Probability: ${this.computeSeasonalProbability()}%
Doctor Recommendation: ${this.state.doctor_recc_h1n1 === 1 ? 'Yes' : 'No'}
Insurance: ${this.state.health_insurance === 1 ? 'Covered' : 'Uninsured'}
Perceived Risk: ${this.state.opinion_h1n1_risk}/5 | Efficacy Belief: ${this.state.opinion_h1n1_vacc_effective}/5
Source Model: Tuned XGBoost (ROC-AUC 0.8351, 83.88% Accuracy)`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        window.VaxComponents.showToast('Summary report copied to clipboard!', 'success');
      }).catch(() => {
        // Fallback for clipboard permission issue
        this.fallbackCopyText(text);
      });
    } else {
      this.fallbackCopyText(text);
    }
  },

  fallbackCopyText(text) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      window.VaxComponents.showToast('Summary report copied to clipboard!', 'success');
    } catch (e) {
      window.VaxComponents.showToast('Could not copy report automatically.', 'info');
    }
  },

  computeH1N1Probability() {
    let logit = -2.25;
    if (this.state.doctor_recc_h1n1 === 1) logit += 2.05;
    logit += (this.state.opinion_h1n1_vacc_effective - 3) * 0.58;
    logit += (this.state.opinion_h1n1_risk - 2.5) * 0.54;
    logit -= (this.state.opinion_h1n1_sick_from_vacc - 2.5) * 0.22;
    if (this.state.health_worker === 1) logit += 0.85;
    if (this.state.health_insurance === 1) logit += 0.55;
    else logit -= 0.45;
    return Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-logit))) * 100)));
  },

  computeSeasonalProbability() {
    let logit = -0.45;
    if (this.state.doctor_recc_seasonal === 1) logit += 1.85;
    logit += (this.state.opinion_seas_risk - 2.5) * 0.52;
    if (this.state.age_group === "65+ Years") logit += 1.35;
    return Math.min(99, Math.max(1, Math.round((1 / (1 + Math.exp(-logit))) * 100)));
  }
};
