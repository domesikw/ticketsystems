// ===== Dark / Light mode =====
function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
else document.body.classList.remove('dark');

// ===== Ticket logic =====
const webhookURL = "https://discord.com/api/webhooks/1449176327721586793/X_p-jjcgQ-0MBPPu-i-PoMVm1GMJl1haOu1keQhqrLJLus_NeN-seQ6siYBuGQdRA08-"; // sem dej Discord Webhook URL

const form = document.getElementById('ticketForm');
if(form){
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const user = document.getElementById('user').value;
    const type = document.getElementById('type').value;
    const msg = document.getElementById('msg').value;

    const ticket = {user, type, msg, time:new Date().toLocaleString()};
    
    // uloží do localStorage
    let tickets = JSON.parse(localStorage.getItem('tickets')||"[]");
    tickets.push(ticket);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    // odeslání na Discord webhook
    await fetch(webhookURL, {
      method:"POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        username: user,
        content: `**Ticket:** ${type}\n**Uživatel:** ${user}\n**Zpráva:** ${msg}`
      })
    });

    alert(':white_check_mark: Ticket odeslán!');
    form.reset();
  });
}

// ===== Admin panel =====
const ticketsContainer = document.getElementById('ticketsContainer');
if(ticketsContainer){
  let tickets = JSON.parse(localStorage.getItem('tickets')||"[]");
  tickets.forEach(t=>{
    const div = document.createElement('div');
    div.classList.add('ticket');
    div.innerHTML = `<strong>${t.type}</strong> | ${t.user} | ${t.time}<p>${t.msg}</p>`;
    ticketsContainer.appendChild(div);
  });
}
