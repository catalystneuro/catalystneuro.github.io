/* LLM cost frontier dashboard. Same charts as the blog post, fed from
   /data/llm-frontier.json, which a scheduled workflow refreshes from
   Artificial Analysis. */
(function () {
  'use strict';
  var DATA_URL = '/data/llm-frontier.json';
  var DATA = null;

  var C = {
    surface: '#ffffff', grid: '#ecf1f8', axis: '#dfe6f1',
    ink: '#101642', ink2: '#55607a', muted: '#68718b', deemph: '#c2cbdc', retired: '#9aa4bb',
    snap: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#101642'],
    ord: ['#86b6ef', '#3987e5', '#1c5cab', '#0d366b']
  };
  var SNAPS = [];
  var TIERS = [];

  var models = [], retiredByName = {}, openByName = {};
  // Cost in effect on a given date: the last recorded change at or before it.
  function costAt(m, date) {
    if (!m.hist) return m.mcost;
    var c = m.hist[0][1];
    for (var i = 0; i < m.hist.length; i++) { if (m.hist[i][0] <= date) c = m.hist[i][1]; else break; }
    return c;
  }
  function loadData(d) {
    DATA = d;
    SNAPS = d.snapshots.map(function (s) { return [s[0], s[1]]; });
    TIERS = d.tiers.slice();
    models = d.models.map(function (m) {
      return { name: m[0], creator: m[1], date: m[2], iq: m[3], mcost: m[4], retired: !!m[5], open: !!m[6], hist: m[7] || null };
    });
    retiredByName = {}; openByName = {};
    models.forEach(function (m) { retiredByName[m.name] = m.retired; openByName[m.name] = m.open; });
    anim.stage = SNAPS.length - 1;
  }

  function dot(svg, x, y, r, color, open) {
    if (open) svg.append(svgEl('circle', { cx: x, cy: y, r: r, fill: C.surface, stroke: color, 'stroke-width': 2 }));
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
      var visible = points.filter(function (p) { return p.snap === undefined || p.snap <= anim.stage; });
      visible.forEach(function (p) {
        var d = Math.hypot(p.x - mx, p.y - my);
        if (d < bd) { bd = d; best = p; }
      });
      if (!best || bd > 40) { hideTip(); return; }
      var group = visible.filter(function (p) { return Math.hypot(p.x - best.x, p.y - best.y) < 3; });
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
  var anim = { stage: SNAPS.length - 1, paused: false, timer: null, groups: [] };
  var STEP_MS = 1100, HOLD_MS = 6000;
  function applyStage() {
    anim.groups.forEach(function (gs, i) {
      gs.forEach(function (g) { g.setAttribute('display', i <= anim.stage ? 'inline' : 'none'); });
    });
    var cap = document.getElementById('pfc-frontier-stage');
    if (cap) cap.textContent = 'Pareto frontier as of ' + SNAPS[anim.stage][1];
  }
  function tick() {
    clearTimeout(anim.timer);
    if (anim.paused) return;
    anim.stage = anim.stage >= SNAPS.length - 1 ? 0 : anim.stage + 1;
    applyStage();
    hideTip();
    anim.timer = setTimeout(tick, anim.stage === SNAPS.length - 1 ? HOLD_MS : STEP_MS);
  }
  function setPaused(p) {
    anim.paused = p;
    var b = document.getElementById('pfc-frontier-toggle');
    if (b) { b.textContent = p ? 'Play' : 'Pause'; b.setAttribute('aria-pressed', p ? 'true' : 'false'); }
    if (p) clearTimeout(anim.timer);
    else anim.timer = setTimeout(tick, anim.stage === SNAPS.length - 1 ? HOLD_MS : STEP_MS);
  }

  function renderFrontier() {
    var box = document.getElementById('pfc-frontier');
    if (!box) return;
    box.replaceChildren();
    anim.groups = SNAPS.map(function () { return []; });
    var W = Math.max(320, Math.min(880, box.clientWidth)), H = 440;
    var M = { l: 56, r: 16, t: 12, b: 42 };
    var svg = frame(box, W, H, M, 'Intelligence Index versus cost per task with Pareto frontier lines every two months');
    var maxIq = Math.max.apply(null, models.map(function (m) { return m.iq; }));
    var maxCost = Math.max.apply(null, models.map(function (m) { return m.mcost; }));
    var minCost = Math.min.apply(null, models.map(function (m) { return m.mcost; }));
    var xd = [minCost * 0.66, maxCost * 1.5], yd = [0, Math.max(66, Math.ceil((maxIq + 3) / 10) * 10)];
    function X(v) { return M.l + (Math.log10(v) - Math.log10(xd[0])) / (Math.log10(xd[1]) - Math.log10(xd[0])) * (W - M.l - M.r); }
    function Y(v) { return H - M.b - (v - yd[0]) / (yd[1] - yd[0]) * (H - M.t - M.b); }

    var cs = []; for (var c0 = 0.001; c0 <= xd[1]; c0 *= 10) if (c0 >= xd[0]) cs.push(c0);
    cs.forEach(function (c) {
      svg.append(svgEl('line', { x1: X(c), x2: X(c), y1: M.t, y2: H - M.b, stroke: C.grid, 'stroke-width': 1 }));
      var lb = svgEl('text', { x: X(c), y: H - M.b + 18, 'text-anchor': 'middle', 'font-size': 11, fill: C.muted });
      lb.textContent = '$' + (c >= 1 ? c.toFixed(0) : c.toFixed(2)); svg.append(lb);
    });
    var qs = []; for (var q0 = 0; q0 <= yd[1] - 5; q0 += 10) qs.push(q0);
    qs.forEach(function (q) {
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
    function windowIndex(date) {
      for (var i = 0; i < SNAPS.length; i++) if (date <= SNAPS[i][0]) return i;
      return SNAPS.length - 1;
    }
    models.forEach(function (m) {
      var x = X(m.mcost), y = Y(m.iq);
      var wi = windowIndex(m.date);
      var g = svgEl('g', { opacity: 0.45 });
      dot(g, x, y, 3.5, C.snap[wi], m.open);
      svg.append(g);
      anim.groups[wi].push(g);
      pts.push({ x: x, y: y, snap: wi, rows: function () {
        var d1 = el('div', 'pfc-tt-name'); d1.textContent = m.name;
        var d2 = el('div'); var s = el('span', 'pfc-tt-val'); s.textContent = fmt$(m.mcost);
        d2.append(s, ' per task at Index ' + m.iq.toFixed(1));
        var d3 = el('div', null, m.creator + ' \u00b7 ' + (m.open ? 'open weights' : 'proprietary') + ' \u00b7 released ' + m.date + (m.retired ? ' \u00b7 retired' : ''));
        var d4 = el('div', 'pfc-tt-row'); var kd = el('span', 'pfc-tt-key'); kd.style.borderTopColor = C.snap[wi];
        d4.append(kd, 'in the ' + SNAPS[wi][1].replace('today', 'current') + ' window');
        return [d1, d2, d3, d4];
      }});
    });

    SNAPS.slice().reverse().forEach(function (snap, ri) {
      var i = SNAPS.length - 1 - ri;
      var snapDate = snap[0], snapLabel = snap[1];
      var sub = models.filter(function (m) { return m.date <= snapDate; }).map(function (m) {
        var c = costAt(m, snapDate);
        return { name: m.name, creator: m.creator, date: m.date, iq: m.iq, mcost: c, retired: m.retired, open: m.open, current: m.mcost };
      });
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
      var sg = svgEl('g', {});
      sg.append(svgEl('path', { d: d, fill: 'none', stroke: color, 'stroke-width': i === SNAPS.length - 1 ? 3 : 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
      svg.append(sg);
      anim.groups[i].push(sg);
      fr.forEach(function (p) {
        var x = X(p.mcost), y = Y(p.iq);
        dot(sg, x, y, 4, color, p.open);
        pts.push({ x: x, y: y, snap: i, rows: function () {
          var d1 = el('div', 'pfc-tt-name'); d1.textContent = p.name;
          var d2 = el('div', 'pfc-tt-row');
          var kd = el('span', 'pfc-tt-key'); kd.style.borderTopColor = color;
          var s = el('span', 'pfc-tt-val'); s.textContent = fmt$(p.mcost);
          d2.append(kd, s, ' at Index ' + p.iq.toFixed(1) + (Math.abs(p.current - p.mcost) > 1e-9 ? ' (price then; ' + fmt$(p.current) + ' now)' : ''));
          var d3 = el('div', null, 'Pareto frontier as of ' + snapLabel + ' \u00b7 ' + (p.open ? 'open weights' : 'proprietary') + ' \u00b7 released ' + p.date + (p.retired ? ' \u00b7 retired' : ''));
          return [d1, d2, d3];
        }});
      });
    });
    box.append(svg);
    attachHover(box, svg, pts);
    var ctl = el('div', 'pfc-controls');
    var stageLabel = el('span', 'pfc-stage'); stageLabel.id = 'pfc-frontier-stage';
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'pfc-btn'; btn.id = 'pfc-frontier-toggle';
    btn.addEventListener('click', function () { setPaused(!anim.paused); });
    ctl.append(stageLabel, btn);
    box.append(ctl);
    applyStage();
    setPaused(anim.paused);

    var legend = document.getElementById('pfc-frontier-legend');
    if (legend) {
      legend.replaceChildren();
      legend.append(el('span', 'pfc-legend-title', 'Pareto frontier as of'));
      SNAPS.slice().reverse().forEach(function (snap, ri) {
        var i = SNAPS.length - 1 - ri;
        var item = el('span', 'pfc-lk');
        var sw = el('span', 'pfc-swatch');
        sw.style.borderTopColor = C.snap[i];
        item.append(sw, el('span', null, snap[1]));
        legend.append(item);
      });
      var live = el('span', 'pfc-lk');
      var d1 = el('span', 'pfc-dot');
      d1.style.background = C.deemph; d1.style.borderColor = C.deemph;
      live.append(d1, el('span', null, 'proprietary'));
      var ret = el('span', 'pfc-lk');
      var d2 = el('span', 'pfc-dot');
      d2.style.background = C.surface; d2.style.borderColor = C.deemph;
      ret.append(d2, el('span', null, 'open weights'));
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
    var allRecs = []; TIERS.forEach(function (t) { (DATA.tier_cost[t] || []).forEach(function (r) { allRecs.push(r); }); });
    var firstRec = allRecs.map(function (r) { return r[0]; }).sort()[0] || DATA.updated;
    var x0d = new Date(firstRec + 'T00:00:00Z'); x0d.setUTCDate(1); x0d.setUTCMonth(x0d.getUTCMonth() - 1);
    var x1d = new Date(DATA.updated + 'T00:00:00Z');
    var x0 = x0d.getTime(), x1 = x1d.getTime();
    var maxRec = Math.max.apply(null, allRecs.map(function (r) { return r[1]; }));
    var yd = [0.005, Math.max(5, Math.pow(10, Math.ceil(Math.log10(maxRec))))];
    var ticks = []; var td = new Date(x0d.getTime());
    var monthsSpan = (x1d.getUTCFullYear() - x0d.getUTCFullYear()) * 12 + x1d.getUTCMonth() - x0d.getUTCMonth();
    var stepM = monthsSpan > 30 ? 6 : monthsSpan > 16 ? 3 : 2;
    var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    while (td.getTime() <= x1) { ticks.push([td.toISOString().slice(0, 10), MON[td.getUTCMonth()] + " '" + String(td.getUTCFullYear()).slice(2)]); td.setUTCMonth(td.getUTCMonth() + stepM); }
    function X(dstr) { return M.l + (Date.parse(dstr + 'T00:00:00Z') - x0) / (x1 - x0) * (W - M.l - M.r); }
    function Y(v) { return H - M.b - (Math.log10(v) - Math.log10(yd[0])) / (Math.log10(yd[1]) - Math.log10(yd[0])) * (H - M.t - M.b); }

    ticks.forEach(function (t) {
      svg.append(svgEl('line', { x1: X(t[0]), x2: X(t[0]), y1: M.t, y2: H - M.b, stroke: C.grid, 'stroke-width': 1 }));
      var lb = svgEl('text', { x: X(t[0]), y: H - M.b + 18, 'text-anchor': 'middle', 'font-size': 11, fill: C.muted });
      lb.textContent = t[1]; svg.append(lb);
    });
    var vs = []; for (var v0 = 0.01; v0 <= yd[1] / 2; v0 *= 10) vs.push(v0);
    vs.forEach(function (v) {
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
        dot(svg, x, y, 4, color, !!openByName[r[2]]);
        pts.push({ x: x, y: y, rows: function () {
          var d1 = el('div', 'pfc-tt-name'); d1.textContent = r[2];
          var d2 = el('div', 'pfc-tt-row');
          var kd = el('span', 'pfc-tt-key'); kd.style.borderTopColor = color;
          var s = el('span', 'pfc-tt-val'); s.textContent = fmt$(r[1]);
          d2.append(kd, s, ' new record, Index \u2265 ' + tier);
          var d3 = el('div', null, (r[4] ? r[4] + ' \u00b7 ' : 'released ' + r[0] + ' \u00b7 ') + 'Index ' + r[3].toFixed(1) + (openByName[r[2]] ? ' \u00b7 open weights' : ' \u00b7 proprietary') + (retiredByName[r[2]] ? ' \u00b7 retired' : ''));
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
      legend.append(el('span', 'pfc-legend-title', 'Intelligence Index'));
      TIERS.slice().reverse().forEach(function (tier, ri) {
        var i = TIERS.length - 1 - ri;
        var item = el('span', 'pfc-lk');
        var sw = el('span', 'pfc-swatch');
        sw.style.borderTopColor = C.ord[i];
        item.append(sw, el('span', null, '\u2265 ' + tier));
        legend.append(item);
      });
    }
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) anim.paused = true;
  function fmtDate(d) { var p = d.split('-'); var MON = ['January','February','March','April','May','June','July','August','September','October','November','December']; return MON[+p[1] - 1] + ' ' + (+p[2]) + ', ' + p[0]; }
  function renderTable() {
    var tb = document.getElementById('pfc-tier-table');
    if (!tb) return;
    tb.replaceChildren();
    function cell(html, cls) { var td = document.createElement('td'); if (cls) td.className = cls; td.append(html); return td; }
    function event(date, model, cost) {
      var w = el('div', 'pfc-ev');
      var a = el('div', 'pfc-ev-top'); var c = el('span', 'pfc-ev-cost'); c.textContent = fmt$(cost); a.append(c, ' \u00b7 ' + fmtDate(date));
      var b = el('div', 'pfc-ev-model'); b.textContent = model;
      w.append(a, b); return w;
    }
    TIERS.forEach(function (t) {
      var s = DATA.tier_summary[t];
      var tr = document.createElement('tr');
      tr.append(cell('\u2265 ' + t, 'pfc-td-tier'));
      if (s) {
        tr.append(cell(event(s.first_date, s.first_model, s.first_cost)));
        tr.append(cell(event(s.last_date, s.last_model, s.last_cost)));
        tr.append(cell(s.collapse + 'x', 'pfc-td-num'));
        tr.append(cell(s.halving_days ? '~' + s.halving_days + ' days' : '', 'pfc-td-num'));
      } else {
        var td = cell('not yet reached'); td.colSpan = 4; tr.append(td);
      }
      tb.append(tr);
    });
    document.querySelectorAll('.pfc-updated').forEach(function (e) { e.textContent = fmtDate(DATA.updated); });
    document.querySelectorAll('.pfc-count').forEach(function (e) { e.textContent = String(DATA.counts.total); });
  }
  function renderAdvances() {
    var ol = document.getElementById('pfc-advances');
    if (!ol || !DATA.advances) return;
    ol.replaceChildren();
    DATA.advances.slice(0, 20).forEach(function (a) {
      var li = document.createElement('li');
      var date = el('div', 'pfc-adv-date', fmtDate(a.date));
      var body = el('div');
      var head = el('div', 'pfc-adv-head'); head.textContent = a.model;
      head.append(el('span', 'pfc-adv-kind', a.kind));
      var text = el('div', 'pfc-adv-body');
      var s1 = (a.kind === 'price change' && a.previous_cost ? 'Price moved from ' + fmt$(a.previous_cost) + ' to ' + fmt$(a.cost_per_task) + ' per task' : 'Entered the frontier at ' + fmt$(a.cost_per_task) + ' per task')
             + ' at Index ' + a.intelligence_index.toFixed(1) + (a.owns_to - a.owns_from < 1 ? '; now the cheapest way to reach index ' + a.owns_to.toFixed(1) : '; now the cheapest way to reach index ' + a.owns_from.toFixed(1) + ' to ' + a.owns_to.toFixed(1)) + '. ';
      text.append(s1);
      if (a.records && a.records.length) { var r = el('span', 'pfc-adv-rec'); r.textContent = 'New cost record for index \u2265 ' + a.records.join(', \u2265 ') + '. '; text.append(r); }
      if (a.displaced && a.displaced.length) text.append('Displaced ' + a.displaced.join(', ') + '. ');
      text.append(a.open_weights ? 'Open weights.' : 'Proprietary.');
      body.append(head, text); li.append(date, body); ol.append(li);
    });
  }
  function renderAll() { if (!DATA) return; renderFrontier(); renderRecords(); renderTable(); renderAdvances(); }
  fetch(DATA_URL, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) {
    loadData(d);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderAll);
    else renderAll();
  }).catch(function (err) {
    var box = document.getElementById('pfc-frontier');
    if (box) box.textContent = 'Could not load the frontier data (' + err + ').';
  });
  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(renderAll, 150); });
})();
