/*
  UNDERGROUND EMPIRE website
  DEMO MODE works locally in this browser.
  For shared permanent uploads on GitHub Pages, configure Supabase in the section below.
*/
const SUPABASE_URL = ""; // Paste your Supabase Project URL here
const SUPABASE_ANON_KEY = ""; // Paste your Supabase anon/public key here
const STORAGE_BUCKET = "media";
const DEMO_USER = "admin";
const DEMO_PASS = "Empire@2026";

let supabaseClient = null;
let loggedIn = false;
let allMedia = [];
let demoMedia = loadDemoMedia();
const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase);
if (isSupabaseConfigured) supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sampleMedia = [
 {id:"sample1",type:"songs",title:"Dark Side",artist:"Bohee Vexer",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"sample2",type:"songs",title:"Underground",artist:"Flexer",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"sample3",type:"songs",title:"Real Ones",artist:"Bohee Vexer & Flexer",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"sample4",type:"songs",title:"No Limits",artist:"Flexer",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"sample5",type:"songs",title:"Lost Vibes",artist:"Bohee Vexer",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"video1",type:"videos",title:"Underground Empire",artist:"Official Video",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=80",url:"",sample:true},
 {id:"video2",type:"videos",title:"No Limits",artist:"Official Video",cover:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",url:"",sample:true},
 {id:"video3",type:"videos",title:"Dark Side",artist:"Official Video",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=80",url:"",sample:true},
 {id:"video4",type:"videos",title:"Real Ones",artist:"Official Video",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=600&q=80",url:"",sample:true},
 {id:"photo1",type:"photos",title:"Underground Portrait",artist:"Photo Gallery",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"photo2",type:"photos",title:"City Nights",artist:"Photo Gallery",cover:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"photo3",type:"photos",title:"Studio Life",artist:"Photo Gallery",cover:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"photo4",type:"photos",title:"Live Crowd",artist:"Photo Gallery",cover:"https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=500&q=80",url:"",sample:true},
 {id:"photo5",type:"photos",title:"Empire",artist:"Photo Gallery",cover:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=500&q=80",url:"",sample:true}
];

function loadDemoMedia(){ try{return JSON.parse(localStorage.getItem("ue_demo_media")||"[]");}catch{return [];} }
function saveDemoMedia(){ try{localStorage.setItem("ue_demo_media",JSON.stringify(demoMedia));}catch(e){showToast("Browser storage is full. Connect Supabase for large files.");} }
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function mediaIcon(type){return type==="songs"?"♫":type==="videos"?"▶":"▧";}
function placeholder(title){return `<div class="cover-placeholder"><span>UNDERGROUND</span><em>EMPIRE</em><small style="font:700 8px Inter;letter-spacing:2px;margin-top:10px">REAL MUSIC · NO LIMITS</small></div>`;}
function currentMedia(){return [...demoMedia,...sampleMedia];}

async function fetchMedia(){
  if(supabaseClient){
    try{
      const {data,error}=await supabaseClient.from("media").select("*").order("created_at",{ascending:false});
      if(error) throw error;
      allMedia=[...(data||[]).map(row=>({...row,cover:row.cover_url||row.file_url,url:row.file_url,artist:row.artist||"Underground Empire"})),...sampleMedia];
    }catch(e){console.error(e);allMedia=currentMedia();showToast("Could not load cloud media. Check Supabase setup.");}
  } else allMedia=currentMedia();
  renderAll();
}
function cardHtml(item){
  const cover=item.cover||"";
  const image=cover?`<img src="${escapeHtml(cover)}" alt="${escapeHtml(item.title)} cover" loading="lazy" onerror="this.remove()">`:"";
  const preview=item.type==="videos"&&item.url?`<video src="${escapeHtml(item.url)}" controls preload="metadata"></video>`:"";
  const play=item.type==="songs"&&item.url?`<button class="play-btn" data-play="${escapeHtml(item.id)}">▶ Play</button>`:"";
  const download=item.url?`<a class="download-btn" href="${escapeHtml(item.url)}" download="${escapeHtml(item.title)}">↓ Download</a>`:`<span class="duration">${item.sample?"Preview artwork":"Uploaded media"}</span>`;
  return `<article class="media-card" data-title="${escapeHtml((item.title+" "+item.artist).toLowerCase())}">
    <a class="cover" href="${item.type==="photos"&&item.url?escapeHtml(item.url):"#"+item.type}" ${item.type==="photos"&&item.url?'target="_blank" rel="noopener"':""}>${image}${!cover?placeholder(item.title):""}${item.type==="videos"&&!preview?'<span class="play">▶</span>':""}</a>
    ${preview}
    <h3 title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3><div class="artist">${escapeHtml(item.artist||"Underground Empire")}</div>
    <div class="card-actions">${play}${download}</div>
  </article>`;
}
function renderSection(type,elementId,limit){
  const grid=document.getElementById(elementId);
  const filtered=allMedia.filter(m=>m.type===type);
  grid.innerHTML=filtered.slice(0,limit).map(cardHtml).join("")||`<p class="muted">No ${type} uploaded yet.</p>`;
}
function renderAll(){
  const query=(document.getElementById("search").value||"").trim().toLowerCase();
  const base=allMedia.filter(m=>!query||(m.title+" "+(m.artist||"")).toLowerCase().includes(query));
  document.getElementById("songGrid").innerHTML=base.filter(m=>m.type==="songs").slice(0,5).map(cardHtml).join("")||"";
  document.getElementById("videoGrid").innerHTML=base.filter(m=>m.type==="videos").slice(0,4).map(cardHtml).join("")||"";
  document.getElementById("photoGrid").innerHTML=base.filter(m=>m.type==="photos").slice(0,5).map(cardHtml).join("")||"";
  document.getElementById("emptyState").classList.toggle("hidden",base.length>0);
  renderManage();
}
function renderManage(){
 const list=document.getElementById("manageList");if(!list)return;
 const uploaded=allMedia.filter(m=>!m.sample);
 list.innerHTML=uploaded.length?uploaded.map(m=>`<div class="manage-item"><img class="mini-thumb" src="${escapeHtml(m.cover||"")}" onerror="this.style.visibility='hidden'"><div><b>${escapeHtml(m.title)}</b><small>${escapeHtml(m.type)} · ${escapeHtml(m.artist||"Underground Empire")}</small></div><button class="delete-btn" data-delete="${escapeHtml(m.id)}">Delete</button></div>`).join(""):'<p class="muted">Your uploads will appear here.</p>';
}
function showToast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.remove("hidden");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>el.classList.add("hidden"),3500);}
function openLogin(){document.getElementById("loginModal").classList.remove("hidden");document.getElementById("username").focus();}
function closeLogin(){document.getElementById("loginModal").classList.add("hidden");}
function setAdmin(on){loggedIn=on;document.getElementById("adminPanel").classList.toggle("hidden",!on);if(on){document.getElementById("adminPanel").scrollIntoView({behavior:"smooth",block:"start"});renderManage();}}
document.getElementById("loginOpen").addEventListener("click",openLogin);
document.getElementById("loginClose").addEventListener("click",closeLogin);
document.getElementById("loginModal").addEventListener("click",e=>{if(e.target.id==="loginModal")closeLogin();});
document.getElementById("search").addEventListener("input",renderAll);
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.querySelector(".topbar nav").classList.toggle("open"));
document.querySelectorAll(".topbar nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".topbar nav").classList.remove("open")));
document.querySelectorAll("[data-view]").forEach(btn=>btn.addEventListener("click",()=>{const type=btn.dataset.view;document.getElementById(type).scrollIntoView({behavior:"smooth"});}));

document.getElementById("loginForm").addEventListener("submit",async e=>{
 e.preventDefault();const user=document.getElementById("username").value.trim();const pass=document.getElementById("password").value;const msg=document.getElementById("loginMessage");msg.textContent="Checking login…";
 if(supabaseClient){
   const {data,error}=await supabaseClient.auth.signInWithPassword({email:user,password:pass});
   if(error){msg.textContent="Login failed. Check your Supabase admin email and password.";return;}
   closeLogin();setAdmin(true);document.getElementById("storageWarning").textContent="Connected mode: media uploads are stored in your Supabase Storage bucket.";document.getElementById("demoNote").classList.add("hidden");showToast("Admin login successful.");return;
 }
 if(user===DEMO_USER&&pass===DEMO_PASS){msg.textContent="";closeLogin();setAdmin(true);showToast("Demo login successful.");}
 else msg.textContent="Incorrect username or password.";
});
document.getElementById("logoutBtn").addEventListener("click",async()=>{if(supabaseClient)await supabaseClient.auth.signOut();setAdmin(false);showToast("Logged out.");});

async function fileToDataUrl(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);});}
async function uploadToSupabase(file,path){
 const {error}=await supabaseClient.storage.from(STORAGE_BUCKET).upload(path,file,{upsert:false,contentType:file.type});
 if(error)throw error;
 const {data}=supabaseClient.storage.from(STORAGE_BUCKET).getPublicUrl(path);
 return data.publicUrl;
}
document.getElementById("uploadForm").addEventListener("submit",async e=>{
 e.preventDefault();if(!loggedIn){showToast("Please log in first.");return;}
 const type=document.getElementById("mediaType").value,title=document.getElementById("mediaTitle").value.trim(),artist=document.getElementById("artist").value.trim()||"Underground Empire",file=document.getElementById("mediaFile").files[0],coverFile=document.getElementById("coverFile").files[0],msg=document.getElementById("uploadMessage");
 if(!file)return;
 const maxBytes=type==="videos"?300*1024*1024:50*1024*1024;
 if(file.size>maxBytes){msg.textContent=type==="videos"?"Video exceeds 300 MB demo limit.":"File exceeds 50 MB limit.";return;}
 msg.textContent="Uploading…";
 try{
   let item;
   if(supabaseClient){
     const clean=(name)=>name.replace(/[^a-zA-Z0-9._-]/g,"_");
     const path=`${type}/${Date.now()}-${clean(file.name)}`;
     const url=await uploadToSupabase(file,path);
     let coverUrl="";
     if(coverFile){coverUrl=await uploadToSupabase(coverFile,`covers/${Date.now()}-${clean(coverFile.name)}`);}
     const row={type,title,artist,file_url:url,cover_url:coverUrl||null,file_name:file.name};
     const {data,error}=await supabaseClient.from("media").insert(row).select().single();
     if(error)throw error;
     item={...data,url:data.file_url,cover:data.cover_url||data.file_url};
   }else{
     if(file.size>8*1024*1024){msg.textContent="Demo mode supports files up to 8 MB. Connect Supabase for larger uploads.";return;}
     const url=await fileToDataUrl(file),cover=coverFile?await fileToDataUrl(coverFile):(file.type.startsWith("image/")?url:"");
     item={id:"demo-"+Date.now(),type,title,artist,url,cover,fileName:file.name,sample:false};
     demoMedia.unshift(item);saveDemoMedia();
   }
   allMedia.unshift(item);msg.textContent="Upload complete!";e.target.reset();renderAll();showToast("Media uploaded successfully.");
 }catch(err){console.error(err);msg.textContent="Upload failed. "+(err.message||"Check your backend settings.");}
});
document.addEventListener("click",async e=>{
 const play=e.target.closest("[data-play]");
 if(play){const item=allMedia.find(m=>m.id===play.dataset.play);if(item?.url){const audio=new Audio(item.url);audio.play().catch(()=>showToast("Playback could not start."));}return;}
 const del=e.target.closest("[data-delete]");if(!del)return;
 if(!loggedIn||!confirm("Delete this uploaded media?"))return;
 const id=del.dataset.delete;
 if(supabaseClient){
   const item=allMedia.find(m=>String(m.id)===String(id));
   const {error}=await supabaseClient.from("media").delete().eq("id",id);
   if(error){showToast("Delete failed: "+error.message);return;}
   allMedia=allMedia.filter(m=>String(m.id)!==String(id));
 }else{demoMedia=demoMedia.filter(m=>m.id!==id);saveDemoMedia();allMedia=allMedia.filter(m=>m.id!==id);}
 renderAll();showToast("Media deleted.");
});
document.getElementById("storageWarning").textContent=isSupabaseConfigured?"Supabase configured: use your secured admin login for shared online media.":"Demo mode: files are saved only in this browser. Connect Supabase for shared, permanent online uploads.";
fetchMedia();
