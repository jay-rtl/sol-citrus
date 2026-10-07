import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createInquiry,inquiryMailto} from '../src/booking.js';
test('Inquiry includes event details and every selected service without sending data',()=>{
  const values=new FormData();
  for(const [key,value] of Object.entries({name:'A & B',email:'guest@example.com',phone:'3054500711',date:'2030-10-10',location:'Miami',type:'Wedding',details:'A sunny celebration.'}))values.set(key,value);
  values.append('beverages','Coffee'); values.append('beverages','Matcha');
  const draft=createInquiry(values);
  assert.match(draft,/Beverage services: Coffee, Matcha/);
  const url=new URL(inquiryMailto(values));
  assert.equal(url.protocol,'mailto:');
  assert.equal(url.pathname,'sc.hospitality.usa@gmail.com');
  assert.equal(url.searchParams.get('body'),draft);
  assert.match(url.searchParams.get('body'),/Name: A & B/);
});
