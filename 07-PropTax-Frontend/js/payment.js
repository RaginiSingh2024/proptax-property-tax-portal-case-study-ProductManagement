document.addEventListener('DOMContentLoaded', () => {
  const paymentSummary = document.getElementById('paymentSummary');
  const confirmPaymentText = document.getElementById('confirmPaymentText');
  const payNowBtn = document.getElementById('payNowBtn');
  const paymentModal = document.getElementById('paymentModal');
  const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
  const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');

  if (!paymentSummary) return;

  const selectedProperty = getSelectedProperty();
  const taxCalculation = getStoredData(STORAGE_KEYS.taxCalculation, {
    totalTax: 18420,
    baseTax: 16000,
    adjustment: 2420,
    propertyType: selectedProperty.type,
    builtUpArea: selectedProperty.builtUpArea,
    propertyAge: selectedProperty.age,
    usageType: selectedProperty.usageType || 'Self Occupied'
  });

  const amount = Number(taxCalculation.totalTax || 18420);
  const taxYear = '2026-27';

  paymentSummary.innerHTML = `
    <h4>Property Payment Summary</h4>
    <div class="summary-row"><span class="summary-label">Property ID</span><strong>${selectedProperty.propertyId}</strong></div>
    <div class="summary-row"><span class="summary-label">Owner</span><strong>${selectedProperty.owner}</strong></div>
    <div class="summary-row"><span class="summary-label">Tax Year</span><strong>${taxYear}</strong></div>
    <div class="summary-row"><span class="summary-label">Amount Payable</span><strong>${formatCurrency(amount)}</strong></div>
  `;

  if (confirmPaymentText) {
    confirmPaymentText.textContent = `Confirm payment of ${formatCurrency(amount)}?`;
  }

  payNowBtn?.addEventListener('click', () => {
    paymentModal?.classList.remove('hidden');
  });

  cancelPaymentBtn?.addEventListener('click', () => {
    paymentModal?.classList.add('hidden');
  });

  confirmPaymentBtn?.addEventListener('click', () => {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'UPI';
    const date = new Date();
    const transactionId = `TXN${date.toISOString().replace(/[-:T.]/g, '').slice(0, 14)}`;
    const receiptNo = `RCPT-${selectedProperty.propertyId.split('-')[1] || '100000'}`;

    const paymentRecord = {
      taxYear,
      propertyId: selectedProperty.propertyId,
      amount,
      paymentDate: date.toISOString().slice(0, 10),
      transactionId,
      status: 'Paid',
      receipt: receiptNo,
      method: paymentMethod
    };

    const currentRecords = getPaymentHistory();
    currentRecords.unshift(paymentRecord);
    savePaymentHistory(currentRecords);
    saveStoredData('proptax-last-payment', paymentRecord);

    paymentModal?.classList.add('hidden');
    showToast('Payment processed successfully.', 'success');

    setTimeout(() => {
      window.location.href = 'payment-success.html';
    }, 800);
  });

  const successDetails = document.getElementById('successDetails');
  if (successDetails) {
    const payment = getStoredData('proptax-last-payment', null) || getPaymentHistory()[0];
    if (payment) {
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
  }

  const receiptContent = document.getElementById('receiptContent');
  if (receiptContent) {
    const lastPayment = getStoredData('proptax-last-payment', null) || getPaymentHistory()[0];

    if (lastPayment) {
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
    }

    document.getElementById('downloadReceiptBtn')?.addEventListener('click', () => {
      if (!lastPayment) return;
      const receiptText = `PropTax Receipt\nReceipt Number: ${lastPayment.receipt}\nTransaction ID: ${lastPayment.transactionId}\nProperty ID: ${lastPayment.propertyId}\nOwner: ${selectedProperty.owner}\nAddress: ${selectedProperty.address}\nTax Year: ${lastPayment.taxYear}\nAmount Paid: ${formatCurrency(lastPayment.amount)}\nPayment Date: ${formatDate(lastPayment.paymentDate)}\nStatus: ${lastPayment.status}`;
      const blob = new Blob([receiptText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${lastPayment.receipt}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
    });

    document.getElementById('printReceiptBtn')?.addEventListener('click', () => {
      window.print();
    });
  }
});
