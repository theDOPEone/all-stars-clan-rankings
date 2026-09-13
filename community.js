let communityState=null,communityLoading=false,discordPresetState=null;
function communityPlayer(tag){return communityState?.players?.find(x=>x.playerTag.toUpperCase()===String(tag||'').toUpperCase())}
function communityPanel(){
  const box=$('communityBoard');if(!box||box.dataset.ready)return;
  box.dataset.ready='true';
  box.innerHTML=`<style>
    .community-board{font-size:12px}.community-board h3{color:#ffe397;margin:0 0 10px}.community-board p{line-height:1.6}
    .community-columns{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:stretch}.community-columns>div{display:flex;flex-direction:column;min-height:0}.community-card{padding:14px;background:#092b46;border:1px solid #285775;border-radius:8px;margin-bottom:12px}
    .community-columns>div:first-child>.community-card:last-child{flex:1;display:flex;flex-direction:column;min-height:0}.community-columns>div:first-child>.community-card:last-child .community-list{flex:1;max-height:none;min-height:310px}.community-score{font-size:26px;font-weight:900;color:#ffe397}.community-list{max-height:310px;overflow:auto}.community-entry{padding:10px;border-bottom:1px solid #22485f;line-height:1.6;overflow-wrap:anywhere}.community-entry:last-child{border:0}
    .community-entry strong{color:#ffe397}.community-entry textarea,.community-board input,.community-board select,.community-board textarea{width:100%;box-sizing:border-box;margin:5px 0 8px}
    .community-board textarea{min-height:75px;padding:9px;color:#d9ebfa;background:#08273f;border:1px solid #38617a;border-radius:5px}.community-board button{margin:4px 5px 4px 0}
    .community-form{display:grid;grid-template-columns:1fr 1fr;gap:10px}.community-form .wide{grid-column:1/-1}.community-status{padding:8px 0;color:#93e1c3}.community-board details>summary{cursor:pointer;color:#ffe397;font-weight:800;margin-bottom:12px}
    .community-card-title-row{display:flex;align-items:center;gap:8px;margin-bottom:10px}.community-card-title-row h3{margin:0}.community-points-help-wrap{position:relative;display:inline-flex}.community-points-info{width:23px!important;height:23px!important;min-width:23px;padding:0!important;margin:0!important;border-radius:50%!important;border:1px solid #e5b83f!important;background:linear-gradient(180deg,#174b70,#0a2f4d)!important;color:#ffe48c!important;font-weight:1000!important;font-size:13px!important;line-height:1!important;display:grid!important;place-items:center!important;cursor:pointer;box-shadow:0 3px 8px rgba(0,0,0,.28)}
    .community-points-info:hover,.community-points-info:focus-visible{background:linear-gradient(180deg,#8d6815,#4f3908)!important;box-shadow:0 0 0 2px rgba(239,200,94,.14),0 5px 12px rgba(0,0,0,.35)}
    .community-points-help{display:none;position:absolute;left:50%;top:calc(100% + 9px);z-index:80;width:min(430px,78vw);transform:translateX(-18%);padding:14px 15px;border:1px solid rgba(239,200,94,.72);border-radius:9px;background:linear-gradient(180deg,#0c3554,#071f35);box-shadow:0 15px 32px rgba(0,0,0,.48),0 0 18px rgba(239,200,94,.09);color:#d9edf8;text-align:left}.community-points-help.show{display:block}.community-points-help:before{content:'';position:absolute;top:-7px;left:18%;width:12px;height:12px;transform:rotate(45deg);background:#0c3554;border-left:1px solid rgba(239,200,94,.72);border-top:1px solid rgba(239,200,94,.72)}
    .community-points-help-title{font-size:16px;font-weight:1000;color:#ffe58e;margin:0 0 10px;text-shadow:0 0 9px rgba(239,200,94,.18)}.community-points-rule{display:grid;grid-template-columns:92px 1fr;gap:9px;padding:8px 0;border-bottom:1px solid rgba(100,156,190,.18);line-height:1.45}.community-points-rule:last-of-type{border-bottom:0}.community-points-rule .label{font-weight:1000}.community-points-rule.arena .label{color:#ffe28a}.community-points-rule.war .label{color:#76d2ff}.community-points-rule.donations .label{color:#8ee7b7}.community-points-help-notes{margin-top:10px;padding-top:9px;border-top:1px solid rgba(239,200,94,.22);font-size:11px;line-height:1.55;color:#9ec3d8}.community-points-help-notes b{color:#f5d46d}.community-points-app-badge{display:inline-block;margin-top:8px;padding:4px 7px;border:1px solid rgba(239,200,94,.42);border-radius:999px;background:rgba(108,78,11,.24);color:#ffe38b;font-size:10px;font-weight:900;letter-spacing:.04em}
    @keyframes communityGoldShimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}.community-score{display:inline-block;background:linear-gradient(90deg,#e7ad26 0%,#fff0a5 18%,#d99d18 38%,#fff8d0 55%,#e7ad26 76%,#b97a08 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;animation:communityGoldShimmer 3s linear infinite;text-shadow:0 0 13px rgba(239,200,94,.16)}
    .community-player-link{appearance:none!important;-webkit-appearance:none!important;border:0!important;background:none!important;padding:0!important;margin:0!important;color:#ffe397!important;font:inherit!important;font-weight:900!important;cursor:pointer!important;text-align:left!important}.community-player-link:hover,.community-player-link:focus-visible{color:#fff2aa!important;text-decoration:underline;text-underline-offset:2px;text-shadow:0 0 9px rgba(239,200,94,.34)}
    @media(min-width:761px){.community-board{font-size:14px}.community-board h3{font-size:16px}.community-card{padding:16px}.community-entry{font-size:13.5px;line-height:1.65;padding:11px}.community-entry .muted,.community-card>.muted{font-size:11.5px!important;line-height:1.55!important}.community-score{font-size:30px}.community-points-help{font-size:13px}.community-points-help-notes{font-size:12px}}
    @media(max-width:760px){.community-columns,.community-form{grid-template-columns:1fr}.community-form .wide{grid-column:auto}.community-points-help{left:0;transform:none;width:min(360px,82vw)}.community-points-help:before{left:8px}}
    @media(prefers-reduced-motion:reduce){.community-score{animation:none;background-position:45% 50%}}
  </style>
  <div id="communityMessage" role="status" class="community-status"></div>
  <div class="community-columns"><div>
    <div class="community-card"><div class="community-card-title-row"><h3>My clan points</h3><div class="community-points-help-wrap"><button id="communityPointsInfo" class="community-points-info" type="button" aria-label="How do you earn points?" aria-expanded="false" onclick="toggleCommunityPointsHelp(event)">i</button><div id="communityPointsHelp" class="community-points-help" role="dialog" aria-label="How do you earn points?" onclick="event.stopPropagation()"><div class="community-points-help-title">How do you earn points?</div><div id="communityPointsHelpBody"></div></div></div></div><div id="myCommunityScore"></div><p id="weeklyPointsRule" class="hidden"></p></div>
    <div class="community-card"><h3>Missions</h3><div id="communityMissions"></div></div>
    <div class="community-card"><h3>My points history</h3><div id="communityLedger" class="community-list"></div></div>
  </div><div>
    <div class="community-card"><h3>Weekly Battle Arena</h3><div id="communityArenaLeaders" class="community-list"></div><p class="muted">Ranked by weekly wins, win rate, then Arena Rating.</p></div>
    <div class="community-card"><h3>Battle Arena records</h3><div id="communityWins" class="community-list"></div></div>
    <div class="community-card"><h3>Points leaderboard</h3><div id="communityLeaders" class="community-list"></div></div>
  </div></div>
  `;
}
async function communityApi(path,body){
  const r=await nativeFetch(path,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json'}:{},body:body?JSON.stringify(body):undefined});
  const data=await r.json();if(!r.ok)throw new Error(data.error||'This action could not be completed.');return data;
}
function communityMessage(text){if($('communityMessage'))$('communityMessage').textContent=text;document.querySelectorAll('.owner-community-status').forEach(x=>x.textContent=text)}
function toggleCommunityPointsHelp(event){
  event?.preventDefault();event?.stopPropagation();
  const popup=$('communityPointsHelp'),button=$('communityPointsInfo');if(!popup||!button)return;
  const open=!popup.classList.contains('show');popup.classList.toggle('show',open);button.setAttribute('aria-expanded',open?'true':'false');
}
function closeCommunityPointsHelp(){const popup=$('communityPointsHelp'),button=$('communityPointsInfo');popup?.classList.remove('show');button?.setAttribute('aria-expanded','false')}
function communityPointsHelpHtml(rules){
  return `<div class="community-points-rule arena"><div class="label">⚔ Battle Arena</div><div><b>${rules.battleWinPoints} points</b> for a win or <b>${rules.battleLossPoints}</b> for a loss. Finish the run: <b>+${rules.arenaRunCompletionPoints}</b>; 3+ wins: <b>+${rules.arenaThreeWinBonus}</b>; perfect run: <b>+${rules.arenaPerfectRunBonus}</b>.</div></div>
  <div class="community-points-rule war"><div class="label">🏆 Clan War</div><div><b>${rules.perWarDeck} points</b> per finished battle, detected live from the battle log.</div></div>
  <div class="community-points-rule donations"><div class="label">🎁 Donations</div><div><b>1 point per ${rules.donationsPerPoint}</b>, up to <b>${rules.donationCap} points/week</b>.</div></div>
  <div class="community-points-help-notes"><div>⏱ <b>War Battle rewards</b> arrive from the official battle log, normally within about two minutes.</div><div style="margin-top:5px">📅 <b>Donation rewards</b> cover Sunday–Saturday and arrive after the week closes.</div><span class="community-points-app-badge">★ ALL STARS APP POINTS</span></div>`;
}
function communityProfileName(p,i){
  const name=`${i+1}. ${esc(p.name)}`,tag=String(p.playerTag||'').trim();
  if(!tag||tag.toUpperCase().startsWith('CLAN:'))return `<strong>${name}</strong>`;
  return `<button type="button" class="community-player-link" title="Open ${esc(p.name)}'s profile" onclick="openPlayer(decodeURIComponent('${encodeURIComponent(tag)}'))">${name}</button>`;
}
document.addEventListener('click',event=>{const wrap=document.querySelector('.community-points-help-wrap');if(wrap&&!wrap.contains(event.target))closeCommunityPointsHelp()});
async function loadCommunity(){
  if(communityLoading||(!isMemberSignedIn()&&!isManager()))return;communityLoading=true;communityPanel();
  try{
    communityState=await communityApi('/api/member-zone');
    const {players,missions,claims,ledger,rules}=communityState,mine=communityPlayer(memberAuthState?.playerTag||authState?.playerTag),manager=isManager();
    $('myCommunityScore').innerHTML=mine?`<div class="community-score">${mine.points.toLocaleString()} points</div><div>${esc(mine.name)} · Arena ${mine.arenaRating} · ${mine.wins}-${mine.losses} · streak ${mine.currentStreak} · best ${mine.bestStreak}</div>`:'<div class="muted">Sign in with a linked member account to see your personal balance.</div>';
    $('weeklyPointsRule').textContent=`Battle Arena: ${rules.battleWinPoints} points for a win or ${rules.battleLossPoints} for a loss. Finish the run: +${rules.arenaRunCompletionPoints}; 3+ wins: +${rules.arenaThreeWinBonus}; perfect run: +${rules.arenaPerfectRunBonus}. Clan War: ${rules.perWarDeck} points per finished battle, detected live from the battle log. Donations: 1 point per ${rules.donationsPerPoint} (up to ${rules.donationCap} points/week).`;
    if($('communityPointsHelpBody'))$('communityPointsHelpBody').innerHTML=communityPointsHelpHtml(rules);
    const row=(p,i,metric)=>`<div class="community-entry">${communityProfileName(p,i)}<span style="float:right">${p[metric].toLocaleString()} ${metric==='wins'?'wins':'points'}</span></div>`;
    const arenaRow=(p,i)=>{const games=Number(p.weeklyWins||0)+Number(p.weeklyLosses||0),rate=games?Math.round(Number(p.weeklyWins||0)*100/games):0;return `<div class="community-entry">${communityProfileName(p,i)}<span style="float:right">${p.weeklyWins}-${p.weeklyLosses} · ${rate}%</span><div class="muted">Arena ${p.arenaRating} · streak ${p.currentStreak} · best ${p.bestStreak}</div></div>`};
    $('communityArenaLeaders').innerHTML=(communityState.arenaLeaderboard||[]).length?(communityState.arenaLeaderboard||[]).map(arenaRow).join(''):'<p class="muted">No Arena battles recorded this week yet.</p>';
    $('communityWins').innerHTML=[...players].sort((a,b)=>b.wins-a.wins||b.arenaRating-a.arenaRating||a.name.localeCompare(b.name)).map((p,i)=>`<div class="community-entry">${communityProfileName(p,i)}<span style="float:right">${p.wins}-${p.losses}</span><div class="muted">Arena ${p.arenaRating} · best streak ${p.bestStreak}</div></div>`).join('');
    $('communityLeaders').innerHTML=players.map((p,i)=>row(p,i,'points')).join('');
    // Preserve unsent proof while the dashboard refreshes in the background.
    const proofs=new Map([...document.querySelectorAll('[data-mission-proof]')].map(e=>[e.dataset.missionProof,e.value]));
    $('communityMissions').innerHTML=missions.length?missions.map(m=>`<div class="community-entry"><strong>${esc(m.title)}</strong> · ${m.reward} points<div>${esc(m.description)}</div><div class="muted">${esc(m.category)}${m.status?' · '+esc(m.status):''}</div>${myProfileIdentity()&&(!m.status||m.status==='rejected')?`<label for="missionProof${m.id}">Completion proof</label><textarea id="missionProof${m.id}" data-mission-proof="${m.id}" maxlength="1500" placeholder="Describe what you did or paste a proof link">${esc(proofs.get(String(m.id))||'')}</textarea><button class="btn secondary" onclick="claimCommunityMission(${m.id},this)">Submit for Review</button>`:''}</div>`).join(''):'<p class="muted">No missions yet. Leadership can publish tasks, scavenger hunts and app feedback requests here.</p>';
    $('communityLedger').innerHTML=ledger.length?ledger.map(e=>`<div class="community-entry"><strong>+${e.amount}</strong> ${esc(e.reason)}<div class="muted">${new Date(e.createdUtc).toLocaleString()} · ${esc(e.awardedBy)}</div></div>`).join(''):'<p class="muted">Your earned points will appear here.</p>';
    const rulesEditor=$('communityRulesEditor');
    if(rulesEditor)rulesEditor.classList.toggle('hidden',authState?.role!=='owner');
    $('discordCommandChannelOwner')?.classList.toggle('hidden',authState?.role!=='owner');

    if(manager){
      const claimsBox=$('communityClaims');
      if(claimsBox){
        claimsBox.innerHTML=claims.filter(c=>c.status==='pending').map(c=>`<div class="community-entry"><strong>${esc(c.playerName)}</strong> · ${esc(c.title)} · ${c.reward} points<div>${esc(c.proof)}</div><button class="btn" onclick="reviewCommunityClaim(${c.id},true,this)">Approve</button><button class="btn secondary" onclick="reviewCommunityClaim(${c.id},false,this)">Reject</button></div>`).join('')||'<p class="muted">No claims waiting for review.</p>';
      }

      const pointsPerDeck=$('pointsPerDeck');
      if(pointsPerDeck&&!pointsPerDeck.dataset.loaded){
        $('battleWinPoints').value=rules.battleWinPoints;
        $('battleLossPoints').value=rules.battleLossPoints;
        $('dailyBattleRewardCap').value=rules.dailyBattleRewardCap;
        $('arenaRunCompletionPoints').value=rules.arenaRunCompletionPoints;
        $('arenaThreeWinBonus').value=rules.arenaThreeWinBonus;
        $('arenaPerfectRunBonus').value=rules.arenaPerfectRunBonus;
        pointsPerDeck.value=rules.perWarDeck;
        $('boatBattlePoints').value=Number.isFinite(Number(rules.boatBattlePoints))?Number(rules.boatBattlePoints):5;
        $('boatDefenseWinPoints').value=Number.isFinite(Number(rules.boatDefenseWinPoints))?Number(rules.boatDefenseWinPoints):10;
        $('boatDefenseLossPoints').value=Number.isFinite(Number(rules.boatDefenseLossPoints))?Number(rules.boatDefenseLossPoints):5;
        $('donationsPerPoint').value=rules.donationsPerPoint;
        $('donationPointsCap').value=rules.donationCap;
        pointsPerDeck.dataset.loaded='true';
      }
    }
    for(const [side,select] of [['A','memberCompareA'],['B','memberCompareB']]){
      const p=communityPlayer($(select)?.value),box=$('memberFighter'+side+'Info');box?.querySelector('.arena-record')?.remove();
      if(p&&box)box.insertAdjacentHTML('beforeend',`<div class="arena-record" style="margin-top:8px;color:#ffe397">Arena ${p.arenaRating} · ${p.wins}-${p.losses} · streak ${p.currentStreak} · ${p.points} points</div>`);
    }
    if(currentPage==='member'&&memberZoneTab==='battle'){buildMemberComparePickers();renderMemberBattleArena()}
  }catch(e){communityMessage(e.message)}finally{communityLoading=false}
}
async function communityAction(button,path,body,message){
  button.disabled=true;try{const result=await communityApi(path,body);communityMessage(message);await loadCommunity();return result}catch(e){communityMessage(e.message);return null}finally{button.disabled=false}
}
async function createCommunityMission(button){await communityAction(button,'/api/member-zone/missions',{title:$('missionTitle').value,description:$('missionDescription').value,category:$('missionCategory').value,reward:Number($('missionReward').value)},'Mission published.');}
async function claimCommunityMission(id,button){await communityAction(button,'/api/member-zone/claim',{missionId:id,proof:$('missionProof'+id).value},'Submitted for leadership review.');}
async function reviewCommunityClaim(id,approve,button){await communityAction(button,'/api/member-zone/review',{claimId:id,approve},approve?'Claim approved and points awarded.':'Claim rejected. The member can submit new proof.');}
async function saveCommunityRules(button){await communityAction(button,'/api/member-zone/rules',{battleWinPoints:Number($('battleWinPoints').value),battleLossPoints:Number($('battleLossPoints').value),dailyBattleRewardCap:Number($('dailyBattleRewardCap').value),arenaRunCompletionPoints:Number($('arenaRunCompletionPoints').value),arenaThreeWinBonus:Number($('arenaThreeWinBonus').value),arenaPerfectRunBonus:Number($('arenaPerfectRunBonus').value),perWarDeck:Number($('pointsPerDeck').value),boatBattlePoints:Number($('boatBattlePoints').value),boatDefenseWinPoints:Number($('boatDefenseWinPoints').value),boatDefenseLossPoints:Number($('boatDefenseLossPoints').value),donationsPerPoint:Number($('donationsPerPoint').value),donationCap:Number($('donationPointsCap').value)},'Points reward rules saved.');}
async function loadDiscordPresets(){
  try{
    discordPresetState=await communityApi('/api/discord/announcements');
    const channelOptions=discordPresetState.channels.map(c=>`<option value="${esc(c.id)}">#${esc(c.name)}</option>`).join('');
    $('announcementChannel').innerHTML=channelOptions;
    if($('discordCommandChannel'))$('discordCommandChannel').innerHTML=channelOptions;

    const preferredAnnouncement=discordPresetState.channels.find(c=>c.name==='clan-tracker-app');
    if(preferredAnnouncement)$('announcementChannel').value=preferredAnnouncement.id;

    const preferredCommands=discordPresetState.commandChannelId
      ||discordPresetState.channels.find(c=>c.name==='bot-commands')?.id
      ||'';
    if($('discordCommandChannel')&&preferredCommands)$('discordCommandChannel').value=preferredCommands;

    $('announcementPreset').innerHTML=discordPresetState.presets.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('');
    chooseDiscordPreset();
    communityMessage('Discord channels, command channel and message presets loaded.');
  }catch(e){communityMessage(e.message)}
}
function chooseDiscordPreset(){
  const p=discordPresetState?.presets.find(p=>p.id===$('announcementPreset').value);
  if(!p)return;
  $('announcementPresetName').value=p.name||'';
  $('announcementText').value=p.message||'';
}
async function sendDiscordAnnouncement(button){
  const body={channelId:$('announcementChannel').value,message:$('announcementText').value};const key=JSON.stringify(body);
  if(button.dataset.body!==key){button.dataset.body=key;button.dataset.request=crypto.randomUUID()}
  const result=await communityAction(button,'/api/discord/announce',{...body,requestId:button.dataset.request},'Discord message sent.');if(result){delete button.dataset.request;delete button.dataset.body}
}
async function saveDiscordPreset(button,createNew){
  const body={
    id:createNew?'':$('announcementPreset').value,
    name:$('announcementPresetName').value.trim(),
    message:$('announcementText').value.trim(),
    createNew
  };
  if(!body.name){communityMessage('Enter a preset name first.');return}
  if(!body.message){communityMessage('Enter a preset message first.');return}

  button.disabled=true;
  try{
    const saved=await communityApi('/api/discord/preset',body);
    await loadDiscordPresets();
    if(saved?.id){
      $('announcementPreset').value=saved.id;
      chooseDiscordPreset();
    }
    communityMessage(createNew?'New Discord preset saved.':'Discord preset changes saved.');
  }catch(e){communityMessage(e.message)}
  finally{button.disabled=false}
}
async function saveDiscordCommandChannel(button){
  const channelId=$('discordCommandChannel')?.value||'';
  if(!channelId){communityMessage('Choose the #bot-commands channel first.');return}
  const result=await communityAction(button,'/api/discord/command-channel',{channelId},'Bot command channel saved.');
  if(result&&discordPresetState)discordPresetState.commandChannelId=result.channelId;
}
async function enablePointsBot(button){
  const old=button.textContent;button.disabled=true;button.textContent='Refreshing...';
  try{
    const result=await communityApi('/api/discord/points-bot',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({enabled:true})});
    const names=Array.isArray(result.installed)?result.installed.map(x=>'/'+x).join(', '):'';
    communityMessage(names
      ?'Discord confirmed these commands: '+names
      :'Discord commands refreshed and enabled.');
  }catch(e){communityMessage(e.message)}
  finally{button.disabled=false;button.textContent=old}
}
