const propTaxProperties = [
  {
    propertyId: 'PTX-100245',
    owner: 'Ragini Singh',
    ward: 'Ward 12',
    address: '12 MG Road, Sector 8',
    type: 'Residential',
    builtUpArea: 1200,
    age: 8,
    status: 'Active',
    usageType: 'Self Occupied',
    propertyAge: 8,
    assessmentStatus: 'Updated',
    taxStatus: 'Pending'
  },
  {
    propertyId: 'PTX-100312',
    owner: 'Arjun Mehta',
    ward: 'Ward 7',
    address: '41 Ashok Vihar, Plot 9',
    type: 'Residential',
    builtUpArea: 1550,
    age: 11,
    status: 'Active',
    usageType: 'Rented',
    propertyAge: 11,
    assessmentStatus: 'Updated',
    taxStatus: 'Paid'
  },
  {
    propertyId: 'PTX-100480',
    owner: 'Priya Nair',
    ward: 'Ward 4',
    address: '288 Market Street',
    type: 'Commercial',
    builtUpArea: 2200,
    age: 17,
    status: 'Active',
    usageType: 'Rented',
    propertyAge: 17,
    assessmentStatus: 'Review Pending',
    taxStatus: 'Pending'
  },
  {
    propertyId: 'PTX-100621',
    owner: 'Vikram Sharma',
    ward: 'Ward 18',
    address: '14 Industrial Estate Road',
    type: 'Industrial',
    builtUpArea: 3600,
    age: 25,
    status: 'Active',
    usageType: 'Self Occupied',
    propertyAge: 25,
    assessmentStatus: 'Updated',
    taxStatus: 'Paid'
  },
  {
    propertyId: 'PTX-100770',
    owner: 'Nisha Verma',
    ward: 'Ward 15',
    address: '8 Green Park Avenue',
    type: 'Residential',
    builtUpArea: 980,
    age: 6,
    status: 'Active',
    usageType: 'Self Occupied',
    propertyAge: 6,
    assessmentStatus: 'Updated',
    taxStatus: 'Pending'
  },
  {
    propertyId: 'PTX-100905',
    owner: 'Rajesh Gupta',
    ward: 'Ward 2',
    address: '103 Central Plaza',
    type: 'Commercial',
    builtUpArea: 1800,
    age: 9,
    status: 'Inactive',
    usageType: 'Rented',
    propertyAge: 9,
    assessmentStatus: 'Under Review',
    taxStatus: 'Pending'
  }
];

const STORAGE_KEYS = {
  session: 'proptax-demo-user',
  selectedProperty: 'proptax-selected-property',
  assessment: 'proptax-assessment-data',
  taxCalculation: 'proptax-tax-calculation',
  payments: 'proptax-payment-history',
  objections: 'proptax-objections'
};

const defaultPaymentRecords = [
  {
    taxYear: '2026-27',
    propertyId: 'PTX-100245',
    amount: 8420,
    paymentDate: '2026-09-28',
    transactionId: 'TXN202609280001',
    status: 'Paid',
    receipt: 'RCPT-100245'
  },
  {
    taxYear: '2025-26',
    propertyId: 'PTX-100312',
    amount: 12180,
    paymentDate: '2025-08-12',
    transactionId: 'TXN202508120142',
    status: 'Paid',
    receipt: 'RCPT-100312'
  },
  {
    taxYear: '2026-27',
    propertyId: 'PTX-100480',
    amount: 14250,
    paymentDate: '2026-10-01',
    transactionId: 'TXN202610010212',
    status: 'Pending',
    receipt: 'RCPT-100480'
  }
];

const demoObjections = [
  {
    objectionId: 'OBJ-2026-00125',
    propertyId: 'PTX-100245',
    category: 'Tax Calculation',
    subject: 'Adjustment mismatch in tax calculation',
    description: 'The calculation appears higher than the expected prototype estimate for the current assessment year.',
    contact: 'ragini@example.com',
    status: 'Submitted',
    timeline: ['Submitted', 'Under Review', 'Decision Pending', 'Resolved'],
    submittedOn: '2026-09-18'
  }
];

function getStoredData(key, fallback) {
  const stored = localStorage.getItem(key);
  if (!stored) return fallback;
  try {
    return JSON.parse(stored);
  } catch (error) {
    return fallback;
  }
}

function saveStoredData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureDemoData() {
  if (!getStoredData(STORAGE_KEYS.payments, null)) {
    saveStoredData(STORAGE_KEYS.payments, defaultPaymentRecords);
  }

  if (!getStoredData(STORAGE_KEYS.objections, null)) {
    saveStoredData(STORAGE_KEYS.objections, demoObjections);
  }

  if (!getStoredData(STORAGE_KEYS.selectedProperty, null)) {
    saveStoredData(STORAGE_KEYS.selectedProperty, propTaxProperties[0]);
  }
}

function getSelectedProperty() {
  return getStoredData(STORAGE_KEYS.selectedProperty, propTaxProperties[0]);
}

function setSelectedProperty(property) {
  saveStoredData(STORAGE_KEYS.selectedProperty, property);
}

function getCurrentUser() {
  return getStoredData(STORAGE_KEYS.session, {
    name: 'Ragini Singh',
    email: 'ragini.demo@proptax.gov.in'
  });
}

function setCurrentUser(user) {
  saveStoredData(STORAGE_KEYS.session, user);
}

function buildPropertyLookupMap() {
  return propTaxProperties.reduce((map, property) => {
    map[property.propertyId] = property;
    return map;
  }, {});
}

function getPaymentHistory() {
  return getStoredData(STORAGE_KEYS.payments, defaultPaymentRecords);
}

function savePaymentHistory(records) {
  saveStoredData(STORAGE_KEYS.payments, records);
}

function getObjections() {
  return getStoredData(STORAGE_KEYS.objections, demoObjections);
}

function saveObjections(records) {
  saveStoredData(STORAGE_KEYS.objections, records);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}
