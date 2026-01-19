ben çiğdem ergal bu readme bana aittir. yaptığım ödevi daha iyi anlayabilmek adına bu mini notu buraya ekliyorum.

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

