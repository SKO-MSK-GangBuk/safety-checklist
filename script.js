const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const templateImage = new Image();
templateImage.src = "template.png";

// 날짜 자동 입력
document.getElementById("date").value =
  new Date().toISOString().substring(0, 10);

/**
 * 글자 자동 축소 함수
 */
function drawTextAuto(text, x, y, maxWidth, maxFontSize) {
  let fontSize = maxFontSize;
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = "black";

  while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
    fontSize--;
    ctx.font = `${fontSize}px sans-serif`;
  }

  ctx.fillText(text, x, y);
}

/**
 * 체크박스 좌표 매핑 (❗ 좌표는 네가 채우기)
 */
const checkPositions = {
  // 기상 상태
  weather_clear: { x: null, y: null },
  weather_rain:  { x: null, y: null },
  weather_snow:  { x: null, y: null },
  weather_wind:  { x: null, y: null },

  // 현장 특성
  site_road:   { x: null, y: null },
  site_height: { x: null, y: null },
  site_narrow: { x: null, y: null },

  // 위험 요인
  risk_fall:       { x: null, y: null },
  risk_electric:  { x: null, y: null },
  risk_collision: { x: null, y: null }
};

/**
 * 이미지 생성
 */
function generateImage() {
  const inspector = document.getElementById("inspector").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;

  templateImage.onload = () => {
    canvas.width = templateImage.width;
    canvas.height = templateImage.height;

    // 배경
    ctx.drawImage(templateImage, 0, 0);

    // 텍스트 입력 (❗ 좌표/폭/폰트 크기 네가 지정)
    drawTextAuto(inspector, /* x */, /* y */, /* maxWidth */, 24);
    drawTextAuto(date,      /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(location,  /* x */, /* y */, /* maxWidth */, 22);

    // 체크박스 처리
    document
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach(cb => {
        const pos = checkPositions[cb.value];
        if (pos && pos.x !== null && pos.y !== null) {
          ctx.font = "28px sans-serif";
          ctx.fillText("✔", pos.x, pos.y);
        }
      });
  };
}

/**
 * 이미지 저장
 */
function saveImage() {
  const link = document.createElement("a");
  link.download = "risk_assessment.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}