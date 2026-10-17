/* Login form logic (visitor + admin pages). The passcode is sent over HTTPS to the server and
   checked there; nothing about it is stored in the page, localStorage or sessionStorage. */
(function () {
  var form = document.getElementById('loginForm');
  var input = document.getElementById('passcode');
  var err = document.getElementById('loginError');
  var btn = document.getElementById('submitBtn');
  var toggle = document.getElementById('togglePw');
  var notice = document.getElementById('notice');
  var endpoint = document.body.dataset.endpoint;
  var label = btn.querySelector('.btn-label');
  var idleLabel = label.textContent;

  if (window.lucide) window.lucide.createIcons();

  var q = new URLSearchParams(location.search);
  if (q.get('expired') === '1') {
    notice.textContent = 'Your session expired. Enter the passcode again to continue.';
    notice.hidden = false;
  }

  function showError(msg) { err.textContent = msg; err.classList.add('show'); }
  function clearError() { err.textContent = ''; err.classList.remove('show'); }
  function busy(on) { btn.disabled = on; input.readOnly = on; label.textContent = on ? 'Verifying…' : idleLabel; }

  toggle.addEventListener('click', function () {
    var show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', show ? 'true' : 'false');
    toggle.setAttribute('aria-label', show ? 'Hide passcode' : 'Show passcode');
    toggle.querySelector('.ic-show').hidden = show;
    toggle.querySelector('.ic-hide').hidden = !show;
    input.focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearError();
    var value = input.value;
    if (!value) { showError('Enter your passcode.'); input.focus(); return; }
    busy(true);
    fetch(endpoint, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: value })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) { return { status: res.status, data: data }; });
    }).then(function (r) {
      if (r.status === 200 && r.data.redirect) { input.value = ''; location.replace(r.data.redirect); return; }
      busy(false);
      input.value = '';
      showError(r.data.error || 'Something went wrong. Please try again.');
      input.focus();
    }).catch(function () {
      busy(false);
      showError('Cannot reach the server. Check your connection and try again.');
    });
  });
})();
