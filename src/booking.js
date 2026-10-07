import { business } from './data.js';
export function createInquiry(values) {
  return [
    'SOL & CITRUS - EVENT INQUIRY', '',
    `Name: ${values.get('name')}`, `Email: ${values.get('email')}`, `Phone: ${values.get('phone')}`,
    `Event date: ${values.get('date')}`, `Event location: ${values.get('location')}`, `Event type: ${values.get('type')}`,
    `Number of guests: ${values.get('guests') || 'To be confirmed'}`, `Event start time: ${values.get('time') || 'To be confirmed'}`,
    `Service duration: ${values.get('duration') || 'To be confirmed'} hours`,
    `Beverage services: ${values.getAll('beverages').join(', ') || 'Please help me choose'}`,
    '', 'Additional details:', values.get('details') || 'None provided', '',
    'Please contact me to discuss availability and a personalized quote.'
  ].join('\n');
}
export const inquiryMailto = values => `mailto:${business.email}?subject=${encodeURIComponent(`Sol & Citrus Event Inquiry - ${values.get('date')}`)}&body=${encodeURIComponent(createInquiry(values))}`;
export function initBooking() {
  const form = document.querySelector('#booking-form');
  if (!form) return () => {};
  const date = form.elements.namedItem('date');
  const today = new Date();
  date.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  const requested = new URLSearchParams(window.location.search).get('experience');
  const type = form.elements.namedItem('type');
  if ([...type.options].some(option => option.value === requested)) type.value = requested;
  const result = document.querySelector('#inquiry-result');
  const draft = document.querySelector('#inquiry-draft');
  const status = document.querySelector('#booking-status');
  const onSubmit = event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    draft.value = createInquiry(values);
    document.querySelector('#open-inquiry-email').href = inquiryMailto(values);
    result.hidden = false;
    status.textContent = 'Your inquiry is ready. Open your email app and send the email to complete your request. Nothing has been sent yet.';
    result.scrollIntoView({ behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'center' });
    document.querySelector('#open-inquiry-email').focus({preventScroll:true});
  };
  const onChange = () => {
    if(!result.hidden) { result.hidden = true; status.textContent = 'Details changed. Prepare your inquiry again to include the latest information.'; }
  };
  const copy = document.querySelector('#copy-inquiry');
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft.value);
      status.textContent = `Inquiry copied. Paste it into an email to ${business.email} and send it to complete your request.`;
    } catch {
      draft.focus(); draft.select();
      status.textContent = 'Select and copy the inquiry below, then paste it into your email app.';
    }
  };
  form.addEventListener('submit',onSubmit);
  form.addEventListener('input',onChange);
  copy.addEventListener('click',onCopy);
  return () => { form.removeEventListener('submit',onSubmit); form.removeEventListener('input',onChange); copy.removeEventListener('click',onCopy); };
}
