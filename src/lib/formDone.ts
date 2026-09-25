import type { SubmitResult } from './submitForm';

// Zeigt nach dem Absenden den passenden Abschluss: "gesendet" nur, wenn wirklich gesendet wurde.
// Beim Mailprogramm-Weg steht dort ehrlich, dass noch auf Senden getippt werden muss.
export function showDone(form: HTMLFormElement, done: HTMLElement | null, result: SubmitResult) {
  if (!done) return;
  const mode = result.kind === 'sent' ? 'sent' : 'mail';
  done.querySelectorAll<HTMLElement>('[data-sent]').forEach((el) => (el.textContent = el.dataset[mode] ?? ''));
  const mailOnly = done.querySelector<HTMLElement>('[data-mail-only]');
  mailOnly?.classList.toggle('hidden', mode !== 'mail');
  if (result.kind === 'mail-client') done.querySelector<HTMLAnchorElement>('[data-mail-link]')?.setAttribute('href', result.href);
  form.classList.add('hidden');
  done.classList.remove('hidden');
  done.focus();
}
