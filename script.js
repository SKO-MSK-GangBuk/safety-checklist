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
 * 체크박스 좌표 매핑 
 */
const checkPositions = {
  // 기상 상태
  weather_clear:   { x: null, y: null },
  weather_wind:   { x: null, y: null },
  weather_rain_or_snow:   { x: null, y: null },
  weather_hot:   { x: null, y: null },
  weather_cold:   { x: null, y: null },

  //건설장비
  machine_crane:   { x: null, y: null },
  machine_sky:   { x: null, y: null },
  machine_sj:   { x: null, y: null },
  machine_labbercar:   { x: null, y: null },
  machine_forklift:   { x: null, y: null },
  machine_dumptruck:   { x: null, y: null },
  machine_excavator:   { x: null, y: null },
  machine_pumpcar:   { x: null, y: null },
  machine_mixtruck:   { x: null, y: null },
  machine_ect:   { x: null, y: null },

  // 현장 특성
  site_road_outside:   { x: null, y: null },
  site_road_inside:   { x: null, y: null },
  site_road_narrow:   { x: null, y: null },
  site_inside:   { x: null, y: null },
  site_in_height:   { x: null, y: null },
  site_high_height:   { x: null, y: null },
  site_apart_parking:   { x: null, y: null },
  site_drop_danger:   { x: null, y: null },
  site_near_road:   { x: null, y: null },
  site_near_voltage:   { x: null, y: null },
  site_near_hivoltage:   { x: null, y: null },
  site_site_ect:   { x: null, y: null },

  //공통사항
  common_equipment:   { x: null, y: null },
  common_machine:   { x: null, y: null },
  common_health:   { x: null, y: null },
  common_tool:   { x: null, y: null },
  common_stop_work:   { x: null, y: null },
  common_danger:   { x: null, y: null },
  common_heavy:   { x: null, y: null },

  //혹서기 용품 지참유무
  hot_thermometer:   { x: null, y: null },
  hot_water:   { x: null, y: null },
  hot_icebox:   { x: null, y: null },
  hot_candy:   { x: null, y: null },
  hot_rest:   { x: null, y: null },
  hot_ect:   { x: null, y: null },

  //혹한기 용품 지참유무
  cold_warmer:   { x: null, y: null },
  cold_cloth:   { x: null, y: null },
  cold_ect:   { x: null, y: null },

  //작업장 환경
  site_roof:   { x: null, y: null },
  site_rooftop:   { x: null, y: null },
  site_pool:   { x: null, y: null },
  site_steel_tower:   { x: null, y: null },
  site_strong_pool:   { x: null, y: null },
  site_inbuilding:   { x: null, y: null },
  site_ect:   { x: null, y: null },

  // 위험 요인
  risk_fall:   { x: null, y: null },
  risk_fall_ladder:   { x: null, y: null },
  risk_fall_ladder_width:   { x: null, y: null },
  risk_car_crush:   { x: null, y: null },
  risk_heavy_machine:   { x: null, y: null },
  risk_car_fall:   { x: null, y: null },
  risk_electric:   { x: null, y: null },
  risk_drop:   { x: null, y: null },
  risk_boom:   { x: null, y: null }
};

/* ===== 실시간 미리보기 ===== */
function redrawPreview() {
  if (!templateImage.complete) return;

/**
 * 이미지 생성
 */
function generateImage() {
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
  const site_site_ect_text = document.getElementById("site_ect_text").value;
  const hot_ect_text = document.getElementById("hot_ect_text").value;
  const cold_ect_text = document.getElementById("cold_ect_text").value;
  const danger_ect_point = document.getElementById("danger_ect_point").value;
  const danger_ect_todo = document.getElementById("danger_ect_todo").value;
  const site_ect_text = document.getElementById("site_ect_text").value;

  templateImage.onload = () => {
    canvas.width = templateImage.width;
    canvas.height = templateImage.height;

    // 배경
    ctx.drawImage(templateImage, 0, 0);

    // 텍스트 입력 (❗ 좌표/폭/폰트 크기 네가 지정)
    drawTextAuto(son_company, /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(mother_company,      /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(date,  /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(location, /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(what_do,      /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(inspector,  /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(fake_temperature, /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(real_temperature,      /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(machine_ect_text,  /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(company_sos, /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(site_site_ect_text,      /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(hot_ect_text,  /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(cold_ect_text, /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(danger_ect_point,      /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(danger_ect_todo,  /* x */, /* y */, /* maxWidth */, 22);
    drawTextAuto(site_ect_text, /* x */, /* y */, /* maxWidth */, 22);

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
