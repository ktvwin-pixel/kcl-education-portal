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
const joinType = document.querySelector("#joinType");
const institutionFields = document.querySelector("#institutionFields");
let pendingGmailUrl = "";
const membershipEmail = "2025koreacl@gmail.com";

function buildGmailUrl(subject, body) {
  const gmailUrl = new URL("https://mail.google.com/mail/");
  gmailUrl.searchParams.set("view", "cm");
  gmailUrl.searchParams.set("fs", "1");
  gmailUrl.searchParams.set("tf", "1");
  gmailUrl.searchParams.set("to", membershipEmail);
  gmailUrl.searchParams.set("su", subject);
  gmailUrl.searchParams.set("body", body);
  return gmailUrl.toString();
}

function updateInstitutionFields() {
  institutionFields.hidden = joinType.value !== "기관 교육 문의";
}

joinType.addEventListener("change", updateInstitutionFields);
updateInstitutionFields();

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#joinName").value.trim();
  const organization = document.querySelector("#joinOrg").value.trim();
  const requestType = joinType.value;
  const message = document.querySelector("#joinMessage").value.trim();

  if (!name || !organization) {
    alert("이름과 소속/직무 또는 기관 이름을 입력해 주세요.");
    return;
  }

  if (requestType === "기관 교육 문의") {
    const courseType = document.querySelector("#courseType").value;
    const contactEmail = document.querySelector("#contactEmail").value.trim();
    const contactPhone = document.querySelector("#contactPhone").value.trim();
    const region = document.querySelector("#region").value.trim();
    const preferredPeriod = document.querySelector("#preferredPeriod").value.trim();

    if (!contactEmail || !contactPhone) {
      alert("담당자 이메일주소와 연락처를 입력해 주세요.");
      return;
    }

    const subject = `[KCL 기관교육 문의] ${courseType} - ${organization}`;
    const body = [
      "KOREA CONTENTS LAB 기관 교육 문의",
      "",
      "[관리자 검색용 접수 정보]",
      `접수구분: 기관 교육 문의`,
      `교육과정: ${courseType}`,
      `희망기간: ${preferredPeriod || "(입력 없음)"}`,
      `지역: ${region || "(입력 없음)"}`,
      `기관명: ${organization}`,
      `담당자명: ${name}`,
      `담당자 이메일: ${contactEmail}`,
      `담당자 연락처: ${contactPhone}`,
      "",
      "신청 내용:",
      message || "(입력 없음)",
      "",
      "관리자 활용 안내:",
      "Gmail에서 교육과정, 희망기간, 지역, 기관명, 담당자 연락처 항목으로 검색할 수 있습니다.",
      "엑셀 정리가 필요한 경우 위 항목을 행 단위로 복사해 관리대장에 붙여넣어 활용합니다.",
      "",
      `신청 페이지: ${window.location.href}`,
      `작성 시각: ${new Date().toLocaleString("ko-KR")}`
    ].join("\n");

    window.open(buildGmailUrl(subject, body), "_blank", "noopener");
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
    "신청 내용:",
    message || "(입력 없음)",
    "",
    paymentGuide,
    "",
    "회원 정관 및 개인정보 전달 동의: 신청자가 홈페이지 동의창에서 확인 후 작성",
    "",
    `신청 페이지: ${window.location.href}`,
    `작성 시각: ${new Date().toLocaleString("ko-KR")}`
  ].join("\n");

  pendingGmailUrl = buildGmailUrl(subject, body);
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

const adminStorageKey = "kclInstitutionApplications";
const adminSessionKey = "kclAdminLoggedIn";
const adminLoginIdValue = "kcladmin";
const adminLoginPasswordValue = "KCL2026!";
const adminLoginPanel = document.querySelector("#adminLoginPanel");
const adminProtectedContent = document.querySelector("#adminProtectedContent");
const adminLoginForm = document.querySelector("#adminLoginForm");
const adminLoginId = document.querySelector("#adminLoginId");
const adminLoginPassword = document.querySelector("#adminLoginPassword");
const adminLoginError = document.querySelector("#adminLoginError");
const adminLogoutBtn = document.querySelector("#adminLogoutBtn");
const adminForm = document.querySelector("#adminForm");
const parseAdminMailBtn = document.querySelector("#parseAdminMailBtn");
const downloadAdminCsvBtn = document.querySelector("#downloadAdminCsvBtn");
const clearAdminFiltersBtn = document.querySelector("#clearAdminFiltersBtn");
const adminRows = document.querySelector("#adminRows");
const adminCount = document.querySelector("#adminCount");
const adminInputs = {
  paste: document.querySelector("#adminPaste"),
  receivedDate: document.querySelector("#adminReceivedDate"),
  course: document.querySelector("#adminCourse"),
  period: document.querySelector("#adminPeriod"),
  region: document.querySelector("#adminRegion"),
  organization: document.querySelector("#adminOrg"),
  name: document.querySelector("#adminName"),
  email: document.querySelector("#adminEmail"),
  phone: document.querySelector("#adminPhone"),
  message: document.querySelector("#adminMessage")
};
const adminFilters = {
  from: document.querySelector("#filterDateFrom"),
  to: document.querySelector("#filterDateTo"),
  period: document.querySelector("#filterPeriod"),
  region: document.querySelector("#filterRegion"),
  organization: document.querySelector("#filterOrg"),
  phone: document.querySelector("#filterPhone")
};

function todayText() {
  return new Date().toISOString().slice(0, 10);
}

function readAdminRecords() {
  try {
    return JSON.parse(localStorage.getItem(adminStorageKey)) || [];
  } catch (error) {
    return [];
  }
}

function writeAdminRecords(records) {
  localStorage.setItem(adminStorageKey, JSON.stringify(records));
}

function fieldFromMail(text, label) {
  const match = text.match(new RegExp(`${label}\\s*:\\s*([^\\n]+)`, "i"));
  return match ? match[1].trim() : "";
}

function messageFromMail(text) {
  const match = text.match(/신청\s*내용\s*:\s*([\s\S]*?)(?:\n\s*\n관리자|$)/);
  return match ? match[1].trim() : "";
}

function fillAdminDate() {
  if (!adminInputs.receivedDate.value) {
    adminInputs.receivedDate.value = todayText();
  }
}

function parseAdminMail() {
  const text = adminInputs.paste.value.trim();
  if (!text) {
    alert("접수 메일 본문을 붙여넣어 주세요.");
    return;
  }

  fillAdminDate();
  adminInputs.course.value = fieldFromMail(text, "교육과정") || adminInputs.course.value;
  adminInputs.period.value = fieldFromMail(text, "희망기간");
  adminInputs.region.value = fieldFromMail(text, "지역");
  adminInputs.organization.value = fieldFromMail(text, "기관명");
  adminInputs.name.value = fieldFromMail(text, "담당자명");
  adminInputs.email.value = fieldFromMail(text, "담당자 이메일");
  adminInputs.phone.value = fieldFromMail(text, "담당자 연락처");
  adminInputs.message.value = messageFromMail(text);
}

function currentAdminRecord() {
  return {
    id: `${Date.now()}`,
    receivedDate: adminInputs.receivedDate.value || todayText(),
    course: adminInputs.course.value,
    period: adminInputs.period.value.trim(),
    region: adminInputs.region.value.trim(),
    organization: adminInputs.organization.value.trim(),
    name: adminInputs.name.value.trim(),
    email: adminInputs.email.value.trim(),
    phone: adminInputs.phone.value.trim(),
    message: adminInputs.message.value.trim()
  };
}

function adminMatches(record) {
  const from = adminFilters.from.value;
  const to = adminFilters.to.value;
  const period = adminFilters.period.value.trim();
  const region = adminFilters.region.value.trim();
  const organization = adminFilters.organization.value.trim();
  const phone = adminFilters.phone.value.trim();

  if (from && record.receivedDate < from) return false;
  if (to && record.receivedDate > to) return false;
  if (period && !record.period.includes(period)) return false;
  if (region && !record.region.includes(region)) return false;
  if (organization && !record.organization.includes(organization)) return false;
  if (phone && !record.phone.includes(phone)) return false;
  return true;
}

function filteredAdminRecords() {
  return readAdminRecords().filter(adminMatches);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function renderAdminRecords() {
  const records = filteredAdminRecords();
  adminRows.innerHTML = "";
  adminCount.textContent = `검색 결과 ${records.length}건`;

  if (!records.length) {
    adminRows.innerHTML = '<tr class="empty-admin-row"><td colspan="6">저장된 신청 정보가 없습니다.</td></tr>';
    return;
  }

  records.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(record.receivedDate)}</td>
      <td>${escapeHtml(record.course)}<br><small>${escapeHtml(record.period || "-")}</small></td>
      <td>${escapeHtml(record.region || "-")}</td>
      <td>${escapeHtml(record.organization)}</td>
      <td>${escapeHtml(record.name)}<br><small>${escapeHtml(record.email || "-")}</small></td>
      <td>${escapeHtml(record.phone)}</td>
    `;
    adminRows.appendChild(row);
  });
}

function saveAdminRecord(event) {
  event.preventDefault();
  const record = currentAdminRecord();
  if (!record.organization || !record.name || !record.phone) {
    alert("기관명, 담당자명, 담당자 연락처를 입력해 주세요.");
    return;
  }

  const records = readAdminRecords();
  records.unshift(record);
  writeAdminRecords(records);
  adminForm.reset();
  fillAdminDate();
  renderAdminRecords();
}

function csvCell(value) {
  return `"${String(value || "").replace(/"/g, '""')}"`;
}

function downloadAdminCsv() {
  const records = filteredAdminRecords();
  if (!records.length) {
    alert("다운로드할 신청 정보가 없습니다.");
    return;
  }

  const headers = ["접수일", "교육과정", "희망기간", "지역", "기관명", "담당자명", "담당자 이메일", "담당자 연락처", "신청 내용"];
  const rows = records.map((record) => [
    record.receivedDate,
    record.course,
    record.period,
    record.region,
    record.organization,
    record.name,
    record.email,
    record.phone,
    record.message
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `KCL_기관교육_신청대장_${todayText()}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function clearAdminFilters() {
  Object.values(adminFilters).forEach((input) => {
    input.value = "";
  });
  renderAdminRecords();
}

function isAdminLoggedIn() {
  return sessionStorage.getItem(adminSessionKey) === "true";
}

function updateAdminAccess() {
  if (!adminForm) {
    return;
  }

  const loggedIn = isAdminLoggedIn();
  adminLoginPanel.hidden = loggedIn;
  adminProtectedContent.hidden = !loggedIn;
  if (loggedIn) {
    fillAdminDate();
    renderAdminRecords();
  } else {
    adminLoginPassword.value = "";
    adminLoginError.textContent = "";
  }
}

if (adminForm) {
  adminLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = adminLoginId.value.trim();
    const password = adminLoginPassword.value;

    if (id === adminLoginIdValue && password === adminLoginPasswordValue) {
      sessionStorage.setItem(adminSessionKey, "true");
      updateAdminAccess();
      return;
    }

    adminLoginError.textContent = "관리자 아이디 또는 비밀번호가 올바르지 않습니다.";
  });

  adminLogoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem(adminSessionKey);
    updateAdminAccess();
  });

  parseAdminMailBtn.addEventListener("click", parseAdminMail);
  adminForm.addEventListener("submit", saveAdminRecord);
  downloadAdminCsvBtn.addEventListener("click", downloadAdminCsv);
  clearAdminFiltersBtn.addEventListener("click", clearAdminFilters);
  Object.values(adminFilters).forEach((input) => {
    input.addEventListener("input", renderAdminRecords);
  });
  updateAdminAccess();
}
