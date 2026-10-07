import { business } from './data.js';
import { arrow, label } from './components.js';
const field = (name,text,type='text',required=false,extra='') => `<label class="form-field" for="booking-${name}"><span>${text}${required?' <span aria-hidden="true">*</span>':''}</span><input id="booking-${name}" name="${name}" type="${type}" ${required?'required':''} ${extra} /></label>`;
export function bookingForm() {
  return `<div class="inquiry-panel booking-panel">${label('Your occasion. Your details.')}<h3>Your event inquiry</h3><p>Share a few details and we’ll help create an experience around you.</p><form id="booking-form" action="mailto:${business.email}" method="post" enctype="text/plain" aria-label="Sol & Citrus event inquiry"><p class="form-note">Fields marked * are required.</p><div class="form-grid">
  ${field('name','Full name','text',true,'autocomplete="name" maxlength="100"')}
  ${field('email','Email address','email',true,'autocomplete="email" maxlength="254"')}
  ${field('phone','Phone number','tel',true,'autocomplete="tel" maxlength="40"')}
  ${field('date','Event date','date',true)}
  <label class="form-field full-width" for="booking-location"><span>Event location <span aria-hidden="true">*</span></span><input id="booking-location" name="location" required placeholder="City, venue, or address" maxlength="250" /></label>
  <label class="form-field" for="booking-type"><span>Event type <span aria-hidden="true">*</span></span><select id="booking-type" name="type" required><option value="">Select your occasion</option>${['Wedding','Art brunches & creative events','Morning wellness','Private celebrations','Corporate & community events','Collaboration','Other'].map(type=>`<option>${type}</option>`).join('')}</select></label>
  ${field('guests','Number of guests','number',false,'min="1" max="100000" step="1" inputmode="numeric"')}
  ${field('time','Event start time','time')}
  ${field('duration','Service duration (hours)','number',false,'min="3" max="72" step="0.5" placeholder="Minimum 3 hours"')}
  </div><fieldset class="beverage-options"><legend>Beverage services you’re interested in</legend>${['Coffee','Signature Lemonades','Fresh Juices','Matcha','Sodas'].map(name=>`<label><input type="checkbox" name="beverages" value="${name}" /><span>${name}</span></label>`).join('')}</fieldset>
  <label class="form-field" for="booking-details"><span>Additional details / Tell us about your vision</span><textarea id="booking-details" name="details" rows="5" maxlength="2000" placeholder="Tell us what you have in mind…"></textarea></label>
  <p class="form-note">Your inquiry will be prepared in your email app and addressed to <a href="mailto:${business.email}">${business.email}</a>. You’ll send it yourself. <a href="/privacy-policy">Privacy policy</a>.</p>
  <button type="submit" class="button"><span>Prepare email inquiry</span>${arrow}</button>
  <p id="booking-status" class="booking-status" role="status" aria-live="polite"></p>
  <div id="inquiry-result" class="inquiry-result" hidden><h4>Ready to send</h4><p>Review the details, then send the inquiry from your email app.</p><a id="open-inquiry-email" class="button" href="mailto:${business.email}"><span>Open email app</span>${arrow}</a><label class="form-field" for="inquiry-draft"><span>Your inquiry</span><textarea id="inquiry-draft" readonly rows="9"></textarea></label><button type="button" id="copy-inquiry" class="button outline"><span>Copy inquiry</span>${arrow}</button><p class="form-note">If no email app opens, copy the inquiry and email it to ${business.email}.</p></div>
  </form></div>`;
}
