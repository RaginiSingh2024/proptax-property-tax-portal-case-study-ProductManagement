document.addEventListener('DOMContentLoaded', () => {
  const taxForm = document.getElementById('taxCalcForm');
  if (!taxForm) return;

  const propertyType = document.getElementById('calcPropertyType');
  const builtUpArea = document.getElementById('calcArea');
  const propertyAge = document.getElementById('calcAge');
  const usageType = document.getElementById('calcUsage');
  const resultBox = document.getElementById('taxResultBox');

  const storedAssessment = getStoredData(STORAGE_KEYS.assessment, null);
  if (storedAssessment) {
    propertyType.value = storedAssessment.propertyType || 'Residential';
    builtUpArea.value = storedAssessment.builtUpArea || 1200;
    propertyAge.value = storedAssessment.propertyAge || 8;
    usageType.value = storedAssessment.usageType || 'Self Occupied';
  }

  taxForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const type = propertyType.value;
    const area = Number(builtUpArea.value);
    const age = Number(propertyAge.value);
    const usage = usageType.value;

    if (!type || !area || area <= 0 || !usage) {
      showToast('Please enter valid property details to calculate tax.', 'error');
      return;
    }

    const sampleRates = {
      Residential: 36,
      Commercial: 52,
      Industrial: 68
    };

    const demoRate = sampleRates[type] || 40;
    const baseTax = area * demoRate;
    const ageAdjustment = age >= 20 ? baseTax * 0.18 : age >= 10 ? baseTax * 0.11 : age >= 5 ? baseTax * 0.06 : baseTax * 0.03;
    const totalTax = Math.round(baseTax + ageAdjustment);

    const calculation = {
      propertyType: type,
      builtUpArea: area,
      propertyAge: age,
      usageType: usage,
      sampleRate: demoRate,
      baseTax,
      adjustment: Math.round(ageAdjustment),
      totalTax
    };

    saveStoredData(STORAGE_KEYS.taxCalculation, calculation);

    if (resultBox) {
      resultBox.innerHTML = `
        <div class="breakdown-item"><span class="breakdown-label">Property Details</span><span class="breakdown-value">${type} • ${area} sq.ft.</span></div>
        <div class="breakdown-item"><span class="breakdown-label">Applicable Sample Rate</span><span class="breakdown-value">₹${demoRate} per sq.ft.</span></div>
        <div class="breakdown-item"><span class="breakdown-label">Base Tax</span><span class="breakdown-value">${formatCurrency(baseTax)}</span></div>
        <div class="breakdown-item"><span class="breakdown-label">Adjustment</span><span class="breakdown-value">${formatCurrency(Math.round(ageAdjustment))}</span></div>
        <div class="breakdown-item"><span class="breakdown-label">Total Tax</span><span class="breakdown-value">${formatCurrency(totalTax)}</span></div>
      `;
    }

    showToast('Tax calculation completed successfully.', 'success');
  });

  const storedCalculation = getStoredData(STORAGE_KEYS.taxCalculation, null);
  if (storedCalculation && resultBox) {
    resultBox.innerHTML = `
      <div class="breakdown-item"><span class="breakdown-label">Property Details</span><span class="breakdown-value">${storedCalculation.propertyType} • ${storedCalculation.builtUpArea} sq.ft.</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Applicable Sample Rate</span><span class="breakdown-value">₹${storedCalculation.sampleRate} per sq.ft.</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Base Tax</span><span class="breakdown-value">${formatCurrency(storedCalculation.baseTax)}</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Adjustment</span><span class="breakdown-value">${formatCurrency(storedCalculation.adjustment)}</span></div>
      <div class="breakdown-item"><span class="breakdown-label">Total Tax</span><span class="breakdown-value">${formatCurrency(storedCalculation.totalTax)}</span></div>
    `;
  }
});
