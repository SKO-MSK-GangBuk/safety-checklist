const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const finalImg = document.getElementById("final-image");

const templateImage = new Image();
templateImage.src = "template.png";

templateImage.onload = () => { generateImage(); };

// 날짜 초기값
document.getElementById("date").value = new Date().toISOString().substring(0, 10);

// 기타 입력창 토글 로직
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

// 자동 폰트 조절 그리기
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

/**
 * 모든 체크박스 좌표 매핑 (x, y 좌표는 실제 PNG에 맞춰 수정 필수)
 */
const checkPositions = {
  // 기상 상태
  weather_clear: { x: 280, y: 492 }, weather_wind: { x: 375, y: 492 }, weather_rain_or_snow: { x: 470, y: 492 }, weather_hot: { x: 575, y: 492 }, weather_cold: { x: 670, y: 492 },
  // 건설장비
  machine_crane: { x: 280, y: 545 }, machine_sky: { x: 500, y: 545 }, machine_sj: { x: 623, y: 545 }, machine_labbercar: { x: 850, y: 545 }, machine_forklift: { x: 985, y: 545 }, machine_dumptruck: { x: 280, y: 575 }, machine_excavator: { x: 415, y: 575 }, machine_pumpcar: { x: 538, y:575 }, machine_mixtruck: { x: 660, y: 575 }, machine_ect: { x: 795, y: 575 },
  // 현장 특성
  site_road_outside: { x: 285, y: 780 }, site_road_inside: { x: 285, y: 810 }, site_road_narrow: { x: 1155, y: 780 }, site_inside: { x: 285, y: 810 }, site_in_height: { x: 720, y: 780 }, site_high_height: { x: 720, y: 810 }, site_apart_parking: { x: 720, y: 840 }, site_drop_danger: { x: 720, y: 870 }, site_near_road: { x: 1155, y: 780 }, site_near_voltage: { x: 1155, y: 810 }, site_near_hivoltage: { x: 1155, y: 840 }, site_site_ect: { x: 1155, y: 840 },
  // 공통사항
  common_equipment: { x: 100, y: 400 }, common_machine: { x: 150, y: 400 }, common_health: { x: 200, y: 400 }, common_tool: { x: 250, y: 400 }, common_stop_work: { x: 300, y: 400 }, common_danger: { x: 350, y: 400 }, common_heavy: { x: 400, y: 400 },
  // 혹서기
  hot_thermometer: { x: 100, y: 500 }, hot_water: { x: 150, y: 500 }, hot_icebox: { x: 200, y: 500 }, hot_candy: { x: 250, y: 500 }, hot_rest: { x: 300, y: 500 }, hot_ect: { x: 350, y: 500 },
  // 혹한기
  cold_warmer: { x: 100, y: 600 }, cold_cloth: { x: 150, y: 600 }, cold_ect: { x: 200, y: 600 },
  // 작업장 환경
  site_roof: { x: 100, y: 700 }, site_rooftop: { x: 150, y: 700 }, site_pool: { x: 200, y: 700 }, site_steel_tower: { x: 250, y: 700 }, site_strong_pool: { x: 300, y: 700 }, site_inbuilding: { x: 350, y: 700 }, site_ect: { x: 400, y: 700 },
  // 위험 요인
  risk_fall: { x: 100, y: 800 }, risk_fall_ladder: { x: 150, y: 800 }, risk_fall_ladder_width: { x: 200, y: 800 }, risk_car_crush: { x: 250, y: 800 }, risk_heavy_machine: { x: 300, y: 800 }, risk_car_fall: { x: 350, y: 800 }, risk_electric: { x: 400, y: 800 }, risk_drop: { x: 450, y: 800 }, risk_boom: { x: 500, y: 800 }
};

function generateImage() {
  if (!templateImage.complete) return;

  canvas.width = templateImage.width;
  canvas.height = templateImage.height;
  ctx.drawImage(templateImage, 0, 0);

  // 일반 텍스트 드로잉
  drawTextAuto(document.getElementById("son_company").value, 100, 50, 200, 22);
  drawTextAuto(document.getElementById("mother_company").value, 400, 50, 200, 22);
  drawTextAuto(document.getElementById("date").value, 100, 80, 200, 22);
  drawTextAuto(document.getElementById("location").value, 400, 80, 200, 22);
  drawTextAuto(document.getElementById("what_do").value, 100, 110, 200, 22);
  drawTextAuto(document.getElementById("inspector").value, 400, 110, 200, 22);
  drawTextAuto(document.getElementById("fake_temperature").value, 100, 140, 100, 22);
  drawTextAuto(document.getElementById("real_temperature").value, 200, 140, 100, 22);
  drawTextAuto(document.getElementById("company_sos").value, 100, 350, 300, 22);
  drawTextAuto(document.getElementById("danger_ect_point").value, 100, 650, 200, 22);
  drawTextAuto(document.getElementById("danger_ect_todo").value, 350, 650, 200, 22);

  // '기타' 텍스트 드로잉
  drawTextAuto(document.getElementById("machine_ect_text").value, 600, 200, 150, 20);
  drawTextAuto(document.getElementById("site_site_ect_text").value, 700, 300, 150, 20);
  drawTextAuto(document.getElementById("hot_ect_text").value, 400, 500, 150, 20);
  drawTextAuto(document.getElementById("cold_ect_text").value, 250, 600, 150, 20);
  drawTextAuto(document.getElementById("site_ect_text").value, 450, 700, 150, 20);

  // 체크박스 드로잉
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
    const pos = checkPositions[cb.value];
    if (pos) {
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "blue";
      ctx.fillText("✔", pos.x, pos.y);
    }
  });

  // 아이폰 대응: 캔버스를 이미지 태그로 업데이트
  finalImg.src = canvas.toDataURL("image/png");
}

function saveImage() {
  const link = document.createElement("a");
  link.download = `평가표_${document.getElementById("date").value}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
