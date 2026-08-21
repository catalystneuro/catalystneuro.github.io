/* Interactive charts for "The Falling Cost of LLM Intelligence".
   Self-contained: data, rendering, tooltips. Styled to the site palette. */
(function () {
  'use strict';
  var DATA = {"models":[["DeepSeek V3 (Dec '24)","DeepSeek","2024-12-26",14.2,0.025497,1],["DeepSeek R1 (Jan '25)","DeepSeek","2025-01-20",18.6,0.32409,1],["Mistral Small 3.1","Mistral","2025-03-17",14.9,0.044317,1],["DeepSeek V3 0324","DeepSeek","2025-03-25",15.2,0.048373,1],["Llama 4 Scout","Meta","2025-04-05",10.3,0.010572,0],["Llama 4 Maverick","Meta","2025-04-05",14.5,0.035712,0],["GPT-4.1 mini","OpenAI","2025-04-14",14.8,0.063774,1],["GPT-4.1 nano","OpenAI","2025-04-14",9.6,0.034922,1],["Gemini 2.5 Pro","Google","2025-06-05",25.9,0.216436,1],["Mistral Small 3.2","Mistral","2025-06-20",10.7,0.140341,1],["Qwen3 235B A22B 2507 (Reasoning)","Alibaba","2025-07-25",19.9,0.063721,1],["Qwen3 30B A3B 2507 (Reasoning)","Alibaba","2025-07-30",14.6,0.078651,1],["gpt-oss-120b (low)","OpenAI","2025-08-05",14.9,0.020199,0],["gpt-oss-120b (high)","OpenAI","2025-08-05",24.1,0.072725,0],["gpt-oss-20b (high)","OpenAI","2025-08-05",15.2,0.024981,0],["GPT-5 (high)","OpenAI","2025-08-07",35.3,0.257159,1],["GPT-5 mini (high)","OpenAI","2025-08-07",25.8,0.035972,1],["Mistral Medium 3.1","Mistral","2025-08-12",14.7,0.166486,1],["Qwen3 Next 80B A3B (Reasoning)","Alibaba","2025-09-11",16.9,0.041866,0],["Magistral Small 1.2","Mistral","2025-09-17",11.5,0.295018,0],["Magistral Medium 1.2","Mistral","2025-09-18",18,0.891797,0],["Claude 4.5 Sonnet (Reasoning)","Anthropic","2025-09-29",37.4,0.46434,1],["GLM-4.6 (Reasoning)","Z AI","2025-09-30",29.3,0.304638,1],["Claude 4.5 Haiku (Reasoning)","Anthropic","2025-10-15",29.9,0.217448,0],["GPT-5.1 (high)","OpenAI","2025-11-13",37.5,0.304034,1],["Ministral 3 14B","Mistral","2025-12-02",11.2,0.158417,0],["Ministral 3 8B","Mistral","2025-12-02",9,0.184579,0],["Mistral Large 3","Mistral","2025-12-02",15.9,0.080608,0],["Ministral 3 3B","Mistral","2025-12-02",7.1,0.129679,0],["NVIDIA Nemotron 3 Nano 30B A3B (Reasoning)","NVIDIA","2025-12-15",14.5,0.024889,0],["GLM-4.7 (Reasoning)","Z AI","2025-12-22",34.5,0.358553,1],["Kimi K2.5 (Reasoning)","Kimi","2026-01-27",36,0.096384,1],["Qwen3 Coder Next","Alibaba","2026-02-03",21.3,0.337054,0],["Qwen3.5 397B A17B (Reasoning)","Alibaba","2026-02-16",34.3,0.357418,0],["Claude Sonnet 4.6 (Adaptive Reasoning, Max Effort)","Anthropic","2026-02-17",48.4,1.2182,1],["Gemini 3.1 Pro Preview","Google","2026-02-19",47.7,0.334565,0],["Mercury 2","Inception","2026-02-20",21.9,0.079807,0],["Qwen3.5 122B A10B (Reasoning)","Alibaba","2026-02-24",32.8,0.252735,0],["Qwen3.5 122B A10B (Non-reasoning)","Alibaba","2026-02-24",28.2,0.195282,0],["Qwen3.5 35B A3B (Non-reasoning)","Alibaba","2026-02-24",24.3,0.241137,0],["Qwen3.5 9B (Reasoning)","Alibaba","2026-03-02",21.8,0.241567,0],["Gemini 3.1 Flash-Lite","Google","2026-03-03",25.6,0.043246,1],["GPT-5.4 (xhigh)","OpenAI","2026-03-05",53.1,1.103797,1],["Nemotron 3 Super 120B A12B (Reasoning)","NVIDIA","2026-03-11",25.7,0.228561,0],["Mistral Small 4 (Reasoning)","Mistral","2026-03-16",19.7,0.100285,0],["GPT-5.4 mini (xhigh)","OpenAI","2026-03-17",40.9,0.49476,1],["GPT-5.4 nano (xhigh)","OpenAI","2026-03-17",39.7,0.149265,1],["MiniMax-M2.7","MiniMax","2026-03-18",38.9,0.077729,1],["Trinity Large Thinking","Arcee AI","2026-04-01",18.7,0.164012,0],["Gemma 4 31B (Non-reasoning)","Google","2026-04-02",22.3,0.043751,0],["Gemma 4 26B A4B (Reasoning)","Google","2026-04-02",26.1,0.039127,1],["Qwen3.6 Plus","Alibaba","2026-04-02",40.5,0.356897,1],["Solar Pro 3","Upstage","2026-04-06",14.5,0.145748,0],["GLM-5.1 (Reasoning)","Z AI","2026-04-07",41,0.304242,0],["Qwen3.6 35B A3B (Reasoning)","Alibaba","2026-04-16",32.1,0.294367,0],["Qwen3.6 35B A3B (Non-reasoning)","Alibaba","2026-04-16",24.6,0.629997,0],["Claude Opus 4.7 (Adaptive Reasoning, Max Effort)","Anthropic","2026-04-16",55,2.228527,1],["Kimi K2.6","Kimi","2026-04-20",45.1,0.365321,1],["MiMo-V2.5","Xiaomi","2026-04-22",38,0.010359,0],["MiMo-V2.5-Pro","Xiaomi","2026-04-22",42.9,0.033908,0],["Qwen3.6 27B (Reasoning)","Alibaba","2026-04-22",37.7,0.291812,0],["Qwen3.6 27B (Non-reasoning)","Alibaba","2026-04-22",31.3,0.398211,0],["GPT-5.5 (xhigh)","OpenAI","2026-04-23",56.3,1.174707,1],["GPT-5.5 (high)","OpenAI","2026-04-23",54.7,0.803311,1],["GPT-5.5 (low)","OpenAI","2026-04-23",44.5,0.258866,1],["GPT-5.5 (medium)","OpenAI","2026-04-23",51.4,0.500169,1],["GPT-5.5 (Non-reasoning)","OpenAI","2026-04-23",35.8,0.208315,1],["DeepSeek V4 Pro (Reasoning, High Effort)","DeepSeek","2026-04-24",43.7,0.043202,0],["DeepSeek V4 Pro (Reasoning, Max Effort)","DeepSeek","2026-04-24",45.3,0.047403,0],["DeepSeek V4 Flash (Reasoning, Max Effort)","DeepSeek","2026-04-24",42.1,0.0673,1],["DeepSeek V4 Flash (Reasoning, High Effort)","DeepSeek","2026-04-24",39,0.0487,1],["Mistral Medium 3.5","Mistral","2026-04-29",30.4,0.463738,0],["Grok 4.3 (Non-reasoning)","SpaceXAI","2026-04-30",25,0.294723,0],["Grok 4.3 (high)","SpaceXAI","2026-04-30",37.9,0.145405,1],["Ring-2.6-1T","InclusionAI","2026-05-08",31.7,0.360057,1],["Gemini 3.5 Flash (high)","Google","2026-05-19",52,0.693389,1],["Qwen3.7 Max","Alibaba","2026-05-19",46.7,0.541331,1],["Claude Opus 4.8 (Adaptive Reasoning, Max Effort)","Anthropic","2026-05-28",57.3,2.031502,1],["Step 3.7 Flash","StepFun","2026-05-29",30.9,0.091274,0],["MiniMax-M3","MiniMax","2026-06-01",45.4,0.13871,0],["Qwen3.7 Plus","Alibaba","2026-06-01",39.4,0.242415,0],["Nemotron 3 Ultra 550B A55B (Reasoning)","NVIDIA","2026-06-04",38.3,0.382662,0],["Claude Fable 5 (Adaptive Reasoning, Max Effort, Opus 4.8 Fallback)","Anthropic","2026-06-09",62.1,3.139584,0],["Kimi K2.7 Code","Kimi","2026-06-12",43,0.221975,0],["GLM-5.2 (max)","Z AI","2026-06-16",52.6,0.444531,0],["Grok Build 0.1 0616","SpaceXAI","2026-06-16",40.7,0.22517,1],["GPT-5.5 Instant (June 2026)","OpenAI","2026-06-25",29.2,0.536439,0],["LongCat 2.0","LongCat","2026-06-29",34,0.121293,0],["Claude Sonnet 5 (Adaptive Reasoning, Max Effort)","Anthropic","2026-06-30",55.3,1.717267,0],["Claude Sonnet 5 (Non-reasoning, High Effort)","Anthropic","2026-06-30",42.6,0.416946,0],["Hy3","Tencent","2026-07-06",42.2,0.035741,0],["Grok 4.5 (high)","SpaceXAI","2026-07-08",55.8,0.360087,0],["GPT-5.6 Sol (xhigh)","OpenAI","2026-07-09",59,0.807181,0],["GPT-5.6 Sol (max)","OpenAI","2026-07-09",60.9,1.231211,0],["GPT-5.6 Terra (low)","OpenAI","2026-07-09",41.3,0.093947,0],["GPT-5.6 Luna (high)","OpenAI","2026-07-09",47,0.021587,0],["GPT-5.6 Terra (xhigh)","OpenAI","2026-07-09",52.8,0.305022,0],["GPT-5.6 Sol (high)","OpenAI","2026-07-09",57.3,0.54773,0],["GPT-5.6 Luna (xhigh)","OpenAI","2026-07-09",50.1,0.031637,0],["GPT-5.6 Terra (high)","OpenAI","2026-07-09",50.1,0.218282,0],["GPT-5.6 Sol (medium)","OpenAI","2026-07-09",55.6,0.371671,0],["GPT-5.6 Luna (medium)","OpenAI","2026-07-09",38.9,0.011269,0],["GPT-5.6 Terra (medium)","OpenAI","2026-07-09",46.8,0.119024,0],["GPT-5.6 Sol (low)","OpenAI","2026-07-09",50.7,0.231101,0],["GPT-5.6 Luna (low)","OpenAI","2026-07-09",33.9,0.008795,0],["GPT-5.6 Luna (max)","OpenAI","2026-07-09",52.3,0.047128,0],["GPT-5.6 Terra (max)","OpenAI","2026-07-09",56.6,0.508019,0],["GPT-5.6 Sol (Non-reasoning)","OpenAI","2026-07-09",41.9,0.236553,0],["GPT-5.6 Terra (Non-reasoning)","OpenAI","2026-07-09",34.6,0.102539,0],["GPT-5.6 Luna (Non-reasoning)","OpenAI","2026-07-09",26.8,0.011731,0],["Muse Spark 1.1 (xhigh)","Meta","2026-07-09",53.2,0.292337,1],["Inkling (xhigh)","Thinking Machines","2026-07-15",42.3,0.338885,0],["Kimi K3 (max)","Kimi","2026-07-16",59.7,0.837457,0],["Kimi K3 (low)","Kimi","2026-07-16",48.3,0.241919,0],["Gemini 3.6 Flash (high)","Google","2026-07-21",51.6,0.344174,0],["Gemini 3.5 Flash-Lite","Google","2026-07-21",37.4,0.096525,0],["Claude Opus 5 (Adaptive Reasoning, Max Effort)","Anthropic","2026-07-24",63.1,2.336859,0],["Claude Opus 5 (Adaptive Reasoning, Xhigh Effort)","Anthropic","2026-07-24",62.5,1.801197,0],["Claude Opus 5 (Adaptive Reasoning, High Effort)","Anthropic","2026-07-24",61.5,1.226762,0],["Claude Opus 5 (Adaptive Reasoning, Medium Effort)","Anthropic","2026-07-24",58.6,0.724278,0],["Claude Opus 5 (Adaptive Reasoning, Low Effort)","Anthropic","2026-07-24",52.5,0.42516,0],["Celeris-1","Celeris","2026-07-24",12.4,0.258167,0],["Inkling Small","Thinking Machines","2026-07-30",41.2,0.073534,0],["DeepSeek V4 Flash 0731 (Reasoning, Max Effort)","DeepSeek","2026-07-31",51.8,0.112159,0],["Qwen3.8 Max","Alibaba","2026-08-03",58.1,1.132038,0],["Ling 3.0 Flash","InclusionAI","2026-08-04",37.8,0.037664,1],["Muse Spark 1.2 (xhigh)","Meta","2026-08-05",56.8,0.3992,1],["Solar Pro 4","Upstage","2026-08-06",41.6,0.22308,0],["Muse Glimmer (high)","Meta","2026-08-10",35.1,0.073171,0],["Nemotron 3.5 Lightning","NVIDIA","2026-08-11",23.6,0.076357,0],["Grok 4.6 (high)","SpaceXAI","2026-08-12",60.9,0.836671,0],["Qwen3.8 2.4T A95B","Alibaba","2026-08-12",57.7,1.091913,0],["Gemini 3.7 Flash (medium)","Google","2026-08-13",53.4,0.262904,0],["Gemini 3.7 Flash (low)","Google","2026-08-13",50.9,0.16485,0],["Gemini 3.7 Flash (high)","Google","2026-08-13",56,0.402166,0],["DeepSeek V4 Pro 0813 (Reasoning, Max Effort)","DeepSeek","2026-08-13",53.2,0.252071,0],["GLM-5.3 (max)","Z AI","2026-08-18",59.5,0.682931,0]],"tier_cost":{"30":[["2025-08-07",0.257159,"GPT-5 (high)",35.3],["2026-01-27",0.096384,"Kimi K2.5 (Reasoning)",36],["2026-03-18",0.077729,"MiniMax-M2.7",38.9],["2026-04-22",0.010359,"MiMo-V2.5",38],["2026-07-09",0.008795,"GPT-5.6 Luna (low)",33.9]],"40":[["2026-02-17",1.2182,"Claude Sonnet 4.6 (Adaptive Reasoning, Max Effort)",48.4],["2026-02-19",0.334565,"Gemini 3.1 Pro Preview",47.7],["2026-04-07",0.304242,"GLM-5.1 (Reasoning)",41],["2026-04-22",0.033908,"MiMo-V2.5-Pro",42.9],["2026-07-09",0.021587,"GPT-5.6 Luna (high)",47]],"50":[["2026-03-05",1.103797,"GPT-5.4 (xhigh)",53.1],["2026-04-23",0.803311,"GPT-5.5 (high)",54.7],["2026-04-23",0.500169,"GPT-5.5 (medium)",51.4],["2026-06-16",0.444531,"GLM-5.2 (max)",52.6],["2026-07-08",0.360087,"Grok 4.5 (high)",55.8],["2026-07-09",0.305022,"GPT-5.6 Terra (xhigh)",52.8],["2026-07-09",0.031637,"GPT-5.6 Luna (xhigh)",50.1]],"60":[["2026-06-09",3.139584,"Claude Fable 5 (Adaptive Reasoning, Max Effort, Opus 4.8 Fallback)",62.1],["2026-07-09",1.231211,"GPT-5.6 Sol (max)",60.9],["2026-07-24",1.226762,"Claude Opus 5 (Adaptive Reasoning, High Effort)",61.5],["2026-08-12",0.836671,"Grok 4.6 (high)",60.9]]}};

  var C = {
    surface: '#ffffff', grid: '#ecf1f8', axis: '#dfe6f1',
    ink: '#101642', ink2: '#55607a', muted: '#68718b', deemph: '#c2cbdc', retired: '#9aa4bb',
    snap: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7'],
    ord: ['#86b6ef', '#3987e5', '#1c5cab', '#0d366b']
  };
  var SNAPS = [['2025-08-19', 'Aug 2025'], ['2025-10-19', 'Oct 2025'], ['2025-12-19', 'Dec 2025'],
               ['2026-02-19', 'Feb 2026'], ['2026-04-19', 'Apr 2026'], ['2026-06-19', 'Jun 2026'],
               ['2026-08-19', 'Aug 2026 (today)']];
  var TIERS = [30, 40, 50, 60];

  var models = DATA.models.map(function (m) {
    return { name: m[0], creator: m[1], date: m[2], iq: m[3], mcost: m[4], retired: !!m[5] };
  });
  var retiredByName = {};
  models.forEach(function (m) { retiredByName[m.name] = m.retired; });

  function dot(svg, x, y, r, color, retired) {
    if (retired) svg.append(svgEl('circle', { cx: x, cy: y, r: r, fill: C.surface, stroke: color, 'stroke-width': 2 }));
    else svg.append(svgEl('circle', { cx: x, cy: y, r: r, fill: color, stroke: C.surface, 'stroke-width': 2 }));
  }

  function fmt$(c) { return '$' + (c >= 0.1 ? c.toFixed(2) : c >= 0.01 ? c.toFixed(3) : c.toFixed(4)); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function svgEl(tag, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  var tt = el('div', 'pfc-tooltip');
  document.body.appendChild(tt);

  function showTip(box, px, py, rows) {
    tt.replaceChildren.apply(tt, rows);
    tt.style.display = 'block';
    var r = box.getBoundingClientRect();
    var x = r.left + window.scrollX + px + 14;
    var y = r.top + window.scrollY + py - 10;
    tt.style.left = '0px'; tt.style.top = '0px';
    if (r.left + px + 14 + tt.offsetWidth > window.innerWidth - 8) x = r.left + window.scrollX + px - tt.offsetWidth - 14;
    tt.style.left = x + 'px'; tt.style.top = y + 'px';
  }
  function hideTip() { tt.style.display = 'none'; }

  function attachHover(box, svg, points) {
    svg.addEventListener('pointermove', function (ev) {
      var r = svg.getBoundingClientRect();
      var sx = svg.viewBox.baseVal.width / r.width;
      var mx = (ev.clientX - r.left) * sx, my = (ev.clientY - r.top) * sx;
      var best = null, bd = Infinity;
      points.forEach(function (p) {
        var d = Math.hypot(p.x - mx, p.y - my);
        if (d < bd) { bd = d; best = p; }
      });
      if (!best || bd > 40) { hideTip(); return; }
      var group = points.filter(function (p) { return Math.hypot(p.x - best.x, p.y - best.y) < 3; });
      var rows = [];
      group.forEach(function (p) { rows = rows.concat(p.rows()); });
      showTip(box, best.x / sx, best.y / sx, rows);
    });
    svg.addEventListener('pointerleave', hideTip);
  }

  function frame(box, W, H, M, ariaLabel) {
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': ariaLabel });
    svg.style.display = 'block'; svg.style.width = '100%'; svg.style.height = 'auto';
    return svg;
  }

  // ---- chart 1: intelligence vs cost, frontier every two months ----
  function renderFrontier() {
    var box = document.getElementById('pfc-frontier');
    if (!box) return;
    box.replaceChildren();
    var W = Math.max(320, Math.min(880, box.clientWidth)), H = 440;
    var M = { l: 56, r: 16, t: 12, b: 42 };
    var svg = frame(box, W, H, M, 'Intelligence Index versus cost per task with Pareto frontier lines every two months');
    var xd = [0.005, 5], yd = [0, 66];
    function X(v) { return M.l + (Math.log10(v) - Math.log10(xd[0])) / (Math.log10(xd[1]) - Math.log10(xd[0])) * (W - M.l - M.r); }
    function Y(v) { return H - M.b - (v - yd[0]) / (yd[1] - yd[0]) * (H - M.t - M.b); }

    [0.01, 0.1, 1].forEach(function (c) {
      svg.append(svgEl('line', { x1: X(c), x2: X(c), y1: M.t, y2: H - M.b, stroke: C.grid, 'stroke-width': 1 }));
      var lb = svgEl('text', { x: X(c), y: H - M.b + 18, 'text-anchor': 'middle', 'font-size': 11, fill: C.muted });
      lb.textContent = '$' + (c >= 1 ? c.toFixed(0) : c.toFixed(2)); svg.append(lb);
    });
    [0, 10, 20, 30, 40, 50, 60].forEach(function (q) {
      svg.append(svgEl('line', { x1: M.l, x2: W - M.r, y1: Y(q), y2: Y(q), stroke: C.grid, 'stroke-width': 1 }));
      var lb = svgEl('text', { x: M.l - 8, y: Y(q) + 4, 'text-anchor': 'end', 'font-size': 11, fill: C.muted });
      lb.textContent = q; svg.append(lb);
    });
    svg.append(svgEl('line', { x1: M.l, x2: W - M.r, y1: H - M.b, y2: H - M.b, stroke: C.axis, 'stroke-width': 1 }));
    svg.append(svgEl('line', { x1: M.l, x2: M.l, y1: M.t, y2: H - M.b, stroke: C.axis, 'stroke-width': 1 }));
    var xt = svgEl('text', { x: (M.l + W - M.r) / 2, y: H - 6, 'text-anchor': 'middle', 'font-size': 11.5, fill: C.ink2 });
    xt.textContent = 'Cost per task (log)'; svg.append(xt);
    var yt = svgEl('text', { x: 14, y: (M.t + H - M.b) / 2, 'font-size': 11.5, fill: C.ink2, transform: 'rotate(-90 14 ' + ((M.t + H - M.b) / 2) + ')', 'text-anchor': 'middle' });
    yt.textContent = 'Artificial Analysis Intelligence Index'; svg.append(yt);

    var pts = [];
    models.forEach(function (m) {
      var x = X(m.mcost), y = Y(m.iq);
      dot(svg, x, y, 3.5, m.retired ? C.retired : C.deemph, m.retired);
      pts.push({ x: x, y: y, rows: function () {
        var d1 = el('div', 'pfc-tt-name'); d1.textContent = m.name;
        var d2 = el('div'); var s = el('span', 'pfc-tt-val'); s.textContent = fmt$(m.mcost);
        d2.append(s, ' per task at Index ' + m.iq.toFixed(1));
        var d3 = el('div', null, m.creator + ' \u00b7 released ' + m.date + (m.retired ? ' \u00b7 retired' : ''));
        return [d1, d2, d3];
      }});
    });

    SNAPS.slice().reverse().forEach(function (snap, ri) {
      var i = SNAPS.length - 1 - ri;
      var snapDate = snap[0], snapLabel = snap[1];
      var sub = models.filter(function (m) { return m.date <= snapDate; });
      var fr = sub.filter(function (p) {
        return !sub.some(function (o) { return o.iq >= p.iq && o.mcost <= p.mcost && (o.iq > p.iq || o.mcost < p.mcost); });
      }).sort(function (a, b) { return a.iq - b.iq; });
      if (!fr.length) return;
      var color = C.snap[i];
      var d = 'M ' + X(fr[0].mcost) + ' ' + Y(fr[0].iq);
      fr.forEach(function (p, j) {
        if (j < fr.length - 1) d += ' H ' + X(fr[j + 1].mcost) + ' V ' + Y(fr[j + 1].iq);
      });
      d += ' H ' + (W - M.r);
      svg.append(svgEl('path', { d: d, fill: 'none', stroke: color, 'stroke-width': i === SNAPS.length - 1 ? 3 : 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
      fr.forEach(function (p) {
        var x = X(p.mcost), y = Y(p.iq);
        dot(svg, x, y, 4, color, p.retired);
        pts.push({ x: x, y: y, rows: function () {
          var d1 = el('div', 'pfc-tt-name'); d1.textContent = p.name;
          var d2 = el('div', 'pfc-tt-row');
          var kd = el('span', 'pfc-tt-key'); kd.style.borderTopColor = color;
          var s = el('span', 'pfc-tt-val'); s.textContent = fmt$(p.mcost);
          d2.append(kd, s, ' at Index ' + p.iq.toFixed(1));
          var d3 = el('div', null, 'frontier as of ' + snapLabel + ' \u00b7 released ' + p.date + (p.retired ? ' \u00b7 retired' : ''));
          return [d1, d2, d3];
        }});
      });
    });
    box.append(svg);
    attachHover(box, svg, pts);

    var legend = document.getElementById('pfc-frontier-legend');
    if (legend) {
      legend.replaceChildren();
      SNAPS.forEach(function (snap, i) {
        var item = el('span', 'pfc-lk');
        var sw = el('span', 'pfc-swatch');
        sw.style.borderTopColor = C.snap[i];
        item.append(sw, el('span', null, snap[1]));
        legend.append(item);
      });
      var live = el('span', 'pfc-lk');
      var d1 = el('span', 'pfc-dot');
      d1.style.background = C.deemph; d1.style.borderColor = C.deemph;
      live.append(d1, el('span', null, 'currently benchmarked'));
      var ret = el('span', 'pfc-lk');
      var d2 = el('span', 'pfc-dot');
      d2.style.background = C.surface; d2.style.borderColor = C.retired;
      ret.append(d2, el('span', null, 'retired'));
      legend.append(live, ret);
    }
  }

  // ---- chart 2: cost records by tier ----
  function renderRecords() {
    var box = document.getElementById('pfc-records');
    if (!box) return;
    box.replaceChildren();
    var W = Math.max(320, Math.min(880, box.clientWidth)), H = 370;
    var M = { l: 56, r: 60, t: 12, b: 40 };
    var svg = frame(box, W, H, M, 'Running minimum measured cost per task by capability tier');
    var x0 = Date.parse('2025-07-01T00:00:00Z'), x1 = Date.parse('2026-09-15T00:00:00Z');
    var yd = [0.005, 5];
    function X(dstr) { return M.l + (Date.parse(dstr + 'T00:00:00Z') - x0) / (x1 - x0) * (W - M.l - M.r); }
    function Y(v) { return H - M.b - (Math.log10(v) - Math.log10(yd[0])) / (Math.log10(yd[1]) - Math.log10(yd[0])) * (H - M.t - M.b); }

    [['2025-07-01', "Jul '25"], ['2025-09-01', "Sep '25"], ['2025-11-01', "Nov '25"], ['2026-01-01', "Jan '26"],
     ['2026-03-01', "Mar '26"], ['2026-05-01', "May '26"], ['2026-07-01', "Jul '26"], ['2026-09-01', "Sep '26"]].forEach(function (t) {
      svg.append(svgEl('line', { x1: X(t[0]), x2: X(t[0]), y1: M.t, y2: H - M.b, stroke: C.grid, 'stroke-width': 1 }));
      var lb = svgEl('text', { x: X(t[0]), y: H - M.b + 18, 'text-anchor': 'middle', 'font-size': 11, fill: C.muted });
      lb.textContent = t[1]; svg.append(lb);
    });
    [0.01, 0.1, 1].forEach(function (v) {
      svg.append(svgEl('line', { x1: M.l, x2: W - M.r, y1: Y(v), y2: Y(v), stroke: C.grid, 'stroke-width': 1 }));
      var lb = svgEl('text', { x: M.l - 8, y: Y(v) + 4, 'text-anchor': 'end', 'font-size': 11, fill: C.muted });
      lb.textContent = '$' + (v >= 1 ? v.toFixed(0) : v.toFixed(2)); svg.append(lb);
    });
    svg.append(svgEl('line', { x1: M.l, x2: W - M.r, y1: H - M.b, y2: H - M.b, stroke: C.axis, 'stroke-width': 1 }));
    svg.append(svgEl('line', { x1: M.l, x2: M.l, y1: M.t, y2: H - M.b, stroke: C.axis, 'stroke-width': 1 }));

    var pts = [];
    var endLabels = [];
    TIERS.forEach(function (tier, i) {
      var recs = DATA.tier_cost[tier];
      if (!recs || !recs.length) return;
      var color = C.ord[i];
      var d = '';
      recs.forEach(function (r, j) {
        var x = X(r[0]), y = Y(r[1]);
        d += (j === 0 ? 'M ' + x + ' ' + y : ' V ' + y);
        var nx = j < recs.length - 1 ? X(recs[j + 1][0]) : W - M.r;
        d += ' H ' + nx;
      });
      svg.append(svgEl('path', { d: d, fill: 'none', stroke: color, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
      recs.forEach(function (r) {
        var x = X(r[0]), y = Y(r[1]);
        dot(svg, x, y, 4, color, !!retiredByName[r[2]]);
        pts.push({ x: x, y: y, rows: function () {
          var d1 = el('div', 'pfc-tt-name'); d1.textContent = r[2];
          var d2 = el('div', 'pfc-tt-row');
          var kd = el('span', 'pfc-tt-key'); kd.style.borderTopColor = color;
          var s = el('span', 'pfc-tt-val'); s.textContent = fmt$(r[1]);
          d2.append(kd, s, ' new record, Index \u2265 ' + tier);
          var d3 = el('div', null, 'released ' + r[0] + ' \u00b7 Index ' + r[3].toFixed(1) + (retiredByName[r[2]] ? ' \u00b7 retired' : ''));
          return [d1, d2, d3];
        }});
      });
      var endY = Y(recs[recs.length - 1][1]);
      if (!endLabels.some(function (yy) { return Math.abs(yy - endY) < 14; })) {
        var lb = svgEl('text', { x: W - M.r + 6, y: endY + 4, 'font-size': 10.5, 'font-weight': 500, fill: C.ink2 });
        lb.textContent = '\u2265 ' + tier; svg.append(lb);
        endLabels.push(endY);
      }
    });
    box.append(svg);
    attachHover(box, svg, pts);

    var legend = document.getElementById('pfc-records-legend');
    if (legend) {
      legend.replaceChildren();
      TIERS.forEach(function (tier, i) {
        var item = el('span', 'pfc-lk');
        var sw = el('span', 'pfc-swatch');
        sw.style.borderTopColor = C.ord[i];
        item.append(sw, el('span', null, 'Intelligence Index \u2265 ' + tier));
        legend.append(item);
      });
    }
  }

  function renderAll() { renderFrontier(); renderRecords(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
  else renderAll();
  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAll, 150); });
})();
