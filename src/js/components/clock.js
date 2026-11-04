/* ---------- live clock in topbar ---------- */
function updateClock(){
  const now = new Date();
  const opts = { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' };
  const str = now.toLocaleDateString('pt-PT', opts);
  const el = document.getElementById('clock');
  if(el) el.textContent = 'Praia, Cabo Verde · ' + str;
}
updateClock();
setInterval(updateClock, 30000);
