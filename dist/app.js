'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.choose').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('type').value = button.dataset.product;
    document.getElementById('request').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    document.getElementById('company').focus({preventScroll: true});
  });
});
document.getElementById('request-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const text = ['ЗАПРОС НА ПОДБОР ОБОРУДОВАНИЯ', 'Вектор Сенсор', '', 'Компания / контакт: ' + data.get('company').trim(), 'Почта: ' + data.get('email').trim(), 'Направление: ' + data.get('type'), '', 'Задача:', data.get('task').trim(), '', 'Запрос подготовлен локально. Данные не отправлены.'].join('\r\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF', text], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'vector-sensor-request.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  document.getElementById('form-status').textContent = 'Файл запроса подготовлен для скачивания. Заявка никуда не отправлена.';
});
