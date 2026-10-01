document.addEventListener('DOMContentLoaded', () => {
  ensureDemoData();
  handleAuth();
  initNavigation();
  initUserDisplay();
  initLoginPage();
  initProfilePage();
  initPropertySearchPage();
  initPropertyDetailsPage();
  initSelfAssessmentPage();
  initPaymentHistoryPage();
  initHelpPage();
});

function handleAuth() {
  const isAuthPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

  if (isAuthPage) {
    return;
  }

  const session = getStoredData(STORAGE_KEYS.session, null);
  if (!session || !session.name) {
    window.location.href = 'index.html';
  }
}

function initNavigation() {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach((link) => {
    if (link.textContent.includes('Profile')) {
      link.setAttribute('href', 'profile.html');
    }
    const currentPath = window.location.pathname.split('/').pop();
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath === linkPath) {
      link.classList.add('active');
    }
  });

  document.querySelectorAll('.modal-close').forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.classList.add('hidden');
      }
    });
  });
}

function initUserDisplay() {
  const profile = getProfile();
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const initials = `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();

  document.querySelectorAll('.user-pill').forEach((userPill) => {
    const avatar = userPill.querySelector('.avatar');
    const name = userPill.querySelector('strong');
    const role = userPill.querySelector('small');
    if (avatar) avatar.textContent = initials;
    if (name) name.textContent = fullName;
    if (role) role.textContent = profile.role;
  });
}

function initProfilePage() {
  const profileForm = document.getElementById('profileForm');
  if (!profileForm) return;

  const profileView = document.getElementById('profileView');
  const editProfileBtn = document.getElementById('editProfileBtn');
  const cancelProfileBtn = document.getElementById('cancelProfileBtn');
  const profile = getProfile();
  const editableFields = ['firstName', 'lastName', 'email', 'mobile', 'address', 'city', 'ward'];

  function renderProfileView(savedProfile) {
    const fullName = `${savedProfile.firstName} ${savedProfile.lastName}`.trim();
    const initials = `${savedProfile.firstName.charAt(0)}${savedProfile.lastName.charAt(0)}`.toUpperCase();
    document.getElementById('profileAvatar').textContent = initials;
    document.getElementById('profileFullName').textContent = fullName;
    document.getElementById('profileRole').textContent = savedProfile.role;
    document.getElementById('profileStatus').textContent = savedProfile.status;
    editableFields.forEach((field) => {
      const value = document.getElementById(`profile-${field}`);
      const display = document.querySelector(`[data-profile-value="${field}"]`);
      if (value) value.value = savedProfile[field];
      if (display) display.textContent = savedProfile[field];
    });
    document.getElementById('profile-role-value').textContent = savedProfile.role;
    document.getElementById('profile-status-value').textContent = savedProfile.status;
  }

  function setEditing(isEditing) {
    profileView.classList.toggle('hidden', isEditing);
    profileForm.classList.toggle('hidden', !isEditing);
    editProfileBtn.classList.toggle('hidden', isEditing);
  }

  function clearErrors() {
    profileForm.querySelectorAll('.field-error').forEach((error) => {
      error.textContent = '';
    });
  }

  function validateProfile() {
    clearErrors();
    const values = Object.fromEntries(new FormData(profileForm).entries());
    const errors = {};
    const fieldLabels = { firstName: 'First name', lastName: 'Last name', address: 'Address', city: 'City', ward: 'Ward' };
    ['firstName', 'lastName', 'address', 'city', 'ward'].forEach((field) => {
      if (!values[field].trim()) errors[field] = `${fieldLabels[field]} cannot be empty.`;
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }
    if (!/^[0-9+()\-\s]{7,20}$/.test(values.mobile.trim()) || !/\d/.test(values.mobile)) {
      errors.mobile = 'Enter a valid mobile number.';
    }
    Object.entries(errors).forEach(([field, message]) => {
      document.getElementById(`profile-${field}-error`).textContent = message;
    });
    return { values, isValid: Object.keys(errors).length === 0 };
  }

  renderProfileView(profile);
  editProfileBtn.addEventListener('click', () => setEditing(true));
  cancelProfileBtn.addEventListener('click', () => {
    renderProfileView(getProfile());
    setEditing(false);
  });
  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = validateProfile();
    if (!result.isValid) return;
    const savedProfile = { ...getProfile(), ...result.values };
    saveProfile(savedProfile);
    renderProfileView(savedProfile);
    initUserDisplay();
    setEditing(false);
    showToast('Profile updated successfully.', 'success');
  });
}

function initLoginPage() {
  const loginForm = document.getElementById('loginForm');
  const demoLoginBtn = document.getElementById('demoLoginBtn');

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const identifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const identifierError = document.getElementById('loginIdentifierError');
    const passwordError = document.getElementById('loginPasswordError');

    identifierError.textContent = '';
    passwordError.textContent = '';

    if (!identifier) {
      identifierError.textContent = 'Email or mobile number is required.';
      return;
    }

    if (!password) {
      passwordError.textContent = 'Password is required.';
      return;
    }

    setCurrentUser({
      name: 'Ragini Singh',
      email: identifier
    });

    showToast('Login successful. Redirecting to the dashboard.', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 600);
  });

  demoLoginBtn.addEventListener('click', () => {
    setCurrentUser({
      name: 'Ragini Singh',
      email: 'demo@proptax.gov.in'
    });
    showToast('Demo account connected successfully.', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 600);
  });
}

function initPropertySearchPage() {
  const form = document.getElementById('propertySearchForm');
  const resultContainer = document.getElementById('propertyResults');

  if (!form || !resultContainer) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');
  if (tab === 'my-properties') {
    const ownerName = getCurrentUser().name;
    document.getElementById('searchOwner').value = ownerName;
  }

  function renderProperties(items) {
    if (!items.length) {
      resultContainer.innerHTML = `
        <div class="empty-state">
          <h4>No properties found</h4>
          <p>Try a different property ID, owner name, ward, or address.</p>
        </div>
      `;
      return;
    }

    resultContainer.innerHTML = items.map((property) => `
      <article class="result-card">
        <h5>${property.propertyId}</h5>
        <div class="result-meta">
          <span><strong>Owner:</strong> ${property.owner}</span>
          <span><strong>Address:</strong> ${property.address}</span>
          <span><strong>Ward:</strong> ${property.ward}</span>
          <span><strong>Type:</strong> ${property.type}</span>
          <span><strong>Status:</strong> ${property.status}</span>
        </div>
        <button class="primary-btn" data-property-id="${property.propertyId}">View Details</button>
      </article>
    `).join('');

    resultContainer.querySelectorAll('[data-property-id]').forEach((button) => {
      button.addEventListener('click', () => {
        const propertyId = button.getAttribute('data-property-id');
        const selected = propTaxProperties.find((item) => item.propertyId === propertyId);
        if (selected) {
          setSelectedProperty(selected);
          window.location.href = `property-details.html?id=${selected.propertyId}`;
        }
      });
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const searchParams = {
      propertyId: (formData.get('propertyId') || '').toString().trim().toUpperCase(),
      owner: (formData.get('owner') || '').toString().trim().toLowerCase(),
      ward: (formData.get('ward') || '').toString().trim().toLowerCase(),
      address: (formData.get('address') || '').toString().trim().toLowerCase()
    };

    const matches = propTaxProperties.filter((property) => {
      const propertyId = (property.propertyId || '').toString();
      const owner = (property.owner || '').toLowerCase();
      const ward = (property.ward || '').toLowerCase();
      const address = (property.address || '').toLowerCase();

      const idMatch = !searchParams.propertyId || propertyId.includes(searchParams.propertyId);
      const ownerMatch = !searchParams.owner || owner.includes(searchParams.owner);
      const wardMatch = !searchParams.ward || ward.includes(searchParams.ward);
      const addressMatch = !searchParams.address || address.includes(searchParams.address);

      return idMatch && ownerMatch && wardMatch && addressMatch;
    });

    renderProperties(matches);

    if (!matches.length) {
      showToast('No matching property records found.', 'warning');
    } else {
      showToast(`${matches.length} property record(s) found.`, 'success');
    }
  });

  form.addEventListener('reset', () => {
    setTimeout(() => renderProperties(propTaxProperties), 0);
  });

  renderProperties(propTaxProperties);
}

function initPropertyDetailsPage() {
  const detailContainer = document.getElementById('propertyDetailContent');
  const startAssessmentBtn = document.getElementById('startAssessmentBtn');

  if (!detailContainer) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const selectedId = params.get('id') || getSelectedProperty().propertyId;
  const property = propTaxProperties.find((item) => item.propertyId === selectedId) || getSelectedProperty();

  if (!property) {
    detailContainer.innerHTML = '<div class="empty-state"><h4>Invalid property ID</h4><p>The selected property could not be found.</p></div>';
    return;
  }

  setSelectedProperty(property);

  detailContainer.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="eyebrow">Property Summary</p>
        <h4>${property.propertyId}</h4>
      </div>
      <span class="status-badge status-${property.status.toLowerCase() === 'active' ? 'paid' : 'pending'}">${property.status}</span>
    </div>

    <div class="detail-grid">
      <div class="detail-item"><strong>Owner Name</strong><span>${property.owner}</span></div>
      <div class="detail-item"><strong>Address</strong><span>${property.address}</span></div>
      <div class="detail-item"><strong>Ward</strong><span>${property.ward}</span></div>
      <div class="detail-item"><strong>Property Type</strong><span>${property.type}</span></div>
      <div class="detail-item"><strong>Built-up Area</strong><span>${property.builtUpArea} sq.ft.</span></div>
      <div class="detail-item"><strong>Property Age</strong><span>${property.age} years</span></div>
      <div class="detail-item"><strong>Assessment Status</strong><span>${property.assessmentStatus}</span></div>
      <div class="detail-item"><strong>Current Tax Status</strong><span>${property.taxStatus}</span></div>
    </div>
  `;

  if (startAssessmentBtn) {
    startAssessmentBtn.addEventListener('click', () => {
      window.location.href = 'self-assessment.html';
    });
  }
}

function initSelfAssessmentPage() {
  const form = document.getElementById('selfAssessmentForm');
  if (!form) {
    return;
  }

  const selectedProperty = getSelectedProperty();
  const fields = {
    propertyId: document.getElementById('assessmentPropertyId'),
    ownerName: document.getElementById('assessmentOwner'),
    propertyType: document.getElementById('assessmentType'),
    builtUpArea: document.getElementById('assessmentBuiltUpArea'),
    propertyAge: document.getElementById('assessmentAge'),
    ward: document.getElementById('assessmentWard'),
    usageType: document.getElementById('assessmentUsage')
  };

  fields.propertyId.value = selectedProperty.propertyId;
  fields.ownerName.value = selectedProperty.owner;
  fields.propertyType.value = selectedProperty.type;
  fields.builtUpArea.value = selectedProperty.builtUpArea;
  fields.propertyAge.value = selectedProperty.age;
  fields.ward.value = selectedProperty.ward;
  fields.usageType.value = selectedProperty.usageType || 'Self Occupied';

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;
    const formData = new FormData(form);

    const validators = {
      propertyId: (value) => !value.trim() ? 'Property ID is required.' : '',
      ownerName: (value) => !value.trim() ? 'Owner name is required.' : '',
      propertyType: (value) => !value ? 'Please select a property type.' : '',
      builtUpArea: (value) => {
        if (!value || Number(value) <= 0) return 'Built-up area is required.';
        if (Number.isNaN(Number(value))) return 'Please enter a valid positive number.';
        return '';
      },
      propertyAge: (value) => {
        if (value === '' || Number(value) < 0) return 'Property age is required.';
        if (Number.isNaN(Number(value))) return 'Please enter a valid number.';
        return '';
      },
      ward: (value) => !value.trim() ? 'Ward is required.' : '',
      usageType: (value) => !value ? 'Please select a usage type.' : ''
    };

    Object.keys(validators).forEach((key) => {
      const value = formData.get(key);
      const errorFieldMap = {
        propertyId: 'assessmentPropertyIdError',
        ownerName: 'assessmentOwnerError',
        propertyType: 'assessmentTypeError',
        builtUpArea: 'assessmentBuiltUpAreaError',
        propertyAge: 'assessmentAgeError',
        ward: 'assessmentWardError',
        usageType: 'assessmentUsageError'
      };
      const errorField = document.getElementById(errorFieldMap[key]);
      const errorMessage = validators[key](value ?? '');

      if (errorField) {
        errorField.textContent = errorMessage;
      }

      if (errorMessage) {
        isValid = false;
      }
    });

    if (!isValid) {
      showToast('Please fix the highlighted validation issues.', 'error');
      return;
    }

    const assessmentData = Object.fromEntries(formData.entries());
    saveStoredData(STORAGE_KEYS.assessment, assessmentData);
    showToast('Assessment details saved. Proceeding to tax calculation.', 'success');
    setTimeout(() => {
      window.location.href = 'tax-calculator.html';
    }, 500);
  });
}

function initTaxCalculatorPage() {
  const form = document.getElementById('taxCalcForm');
  const resultBox = document.getElementById('taxResultBox');

  if (!form || !resultBox) {
    return;
  }

  const assessmentData = getStoredData(STORAGE_KEYS.assessment, null);
  if (assessmentData) {
    document.getElementById('calcPropertyType').value = assessmentData.propertyType || 'Residential';
    document.getElementById('calcArea').value = assessmentData.builtUpArea || 1200;
    document.getElementById('calcAge').value = assessmentData.propertyAge || 8;
    document.getElementById('calcUsage').value = assessmentData.usageType || 'Self Occupied';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const propertyType = document.getElementById('calcPropertyType').value;
    const builtUpArea = Number(document.getElementById('calcArea').value);
    const propertyAge = Number(document.getElementById('calcAge').value);
    const usageType = document.getElementById('calcUsage').value;

    if (!propertyType || !builtUpArea || builtUpArea <= 0 || !usageType) {
      showToast('Please provide valid property and usage details.', 'error');
      return;
    }

    const sampleRates = {
      Residential: 36,
      Commercial: 56,
      Industrial: 68
    };

    const sampleRate = sampleRates[propertyType] || 40;
    const baseTax = builtUpArea * sampleRate;
    const ageAdjustment = propertyAge >= 20 ? baseTax * 0.18 : propertyAge >= 10 ? baseTax * 0.11 : propertyAge >= 5 ? baseTax * 0.06 : baseTax * 0.03;
    const totalTax = Math.round(baseTax + ageAdjustment);

    const calcData = {
      propertyType,
      builtUpArea,
      propertyAge,
      usageType,
      sampleRate,
      baseTax,
      adjustment: Math.round(ageAdjustment),
      totalTax
    };

    saveStoredData(STORAGE_KEYS.taxCalculation, calcData);

    resultBox.innerHTML = `
      <div class="breakdown-item"><span class="breakdown-label">Property Details</span><span class="breakdown-value">${propertyType} • ${builtUpArea} sq.ft.</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Applicable Sample Rate</span><span class="breakdown-value">₹${sampleRate} per sq.ft.</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Base Tax</span><span class="breakdown-value">${formatCurrency(baseTax)}</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Adjustment</span><span class="breakdown-value">${formatCurrency(Math.round(ageAdjustment))}</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Total Tax Payable</span><span class="breakdown-value">${formatCurrency(totalTax)}</span></div>
    `;

    showToast('Sample tax breakdown generated successfully.', 'success');
  });

  const savedTaxData = getStoredData(STORAGE_KEYS.taxCalculation, null);
  if (savedTaxData) {
    resultBox.innerHTML = `
      <div class="breakdown-item"><span class="breakdown-label">Property Details</span><span class="breakdown-value">${savedTaxData.propertyType} • ${savedTaxData.builtUpArea} sq.ft.</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Applicable Sample Rate</span><span class="breakdown-value">₹${savedTaxData.sampleRate} per sq.ft.</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Base Tax</span><span class="breakdown-value">${formatCurrency(savedTaxData.baseTax)}</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Adjustment</span><span class="breakdown-value">${formatCurrency(savedTaxData.adjustment)}</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Total Tax Payable</span><span class="breakdown-value">${formatCurrency(savedTaxData.totalTax)}</span></div>
    `;
  }
}

function initPaymentPage() {
  const paymentSummary = document.getElementById('paymentSummary');
  const payNowBtn = document.getElementById('payNowBtn');
  const paymentModal = document.getElementById('paymentModal');
  const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
  const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');

  if (!paymentSummary || !payNowBtn || !paymentModal) {
    return;
  }

  const property = getSelectedProperty();
  const taxData = getStoredData(STORAGE_KEYS.taxCalculation, {
    totalTax: 18420,
    propertyType: property.type,
    builtUpArea: property.builtUpArea,
    propertyAge: property.age,
    usageType: property.usageType || 'Self Occupied'
  });

  const amount = Number(taxData.totalTax || 18420);
  const taxYear = '2026-27';

  paymentSummary.innerHTML = `
    <h4>Property Payment Summary</h4>
    <div class="summary-row"><span class="summary-label">Property ID</span><strong>${property.propertyId}</strong></div>
    <div class="summary-row"><span class="summary-label">Owner</span><strong>${property.owner}</strong></div>
    <div class="summary-row"><span class="summary-label">Tax Year</span><strong>${taxYear}</strong></div>
    <div class="summary-row"><span class="summary-label">Amount Payable</span><strong>${formatCurrency(amount)}</strong></div>
  `;

  const modalText = document.getElementById('confirmPaymentText');
  modalText.textContent = `Confirm payment of ${formatCurrency(amount)}?`;

  payNowBtn.addEventListener('click', () => {
    paymentModal.classList.remove('hidden');
  });

  cancelPaymentBtn.addEventListener('click', () => {
    paymentModal.classList.add('hidden');
  });

  confirmPaymentBtn.addEventListener('click', () => {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'UPI';
    const paymentDate = new Date().toISOString();
    const transactionId = `TXN${new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)}`;
    const receiptNo = `RCPT-${property.propertyId.split('-')[1] || '100000'}`;

    const paymentRecord = {
      taxYear,
      propertyId: property.propertyId,
      amount,
      paymentDate: paymentDate.slice(0, 10),
      transactionId,
      status: 'Paid',
      receipt: receiptNo,
      method: paymentMethod
    };

    const records = getPaymentHistory();
    records.unshift(paymentRecord);
    savePaymentHistory(records);

    saveStoredData('proptax-last-payment', paymentRecord);
    paymentModal.classList.add('hidden');

    showToast('Payment processed successfully.', 'success');

    setTimeout(() => {
      window.location.href = 'payment-success.html';
    }, 1000);
  });
}

function initPaymentHistoryPage() {
  const tableBody = document.querySelector('#paymentHistoryTable tbody');
  const historySearch = document.getElementById('historySearch');

  if (!tableBody) {
    return;
  }

  function renderHistory(records) {
    if (!records.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <h4>No payment history</h4>
              <p>Your payment records will appear here once a transaction is completed.</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = records.map((record) => `
      <tr>
        <td>${record.taxYear}</td>
        <td>${record.propertyId}</td>
        <td>${formatCurrency(record.amount)}</td>
        <td>${formatDate(record.paymentDate)}</td>
        <td>${record.transactionId}</td>
        <td><span class="status-badge status-${(record.status || 'Paid').toLowerCase()}">${record.status}</span></td>
        <td><a href="receipt.html" class="action-link">View</a></td>
      </tr>
    `).join('');
  }

  const records = getPaymentHistory();
  renderHistory(records);

  if (historySearch) {
    historySearch.addEventListener('input', () => {
      const value = historySearch.value.trim().toLowerCase();
      const filtered = records.filter((record) => {
        return [record.taxYear, record.propertyId, record.transactionId, record.status].some((text) =>
          String(text).toLowerCase().includes(value)
        );
      });
      renderHistory(filtered);
    });
  }
}

function initObjectionPage() {
  const form = document.getElementById('objectionForm');
  const listContainer = document.getElementById('objectionsList');

  if (!form || !listContainer) {
    return;
  }

  function renderObjections(items) {
    if (!items.length) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <h4>No objections filed</h4>
          <p>Raise a new objection to start the review workflow.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = items.map((item) => `
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

  const items = getObjections();
  renderObjections(items);

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

    const year = new Date().getFullYear();
    const nextSequence = String((getObjections().length + 1)).padStart(5, '0');
    const objectionId = `OBJ-${year}-${nextSequence}`;

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

    const objections = getObjections();
    objections.unshift(newObjection);
    saveObjections(objections);
    renderObjections(objections);
    form.reset();
    showToast(`Objection submitted successfully. ID: ${objectionId}`, 'success');
  });
}

function initHelpPage() {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.parentElement;
      const faqList = document.getElementById('faqList');
      faqList.querySelectorAll('.faq-item').forEach((faqItem) => {
        faqItem.classList.remove('active');
      });
      item.classList.add('active');
    });
  });
}

function initReceiptPage() {
  const receiptContent = document.getElementById('receiptContent');
  if (!receiptContent) return;

  const lastPayment = getStoredData('proptax-last-payment', null) || getPaymentHistory()[0];
  const selectedProperty = getSelectedProperty();

  if (!lastPayment) {
    receiptContent.innerHTML = '<div class="empty-state"><h4>No receipt available</h4><p>Make a payment to generate a digital receipt.</p></div>';
    return;
  }

  receiptContent.innerHTML = `
    <div class="receipt-header">
      <div class="receipt-title">
        <h4>PropTax</h4>
        <p>Online Property Tax Portal</p>
      </div>
      <span class="status-badge status-paid">${lastPayment.status || 'Paid'}</span>
    </div>

    <div class="receipt-grid">
      <div class="receipt-item"><strong>Receipt Number</strong>${lastPayment.receipt}</div>
      <div class="receipt-item"><strong>Transaction ID</strong>${lastPayment.transactionId}</div>
      <div class="receipt-item"><strong>Property ID</strong>${lastPayment.propertyId}</div>
      <div class="receipt-item"><strong>Owner Name</strong>${selectedProperty.owner}</div>
      <div class="receipt-item"><strong>Property Address</strong>${selectedProperty.address}</div>
      <div class="receipt-item"><strong>Tax Year</strong>${lastPayment.taxYear}</div>
      <div class="receipt-item"><strong>Amount Paid</strong>${formatCurrency(lastPayment.amount)}</div>
      <div class="receipt-item"><strong>Payment Date</strong>${formatDate(lastPayment.paymentDate)}</div>
      <div class="receipt-item"><strong>Payment Status</strong>${lastPayment.status}</div>
      <div class="receipt-item"><strong>Payment Method</strong>${lastPayment.method || 'UPI'}</div>
    </div>
  `;

  document.getElementById('downloadReceiptBtn')?.addEventListener('click', () => {
    const receiptText = `PropTax Receipt\nReceipt Number: ${lastPayment.receipt}\nTransaction ID: ${lastPayment.transactionId}\nProperty ID: ${lastPayment.propertyId}\nOwner: ${selectedProperty.owner}\nAddress: ${selectedProperty.address}\nTax Year: ${lastPayment.taxYear}\nAmount Paid: ${formatCurrency(lastPayment.amount)}\nPayment Date: ${formatDate(lastPayment.paymentDate)}\nStatus: ${lastPayment.status}`;
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${lastPayment.receipt}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  });

  document.getElementById('printReceiptBtn')?.addEventListener('click', () => {
    window.print();
  });
}

function initSuccessPage() {
  const successDetails = document.getElementById('successDetails');
  if (!successDetails) return;

  const payment = getStoredData('proptax-last-payment', null) || getPaymentHistory()[0];
  const selectedProperty = getSelectedProperty();

  if (!payment) {
    successDetails.innerHTML = '<div class="empty-state"><h4>No payment record available.</h4></div>';
    return;
  }

  successDetails.innerHTML = `
    <div class="success-detail"><strong>Transaction ID</strong>${payment.transactionId}</div>
    <div class="success-detail"><strong>Receipt Number</strong>${payment.receipt}</div>
    <div class="success-detail"><strong>Property ID</strong>${payment.propertyId}</div>
    <div class="success-detail"><strong>Tax Year</strong>${payment.taxYear}</div>
    <div class="success-detail"><strong>Amount Paid</strong>${formatCurrency(payment.amount)}</div>
    <div class="success-detail"><strong>Payment Date</strong>${formatDate(payment.paymentDate)}</div>
    <div class="success-detail"><strong>Payment Status</strong>${payment.status}</div>
    <div class="success-detail"><strong>Owner</strong>${selectedProperty.owner}</div>
  `;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2600);
}
