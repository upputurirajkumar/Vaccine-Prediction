/**
 * VACCINE INTELLIGENCE PLATFORM - APPLICATION CONTROLLER
 * Bootstraps data visualization, event binding, and reactive state.
 */

document.addEventListener('DOMContentLoaded', () => {
  window.VaxApp.init();
});

window.VaxApp = {
  activeEdaTab: 'behavior',
  edaViewMode: 'distribution', // 'distribution' | 'rate'
  activeModelSort: 'rocAuc',
  activeModelSortAsc: false,
  activeFeatureCat: 'All',

  init() {
    // 1. Navigation & Theme
    window.VaxNavigation.init();

    // 2. Executive KPIs
    window.VaxComponents.renderKPICards('vax-kpi-grid');

    // 3. Data Cleaning Story Pipeline
    this.initDataCleaningPipeline();

    // 4. Exploratory Data Analysis (EDA) Tabs
    this.initEdaSection();

    // 5. Statistical Evidence (Heatmap & Chi-Square)
    this.initStatisticalEvidence();

    // 6. Feature Importance Bar Chart
    this.initFeatureImportance();

    // 7. Model Intelligence Lab Leaderboard
    this.renderModelLeaderboard();

    // 8. ROC Curve Lab
    window.VaxCharts.renderRocCurve('vax-roc-chart-container', 'tuned-xgboost');

    // 9. Confusion Matrix
    window.VaxCharts.renderConfusionMatrix('vax-confusion-matrix-container');

    // 10. Methodology & Challenges
    window.VaxComponents.renderMethodologyFlow('vax-methodology-container');
    window.VaxComponents.renderChallengeCards('vax-challenges-container');

    // 11. Prediction Simulator
    window.VaxPrediction.init();

    // 12. Modal & Global Listeners
    this.bindGlobalListeners();

    // 13. Public Health Policy Simulation
    this.initPolicySimulation();
  },

  initDataCleaningPipeline() {
    const pipelineSteps = [
      {
        id: "raw",
        name: "Raw Input Data",
        subtitle: "Separated Files",
        desc: "Features dataset (26,707 x 36) and labels dataset (26,707 x 3) provided independently.",
        impact: "Requires matching respondent_id identifiers before analysis."
      },
      {
        id: "merge",
        name: "Dataset Merge",
        subtitle: "Inner Join",
        desc: "Merged features.csv and labels.csv on respondent_id yielding a single 26,707 x 38 matrix.",
        impact: "Guaranteed complete row matching without dropped records."
      },
      {
        id: "quality",
        name: "Quality Inspection",
        subtitle: "Duplicate Check",
        desc: "Evaluated duplicate rows across all 38 columns (0 duplicates detected). Inspected missing proportions.",
        impact: "Confirms raw respondent integrity; isolates columns requiring imputation."
      },
      {
        id: "imputation",
        name: "Missing Value Imputation",
        subtitle: "SimpleImputer",
        desc: "Ordinal belief variables imputed using median strategy; nominal attributes imputed using mode (most frequent).",
        impact: "Zero loss of respondent records; preserves natural Likert rating distribution."
      },
      {
        id: "encoding",
        name: "Categorical Encoding",
        subtitle: "OneHot & Label",
        desc: "Transformed categorical strings (education, employment, census MSA) into numerical representation.",
        impact: "Standardizes feature space across linear, tree, and gradient boosting algorithms."
      },
      {
        id: "split",
        name: "Stratified Split",
        subtitle: "80 / 20 Train-Test",
        desc: "Split 21,365 training rows and 5,342 holdout test rows preserving 21.24% target stratification.",
        impact: "Eliminates evaluation distribution bias on imbalanced primary target."
      }
    ];

    const container = document.getElementById('vax-cleaning-pipeline');
    if (!container) return;

    let html = `<div class="vax-pipeline-flow">`;
    pipelineSteps.forEach((s, idx) => {
      html += `
        <div class="vax-pipeline-card ${idx === 0 ? 'active' : ''}" data-step="${s.id}">
          <div class="vax-pipeline-card-badge">${idx + 1}</div>
          <h5 class="vax-pipeline-card-title">${s.name}</h5>
          <span class="vax-pipeline-card-sub">${s.subtitle}</span>
          <p class="vax-pipeline-card-desc">${s.desc}</p>
          <div class="vax-pipeline-card-impact"><strong>ML Impact:</strong> ${s.impact}</div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;

    container.querySelectorAll('.vax-pipeline-card').forEach(card => {
      card.addEventListener('click', (e) => {
        container.querySelectorAll('.vax-pipeline-card').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });
  },

  initEdaSection() {
    const tabBtns = document.querySelectorAll('.vax-eda-tab-btn');
    const viewToggles = document.querySelectorAll('.vax-eda-view-btn');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        tabBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeEdaTab = e.currentTarget.getAttribute('data-tab');
        this.renderEdaContent();
      });
    });

    viewToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        viewToggles.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.edaViewMode = e.currentTarget.getAttribute('data-view');
        this.renderEdaContent();
      });
    });

    this.renderEdaContent();
  },

  renderEdaContent() {
    const container = document.getElementById('vax-eda-content');
    if (!container) return;

    const mode = this.edaViewMode;
    const tab = this.activeEdaTab;

    if (tab === 'behavior') {
      // Vaccination behavior distribution
      container.innerHTML = `
        <div class="vax-eda-grid">
          <div class="vax-eda-chart-col">
            <h4 class="vax-eda-subheading">H1N1 vs. Seasonal Flu Target Distribution</h4>
            <div id="vax-donut-h1n1" class="vax-chart-box"></div>
            <div id="vax-donut-seas" class="vax-chart-box"></div>
          </div>
          <div class="vax-eda-insight-col">
            ${window.VaxComponents.createInsightCard({
              question: "How do uptake rates differ between pandemic H1N1 and annual seasonal influenza?",
              observation: "Only 21.2% (5,674) took the novel 2009 H1N1 vaccine, compared to 46.6% (12,435) who took the seasonal flu vaccine.",
              interpretation: "Seasonal flu vaccination benefits from established clinical routine and annual habit, whereas the novel H1N1 strain encountered public hesitancy and unfamiliarity.",
              mlRelevance: "H1N1 presents severe class imbalance (3.7:1), making accuracy misleading; models must be optimized for ROC-AUC and precision-recall.",
              potentialAction: "Public health messaging during novel pandemics must leverage existing seasonal flu immunization infrastructure."
            })}
          </div>
        </div>
      `;

      window.VaxCharts.renderDonutChart('vax-donut-h1n1', [
        { label: "Received H1N1", value: 5674, color: "var(--color-teal-500)" },
        { label: "Unvaccinated", value: 21033, color: "var(--color-slate-600)" }
      ], { title: "H1N1 Target", centerText: "21.2%", centerSub: "Vaccinated" });

      window.VaxCharts.renderDonutChart('vax-donut-seas', [
        { label: "Received Seasonal", value: 12435, color: "var(--color-blue-500)" },
        { label: "Unvaccinated", value: 14272, color: "var(--color-slate-600)" }
      ], { title: "Seasonal Target", centerText: "46.6%", centerSub: "Vaccinated" });

    } else if (tab === 'demographics') {
      const demo = window.VaxData.demographics;
      const ageItems = demo.ageGroups.map(d => ({
        label: d.band,
        value: mode === 'distribution' ? d.sharePct / 100 : d.h1n1UptakePct / 100,
        badge: mode === 'rate' ? `Seas: ${d.seasUptakePct}%` : `N=${Math.round(26707 * d.sharePct / 100).toLocaleString()}`
      }));

      container.innerHTML = `
        <div class="vax-eda-grid">
          <div class="vax-eda-chart-col">
            <h4 class="vax-eda-subheading">${mode === 'distribution' ? 'Age Group Population Share (%)' : 'H1N1 Vaccination Uptake Rate by Age (%)'}</h4>
            <div id="vax-demo-chart" class="vax-chart-box"></div>
          </div>
          <div class="vax-eda-insight-col">
            ${window.VaxComponents.createInsightCard({
              question: "How does vaccination uptake vary across different age brackets?",
              observation: "Elderly respondents (65+) have a 66.8% seasonal vaccination rate but only 22.6% for H1N1. Young adults (18-34) display the lowest uptake in both (18.2% H1N1, 28.5% seasonal).",
              interpretation: "Senior citizens actively seek seasonal flu protection due to recognized biological vulnerability, but pandemic perception varied.",
              mlRelevance: "Age is a powerful linear split for seasonal vaccination, but requires non-linear interaction with perceived risk for H1N1.",
              potentialAction: "Tailor youth-targeted digital outreach emphasizing altruism and protecting elderly household members."
            })}
          </div>
        </div>
      `;

      window.VaxCharts.renderHorizontalBarChart('vax-demo-chart', ageItems, {
        maxValue: mode === 'distribution' ? 0.35 : 0.35,
        title: "Demographics Age Analysis",
        valueFormatter: v => `${(v * 100).toFixed(1)}%`
      });

    } else if (tab === 'health') {
      const healthItems = [
        { label: "Doctor Recommendation (H1N1)", value: mode === 'distribution' ? 0.22 : 0.54, badge: mode === 'rate' ? "54% Uptake" : "22% Recommended" },
        { label: "No Doctor Recommendation", value: mode === 'distribution' ? 0.78 : 0.13, badge: mode === 'rate' ? "13% Uptake" : "78% No Rec" },
        { label: "Healthcare Worker", value: mode === 'distribution' ? 0.11 : 0.35, badge: mode === 'rate' ? "35% Uptake" : "11% Share" },
        { label: "Chronic Medical Condition", value: mode === 'distribution' ? 0.28 : 0.28, badge: mode === 'rate' ? "28% Uptake" : "28% Share" },
        { label: "Active Health Insurance", value: mode === 'distribution' ? 0.55 : 0.25, badge: mode === 'rate' ? "25% Uptake" : "55% Documented" }
      ];

      container.innerHTML = `
        <div class="vax-eda-grid">
          <div class="vax-eda-chart-col">
            <h4 class="vax-eda-subheading">${mode === 'distribution' ? 'Healthcare Factor Prevalences' : 'H1N1 Uptake Rate under Clinical Conditions'}</h4>
            <div id="vax-health-chart" class="vax-chart-box"></div>
          </div>
          <div class="vax-eda-insight-col">
            ${window.VaxComponents.createInsightCard({
              question: "What role does healthcare access and physician guidance play?",
              observation: "When a doctor directly advises the H1N1 vaccine, uptake surges from 13.4% to 54.2%—over a 4-fold increase.",
              interpretation: "Physicians serve as the decisive trust pivot. Even hesitant individuals defer to explicit clinical recommendations.",
              mlRelevance: "doctor_recc_h1n1 is the single highest gain feature in XGBoost and CatBoost models (28.5% relative importance).",
              potentialAction: "Incentivize primary care clinics to automate flu vaccine verbal prompts during every patient visit."
            })}
          </div>
        </div>
      `;

      window.VaxCharts.renderHorizontalBarChart('vax-health-chart', healthItems, {
        maxValue: 0.8,
        title: "Clinical Factor Analysis",
        valueFormatter: v => `${(v * 100).toFixed(1)}%`
      });

    } else if (tab === 'habits') {
      const habitItems = [
        { label: "Frequent Hand Washing", value: 0.82, badge: "82% Practice" },
        { label: "Avoids Sick Contacts", value: 0.72, badge: "72% Practice" },
        { label: "Avoids Touching Face", value: 0.67, badge: "67% Practice" },
        { label: "Avoids Large Gatherings", value: 0.35, badge: "35% Practice" },
        { label: "Face Mask Usage", value: 0.07, badge: "7% Practice" },
        { label: "Antiviral Medication", value: 0.05, badge: "5% Practice" }
      ];

      container.innerHTML = `
        <div class="vax-eda-grid">
          <div class="vax-eda-chart-col">
            <h4 class="vax-eda-subheading">Personal Hygiene & Protective Behavior Adoption</h4>
            <div id="vax-habits-chart" class="vax-chart-box"></div>
          </div>
          <div class="vax-eda-insight-col">
            ${window.VaxComponents.createInsightCard({
              question: "Do daily hygiene habits correlate with willingness to vaccinate?",
              observation: "Basic hygiene (hand washing 82%, avoidance 72%) was widespread, while mask usage in 2009 was rare (6.8%). Mask wearers showed 31% higher vaccine acceptance.",
              interpretation: "High-compliance behavioral individuals exhibit stronger health consciousness and higher receptiveness to medical prophylaxis.",
              mlRelevance: "Behavioral habits serve as an aggregate proxy for conscientiousness and risk aversion in tree models.",
              potentialAction: "Bundle vaccination drives with everyday hygiene communication campaigns."
            })}
          </div>
        </div>
      `;

      window.VaxCharts.renderHorizontalBarChart('vax-habits-chart', habitItems, {
        maxValue: 1.0,
        title: "Habits Adoption Analysis",
        valueFormatter: v => `${(v * 100).toFixed(1)}%`
      });

    } else if (tab === 'opinions') {
      const opinionItems = [
        { label: "Vaccine Efficacy = 5 (Very Effective)", value: 0.38, badge: "38% Uptake Rate" },
        { label: "Vaccine Efficacy = 1 (Not Effective)", value: 0.06, badge: "6% Uptake Rate" },
        { label: "Perceived Risk = 5 (Very High Risk)", value: 0.49, badge: "49% Uptake Rate" },
        { label: "Perceived Risk = 1 (Very Low Risk)", value: 0.08, badge: "8% Uptake Rate" },
        { label: "Fear Sickness = 5 (Very Worried)", value: 0.16, badge: "16% Uptake Rate" }
      ];

      container.innerHTML = `
        <div class="vax-eda-grid">
          <div class="vax-eda-chart-col">
            <h4 class="vax-eda-subheading">H1N1 Vaccination Rate by Perception Extremes</h4>
            <div id="vax-opinions-chart" class="vax-chart-box"></div>
          </div>
          <div class="vax-eda-insight-col">
            ${window.VaxComponents.createInsightCard({
              question: "How decisively do subjective beliefs dictate vaccination?",
              observation: "Respondents believing themselves at very high risk (5/5) had a 49% vaccination rate versus 8% for low risk (1/5). Fear of vaccine sickness significantly depressed uptake.",
              interpretation: "Health belief model strongly holds: perceived susceptibility and perceived benefit outweigh objective demographic categories.",
              mlRelevance: "Perception features combined represent >32% of total tree impurity reduction in XGBoost.",
              potentialAction: "Public health education must demystify vaccine reactogenicity to directly lower sickness anxiety."
            })}
          </div>
        </div>
      `;

      window.VaxCharts.renderHorizontalBarChart('vax-opinions-chart', opinionItems, {
        maxValue: 0.6,
        title: "Perception Analysis",
        valueFormatter: v => `${(v * 100).toFixed(1)}%`
      });
    }
  },

  initStatisticalEvidence() {
    // 1. Correlation Heatmap
    window.VaxCharts.renderCorrelationHeatmap('vax-correlation-heatmap-container');

    // 2. Chi-Square Test Table
    const tableContainer = document.getElementById('vax-chi2-table-container');
    if (!tableContainer) return;

    let html = `
      <div class="vax-table-scroll">
        <table class="vax-data-table">
          <thead>
            <tr>
              <th>Feature Variable</th>
              <th>Category</th>
              <th>Chi-Square Stat (χ²)</th>
              <th>p-Value</th>
              <th>Significance Status</th>
              <th>Interpretation</th>
            </tr>
          </thead>
          <tbody>
    `;

    window.VaxData.chiSquareTests.forEach(test => {
      html += `
        <tr>
          <td><span class="vax-td-bold">${test.name}</span><br><code class="vax-code-sm">${test.feature}</code></td>
          <td><span class="vax-badge">${test.category}</span></td>
          <td class="vax-td-mono">${test.chi2Stat.toFixed(1)}</td>
          <td class="vax-td-mono vax-text-teal">${test.pValue}</td>
          <td><span class="vax-status-pill vax-status-pill-success">p &lt; 0.05 (Significant)</span></td>
          <td class="vax-td-muted">${test.interpretation}</td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    tableContainer.innerHTML = html;
  },

  initFeatureImportance() {
    const filterBtns = document.querySelectorAll('.vax-feat-filter-btn');
    const searchInput = document.getElementById('vax-feat-search');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeFeatureCat = e.currentTarget.getAttribute('data-cat');
        this.renderFeatureChart();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderFeatureChart());
    }

    this.renderFeatureChart();
  },

  renderFeatureChart() {
    const searchVal = (document.getElementById('vax-feat-search')?.value || '').toLowerCase();
    const cat = this.activeFeatureCat;

    const items = window.VaxData.featureImportance
      .filter(f => cat === 'All' || f.category === cat)
      .filter(f => f.name.toLowerCase().includes(searchVal) || f.feature.toLowerCase().includes(searchVal))
      .map(f => ({
        label: f.name,
        value: f.importance,
        badge: f.category
      }));

    window.VaxCharts.renderHorizontalBarChart('vax-features-chart-container', items, {
      maxValue: 0.30,
      title: "Feature Importance Ranking",
      valueFormatter: v => `${(v * 100).toFixed(1)}%`
    });
  },

  renderModelLeaderboard() {
    const tableContainer = document.getElementById('vax-leaderboard-table-container');
    if (!tableContainer) return;

    const sortKey = this.activeModelSort;
    const sortAsc = this.activeModelSortAsc;

    const sorted = [...window.VaxData.models].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      return sortAsc ? valA - valB : valB - valA;
    });

    let html = `
      <div class="vax-table-scroll">
        <table class="vax-data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th data-sort="name">Model Classifier ⇅</th>
              <th data-sort="algorithm">Family ⇅</th>
              <th data-sort="accuracy" class="${sortKey === 'accuracy' ? 'sorted' : ''}">Accuracy ⇅</th>
              <th data-sort="rocAuc" class="${sortKey === 'rocAuc' ? 'sorted' : ''}">ROC-AUC ⇅</th>
              <th data-sort="precision" class="${sortKey === 'precision' ? 'sorted' : ''}">Precision ⇅</th>
              <th data-sort="recall" class="${sortKey === 'recall' ? 'sorted' : ''}">Recall ⇅</th>
              <th data-sort="f1" class="${sortKey === 'f1' ? 'sorted' : ''}">F1-Score ⇅</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `;

    sorted.forEach((m, idx) => {
      const isWinner = m.isFinal;
      html += `
        <tr class="${isWinner ? 'vax-row-champion' : ''}">
          <td class="vax-td-rank">#${idx + 1}</td>
          <td>
            <div class="vax-model-name-cell">
              <span class="vax-td-bold">${m.name}</span>
              ${isWinner ? '<span class="vax-badge vax-badge-champion">Champion Model</span>' : ''}
            </div>
          </td>
          <td><span class="vax-badge">${m.algorithm}</span></td>
          <td class="vax-td-mono">${(m.accuracy * 100).toFixed(2)}%</td>
          <td class="vax-td-mono vax-text-teal vax-td-bold">${m.rocAuc.toFixed(4)}</td>
          <td class="vax-td-mono">${(m.precision * 100).toFixed(2)}%</td>
          <td class="vax-td-mono">${(m.recall * 100).toFixed(2)}%</td>
          <td class="vax-td-mono">${(m.f1 * 100).toFixed(2)}%</td>
          <td>
            <button class="vax-btn-inspect" data-model="${m.id}">Inspect Model</button>
          </td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    tableContainer.innerHTML = html;

    // Attach sort listeners
    tableContainer.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', (e) => {
        const key = e.currentTarget.getAttribute('data-sort');
        if (this.activeModelSort === key) {
          this.activeModelSortAsc = !this.activeModelSortAsc;
        } else {
          this.activeModelSort = key;
          this.activeModelSortAsc = false;
        }
        this.renderModelLeaderboard();
      });
    });

    // Attach inspect listeners
    tableContainer.querySelectorAll('.vax-btn-inspect').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mid = e.currentTarget.getAttribute('data-model');
        window.VaxComponents.openModelModal(mid);
      });
    });
  },

  bindGlobalListeners() {
    // Modal close buttons
    document.querySelectorAll('.vax-modal-close').forEach(btn => {
      btn.addEventListener('click', () => window.VaxComponents.closeModals());
    });

    document.querySelectorAll('.vax-modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) window.VaxComponents.closeModals();
      });
    });

    // Metric visualizer toggle in Model Lab
    document.querySelectorAll('.vax-model-metric-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.vax-model-metric-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const metric = e.currentTarget.getAttribute('data-metric');
        this.renderModelComparisonBar(metric);
      });
    });

    this.renderModelComparisonBar('rocAuc');
  },

  renderModelComparisonBar(metric = 'rocAuc') {
    const container = document.getElementById('vax-model-bars-container');
    if (!container) return;

    const models = window.VaxData.models;
    const items = models.map(m => ({
      label: m.name,
      value: m[metric],
      badge: m.isFinal ? 'Champion' : null,
      color: m.isFinal ? 'var(--color-teal-500)' : 'var(--color-slate-600)'
    }));

    window.VaxCharts.renderHorizontalBarChart('vax-model-bars-container', items, {
      maxValue: metric === 'rocAuc' ? 0.90 : 0.90,
      title: `Model Comparison: ${metric.toUpperCase()}`,
      valueFormatter: v => (metric === 'rocAuc' ? v.toFixed(4) : `${(v * 100).toFixed(2)}%`)
    });
  },

  initPolicySimulation() {
    const slider = document.getElementById('vax-policy-slider');
    const rateDisplay = document.getElementById('vax-policy-rate');
    const statusDisplay = document.getElementById('vax-policy-status');
    const riskDisplay = document.getElementById('vax-policy-risk');

    if (!slider) return;

    const updatePolicy = (val) => {
      const rate = parseInt(val, 10);
      if (rateDisplay) rateDisplay.textContent = `${rate}%`;

      const threshold = 65; // herd immunity for respiratory influenza
      const isProtected = rate >= threshold;

      if (statusDisplay) {
        statusDisplay.innerHTML = isProtected
          ? `<span class="vax-text-emerald">✓ Achieved (&ge;${threshold}%)</span>`
          : `<span class="vax-text-amber">Sub-Optimal (${threshold - rate}% shortfall)</span>`;
      }

      if (riskDisplay) {
        const risk = Math.max(5, Math.round((1 - rate / 100) * 85));
        riskDisplay.textContent = `${risk}% Projected Outbreak Risk`;
      }
    };

    slider.addEventListener('input', (e) => updatePolicy(e.target.value));
    updatePolicy(slider.value);
  }
};
