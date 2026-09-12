  // ===== Филиалы =====
  var BRANCHES = [
    { name: 'ш. Энтузиастов, 12к2', addr: 'этаж 3 · м. Авиамоторная', rating: '5.0 · 55 оценок' },
    { name: 'Рязанский проспект, 2к2', addr: 'этаж 2 · м. Нижегородская', rating: '5.0 · 170 оценок' },
    { name: '7-я Кожуховская, 9', addr: 'этаж 3', rating: '4.5 · 11 оценок' }
  ];
  var branchIdx = -1, bkDate = null, bkTime = null;

  var brEl = document.getElementById('imBranches');
  brEl.innerHTML = BRANCHES.map(function(b, i) {
    return '<div class="im-branch" data-i="' + i + '">' +
      '<div class="im-branch-name">' + b.name + '</div>' +
      '<div class="im-branch-addr">' + b.addr + '</div>' +
      '<div class="im-branch-rating">★ ' + b.rating + '</div></div>';
  }).join('');
  brEl.querySelectorAll('.im-branch').forEach(function(el) {
    el.addEventListener('click', function() {
      brEl.querySelectorAll('.im-branch').forEach(function(x) { x.classList.remove('on'); });
      el.classList.add('on');
      branchIdx = +el.getAttribute('data-i');
      updateBkSummary();
    });
  });

  // ===== Даты: ближайшие 14 дней =====
  var DOW = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  var dEl = document.getElementById('bkDates');
  for (var i = 0; i < 14; i++) {
    var d = new Date(); d.setDate(d.getDate() + i);
    var chip = document.createElement('div');
    chip.className = 'bk-date';
    chip.innerHTML = '<div class="bk-dow">' + (i === 0 ? 'сегодня' : DOW[d.getDay()]) + '</div>' +
                     '<div class="bk-day">' + String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '</div>';
    chip.addEventListener('click', function() {
      dEl.querySelectorAll('.bk-date').forEach(function(x) { x.classList.remove('on'); });
      this.classList.add('on');
      bkDate = this.querySelector('.bk-day').innerText + ' (' + this.querySelector('.bk-dow').innerText + ')';
      updateBkSummary();
    });
    dEl.appendChild(chip);
  }

  // ===== Время: 10:00–20:00 =====
  var tEl = document.getElementById('bkTimes');
  for (var h = 10; h <= 20; h++) {
    var t = document.createElement('div');
    t.className = 'bk-time';
    t.innerText = h + ':00';
    t.addEventListener('click', function() {
      tEl.querySelectorAll('.bk-time').forEach(function(x) { x.classList.remove('on'); });
      this.classList.add('on');
      bkTime = this.innerText;
      updateBkSummary();
    });
    tEl.appendChild(t);
  }

  // ===== Отправка записи в Telegram =====
  function updateBkSummary() {
    var s = document.getElementById('bkSummary');
    if (branchIdx === -1 || !bkDate || !bkTime) { s.classList.remove('show'); return; }
    var text = 'Здравствуйте! Хочу записаться на ремонт.\n' +
               'Филиал: ' + BRANCHES[branchIdx].name + '\n' +
               'Дата: ' + bkDate + ' в ' + bkTime;
    var name = document.getElementById('bkName').value.trim();
    var phone = document.getElementById('bkPhone').value.trim();
    if (name) text += '\nИмя: ' + name;
    if (phone) text += '\nТелефон: ' + phone;
    s.innerText = '✅ Ваша запись:\n' + BRANCHES[branchIdx].name + '\n' + bkDate + ' в ' + bkTime;
    s.classList.add('show');
    document.getElementById('bkSubmit').href = 'https://t.me/imoment_master?text=' + encodeURIComponent(text);
  }
  document.getElementById('bkName').addEventListener('input', updateBkSummary);
  document.getElementById('bkPhone').addEventListener('input', updateBkSummary);
