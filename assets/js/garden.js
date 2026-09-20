(() => {
 const ownScript = document.querySelector('script[data-search-url]');
 document.addEventListener('keydown', e => {
   if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !e.target.isContentEditable) {
     e.preventDefault(); const input = document.querySelector('#garden-query');
     if (input) input.focus(); else location.href = ownScript.dataset.searchUrl;
   }
 });
 const article = document.querySelector('.post-single .post-content');
 if (article && document.querySelector('#copy-link')) {
   const progress = document.createElement('div'); progress.className = 'reading-progress'; progress.setAttribute('aria-hidden','true'); document.body.append(progress);
   let scheduled = false;
   const update = () => { const rect = article.getBoundingClientRect(); const distance = rect.height - innerHeight + 100; const value = distance > 0 ? Math.max(0, Math.min(1, (100 - rect.top)/distance)) : 1; progress.style.transform = `scaleX(${value})`; scheduled = false; };
   addEventListener('scroll', () => { if (!scheduled) { requestAnimationFrame(update); scheduled = true; } }, {passive:true}); addEventListener('resize', update); update();
   document.querySelector('#copy-link').addEventListener('click', async () => {
     const status = document.querySelector('#copy-status');
     try { await navigator.clipboard.writeText(location.href.split('#')[0]); status.textContent = '链接已复制'; } catch { status.textContent = '请复制浏览器地址栏中的链接'; }
   });
 }
 const search = document.querySelector('.garden-search');
 if (!search) return;
 const input = document.querySelector('#garden-query'), results = document.querySelector('#garden-results'), status = document.querySelector('#search-status');
 let index = null, failed = false;
 const normalize = value => String(value || '').toLocaleLowerCase();
 function render() {
   results.replaceChildren(); const query = input.value.trim();
   if (!query) { status.textContent = '输入关键词，搜索标题和正文。'; return; }
   if (failed) { status.textContent = '搜索索引暂时无法加载，请刷新重试，或前往文章归档。'; return; }
   if (!index) { status.textContent = '正在加载搜索索引…'; return; }
   const words = normalize(query).split(/\s+/);
   const hits = index.filter(item => words.every(word => normalize(item.title+' '+item.content).includes(word))).sort((a,b) => Number(normalize(b.title).includes(normalize(query))) - Number(normalize(a.title).includes(normalize(query))));
   status.textContent = hits.length ? `找到 ${hits.length} 条结果` : '没有找到匹配内容，试试更短的关键词。';
   hits.forEach(item => { const li = document.createElement('li'), link = document.createElement('a'), title = document.createElement('h2'), summary = document.createElement('p');
     const url = new URL(item.permalink, location.origin); if (!['http:','https:'].includes(url.protocol)) return;
     link.href = url.pathname + url.search; title.textContent = item.title; const content = String(item.content || ''); const offset = Math.max(0, normalize(content).indexOf(words[0])-35); summary.textContent = (offset ? '…' : '') + content.slice(offset, offset+160) + (content.length > offset+160 ? '…' : ''); link.append(title,summary); li.append(link); results.append(li);
   });
 }
 input.addEventListener('input', render);
 fetch(search.dataset.index).then(r => { if (!r.ok) throw new Error('Index unavailable'); return r.json(); }).then(data => { index = Array.isArray(data) ? data : []; render(); }).catch(() => { failed = true; render(); });
})();
