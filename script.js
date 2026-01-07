const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const templateImage = new Image();
templateImage.src = "template.png";

// 페이지 로드 시 이미지 미리 그리기 준비
templateImage.onload = () => {
    generateImage();
};

// 날짜 자동 입력
document.getElementById("date").value = new Date().toISOString().substring(0, 10);

/**
 * 기타 체크박스 토글 함수
 */
function toggleEtc(checkboxId, wrapId) {
    const cb = document.getElementById(checkboxId);
    const wrap = document.getElementById(wrapId);
    const input = wrap.querySelector('input');
    
    if (cb.checked) {
        wrap.style.display = 'block';
    } else {
        wrap.style.display = 'none';
        input.value = ''; // 체크 해제 시 내용 삭제
    }
    generateImage(); // 상태 변경 시 즉시 반영
}

/**
 * 글자 자동 축소 함수
 */
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
 * 체크박스 좌표 매핑 (x, y 좌표를 실제 템플릿에 맞게 수정하세요)
 */
const checkPositions = {
  weather_clear: { x: 100, y: 200 },
  weather_wind: { x: 150, y: 200 },
  weather_rain_or_snow: { x: 200, y: 200 },
  weather_hot: { x: 250, y: 200 },
  weather_cold: { x: 300, y: 200 },
  machine_crane: { x: 100, y: 300 },
  machine_sky: { x: 150, y: 300 },
  machine_sj: { x: 200, y: 300 },
  machine_labbercar: { x: 250, y: 300 },
  machine_forklift: { x: 300, y: 300 },
  machine_dumptruck: { x: 350, y: 300 },
  machine_excavator: { x: 400, y: 300 },
  machine_pumpcar: { x: 450, y: 300 },
  machine_mixtruck: { x: 500, y: 300 },
  machine_ect: { x: 550, y: 300 },
  site_road_outside: { x: 100, y: 400 },
  site_road_inside: { x: 150, y: 400 },
  site_road_narrow: { x: 200, y: 400 },
  site_inside: { x: 250, y: 400 },
  site_in_height: { x: 300, y: 400 },
  site_high_height: { x: 350, y: 400 },
  site_apart_parking: { x: 400, y: 400 },
  site_drop_danger: { x: 450, y: 400 },
  site_near_road: { x: 500, y: 400 },
  site_near_voltage: { x: 550, y: 400 },
  site_near_hivoltage: { x: 600, y: 400 },
  site_site_ect: { x: 650, y: 400 },
  common_equipment: { x: 100, y: 500 },
  common_machine: { x: 150, y: 500 },
  common_health: { x: 200, y: 500 },
  common_tool: { x: 250, y: 500 },
  common_stop_work: { x: 300, y: 500 },
  common_danger: { x: 350, y: 500 },
  common_heavy: { x: 400, y: 500 },
  hot_thermometer: { x: 100, y: 600 },
  hot_water: { x: 150, y: 600 },
  hot_icebox: { x: 200, y: 600 },
  hot_candy: { x: 250, y: 600 },
  hot_rest: { x: 300, y: 600 },
  hot_ect: { x: 350, y: 600 },
  cold_warmer: { x: 100, y: 700 },
  cold_cloth: { x: 150, y: 700 },
  cold_ect: { x: 200, y: 700 },
  site_roof: { x: 100, y: 800 },
  site_rooftop: { x: 150, y: 800 },
  site_pool: { x: 200, y: 800 },
  site_steel_tower: { x: 250, y: 800 },
  site_strong_pool: { x: 300, y: 800 },
  site_inbuilding: { x: 350, y: 800 },
  site_ect: { x: 400, y: 800 },
  risk_fall: { x: 100, y: 900 },
  risk_fall_ladder: { x: 150, y: 900 },
  risk_fall_ladder_width: { x: 200, y: 900 },
  risk_car_crush: { x: 250, y: 900 },
  risk_heavy_machine: { x: 300, y: 900 },
  risk_car_fall: { x: 350, y: 900 },
  risk_electric: { x: 400, y: 900 },
  risk_drop: { x: 450, y: 900 },
  risk_boom: { x: 500, y: 900 }
};

/**
 * 이미지 생성 및 미리보기
 */
function generateImage() {
  if (!templateImage.complete) return;

  canvas.width = templateImage.width;
  canvas.height = templateImage.height;

  // 배경 그리기
  ctx.drawImage(templateImage, 0, 0);

  // 텍스트 값 가져오기
  const son_company = document.getElementById("son_company").value;
  const mother_company = document.getElementById("mother_company").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const what_do = document.getElementById("what_do").value;
  const inspector = document.getElementById("inspector").value;
  const fake_temperature = document.getElementById("fake_temperature").value;
  const real_temperature = document.getElementById("real_temperature").value;
  const machine_ect_text = document.getElementById("machine_ect_text").value;
  const company_sos = document.getElementById("company_sos").value;
  const site_site_ect_text = document.getElementById("site_site_ect_text").value;
  const hot_ect_text = document.getElementById("hot_ect_text").value;
  const cold_ect_text = document.getElementById("cold_ect_text").value;
  const danger_ect_point = document.getElementById("danger_ect_point").value;
  const danger_ect_todo = document.getElementById("danger_ect_todo").value;
  const site_ect_text = document.getElementById("site_ect_text").value;

  // 텍스트 그리기 (❗ x, y, maxWidth 값을 실제 템플릿에 맞게 수정하세요)
  drawTextAuto(son_company, 100, 100, 200, 22);
  drawTextAuto(mother_company, 400, 100, 200, 22);
  drawTextAuto(date, 100, 150, 200, 22);
  drawTextAuto(location, 400, 150, 200, 22);
  drawTextAuto(what_do, 100, 200, 200, 22);
  drawTextAuto(inspector, 400, 200, 200, 22);
  drawTextAuto(fake_temperature, 100, 250, 100, 22);
  drawTextAuto(real_temperature, 250, 250, 100, 22);
  drawTextAuto(company_sos, 100, 350, 400, 22);
  drawTextAuto(danger_ect_point, 100, 750, 300, 22);
  drawTextAuto(danger_ect_todo, 450, 750, 300, 22);

  // '기타' 텍스트 그리기 (좌표는 각 기타 체크박스 옆 괄호 위치로 설정 필요)
  drawTextAuto(machine_ect_text, 600, 300, 150, 20);
  drawTextAuto(site_site_ect_text, 700, 400, 150, 20);
  drawTextAuto(hot_ect_text, 400, 600, 150, 20);
  drawTextAuto(cold_ect_text, 250, 700, 150, 20);
  drawTextAuto(site_ect_text, 450, 800, 150, 20);

  // 체크박스 처리
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
    const pos = checkPositions[cb.value];
    if (pos && pos.x !== null && pos.y !== null) {
      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "blue"; // 미리보기 시 잘 보이도록 파란색 체크
      ctx.fillText("✔", pos.x, pos.y);
    }
  });
}

/**
 * 이미지 저장
 */
function saveImage() {
  const link = document.createElement("a");
  link.download = `위험성평가_${document.getElementById("date").value}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
