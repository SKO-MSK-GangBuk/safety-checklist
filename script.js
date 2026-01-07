const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const finalImg = document.getElementById("final-image");

const templateImage = new Image();
templateImage.src = "template.png";

templateImage.onload = () => { generateImage(); };

document.getElementById("date").value = new Date().toISOString().substring(0, 10);

function toggleEtc(checkboxId, wrapId) {
    const cb = document.getElementById(checkboxId);
    const wrap = document.getElementById(wrapId);
    if (cb.checked) { wrap.style.display = 'block'; } 
    else { 
        wrap.style.display = 'none'; 
        wrap.querySelector('input').value = ''; 
    }
    generateImage();
}

function drawTextAuto(text, x, y, maxWidth, maxFontSize) {
  if(!text) return;
  let fontSize = maxFontSize;
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = "black";
  while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
    fontSize--;
    ctx.font = `${fontSize}px sans-serif`;
  }
  ctx.fillText(text, x, y);
}

// 좌표값은 실제 템플릿에 맞게 직접 수정 필수
const checkPositions = {
  weather_clear: { x: 50, y: 100 }, machine_ect: { x: 50, y: 200 },
  site_site_ect: { x: 50, y: 300 }, hot_ect: { x: 50, y: 400 },
  cold_ect: { x: 50, y: 500 }, site_ect: { x: 50, y: 600 }
  // ... 나머지 모든 체크박스 키값 포함 ...
};

function generateImage() {
  if (!templateImage.complete) return;

  canvas.width = templateImage.width;
  canvas.height = templateImage.height;
  ctx.drawImage(templateImage, 0, 0);

  // 텍스트 그리기
  drawTextAuto(document.getElementById("son_company").value, 100, 50, 200, 22);
  drawTextAuto(document.getElementById("machine_ect_text").value, 300, 200, 150, 20);
  // ... 필요한 텍스트 항목 반복 ...

  // 체크박스 그리기
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
    const pos = checkPositions[cb.value];
    if (pos) {
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "blue";
      ctx.fillText("✔", pos.x, pos.y);
    }
  });

  // [핵심] 아이폰을 위해 캔버스 내용을 이미지 태그로 복사
  finalImg.src = canvas.toDataURL("image/png");
}

function saveImage() {
  const link = document.createElement("a");
  link.download = `평가표_${document.getElementById("date").value}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
