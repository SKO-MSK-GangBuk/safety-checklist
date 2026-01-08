const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const finalImg = document.getElementById("final-image");

const templateImage = new Image();
templateImage.crossOrigin = "Anonymous";
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
 * 모든 체크박스 좌표 매핑 */
const checkPositions = {
  // 기상 상태
  weather_clear: { x: 280, y: 492 }, weather_wind: { x: 375, y: 492 }, weather_rain_or_snow: { x: 470, y: 492 }, weather_hot: { x: 575, y: 492 }, weather_cold: { x: 670, y: 492 },
  // 건설장비
  machine_crane: { x: 280, y: 545 }, machine_sky: { x: 500, y: 545 }, machine_sj: { x: 623, y: 545 }, machine_labbercar: { x: 850, y: 545 }, machine_forklift: { x: 985, y: 545 }, machine_dumptruck: { x: 280, y: 575 }, machine_excavator: { x: 415, y: 575 }, machine_pumpcar: { x: 538, y:575 }, machine_mixtruck: { x: 660, y: 575 }, machine_ect: { x: 795, y: 575 },
  // 현장 특성
  site_road_outside: { x: 285, y: 780 }, site_road_inside: { x: 285, y: 810 }, site_road_narrow: { x: 285, y: 840 }, site_inside: { x: 285, y: 870 }, site_in_height: { x: 720, y: 780 }, site_high_height: { x: 720, y: 810 }, site_apart_parking: { x: 720, y: 840 }, site_drop_danger: { x: 720, y: 870 }, site_near_road: { x: 1155, y: 780 }, site_near_voltage: { x: 1155, y: 810 }, site_near_hivoltage: { x: 1155, y: 840 }, site_site_ect: { x: 1155, y: 870 },
  // 공통사항
  common_equipment: { x: 285, y: 1000 }, common_machine: { x: 285, y: 1030 }, common_health: { x: 285, y: 1060 }, common_tool: { x: 285, y: 1090 }, common_stop_work: { x: 285, y: 1120 }, common_danger: { x: 285, y: 1150 }, common_heavy: { x: 285, y: 1180 },
  // 혹서기
  hot_thermometer: { x: 976, y: 1015 }, hot_water: { x: 976, y: 1045 }, hot_icebox: { x: 976, y: 1075 }, hot_candy: { x: 976, y: 1105 }, hot_rest: { x: 976, y: 1135 }, hot_ect: { x: 976, y: 1165 },
  // 혹한기
  cold_warmer: { x: 1360, y: 1030 }, cold_cloth: { x: 1360, y: 1060 }, cold_ect: { x: 1360, y: 1090 },
  // 작업장 환경
  site_roof: { x: 100, y: 1807 }, site_rooftop: { x: 100, y: 1867 }, site_pool: { x: 100, y: 1927 }, site_steel_tower: { x: 100, y: 1987 }, site_strong_pool: { x: 100, y: 2047 }, site_inbuilding: { x: 100, y: 2107 }, site_ect: { x: 100, y: 2167 },
  // 위험 요인
  risk_fall: { x: 285, y: 1440 }, risk_fall_ladder: { x: 285, y: 1550 }, risk_fall_ladder_width: { x: 315, y: 1580 }, risk_car_crush: { x: 285, y: 1665 }, risk_heavy_machine: { x: 285, y: 1750 }, risk_car_fall: { x: 285, y: 1875 }, risk_electric: { x: 285, y: 2015 }, risk_drop: { x: 285, y: 2140 }, risk_boom: { x: 285, y: 2265 }
};

function generateImage() {
  if (!templateImage.complete) return;

  canvas.width = templateImage.width;
  canvas.height = templateImage.height;
  ctx.drawImage(templateImage, 0, 0);

  // 일반 텍스트 드로잉
  drawTextAuto(document.getElementById("son_company").value, 290, 210, 100, 24);
  drawTextAuto(document.getElementById("mother_company").value, 655, 210, 155, 24);
  drawTextAuto(document.getElementById("date").value, 1140, 210, 330, 24);
  drawTextAuto(document.getElementById("location").value, 290, 280, 490, 24);
  drawTextAuto(document.getElementById("what_do").value, 1140, 280, 330, 24);
  drawTextAuto(document.getElementById("inspector").value, 290, 385, 1250, 26);
  drawTextAuto(document.getElementById("fake_temperature").value, 950, 490, 100, 24);
  drawTextAuto(document.getElementById("real_temperature").value, 1295, 490, 100, 24);
  drawTextAuto(document.getElementById("come_here").value, 1290, 560, 280, 24);
  drawTextAuto(document.getElementById("whatch_me").value, 1290, 625, 280, 24);
  drawTextAuto(document.getElementById("company_sos").value, 290, 685, 510, 24);
  drawTextAuto(document.getElementById("mother_company_sos").value, 1040, 685, 510, 24);
  drawTextAuto(document.getElementById("danger_ect_point").value, 290, 1305, 310, 24);
  drawTextAuto(document.getElementById("danger_ect_todo").value, 840, 1305, 725, 24);

  // '기타' 텍스트 드로잉
  drawTextAuto(document.getElementById("machine_ect_text").value, 870, 575, 155, 20);
  drawTextAuto(document.getElementById("site_site_ect_text").value, 700, 300, 150, 20);
  drawTextAuto(document.getElementById("hot_ect_text").value, 1050, 1165, 120, 20);
  drawTextAuto(document.getElementById("cold_ect_text").value, 1430, 1090, 120, 20);
  drawTextAuto(document.getElementById("site_ect_text").value, 170, 2165, 50, 20);

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
