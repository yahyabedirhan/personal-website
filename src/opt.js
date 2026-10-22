// The opt-out box on /about: what each analytics level (see privacy.js) says, and the button's label.
export const OPT_STATE = {
  full: 'Analytics is on in this browser.',
  pageviews: "You're opted out from analytics events. We still count that the page was opened, nothing more.",
  off: 'You are fully opted out. Nothing is sent.',
};
export const optLabel = mode => (mode === 'full' ? 'Opt out' : 'Opt in');
