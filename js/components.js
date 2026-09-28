/**
 * VACCINE INTELLIGENCE PLATFORM - COMPONENT ARCHITECTURE
 * Reusable vanilla JavaScript component factories.
 */

window.VaxComponents = {
  /**
   * Renders the 6 Executive KPI Cards with count-up support
   */
  renderKPICards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const kpis = window.VaxData.kpis;
    let html = '';

    kpis.forEach(kpi => {
      html += `
        <div class="vax-kpi-card" data-kpi="${kpi.id}">
          <div class="vax-kpi-top">
            <span class="vax-kpi-label">${kpi.label}</span>
            <span class="vax-kpi-badge vax-kpi-badge-${kpi.status.toLowerCase()}">${kpi.status}</span>
          </div>
          <div class="vax-kpi-val-row">
            <span class="vax-kpi-value" data-val="${kpi.value}">${kpi.value}</span>
          </div>
          <p class="vax-kpi-subtext">${kpi.subtext}</p>
          <div class="vax-kpi-context">
            <span class="vax-kpi-context-bullet">•</span>
            <span>${kpi.context}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  /**
   * Renders a structured Insight Card conforming strictly to Section 9 of specifications
   */
  createInsightCard(data) {
    return `
      <div class="vax-insight-card">
        <div class="vax-insight-header">
          <span class="vax-insight-tag">Empirical Analytical Insight</span>
          <h4 class="vax-insight-question">${data.question}</h4>
        </div>
        <div class="vax-insight-grid">
          <div class="vax-insight-item">
            <span class="vax-insight-item-title">Observation</span>
            <p class="vax-insight-item-body">${data.observation}</p>
          </div>
          <div class="vax-insight-item">
            <span class="vax-insight-item-title">Interpretation</span>
            <p class="vax-insight-item-body">${data.interpretation}</p>
          </div>
          <div class="vax-insight-item">
            <span class="vax-insight-item-title">ML Relevance</span>
            <p class="vax-insight-item-body">${data.mlRelevance}</p>
          </div>
          <div class="vax-insight-item">
            <span class="vax-insight-item-title">Potential Action</span>
            <p class="vax-insight-item-body">${data.potentialAction}</p>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Renders Challenge -> Solution -> Impact cards
   */
  renderChallengeCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    window.VaxData.challenges.forEach((item, idx) => {
      html += `
        <div class="vax-challenge-card">
          <div class="vax-challenge-header">
            <span class="vax-challenge-num">0${idx + 1}</span>
            <h4 class="vax-challenge-title">${item.challenge}</h4>
          </div>
          <div class="vax-challenge-flow">
            <div class="vax-flow-step">
              <span class="vax-flow-label">Documented Issue</span>
              <p class="vax-flow-desc">${item.issue}</p>
            </div>
            <div class="vax-flow-arrow">↓</div>
            <div class="vax-flow-step">
              <span class="vax-flow-label">Engineered Solution</span>
              <p class="vax-flow-desc">${item.solution}</p>
            </div>
            <div class="vax-flow-arrow">↓</div>
            <div class="vax-flow-step vax-flow-impact">
              <span class="vax-flow-label">Validation Impact</span>
              <p class="vax-flow-desc">${item.impact}</p>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  /**
   * Renders the Methodology Interactive Flow
   */
  renderMethodologyFlow(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `<div class="vax-methodology-timeline">`;
    window.VaxData.methodologySteps.forEach((step, idx) => {
      html += `
        <div class="vax-method-step" data-step="${step.step}" tabindex="0">
          <div class="vax-method-step-badge">${step.step}</div>
          <div class="vax-method-step-content">
            <h4 class="vax-method-step-title">${step.title}</h4>
            <div class="vax-method-step-tech">${step.methods}</div>
            <p class="vax-method-step-desc">${step.details}</p>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;
  },

  /**
   * Opens the Model Detail Drawer / Modal
   */
  openModelModal(modelId) {
    const model = window.VaxData.models.find(m => m.id === modelId) || window.VaxData.models[0];
    const modalBackdrop = document.getElementById('vax-model-modal');
    if (!modalBackdrop) return;

    const titleEl = document.getElementById('vax-modal-title');
    const bodyEl = document.getElementById('vax-modal-body');

    if (titleEl) {
      titleEl.innerHTML = `
        <span class="vax-modal-title-main">${model.name}</span>
        <span class="vax-modal-title-sub">${model.algorithm}</span>
      `;
    }

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="vax-model-modal-grid">
          <!-- KPI Summary -->
          <div class="vax-modal-kpi-row">
            <div class="vax-modal-kpi">
              <span class="vax-modal-kpi-label">ROC-AUC</span>
              <span class="vax-modal-kpi-val vax-text-teal">${model.rocAuc.toFixed(4)}</span>
            </div>
            <div class="vax-modal-kpi">
              <span class="vax-modal-kpi-label">Accuracy</span>
              <span class="vax-modal-kpi-val">${(model.accuracy * 100).toFixed(2)}%</span>
            </div>
            <div class="vax-modal-kpi">
              <span class="vax-modal-kpi-label">Precision</span>
              <span class="vax-modal-kpi-val">${(model.precision * 100).toFixed(2)}%</span>
            </div>
            <div class="vax-modal-kpi">
              <span class="vax-modal-kpi-label">Recall</span>
              <span class="vax-modal-kpi-val">${(model.recall * 100).toFixed(2)}%</span>
            </div>
            <div class="vax-modal-kpi">
              <span class="vax-modal-kpi-label">F1 Score</span>
              <span class="vax-modal-kpi-val">${(model.f1 * 100).toFixed(2)}%</span>
            </div>
          </div>

          <!-- Documentation & Analysis -->
          <div class="vax-modal-section">
            <h5 class="vax-modal-section-title">Algorithmic Behavior in Survey Study</h5>
            <p class="vax-modal-text">${model.notes}</p>
          </div>

          <div class="vax-modal-pros-cons">
            <div class="vax-modal-pro-col">
              <h5 class="vax-modal-section-title">Strengths Observed</h5>
              <p class="vax-modal-text">${model.strengths}</p>
            </div>
            <div class="vax-modal-con-col">
              <h5 class="vax-modal-section-title">Observed Limitations</h5>
              <p class="vax-modal-text">${model.limitations}</p>
            </div>
          </div>

          <!-- Hyperparameters if documented -->
          ${model.params ? `
            <div class="vax-modal-section">
              <h5 class="vax-modal-section-title">Documented Hyperparameters / Configuration</h5>
              <div class="vax-params-code">
                <code>${JSON.stringify(model.params, null, 2)}</code>
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }

    modalBackdrop.classList.add('active');
    document.body.classList.add('vax-modal-open');
  },

  /**
   * Closes any open modal
   */
  closeModals() {
    document.querySelectorAll('.vax-modal-backdrop').forEach(m => m.classList.remove('active'));
    document.body.classList.remove('vax-modal-open');
  },

  /**
   * Simple Toast Notification
   */
  showToast(message, type = 'info') {
    let container = document.getElementById('vax-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'vax-toast-container';
      container.className = 'vax-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `vax-toast vax-toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('vax-toast-fade');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
