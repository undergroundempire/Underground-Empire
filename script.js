const sampleSongs=[
 {title:'Dark Side',artist:'Bohee Vexer',duration:'3:45',tone:'blue'},
 {title:'Underground',artist:'Flexer',duration:'4:12',tone:'red'},
 {title:'Real Ones',artist:'Bohee Vexer & Flexer',duration:'3:28',tone:'gray'},
 {title:'No Limits',artist:'Flexer',duration:'3:56',tone:'orange'},
 {title:'Lost Vibes',artist:'Bohee Vexer',duration:'3:21',tone:'blue'}
];
const sampleVideos=[
 {title:'Underground Empire (Official Video)',duration:'4:32',tone:'blue'},
 {title:'No Limits (Official Video)',duration:'3:56',tone:'orange'},
 {title:'Dark Side (Official Video)',duration:'3:21',tone:'teal'},
 {title:'Real Ones (Official Video)',duration:'3:47',tone:'blue'}
];
const samplePhotos=[
 {title:'Underground Portrait',tone:'gray'},{title:'City Lights',tone:'blue'},
 {title:'Studio Session',tone:'teal'},{title:'Live Show',tone:'red'},
 {title:'Real Ones',tone:'orange'}
];
let songs=[...sampleSongs], videos=[...sampleVideos], photos=[...samplePhotos];
const $=s=>document.querySelector(s);
function cover(item,video=false,photo=false){const div=document.createElement('div');div.className='cover';div.style.background=background(item.tone);if(item.url){const img=document.createElement('img');img.src=item.url;img.alt=item.title;div.append(img)}const text=document.createElement('span');text.className='cover-text '+(item.tone==='red'?'red':'');text.textContent=item.title.toUpperCase().replace(' (OFFICIAL VIDEO)','');div.append(text);if(video){const play=document.createElement('span');play.className='play';play.textContent='▶';div.append(play)}return div}
function background(tone){return ({red:'linear-gradient(135deg,#4a080e,#080b10 52%,#e20b20)',blue:'linear-gradient(135deg,#14313d,#05080d 60%,#425e70)',gray:'linear-gradient(135deg,#40474b,#080b10 55%,#747b80)',orange:'linear-gradient(135deg,#d2783b,#17151a 55%,#06090d)',teal:'linear-gradient(135deg,#0b5362,#05080d 60%,#16788b)'})[tone]||background('blue')}
function makeCard(item,type){const card=document.createElement('article');card.className='media-card';card.dataset.search=(item.title+' '+(item.artist||'')).toLowerCase();card.append(cover(item,type==='video',type==='photo'));const title=document.createElement('div');title.className='card-title';title.textContent=item.title;card.append(title);if(item.artist){const artist=document.createElement('div');artist.className='card-sub';artist.textContent=item.artist;card.append(artist)}if(item.duration){const dur=document.createElement('div');dur.className='duration';dur.innerHTML='<i>▶</i> '+item.duration;card.append(dur)}if(item.url&&type==='song'){card.addEventListener('click',()=>{const audio=new Audio(item.url);audio.play().catch(()=>toast('Browser could not play this audio file.'))})}else if(item.url&&type==='video'){card.addEventListener('click',()=>{const win=window.open('','_blank');if(win)win.document.write('<video controls autoplay style="width:100%;height:100%;background:#000" src="'+item.url+'"></video>')})}else if(type==='photo'&&item.url){card.addEventListener('click',()=>window.open(item.url,'_blank'))}return card}
function render(){const sg=$('#songGrid'),vg=$('#videoGrid'),pg=$('#photoGrid');sg.replaceChildren();vg.replaceChildren();pg.replaceChildren();songs.forEach(x=>sg.append(makeCard(x,'song')));videos.forEach(x=>vg.append(makeCard(x,'video')));photos.forEach(x=>pg.append(makeCard(x,'photo')));renderSide();renderManage();filterCards()}
function sideItem(item){const row=document.createElement('div');row.className='side-item';const thumb=document.createElement('div');thumb.className='side-thumb';thumb.style.background=background(item.tone);if(item.url){const img=document.createElement('img');img.src=item.url;thumb.append(img)}else thumb.textContent=item.title.toUpperCase();row.append(thumb);const info=document.createElement('div');info.className='side-info';info.textContent=item.title;const sub=document.createElement('span');sub.textContent=item.artist||item.duration||'Exclusive gallery';info.append(sub);row.append(info);const arrow=document.createElement('span');arrow.className='arrow';arrow.textContent='›';row.append(arrow);return row}
function renderSide(){const s=$('#sideSongs'),v=$('#sideVideos'),p=$('#sidePhotos');s.replaceChildren();v.replaceChildren();p.replaceChildren();songs.slice(0,3).forEach(x=>s.append(sideItem(x)));videos.slice(0,3).forEach(x=>v.append(sideItem(x)));photos.slice(0,6).forEach(x=>p.append(cover(x,false,true)))}
function renderManage(){const root=$('#manageList');if(!root)return;root.replaceChildren();[['Songs',songs],['Videos',videos],['Photos',photos]].forEach(([label,arr])=>{const h=document.createElement('h3');h.textContent=label+' ('+arr.length+')';root.append(h);arr.forEach((item,i)=>{const row=document.createElement('p');row.textContent=item.title+' ';const b=document.createElement('button');b.className='outline';b.textContent='Remove';b.onclick=()=>{arr.splice(i,1);render()};row.append(b);root.append(row)})})}
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)}
$('#year').textContent=new Date().getFullYear();document.querySelectorAll('.year').forEach(x=>x.textContent=new Date().getFullYear());
$('#menuToggle').addEventListener('click',()=>$('#mainNav').classList.toggle('open'));
$('#mainNav').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('open')));
$('#adminBtn').addEventListener('click',()=>$('#loginModal').classList.add('open'));$('#closeLogin').addEventListener('click',()=>$('#loginModal').classList.remove('open'));
$('#loginModal').addEventListener('click',e=>{if(e.target===$('#loginModal'))$('#loginModal').classList.remove('open')});
$('#loginForm').addEventListener('submit',e=>{e.preventDefault();if($('#username').value==='admin'&&$('#password').value==='empire123'){$('#loginModal').classList.remove('open');$('#adminPanel').classList.add('open');$('#adminPanel').scrollIntoView({behavior:'smooth'});$('#loginError').textContent=''}else $('#loginError').textContent='Incorrect login. Demo: admin / empire123'});
$('#closeAdmin').addEventListener('click',()=>$('#adminPanel').classList.remove('open'));
document.querySelectorAll('.admin-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.admin-tabs button').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');document.querySelectorAll('.tab-content').forEach(x=>x.classList.add('hidden'));$('#'+btn.dataset.tab+'Tab').classList.remove('hidden')}));
function handleUpload(input,arr,type){input.addEventListener('change',()=>{const list=[...input.files];if(!list.length)return;list.forEach(file=>{const url=URL.createObjectURL(file);const title=file.name.replace(/\.[^.]+$/,'').replace(/[_-]/g,' ');const item={title,artist:type==='song'?'Uploaded locally':'',duration:type==='song'?'Local file':'',tone:['red','blue','teal','orange','gray'][arr.length%5],url,local:true};arr.unshift(item)});render();$('#uploadStatus').textContent=list.length+' file(s) added for this browser preview. They are not uploaded to GitHub or saved for other visitors.';toast('Local preview added. Read README for permanent uploads.');input.value=''})}
handleUpload($('#songUpload'),songs,'song');handleUpload($('#videoUpload'),videos,'video');handleUpload($('#photoUpload'),photos,'photo');
$('#searchInput').addEventListener('input',filterCards);function filterCards(){const q=$('#searchInput').value.toLowerCase().trim();document.querySelectorAll('.media-card').forEach(card=>{card.style.display=(!q||card.dataset.search.includes(q))?'':'none'})}
$('#saveSettings').addEventListener('click',()=>{document.title=$('#siteTitle').value+' | '+$('#artistName').value;toast('Display settings applied for this page session. Edit index.html to make them permanent.');$('#settingsStatus').textContent='Applied to this page session only.'});
render();
