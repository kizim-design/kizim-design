// Проверка на запись экрана
let detectionInterval = null;

async function detectRecording() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const screenSharing = devices.some(device => device.label.toLowerCase().includes('screen'));

    if (screenSharing) {
      // Если запись или скрин — перебрасываем на 404
      window.location.href = '/404.html';
    }
  } catch (error) {
    console.error('Ошибка при проверке записи экрана', error);
  }
}

// Каждые 3 секунды проверять
detectionInterval = setInterval(detectRecording, 3000);

// Блокировка клавиш PrintScreen (скриншот)
window.addEventListener('keyup', function (e) {
  if (e.key === 'PrintScreen') {
    navigator.clipboard.writeText('Скриншот запрещён!').then(() => {
      window.location.href = '/404.html';
    });
  }
});
