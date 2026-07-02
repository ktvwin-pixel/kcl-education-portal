const tierData = {
  free: {
    title: "무료회원",
    summary: "가입 즉시 기초 자료와 공개 교육 안내를 검토할 수 있습니다.",
    items: [
      "재난소통 기본 체크리스트 미리보기",
      "교육과정 소개, 공개 강의 목차 열람",
      "출판 도서와 공개 채널 링크 이용",
      "정회원 전환 신청서 작성 가능"
    ],
    notice: "내부 교재, 워크북, 기관별 실습자료는 관리자 인증 이후 열립니다."
  },
  paid: {
    title: "유료회원 전환 신청",
    summary: "자료 이용 목적과 소속 정보를 제출하면 관리자가 정회원 전환을 검토합니다.",
    items: [
      "소속·직무·교육 목적 제출",
      "자료 이용 범위 및 기관 교육 필요성 확인",
      "결제 또는 기관 협약 정보 확인",
      "관리자 검토 후 정회원 인증 대기"
    ],
    notice: "신청 상태에서는 결제·인증 안내와 공개 자료까지만 이용할 수 있습니다."
  },
  certified: {
    title: "정회원",
    summary: "관리자 인증을 마치면 내부 자료실과 재난소통 Q&A 도구를 이용할 수 있습니다.",
    items: [
      "표준교재, 강사용 지도서, 실습 워크북 이용",
      "브리핑문 작성 폼과 압박질문 대응 문구 제공",
      "재난소통 질문에 대한 답변 가이드 이용",
      "기관별 교육자료와 수료·인증 관리 연계"
    ],
    notice: "정회원 자료는 교육 목적에 맞춰 내부 이용 기준을 준수해야 합니다."
  }
};

const answerGuides = {
  briefing: {
    title: "브리핑 답변 구조",
    lines: [
      "확인된 사실과 확인 중인 정보를 분리해 말합니다.",
      "현재 조치, 인명 보호, 현장 통제 상황을 먼저 설명합니다.",
      "다음 안내 시각과 공식 확인 채널을 함께 제시합니다."
    ],
    template: "현재 확인된 사실은 [확인 사실]입니다. 인명 보호와 현장 통제를 위해 [현재 조치]를 진행하고 있습니다. 추가 확인 내용은 [다음 안내 시각]에 공식 채널로 안내드리겠습니다."
  },
  rumor: {
    title: "루머·SNS 대응 구조",
    lines: [
      "허위정보를 반복 확산하지 않도록 짧게 정정합니다.",
      "사실, 맥락, 시각 자료를 같은 메시지로 제공합니다.",
      "공식 채널과 업데이트 시간을 고정해 혼선을 줄입니다."
    ],
    template: "현재 온라인에 확산 중인 내용 중 [루머 내용]은 확인된 사실과 다릅니다. 공식 확인 내용은 [사실]이며, 추가 자료는 [공식 채널]에서 계속 갱신하겠습니다."
  },
  victim: {
    title: "피해자 보호 답변 구조",
    lines: [
      "피해자와 유가족의 의사를 우선 확인합니다.",
      "개인정보, 신원, 자극적 장면은 공개하지 않습니다.",
      "보도 가능 범위와 지원 절차를 차분하게 안내합니다."
    ],
    template: "피해자와 가족의 보호를 최우선으로 하고 있어 개인정보와 신원 관련 내용은 공개하지 않습니다. 현재 지원 절차는 [지원 조치]이며, 확인 가능한 범위 안에서만 안내드리겠습니다."
  },
  interview: {
    title: "인터뷰 답변 구조",
    lines: [
      "한 질문에는 한 메시지로 답합니다.",
      "15초 안에 말할 수 있도록 75~85자 수준으로 줄입니다.",
      "모르는 내용은 추측하지 않고 확인 절차로 연결합니다."
    ],
    template: "지금 가장 중요한 것은 [핵심 메시지]입니다. 확인된 내용은 [사실]이며, 아직 확인되지 않은 부분은 관계기관과 교차 확인한 뒤 안내하겠습니다."
  }
};

const tierContent = document.querySelector("#tierContent");
const tierTabs = document.querySelectorAll(".tier-tab");

function renderTier(tier) {
  const data = tierData[tier];
  tierContent.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.summary}</p>
    <ul>${data.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    <p class="tier-notice">${data.notice}</p>
  `;
}

tierTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tierTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderTier(tab.dataset.tier);
  });
});

const answerBtn = document.querySelector("#answerBtn");
const answerOutput = document.querySelector("#answerOutput");
const questionInput = document.querySelector("#questionInput");
const scenarioSelect = document.querySelector("#scenarioSelect");

function renderAnswer() {
  const guide = answerGuides[scenarioSelect.value];
  const question = questionInput.value.trim();
  const questionLine = question
    ? `<p><strong>질문 요약:</strong> ${question}</p>`
    : "<p><strong>질문 요약:</strong> 입력된 질문이 없어 기본 가이드를 표시합니다.</p>";

  answerOutput.innerHTML = `
    ${questionLine}
    <p><strong>${guide.title}</strong></p>
    <ol>${guide.lines.map((line) => `<li>${line}</li>`).join("")}</ol>
    <p><strong>표준 답변 예시:</strong><br>${guide.template}</p>
  `;
}

answerBtn.addEventListener("click", renderAnswer);
scenarioSelect.addEventListener("change", renderAnswer);
renderTier("free");

const joinForm = document.querySelector("#joinForm");
const consentModal = document.querySelector("#consentModal");
const consentCloseBtn = document.querySelector("#consentCloseBtn");
const consentCancelBtn = document.querySelector("#consentCancelBtn");
const consentSendBtn = document.querySelector("#consentSendBtn");
const consentCheckboxes = document.querySelectorAll(".consent-checkbox");
let pendingGmailUrl = "";

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#joinName").value.trim();
  const organization = document.querySelector("#joinOrg").value.trim();
  const requestType = document.querySelector("#joinType").value;
  const message = document.querySelector("#joinMessage").value.trim();

  if (!name || !organization) {
    alert("이름과 소속/직무를 입력해 주세요.");
    return;
  }

  const subject = `[KCL 홈페이지] ${requestType} - ${name}`;
  const paymentGuide = [
    "유료회원 가입 안내",
    "연 회비: 100,000원",
    "입금계좌: 하나은행 661-910505-07007",
    "예금주: 코리아콘텐츠연구소"
  ].join("\n");
  const body = [
    "KOREA CONTENTS LAB 회원 가입 및 전환 신청",
    "",
    `이름: ${name}`,
    `소속/직무: ${organization}`,
    `신청 유형: ${requestType}`,
    "",
    "문의 내용:",
    message || "(입력 없음)",
    "",
    paymentGuide,
    "",
    "회원 정관 및 개인정보 전달 동의: 신청자가 홈페이지 동의창에서 확인 후 작성",
    "",
    `신청 페이지: ${window.location.href}`,
    `작성 시각: ${new Date().toLocaleString("ko-KR")}`
  ].join("\n");

  const gmailUrl = new URL("https://mail.google.com/mail/");
  gmailUrl.searchParams.set("view", "cm");
  gmailUrl.searchParams.set("fs", "1");
  gmailUrl.searchParams.set("to", "2025koreacl@gmail.com");
  gmailUrl.searchParams.set("su", subject);
  gmailUrl.searchParams.set("body", body);

  pendingGmailUrl = gmailUrl.toString();
  openConsentModal();
});

function openConsentModal() {
  consentCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  consentSendBtn.disabled = true;
  consentModal.hidden = false;
}

function closeConsentModal() {
  consentModal.hidden = true;
  pendingGmailUrl = "";
}

function updateConsentButton() {
  consentSendBtn.disabled = ![...consentCheckboxes].every((checkbox) => checkbox.checked);
}

consentCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateConsentButton);
});

consentCloseBtn.addEventListener("click", closeConsentModal);
consentCancelBtn.addEventListener("click", closeConsentModal);
consentModal.addEventListener("click", (event) => {
  if (event.target === consentModal) {
    closeConsentModal();
  }
});

consentSendBtn.addEventListener("click", () => {
  if (!pendingGmailUrl) {
    return;
  }
  window.open(pendingGmailUrl, "_blank", "noopener");
  consentModal.hidden = true;
});
