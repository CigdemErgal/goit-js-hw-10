import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delayValue => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
      });
      console.log(`✅ Fulfilled promise in ${delayValue}ms`);
    })
    .catch(delayValue => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
      });
      console.log(`❌ Rejected promise in ${delayValue}ms`);
    });

  form.reset();
});

/*// ==============================
// 1) IMPORTS (Kütüphane Bağlantıları)
// ==============================
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ==============================
// 2) DOM (HTML Elemanlarını Yakalama)
// ==============================
const form = document.querySelector('.form');

// ==============================
// 3) EVENT (Kullanıcı Formu Gönderince)
// ==============================
form.addEventListener('submit', event => {
  event.preventDefault(); // Sayfa yenilenmesin diye

  // ==============================
  // 4) STATE (Kullanıcının Girdiği Verileri Alma)
  // ==============================
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // ==============================
  // 5) LOGIC (Promise Üretme + setTimeout ile gecikme)
  // ==============================
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // ==============================
  // 6) UI / RENDER (Sonucu Kullanıcıya Bildirme)
  // ==============================
  promise
    .then(delayValue => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
      });

      console.log(`✅ Fulfilled promise in ${delayValue}ms`);
    })
    .catch(delayValue => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
      });

      console.log(`❌ Rejected promise in ${delayValue}ms`);
    });

  // ==============================
  // 7) FORM TEMİZLEME
  // ==============================
  form.reset();
});*/
