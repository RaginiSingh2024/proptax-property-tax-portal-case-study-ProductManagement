document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('objectionForm');
  const objectionsList = document.getElementById('objectionsList');

  if (!form || !objectionsList) return;

  function renderObjections(items) {
    if (!items.length) {
      objectionsList.innerHTML = `
        <div class="empty-state">
          <h4>No objections</h4>
          <p>There are no objection records for this citizen account yet.</p>
        </div>
      `;
      return;
    }

    objectionsList.innerHTML = items.map((item) => `
      <article class="result-card">
        <h5>${item.objectionId}</h5>
        <div class="result-meta">
          <span><strong>Property:</strong> ${item.propertyId}</span>
          <span><strong>Category:</strong> ${item.category}</span>
          <span><strong>Subject:</strong> ${item.subject}</span>
          <span><strong>Status:</strong> ${item.status}</span>
        </div>
        <div class="timeline-row">
          ${item.timeline.map((step) => `<span class="timeline-step ${step === item.status ? 'active' : ''}">${step}</span>`).join('')}
        </div>
      </article>
    `).join('');
  }

  renderObjections(getObjections());

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const propertyId = (formData.get('propertyId') || '').toString().trim();
    const category = (formData.get('category') || '').toString().trim();
    const subject = (formData.get('subject') || '').toString().trim();
    const description = (formData.get('description') || '').toString().trim();
    const contact = (formData.get('contact') || '').toString().trim();

    if (!propertyId || !category || !subject || !description || !contact) {
      showToast('Please complete all required objection fields.', 'error');
      return;
    }

    const currentObjections = getObjections();
    const nextSequence = (currentObjections.length + 1).toString().padStart(5, '0');
    const objectionId = `OBJ-${new Date().getFullYear()}-${nextSequence}`;

    const newObjection = {
      objectionId,
      propertyId,
      category,
      subject,
      description,
      contact,
      status: 'Submitted',
      timeline: ['Submitted', 'Under Review', 'Decision Pending', 'Resolved'],
      submittedOn: new Date().toISOString().slice(0, 10)
    };

    currentObjections.unshift(newObjection);
    saveObjections(currentObjections);
    renderObjections(currentObjections);
    form.reset();
    showToast(`Objection submitted successfully. ${objectionId}`, 'success');
  });
});
