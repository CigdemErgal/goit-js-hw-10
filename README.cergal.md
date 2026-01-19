ben çiğdem ergal bu readme bana aittir. yaptığım ödevi daha iyi anlayabilmek adına bu mini notu -özeti- buraya ekliyorum:

---Proje Özeti---
1-Kullanıcı bir tarih & saat seçer (Flatpickr ile)
2-Seçilen tarih geçmişse hata mesajı verir (iziToast ile)
3-Seçilen tarih gelecekteyse Start butonu aktif olur
4-Start’a basınca sayaç başlar
5-Sayaç her 1 saniyede bir güncellenir
6-Süre bitince otomatik durur ve 00:00:00:00 görünür.

--------MİMARİ ( 5 PARÇALI YAPI)------------
Bu proje, öğrenmesi kolay olsun diye 5 ana parçaya ayrılarak yazılmıştır:
[1 DOM Seçimleri] -> [2 STATE] -> [3 EVENT’ler] -> [4 LOGIC] -> [5 RENDER/UI]

1) DOM Seçimleri (Ekranı JS’e bağlama)
Bu kısımda HTML’deki elementleri JS tarafında seçip değişkenlere bağlarız.
Amaç:
Ekrandaki input, buton ve sayaç alanlarını JS ile kontrol edebilmek.

const datetimePicker = document.getElementById("datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

2) STATE (Uygulamanın Hafızası) : Bu kısım uygulamanın “hafızasıdır”.
İleride kullanılacak değerleri burada tutarız.
let selectedDate = null;
let timerInterval = null;
***selectedDate → kullanıcının seçtiği hedef tarih
***timerInterval → setInterval kimliği (timerı durdurmak için)

3) EVENT’ler (Kullanıcı ne yapınca ne çalışacak?)

Bu kısımda kullanıcı hareketlerine göre fonksiyonlar çalışır.

✅ 3.1 Takvim kapanınca (onClose)

Kullanıcı tarih seçip takvimi kapatınca çalışır.
Tarih geçmiş mi kontrol edilir
Uygunsa Start butonu aktif edilir

✅ 3.2 Start’a tıklama (click)
Start’a basınca timer başlar.

startBtn.addEventListener("click", startTimer);

4) LOGIC (Hesap / İş Mantığı)
Bu bölüm uygulamanın “beyni”dir.
✅ Kalan süre hesaplama
*** const timeRemaining = selectedDate - currentDate;
✅ ms → gün/saat/dakika/saniye dönüştürme
Bu iş için klasik bir yardımcı fonksiyon kullanılır:
***convertMs(ms)

✅ Timer bitince durdurma
****if (timeRemaining <= 0) {
  clearInterval(timerInterval);
}

5) RENDER / UI (Ekranı güncelleme)

Bu bölüm “sonucu kullanıcıya gösterme” kısmıdır.

Hesaplanan gün/saat/dk/sn değerleri ekrana yazılır

Sayılar 01 / 02 gibi görünmesi için addLeadingZero() kullanılır

daysElement.textContent = addLeadingZero(days);

✅ Öğrendiğim Konular

Bu projede şu temel konular öğrenilir:

DOM element seçme (querySelector, getElementById)

Event mantığı (click, onClose)

State yönetimi (selectedDate, timerInterval)

setInterval / clearInterval

Fonksiyonlarla kodu düzenleme (logic + UI ayrımı)

Mini proje mimarisi kurma


🔔 Görev 2 — Promise Üreteci (Snackbar Bildirim)

Bu proje, kullanıcıdan gecikme süresi (ms) ve Promise’in sonuç durumu (fulfilled / rejected) bilgisini alır.
Form gönderildikten sonra bir Promise oluşturulur ve seçilen süre kadar bekledikten sonra sonucu iziToast bildirimi olarak gösterir.

✅ Proje Ne Yapıyor?

Kullanıcı:

Delay (ms) alanına bir sayı girer (örnek: 2000)

State kısmından bir seçenek seçer:

✅ Fulfilled (başarılı)

❌ Rejected (hatalı)

“Create notification” butonuna basar

Girilen süre kadar bekler

Ekranda bildirim görür:

✅ Fulfilled promise in 2000ms

❌ Rejected promise in 2000ms

🧠 Mimari (5 Parçalı Yapı)

Bu proje, öğrenmesi kolay olması için 5 parçaya ayrılarak düşünülebilir:

[1 DOM] → [2 STATE] → [3 EVENT] → [4 LOGIC] → [5 UI/RENDER]

1) DOM (HTML Elemanlarını Yakalama)

Bu kısımda HTML’deki formu JS tarafında seçiyoruz:

const form = document.querySelector('.form');


✅ Amaç:
Formu JS ile kontrol edebilmek.

2) STATE (Kullanıcı Verilerini Alma / Hafıza)

Bu projede state “anlık” şekilde formdan alınır:

const delay = Number(form.elements.delay.value);
const state = form.elements.state.value;


delay → kullanıcının girdiği milisaniye (sayı)

state → kullanıcı hangi sonucu seçti (fulfilled / rejected)

3) EVENT (Kullanıcı Ne Yapınca Çalışacak?)

Bu ödevde tek event vardır:
✅ Form gönderilince çalışır.

form.addEventListener('submit', event => {
  event.preventDefault();
});


📌 event.preventDefault() neden var?
Form normalde sayfayı yeniler. Biz sayfa yenilenmesini istemiyoruz.

4) LOGIC (Promise + Gecikme Mantığı)

Form gönderilince bir Promise oluşturulur.

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (state === 'fulfilled') {
      resolve(delay);
    } else {
      reject(delay);
    }
  }, delay);
});


✅ Bu ne demek?

setTimeout(..., delay) → kullanıcının yazdığı süre kadar bekle

Seçim fulfilled ise → resolve(delay) çalışır

Seçim rejected ise → reject(delay) çalışır

5) UI / RENDER (iziToast ile Bildirim Gösterme)

Promise başarılı olursa:

promise.then(delayValue => {
  iziToast.success({
    title: 'Success',
    message: `✅ Fulfilled promise in ${delayValue}ms`,
    position: 'topRight',
  });
});


Promise başarısız olursa:

promise.catch(delayValue => {
  iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delayValue}ms`,
    position: 'topRight',
  });
});


✅ Sonuç: kullanıcı ekranda toast bildirim görür.

🛠 Kullanılan Teknolojiler

HTML

CSS

JavaScript

iziToast

▶️ Nasıl Çalıştırılır?

Proje klasörünü aç

02-snackbar.html dosyasını tarayıcıda aç
veya

VS Code kullanıyorsan Live Server ile çalıştır

✅ Bu Projede Ne Öğrendim?

Form submit event yakalama

Form input değerlerini alma (form.elements)

Promise oluşturma (new Promise)

setTimeout ile gecikme verme

.then() ve .catch() ile Promise sonucu yakalama

iziToast ile kullanıcıya bildirim gösterme


// 1) DOM
// 2) EVENT
// 3) STATE
// 4) PROMISE LOGIC
// 5) UI (iziToast)
