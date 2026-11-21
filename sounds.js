/* Mouth animations and sound cards, ported from the user's sound map. */
const esc=s=>String(s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
/* ---- 영어 소리 지도에서 가져온 입 모양 애니메이션 ---- */
const V = {
  // 리쿠톡
  r_vowelFirstNew:{ch:"riku",id:"iOqgLXQV4lI",t:"모음부터 다르게 해야 영어를 잘 배웁니다!",age:"최근"},
  r_vowelFirstOld:{ch:"riku",id:"r6ywwbrzvbI",t:"모음부터 다르게 해야 영어를 잘 배웁니다!!",age:"2년 전"},
  r_noKoVowelShort:{ch:"riku",id:"nn_X5m9naAM",t:"한국어에 없는 영어 모음, 연습해보자!",age:"2년 전"},
  r_noKoVowelLong:{ch:"riku",id:"mN0rgE3dRPA",t:"한국어에 없는 영어 모음 발음, 모두 한꺼번에! (긴 영상)",age:"2년 전"},
  r_noKoConsLong:{ch:"riku",id:"6yE8s08ENM4",t:"한국어에 없는 영어 자음 발음, 빠른 리뷰 (긴 영상)",age:"2년 전"},
  r_shortsCompil:{ch:"riku",id:"OxDY81VHfHI",t:"영어 발음 꿀팁 쇼츠 모음 (긴 영상)",age:"2년 전"},
  r_vowelStress:{ch:"riku",id:"VPSdyqkjFOc",t:"영어 모음 강세 팁…",age:""},
  r_itEat:{ch:"riku",id:"WUDa20OnCZE",t:"It, eat의 발음 차이! 더 정확하게!",age:""},
  r_ei:{ch:"riku",id:"-z-ALdaJ7Ho",t:"한국인들한테 엄청 어려운 영어 e, i 발음",age:"2년 전"},
  r_a:{ch:"riku",id:"bgw3wtbWLVk",t:"여러분은 a 발음, 어떻게 배우셨나요?",age:"2개월 전"},
  r_o:{ch:"riku",id:"qxPD3fpFiWQ",t:"영어 “O” 모음 미국인처럼!",age:"2년 전"},
  r_walkWork:{ch:"riku",id:"g9QFkrD17YY",t:"Walk, work의 발음 차이! 미국, 영국 버전",age:"1년 전"},
  r_r1:{ch:"riku",id:"avp7LEB19OU",t:"그 어려운 R 발음… 원어민처럼! 도전해보자구요!!!",age:"2년 전"},
  r_r2:{ch:"riku",id:"sAqdRi_az98",t:"완벽한 영어 R 발음, 한번 더!",age:""},
  r_rEnd:{ch:"riku",id:"5xsaXgStSgM",t:"R로 끝나는 단어 발음 연습",age:""},
  r_lEnd:{ch:"riku",id:"zzVMwb4zbjE",t:"L로 끝나는 단어 발음 연습",age:""},
  r_l2:{ch:"riku",id:"ikAlYy41viE",t:"L발음 2차 연습!! 가자아아",age:"2년 전"},
  r_rl:{ch:"riku",id:"PQbj8r3abb0",t:"RL 발음 너무 힘들죠??",age:"2년 전"},
  r_w1:{ch:"riku",id:"6Q2puVupnrA",t:"영어 w발음 쉽게 하세요!",age:"2년 전"},
  r_w2:{ch:"riku",id:"AxgywCzMwy8",t:"W 발음 연습 2차!! 갑시다 ^^",age:"2년 전"},
  r_fp:{ch:"riku",id:"yGRLfS78iPw",t:"F 하고 P 발음, 정확하게!",age:"2년 전"},
  r_z:{ch:"riku",id:"O_n6RypmaI0",t:"Z 발음, 쉽게, 정확하게 내는 법!",age:"2년 전"},
  r_sh:{ch:"riku",id:"7ogo36_RLO0",t:"Sh 발음으로 끝나는 영어 단어",age:""},
  r_sure:{ch:"riku",id:"CNaqGDKU_Fo",t:"뜻도 발음도 자꾸 변하는 sure! 알아볼까요?",age:"3개월 전"},
  r_td:{ch:"riku",id:"8M6H5ElatIo",t:"중간 t, d 발음을 완전 쉽게!",age:"2년 전"},
  r_eu:{ch:"riku",id:"ZMfazqeRIOA",t:"영어 단어를 '으' 발음으로 끝내면 안돼요",age:""},
  r_stress:{ch:"riku",id:"7dK0HS4wkOo",t:"영어, 강세의 중요성~~!!!",age:""},
  r_stressMeaning:{ch:"riku",id:"0CzlD_z9cXI",t:"똑같은 문장도 강세를 어디에 두는지에 따라 의미가 바뀝니다!",age:""},
  r_can:{ch:"riku",id:"H9Bl1ZShIL4",t:"Can, Can’t 구분법",age:"2년 전"},
  r_to:{ch:"riku",id:"MGH-lVxKu4o",t:"영어 단어 to, 어떤 발음이죠?",age:""},
  r_weekend:{ch:"riku",id:"BF_eBIMEFN4",t:"주말 발음이 그렇게 하는 거였어??",age:""},
  r_konglish:{ch:"riku",id:"bPIuAxzhbKA",t:"영어하고 발음이 다른 흔한 콩글리쉬!!",age:""},
  r_goal:{ch:"riku",id:"c6LueeuairE",t:"영어 발음 목표, 3단계로 생각해 보세요",age:"1개월 전"},
  r_memorize:{ch:"riku",id:"3SeZvd4Eh1Q",t:"영어 발음, 그렇게 외우면 안돼요!",age:""},
  r_spelling:{ch:"riku",id:"sIhVbH-NDU4",t:"스펠링이 문제예요!!!",age:"최근"},
  r_part5:{ch:"riku",id:"JL28hgRT--k",t:"영어 발음 네이티브처럼 하자!! 발음 part 5",age:""},
  r_careful:{ch:"riku",id:"WHD4w4HlVTI",t:"이런 발음 차이, 조심하세요!!!",age:"7개월 전"},
  r_master:{ch:"riku",id:"cRiHtOGdbw0",t:"발음, 하나 하나 master 해보자구요 :)",age:"8개월 전"},
  r_hardest:{ch:"riku",id:"-mOmJCPmGXg",t:"제일 어려운 영어 발음인 듯 … 화이팅!",age:"11개월 전"},
  r_level:{ch:"riku",id:"MXByV5obO5I",t:"초급 단계와 고급 단계에 영어 발음의 중요성!!",age:"9개월 전"},
  // 올리버쌤
  o_r:{ch:"oliver",id:"Qd7T3NKPPJk",t:"R 발음 1초 만에 교정하는 팁",age:"11년 전"},
  o_can:{ch:"oliver",id:"T2MOg34Ydps",t:"[Can] vs [Can't] 확실한 발음 구분법",age:"9년 전"},
  o_lips:{ch:"oliver",id:"SJNWg10IjT4",t:"입술 모양으로 발음 좋아지는 팁",age:"10년 전"},
  o_butter1:{ch:"oliver",id:"3p7GMuyUHFs",t:"미국 버터 발음 배우기 1탄!!",age:"10년 전"},
  o_butter2:{ch:"oliver",id:"xbGtBvspGzc",t:"미국 버터 발음 배우기 2탄!!",age:"10년 전"},
  o_them:{ch:"oliver",id:"1byejWly-OA",t:"Them : 미국인들은 ‘뎀'으로 발음하지 않는다!",age:"6년 전"},
  o_brother:{ch:"oliver",id:"fHxoG6C8EZY",t:"‘브라더'라고 발음하면 미국인 얼굴이 빨개지는 이유",age:"7년 전"},
  o_something:{ch:"oliver",id:"0urw5RJOx50",t:"something(섬띵)으로만 알면 미드가 안 들릴걸?",age:"8년 전"},
  o_h:{ch:"oliver",id:"CuhkiL6lWQQ",t:"이거 알면 미드가 잘 들린다! | H 발음의 비밀",age:"9년 전"},
  o_vlog:{ch:"oliver",id:"1yiA6WOsrVo",t:"Vlog(브이로그) 영어로 어떻게 발음하세요?",age:"7년 전"},
  o_focus:{ch:"oliver",id:"27_GgeZaykA",t:"‘포커스(focus)’라고 발음하면 큰일나는 이유",age:"4년 전"},
  o_about:{ch:"oliver",id:"mGZ-C2bYJb4",t:"영어 발음 안좋으면 비웃나요? | about 발음",age:""},
  o_said:{ch:"oliver",id:"FtI06NiLNiA",t:"said 발음 어떻게 하세요? | 발음 실수 고치기",age:"9년 전"},
  o_how:{ch:"oliver",id:"c2X2MEK3_Ww",t:"How를 꼭 [하우]라고 발음하십니까?",age:"8년 전"},
  o_seeyou:{ch:"oliver",id:"_lxIQrciYi8",t:"See you [씨유]라고 발음하면 틀린 이유?",age:"8년 전"},
  o_in:{ch:"oliver",id:"LwYcOTabC3s",t:"In을 발음할 때 혹시 ‘인'이라고 하시나요?",age:"7년 전"},
  o_mcmorning:{ch:"oliver",id:"5t-cNuaWBLY",t:"‘맥모닝’ 발음 어떻게 하세요? | 한국인 80%가 실수하는 발음규칙",age:""},
  o_probably:{ch:"oliver",id:"EskMaIoQrzs",t:"미드에 귀가 열리는 발음 팁 | probably의 비밀",age:""},
  o_police:{ch:"oliver",id:"G1lvNSD4Kkk",t:"Police : 영어로 '폴리스'라고 발음하시나요?",age:"7년 전"},
  o_5sec:{ch:"oliver",id:"CV_XlgozLk4",t:"5초 안에 미국인처럼 발음 교정하는 방법!!",age:"10년 전"},
  o_3sec:{ch:"oliver",id:"Xb5A35tT40A",t:"3초 만에 미국인 발음할 수 있는 팁!",age:"11년 전"},
};
const url = id => "https://www.youtube.com/watch?v=" + id;
const RECENT = new Set(["최근","1개월 전","2개월 전","3개월 전","7개월 전","8개월 전","9개월 전","11개월 전","1년 전"]);
const P = {
  rest:{B:[146,118],D:[130,100],F:[92,104],T:[60,112],jaw:4},
  i:{B:[150,128],D:[118,72],F:[84,72],T:[52,104],jaw:1,spread:1},
  ɪ:{B:[149,124],D:[120,81],F:[86,83],T:[52,106],jaw:3,spread:.4},
  e:{B:[149,124],D:[121,86],F:[86,88],T:[52,108],jaw:5,spread:.4},
  ɛ:{B:[149,126],D:[122,92],F:[86,95],T:[52,111],jaw:7,spread:.5},
  æ:{B:[152,138],D:[122,106],F:[86,110],T:[52,119],jaw:12,spread:1},
  ʌ:{B:[148,128],D:[136,98],F:[98,108],T:[58,117],jaw:6},
  ə:{B:[146,118],D:[130,100],F:[92,104],T:[60,112],jaw:4},
  ɝ:{B:[152,112],D:[134,78],F:[100,84],T:[80,90],jaw:3,round:.5},
  u:{B:[144,100],D:[146,67],F:[110,92],T:[60,114],jaw:2,round:1},
  ʊ:{B:[146,106],D:[144,78],F:[108,97],T:[60,115],jaw:3,round:.6},
  o:{B:[148,114],D:[147,88],F:[106,103],T:[60,117],jaw:6,round:.85},
  ɔ:{B:[152,126],D:[149,99],F:[108,109],T:[60,119],jaw:9,round:.5},
  ɑ:{B:[158,142],D:[153,111],F:[104,117],T:[58,123],jaw:13},
  a:{B:[154,134],D:[132,111],F:[92,115],T:[54,121],jaw:12},
  lips:{B:[146,118],D:[130,100],F:[92,104],T:[60,112],jaw:1,close:1},
  fv:{B:[146,118],D:[130,100],F:[92,104],T:[60,112],jaw:2,fv:1},
  th:{B:[146,120],D:[124,98],F:[72,94],T:[40,90],jaw:3},
  alv:{B:[146,116],D:[124,94],F:[80,80],T:[58,73],jaw:2},
  s:{B:[146,116],D:[124,92],F:[82,83],T:[60,81],jaw:1,spread:.6},
  l:{B:[154,130],D:[134,106],F:[82,84],T:[58,73],jaw:3},
  sh:{B:[146,116],D:[120,90],F:[82,77],T:[66,90],jaw:1,round:.8},
  ch:{B:[146,116],D:[120,88],F:[78,72],T:[64,82],jaw:1,round:.8},
  r:{B:[154,116],D:[134,86],F:[100,84],T:[80,86],jaw:2,round:.6},
  k:{B:[144,96],D:[148,62],F:[112,94],T:[60,114],jaw:2},
  h:{B:[146,118],D:[130,100],F:[92,104],T:[60,112],jaw:7},
};
const REST = {pts:[]};
const DEF = {jaw:4,round:0,close:0,fv:0,velum:0,spread:0};
const pose = (name, extra) => Object.assign({}, DEF, P[name], extra||{});

/* 단계: b 버튼 이름, p 자세, cap 설명, pins 옆단면 핀, flow mouth|nose|burst, voice 목 울림, hold 정상 속도에서 머무는 ms */
const one = (p, cap, pins, extra) => [Object.assign({b:"자세", p, cap, pins, flow:"mouth", voice:true}, extra||{})];
const glide = (a, b, capA, capB, pinsA, pinsB) => [
  {b:"① 시작", p:a, cap:capA, pins:pinsA, flow:"mouth", voice:true, hold:500},
  {b:"② 끝", p:b, cap:capB, pins:pinsB, flow:"mouth", voice:true}];
const stopPair = (closeP, closeCap, pin, x1, x2, cap1, cap2) => [
  {b:"① 막기", p:closeP, cap:"① "+closeCap+". 공기가 막혀요.", pins:[pin], voice:false, hold:600},
  {b:"② "+x1, p:"ə", cap:"② "+x1+": "+cap1, flow:"burst", burstAt:pin, voice:false},
  {b:"③ 막고 울림", p:closeP, cap:"③ 같은 자리를 막은 채 목을 울려요.", pins:[pin], voice:true, hold:600},
  {b:"④ "+x2, p:"ə", cap:"④ "+x2+": "+cap2, flow:"burst", burstAt:pin, voice:true}];
const fricPair = (pp, cap, pins, x1, x2) => [
  {b:x1, p:pp, cap:x1+": "+cap+". 목은 조용히.", pins, flow:"mouth", voice:false},
  {b:x2, p:pp, cap:x2+": 같은 자세로 목을 울려요.", pins, flow:"mouth", voice:true}];
const nasal = (pp, cap, pin) => [{b:"자세", p:pp, cap, pins:[pin,[160,80,2]], flow:"nose", voice:true, velum:1}];

const ANIM = {
  "i":one("i","혀 앞쪽을 입천장 가까이 높이, 입꼬리는 옆으로 당겨요.",[[96,62,1]]),
  "ɪ":one("ɪ","/i/보다 조금 낮게, 힘을 빼고 짧게.",[[98,71,1]]),
  "eɪ":glide("e","ɪ","① '에' 근처에서 시작해서","② /ɪ/ 쪽으로 혀가 올라가요.",[[98,76,1]],[[98,71,2]]),
  "ɛ":one("ɛ","혀 앞쪽은 중간 높이, 턱을 조금 내려요.",[[98,82,1]]),
  "æ":one("æ","턱을 크게 내리고 혀 앞쪽을 낮게, 입은 옆으로 넓게.",[[98,96,1],[44,112,2]]),
  "ʌ":one("ʌ","혀 가운데를 중간 높이로, 힘 빼고 짧게.",[[128,88,1]]),
  "ə":one("ə","혀·입술·턱 모두 쉬는 위치에서 아주 약하게.",[[124,90,1]]),
  "ɝ / ɚ":one("ɝ","① 혀를 뒤로 뭉치고 ② 혀끝은 공중에 ③ 입술은 살짝 모아요.",[[124,68,1],[82,80,2],[18,82,3]]),
  "u":one("u","① 혀 뒤쪽을 높이 ② 입술을 앞으로 동그랗게 내밀어요.",[[138,58,1],[12,82,2]]),
  "ʊ":one("ʊ","① /u/보다 낮고 느슨하게 ② 입술은 살짝만 모아요.",[[138,68,1],[16,82,2]]),
  "oʊ":glide("o","ʊ","① 둥근 '오'로 시작해서","② 입술을 더 모으며 /ʊ/ 쪽으로 끝내요.",[[140,78,1],[16,84,2]],[[138,68,3]]),
  "ɔ":one("ɔ","① 혀 뒤쪽을 낮게 ② 입술은 약하게 둥글게.",[[142,88,1],[16,86,2]]),
  "ɑ":one("ɑ","① 혀 전체를 뒤·아래로 ② 턱을 크게 내려요.",[[146,100,1],[44,114,2]]),
  "aɪ":glide("a","ɪ","① 턱을 크게 내린 '아'로 시작해서","② /ɪ/ 쪽으로 혀가 올라가요.",[[124,100,1]],[[98,71,2]]),
  "aʊ":glide("a","ʊ","① 턱을 크게 내린 '아'로 시작해서","② 혀 뒤를 올리며 입술을 모아요.",[[124,100,1]],[[138,68,2],[16,82,3]]),
  "ɔɪ":glide("ɔ","ɪ","① 둥근 /ɔ/로 시작해서","② 입술을 풀며 혀를 앞·위로.",[[142,88,1]],[[98,71,2]]),
  "p · b":stopPair("lips","두 입술을 꼭 붙여요",[26,84,1],"p","b","바람을 펑 터뜨려요.","울리면서 터뜨려요."),
  "m":nasal("lips","① 입술을 붙인 채 ② 코길을 열어 코로 소리 내요.",[26,84,1]),
  "w":[{b:"① 입술 모으기",p:"u",cap:"① 입술을 작고 동그랗게 내밀고 ② 혀 뒤를 올려요.",pins:[[12,82,1],[138,58,2]],flow:"mouth",voice:true,hold:700},
       {b:"② 모음으로",p:"ɑ",cap:"③ 바로 다음 모음으로 풀어 줘요 (wa).",flow:"mouth",voice:true}],
  "f · v":fricPair("fv","윗니 끝을 아랫입술 안쪽에 얹고 그 틈으로 바람",[[40,88,1]],"f","v"),
  "θ · ð":fricPair("th","혀끝을 윗니 끝에 살짝 대고 그 틈으로 바람",[[40,91,1]],"θ","ð"),
  "t · d":stopPair("alv","혀끝을 윗잇몸(볼록한 곳)에 붙여요",[58,70,1],"t","d","바람을 세게 떼어 내요.","울리면서 떼어 내요."),
  "ɾ (미국식 t)":[{b:"① 앞 모음",p:"ɑ",cap:"① 앞 모음 (wa-)",flow:"mouth",voice:true,hold:500},
       {b:"② 톡",p:"alv",cap:"② 혀끝으로 윗잇몸을 아주 짧게 톡 쳐요.",pins:[[58,70,1]],voice:true,hold:150},
       {b:"③ 뒤 모음",p:"ə",cap:"③ 바로 다음 모음 (-ter) → '워러'",flow:"mouth",voice:true}],
  "n":nasal("alv","① 혀끝을 윗잇몸에 붙인 채 ② 코길을 열어 코로 소리 내요.",[58,70,1]),
  "s · z":fricPair("s","혀끝을 윗잇몸 가까이(닿지 않게) 두고 좁은 틈으로 바람",[[60,76,1]],"s","z"),
  "l":one("l","① 혀끝을 윗잇몸에 꾹 붙이고 ② 혀 뒤는 낮게. 공기는 혀 양옆으로 흘러요.",[[58,70,1],[134,96,2]]),
  "ʃ · ʒ":fricPair("sh","① 혀 앞쪽을 잇몸 뒤로 ② 입술은 앞으로 둥글게 내밀고 바람",[[78,70,1],[16,82,2]],"ʃ","ʒ"),
  "tʃ · dʒ":[{b:"① 막기",p:"ch",cap:"① 혀 앞쪽으로 잇몸 뒤를 막아요.",pins:[[72,68,1]],voice:false,hold:600},
       {b:"② tʃ",p:"sh",cap:"② tʃ: '쉬'로 풀며 터뜨려요.",flow:"mouth",voice:false},
       {b:"③ 막고 울림",p:"ch",cap:"③ 같은 자리를 막고 목을 울려요.",pins:[[72,68,1]],voice:true,hold:600},
       {b:"④ dʒ",p:"sh",cap:"④ dʒ: 울리면서 풀어요.",flow:"mouth",voice:true}],
  "r":[{b:"① r 자세",p:"r",cap:"① 혀를 뒤로 모으고 ② 혀끝은 어디에도 안 닿게 ③ 입술은 살짝 '우'. 모음 앞에서만 소리 내요.",pins:[[126,76,1],[82,80,2],[16,84,3]],flow:"mouth",voice:true},
       {b:"② 모음으로",p:"ɑ",cap:"④ 바로 다음 모음으로 풀어 줘요 (ra).",flow:"mouth",voice:true}],
  "j":[{b:"① 혀 올리기",p:"i",cap:"① 혀 앞쪽을 입천장 가까이 높이 올려요.",pins:[[96,62,1]],flow:"mouth",voice:true,hold:600},
       {b:"② 모음으로",p:"ɑ",cap:"② 바로 다음 모음으로 (ya).",flow:"mouth",voice:true}],
  "k · g":stopPair("k","혀 뒤쪽을 여린입천장에 붙여요",[146,56,1],"k","g","바람을 세게 떼어 내요.","울리면서 떼어 내요."),
  "ŋ":nasal("k","① 혀 뒤를 여린입천장에 붙인 채 ② 코길을 열어 코로 소리 내요.",[146,56,1]),
  "h":one("h","어디에도 닿지 않고 목(성대 사이)에서 숨만 '하~'.",[[176,166,1]],{voice:false}),
  /* ---- Australian English (General Australian) vowels ---- */
  "iː":glide("ɪ","i","① 혀 앞쪽을 높이 들고","② 더 높이 올리며 길게 끌어요.",[[98,71,1]],[[96,62,2]]),
  "ɪ ":one("i","혀 앞쪽을 높이, 힘을 빼고 짧게. 한국어 '이'에 가까워요.",[[97,66,1]]),
  "e":one("e","혀 앞쪽은 중간보다 조금 높게, 턱은 조금만 내려요.",[[98,76,1]]),
  "æ ":one("æ","턱을 내리고 혀 앞쪽을 낮게, 입은 옆으로.",[[98,96,1],[44,112,2]]),
  "ɐ":one("a","혀 가운데를 낮게, 턱은 조금만 내리고 짧게.",[[124,96,1]],{hold:500}),
  "ɐː":one("a","혀 가운데를 낮게, 턱을 내리고 길게 끌어요.",[[124,100,1],[44,114,2]],{hold:1600}),
  "ɔ ":one("ɔ","① 혀 뒤쪽을 낮게 ② 입술은 둥글게. 짧게.",[[142,88,1],[16,86,2]]),
  "ʊ ":one("ʊ","① 혀 뒤를 조금 올리고 ② 입술은 살짝만 모아요. 짧게.",[[138,68,1],[16,82,2]]),
  "ʉː":one("u","① 입술은 동그랗게 ② 혀는 뒤가 아니라 가운데·앞쪽을 올려요. 길게.",[[16,82,1],[110,62,2]],{hold:1600}),
  "ɜː":one("ə","① 혀는 가운데에 그대로(말지 않음) ② 입술을 살짝 오므려요. 길게.",[[124,84,1],[18,84,2]],{hold:1600}),
  "ə ":one("ə","혀·입술·턱 모두 쉬는 위치에서 아주 약하게.",[[124,90,1]]),
  "oː":one("o","① 혀 뒤쪽을 중간 높이 ② 입술을 동그랗게 모아 길게.",[[140,78,1],[14,84,2]],{hold:1600}),
  "æɪ":glide("æ","ɪ","① 턱을 내린 '애'로 시작해서","② 혀를 앞·위로 올려요.",[[98,96,1]],[[98,71,2]]),
  "ɑe":glide("ɑ","e","① 혀를 뒤·아래로 둔 '아'로 시작해서","② 혀 앞쪽을 올려 '에' 쪽으로.",[[146,100,1]],[[98,76,2]]),
  "oɪ":glide("o","ɪ","① 둥근 '오'로 시작해서","② 입술을 풀며 혀를 앞·위로.",[[140,78,1]],[[98,71,2]]),
  "æɔ":glide("æ","ɔ","① 턱을 내린 '애'로 시작해서","② 입술을 둥글게 모으며 혀를 뒤로.",[[98,96,1]],[[142,88,2],[16,86,3]]),
  "əʉ":glide("ə","u","① 힘 뺀 '어'로 시작해서","② 입술을 둥글게 모으며 '우' 쪽으로.",[[124,90,1]],[[16,82,2]]),
  "ɪə":glide("ɪ","ə","① 짧은 '이'로 시작해서","② 힘을 빼며 약한 '어'로. 끝에 혀를 말지 않아요.",[[98,71,1]],[[124,90,2]]),
  "eː":one("e","혀 앞쪽을 중간 높이에 두고 길게. 끝에 혀를 말지 않아요.",[[98,76,1]],{hold:1600}),
  "ʊə":glide("ʊ","ə","① 짧은 '우'로 시작해서","② 입술을 풀며 약한 '어'로.",[[138,68,1],[16,82,2]],[[124,90,3]]),
};

/* --- 계산 --- */
const lerp=(a,b,t)=>a+(b-a)*t;
const lerpP=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t)];
function mix(a,b,t){const o={};for(const k of ["jaw","round","close","fv","velum","spread"]) o[k]=lerp(a[k]||0,b[k]||0,t);for(const k of ["B","D","F","T"]) o[k]=lerpP(a[k],b[k],t);return o;}
function cr(p){let d=`M${p[0][0].toFixed(1)},${p[0][1].toFixed(1)}`;for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c;d+=` C${(b[0]+(c[0]-a[0])/6).toFixed(1)},${(b[1]+(c[1]-a[1])/6).toFixed(1)} ${(c[0]-(e[0]-b[0])/6).toFixed(1)},${(c[1]-(e[1]-b[1])/6).toFixed(1)} ${c[0].toFixed(1)},${c[1].toFixed(1)}`}return d}
function palY(x){ if(x<58) return 72; if(x<104) return 72-(x-58)*20/46; if(x<150) return 52+(x-104)*10/46; return 62+(x-150)*9/30; }
function side(s){
  const j=s.jaw,T=s.T,fy=128+j*1.2;
  const tongue=cr([[152,178],s.B,s.D,s.F,T])+` C${(T[0]-3).toFixed(1)},${(T[1]+8).toFixed(1)} ${(T[0]+4).toFixed(1)},${(T[1]+14).toFixed(1)} ${(T[0]+16).toFixed(1)},${(fy-2).toFixed(1)} Q112,${(150+j*.6).toFixed(1)} 152,178 Z`;
  const fx=22-8*s.round+2*s.spread;
  const upper=`M33,60 C27,62 ${fx+1},66 ${fx},74 C${fx-1},79 ${fx+2},83 ${fx+7},83 C${fx+12},83 38,82 41,79 L47,66 Z`;
  let ly=lerp(96+j*1.05,83,s.close); ly=lerp(ly,86.5,s.fv); const lx=fx+13*s.fv;
  const lower=`M${lx+7},${ly} C${lx+1},${ly} ${lx-1},${ly+5} ${lx},${ly+10} C${lx+1},${ly+18} ${lx+5},${ly+22} 30,${ly+26} C24,${ly+36} 26,${142+j*1.3} 38,${150+j*1.3} L60,${154+j*1.3} L54,${ly+16} C50,${ly+8} 46,${ly+2} ${lx+12},${ly-1} Z`;
  const lt=92+j*1.05, lowTeeth=`M42,${lt} C44,${lt-2} 48,${lt-2} 50,${lt} L54,${lt+18} L45,${lt+18} Z`;
  const v=s.velum, vel=`M150,62 C${lerp(162,158,v)},${lerp(63,70,v)} ${lerp(172,162,v)},${lerp(66,82,v)} ${lerp(180,158,v)},${lerp(71,94,v)}`;
  const m=p=>[p[0],(p[1]+palY(p[0]))/2], d=m(s.D), f=m(s.F), lipY=s.fv>.5?84:(83+96+j*1.05)/2;
  const mouthFlow=`M180,170 C183,130 178,100 166,${Math.min(90,d[1]+12).toFixed(0)} C158,${d[1].toFixed(0)} ${(d[0]+10).toFixed(0)},${d[1].toFixed(0)} ${d[0].toFixed(0)},${d[1].toFixed(0)} S${(f[0]+12).toFixed(0)},${f[1].toFixed(0)} ${f[0].toFixed(0)},${f[1].toFixed(0)} S50,${lipY.toFixed(0)} ${fx},${lipY.toFixed(0)} L2,${lipY.toFixed(0)}`;
  return {tongue,upper,lower,lowTeeth,vel,mouthFlow};
}
const NOSE_FLOW="M180,170 C183,120 182,70 168,52 C150,40 90,40 40,44 C30,45 20,48 8,52";
function front(s){
  const cx=70,cy=62,j=s.jaw;
  let W=52-22*s.round+10*s.spread, H=(4+j*2.4)*(1-s.close);
  H=Math.max(H,14*s.round*(1-s.close)); if(s.fv>.5) H=lerp(H,6,s.fv);
  const L=cx-W/2,R=cx+W/2,top=cy-H/2,bot=cy+H/2;
  const open=`M${L},${cy} C${L+W*.12},${top} ${cx-W*.25},${top} ${cx},${top} C${cx+W*.25},${top} ${R-W*.12},${top} ${R},${cy} C${R-W*.12},${bot} ${cx+W*.25},${bot} ${cx},${bot} C${cx-W*.25},${bot} ${L+W*.12},${bot} ${L},${cy} Z`;
  const oL=L-10+4*s.round,oR=R+10-4*s.round,oT=top-14,oB=bot+16;
  const lips=`M${oL},${cy} C${oL+6},${oT+6} ${cx-14},${oT-2} ${cx-5},${oT+2} L${cx},${oT+5} L${cx+5},${oT+2} C${cx+14},${oT-2} ${oR-6},${oT+6} ${oR},${cy} C${oR-6},${oB} ${cx+18},${oB+2} ${cx},${oB+1} C${cx-18},${oB+2} ${oL+6},${oB} ${oL},${cy} Z`;
  const tipOut=s.T[0]<=46, tipUp=s.T[1]<=78&&s.T[0]<64;
  let inner=`<rect x="${cx-17}" y="${top-1}" width="34" height="${Math.min(8,H*.45+1)}" rx="2" fill="var(--tooth)" stroke="var(--tissue-line)" stroke-width=".6"/>`;
  if(j>=6) inner+=`<rect x="${cx-15}" y="${bot-Math.min(7,H*.3)}" width="30" height="8" rx="2" fill="var(--tooth)" stroke="var(--tissue-line)" stroke-width=".6"/><ellipse cx="${cx}" cy="${bot-2}" rx="${W*.3}" ry="${H*.22}" fill="var(--tongue)"/>`;
  if(tipUp) inner+=`<ellipse cx="${cx}" cy="${top+6}" rx="9" ry="4" fill="var(--tongue)"/>`;
  let over="";
  if(s.fv>.5) over=`<path d="M${cx-17},${cy-8} L${cx+17},${cy-8} L${cx+16},${cy+2} Q${cx},${cy+4} ${cx-16},${cy+2} Z" fill="var(--tooth)" stroke="var(--tissue-line)" stroke-width=".8"/>`;
  if(tipOut) over+=`<ellipse cx="${cx}" cy="${cy+1}" rx="11" ry="4.5" fill="var(--tongue)" stroke="var(--tongue-line)" stroke-width=".8"/>`;
  // 정면에서 볼 곳 (자동)
  let fpin=null;
  if(s.close>.5) fpin=[cx,cy,"입술 닫힘"];
  else if(s.fv>.5) fpin=[cx,cy-3,"윗니가 아랫입술에"];
  else if(tipOut) fpin=[cx,cy+1,"혀끝 보임"];
  else if(s.round>.55) fpin=[cx,oT+4,"입술 내밂"];
  else if(s.spread>.55) fpin=[oR-2,cy,"입꼬리 옆으로"];
  else if(j>=10) fpin=[cx,bot+4,"턱 크게 내림"];
  return {open,lips,inner,over,fpin};
}
let UIDN=0;
function frontSvg(id){
  return `<svg class="front" viewBox="0 0 140 124" role="img" aria-label="정면 입 모양">
  <ellipse cx="70" cy="64" rx="62" ry="54" fill="var(--skin)"/>
  <path data-k="flips" fill="var(--lip)" stroke="var(--tissue-line)" stroke-width="1.2"/>
  <clipPath id="${id}-cl"><path data-k="fclip"/></clipPath>
  <path data-k="fopen" fill="var(--cavity)"/>
  <g data-k="finner" clip-path="url(#${id}-cl)"></g><g data-k="fover"></g><g data-k="fpin"></g>
</svg>`;
}
function sideSvg(id){
  return `<svg class="side" viewBox="0 0 240 200" role="img" aria-label="옆 단면">
  <defs><marker id="${id}-ar" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--flow)"/></marker></defs>
  <path d="M74,2 C66,16 56,28 46,36 C38,42 24,48 20,52 C24,56 30,58 33,60" fill="none" stroke="var(--tissue-line)" stroke-width="1.6"/>
  <path d="M46,50 C80,44 130,42 168,46 C176,47 182,52 184,60" fill="none" stroke="var(--tissue-line)" stroke-width="1.2" stroke-dasharray="3 3" opacity=".7"/>
  <text x="96" y="40" font-size="8.5" fill="var(--muted)">코 안</text>
  <path d="M46,66 C52,68 56,70 58,72 C62,62 80,54 104,52 C124,51 140,55 150,62" fill="var(--tissue)" stroke="var(--tissue-line)" stroke-width="1.8"/>
  <text x="92" y="62" font-size="8" fill="var(--muted)">입천장</text>
  <path data-k="vel" fill="none" stroke="var(--tissue-line)" stroke-width="5" stroke-linecap="round" opacity=".85"/>
  <path d="M184,56 L186,182" fill="none" stroke="var(--tissue-line)" stroke-width="1.8"/>
  <path d="M40,86 L46,64 L54,66 L48,88 C46,90 42,90 40,86 Z" fill="var(--tooth)" stroke="var(--tissue-line)" stroke-width="1.3"/>
  <path data-k="lowTeeth" fill="var(--tooth)" stroke="var(--tissue-line)" stroke-width="1.3"/>
  <path data-k="tongue" fill="var(--tongue)" stroke="var(--tongue-line)" stroke-width="1.6" stroke-linejoin="round"/>
  <path data-k="upper" fill="var(--lip)" stroke="var(--tissue-line)" stroke-width="1.5"/>
  <path data-k="lower" fill="var(--lip)" stroke="var(--tissue-line)" stroke-width="1.5"/>
  <g data-k="jawmark"><path data-k="jawarrow" fill="none" stroke="var(--pin)" stroke-width="2" stroke-linecap="round" opacity="0"/><text data-k="jawlab" font-size="8.5" font-weight="700" fill="var(--muted)">아래턱</text></g>
  <g data-k="glottis"><path d="M170,176 L180,172" stroke="var(--tissue-line)" stroke-width="2.2"/><path d="M170,182 L180,186" stroke="var(--tissue-line)" stroke-width="2.2"/></g>
  <text x="192" y="182" font-size="8" fill="var(--muted)">성대</text>
  <text x="188" y="80" font-size="8" fill="var(--muted)">목</text>
  <text x="150" y="108" font-size="7.5" fill="var(--muted)">여린입천장</text>
  <path data-k="flow" fill="none" stroke="var(--flow)" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#${id}-ar)" opacity="0"/>
  <g data-k="burst" opacity="0"></g>
  <g data-k="vib" opacity="0"><path d="M190,166 q3,-3 6,0 q3,3 6,0" fill="none" stroke="var(--flow)" stroke-width="1.6"/><path d="M190,190 q3,-3 6,0 q3,3 6,0" fill="none" stroke="var(--flow)" stroke-width="1.6"/><text x="200" y="160" font-size="8" fill="var(--flow)">울림</text></g>
  <g data-k="pins"></g>
</svg>`;
}
function stageHtml(label){
  const id="m"+(++UIDN);
  return `<figure class="stage" data-ipa="${label}">
    <div class="views"><div class="view vf on">${frontSvg(id)}</div><div class="view vs">${sideSvg(id)}</div></div>
    <div class="ctl vsw" role="group" aria-label="View"><button type="button" data-v="vf" aria-pressed="true">Front</button><button type="button" data-v="vs" aria-pressed="false">Side</button></div>
    <div class="ctl"><div class="steps"></div><div class="plays"><button type="button" class="play" data-speed="normal">▶ Play</button><button type="button" class="play" data-speed="slow">Slow</button></div></div>
    <figcaption class="cap"></figcaption>
  </figure>`;
}
const pinSvg=([x,y,n])=>`<g><circle cx="${x}" cy="${y}" r="6.6" fill="var(--pin)"/><text x="${x}" y="${y+2.9}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff">${n}</text></g>`;
const REDUCE = typeof matchMedia==="function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const SPEED = {normal:{move:320,hold:1100}, slow:{move:900,hold:2600}};

class Player{
  constructor(fig, steps){
    this.fig=fig; this.k={};
    fig.querySelectorAll("[data-k]").forEach(e=>this.k[e.dataset.k]=e);
    this.steps=steps.map(st=>Object.assign({},st,{pose:st.poseObj||pose(st.p,{velum:st.velum||0})}));
    this.cap=fig.querySelector(".cap"); this.btnBox=fig.querySelector(".steps");
    this.cur=this.steps[0].pose; this.active=null; this.raf=0; this.timer=0; this.dash=0;
    this.steps.forEach((st,i)=>{const b=document.createElement("button");b.type="button";b.textContent=st.b;b.setAttribute("aria-pressed","false");
      b.addEventListener("click",()=>{this.stopPlay();this.press(i);this.go(st,700);});this.btnBox.appendChild(b);});
    fig.querySelectorAll(".play").forEach(b=>b.addEventListener("click",()=>this.play(b.dataset.speed)));
    const d0=Math.min(steps.defaultIndex||0,this.steps.length-1); this.cur=this.steps[d0].pose; this.press(d0); this.drawAll(this.cur,this.steps[d0],true); this.active=this.steps[d0];
  }
  press(i){[...this.btnBox.children].forEach((b,k)=>b.setAttribute("aria-pressed",String(k===i)));}
  drawAll(s,st,on){
    const g=side(s), k=this.k;
    for(const key of ["tongue","upper","lower","lowTeeth","vel"]) k[key].setAttribute("d",g[key]);
    if(st.flow==="mouth"||st.flow==="nose"){k.flow.setAttribute("d",st.flow==="nose"?NOSE_FLOW:g.mouthFlow);k.flow.setAttribute("opacity",on?".9":"0");}
    else k.flow.setAttribute("opacity","0");
    if(st.flow==="burst"&&st.burstAt){const[x,y]=st.burstAt;k.burst.innerHTML=`<path d="M${x-4},${y} L${x-22},${y-8} M${x-4},${y+2} L${x-24},${y+2} M${x-4},${y+4} L${x-22},${y+12}" stroke="var(--flow)" stroke-width="2" stroke-linecap="round"/>`;k.burst.setAttribute("opacity",on?"1":"0");}
    else k.burst.setAttribute("opacity","0");
    k.vib.setAttribute("opacity",(st.voice&&on)?"1":"0");
    const cy=150+s.jaw*1.3; k.jawlab.setAttribute("x","62"); k.jawlab.setAttribute("y",(cy+4).toFixed(1));
    k.jawlab.setAttribute("fill", st.jawStep?"var(--pin)":"var(--muted)");
    k.jawarrow.setAttribute("d",`M28,${(cy-26).toFixed(1)} L28,${(cy-6).toFixed(1)} M23,${(cy-12).toFixed(1)} L28,${(cy-6).toFixed(1)} L33,${(cy-12).toFixed(1)}`);
    k.jawarrow.setAttribute("opacity", st.jawStep&&on&&s.jaw>4?"1":"0");
    k.pins.innerHTML = on&&st.pins ? st.pins.map(pinSvg).join("") : "";
    const f=front(s);
    k.flips.setAttribute("d",f.lips); k.fopen.setAttribute("d",f.open); k.fclip.setAttribute("d",f.open);
    k.finner.innerHTML=f.inner; k.fover.innerHTML=f.over;
    if(st.jawStep&&on){ k.fpin.innerHTML=`<text x="70" y="120" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--pin)">앞니 사이: ${jawShort(s.jaw)}</text>`; }
    else k.fpin.innerHTML = on&&f.fpin ? `<circle cx="${f.fpin[0]}" cy="${f.fpin[1]}" r="4" fill="var(--pin)" stroke="#fff" stroke-width="1.2"/><text x="70" y="120" text-anchor="middle" font-size="9.5" font-weight="700" fill="var(--pin)">${f.fpin[2]}</text>` : "";
    if(on) this.cap.textContent=st.cap||"";
  }
  idle(now){
    if(!this.active) return;
    this.dash=(this.dash+0.4)%20; this.k.flow.setAttribute("stroke-dashoffset",(-this.dash).toFixed(1));
    this.k.glottis.setAttribute("transform", this.active.voice ? `translate(${(Math.sin(now/45)).toFixed(2)},0)` : "");
    if(!REDUCE) this.raf=requestAnimationFrame(n=>this.idle(n));
  }
  go(st,ms){
    cancelAnimationFrame(this.raf); this.active=null;
    const from=this.cur,to=st.pose,t0=performance.now();
    this.drawAll(from,st,false);
    const f=now=>{const t=REDUCE?1:Math.min(1,(now-t0)/ms), e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
      this.cur=mix(from,to,e); this.drawAll(this.cur,st,t>=1);
      if(t<1) this.raf=requestAnimationFrame(f); else {this.active=st; this.raf=requestAnimationFrame(n=>this.idle(n));}};
    this.raf=requestAnimationFrame(f);
  }
  stopPlay(){clearTimeout(this.timer); this.fig.querySelectorAll(".play").forEach(b=>b.removeAttribute("aria-pressed"));}
  play(speed){
    this.stopPlay(); const sp=SPEED[speed]||SPEED.normal;
    this.fig.querySelector(`.play[data-speed="${speed}"]`).setAttribute("aria-pressed","true");
    this.cur=pose("rest"); this.drawAll(this.cur,{},false); this.cap.textContent="쉬는 위치에서 시작";
    let i=0;
    const run=()=>{const st=this.steps[i]; this.press(i); this.go(st,sp.move);
      const hold=speed==="slow"?sp.hold:(st.hold||sp.hold); i++;
      if(i<this.steps.length) this.timer=setTimeout(run, sp.move+hold);
      else this.timer=setTimeout(()=>this.stopPlay(), sp.move+hold);};
    this.timer=setTimeout(run, speed==="slow"?600:250);
  }
}

/* 첫 자세를 움직임 단위(턱 → 혀 → 입술 → 소리)로 나눔 */
const CIRC="①②③④⑤⑥⑦⑧⑨";
function lipText(t){
  if(t.close>.5) return "두 입술을 꼭 붙여요.";
  if(t.fv>.5) return "윗니 끝을 아랫입술 안쪽에 얹어요.";
  if(t.round>.55) return "입술을 앞으로 둥글게 모아요.";
  if(t.round>.3) return "입술을 살짝 모아요.";
  if(t.spread>.55) return "입꼬리를 옆으로 당겨요.";
  return "입술은 편하게 둬요.";
}
function jawText(j){
  if(j<=2) return "거의 닫아요. 위아래 앞니 사이가 연필 하나 정도";
  if(j<=5) return "조금 벌려요. 앞니 사이에 새끼손가락 끝이 들어갈 정도";
  if(j<=9) return "중간만큼 벌려요. 앞니 사이에 손가락 하나";
  return "크게 벌려요. 앞니 사이에 손가락 두 개";
}
function jawShort(j){ return j<=2?"연필 하나":j<=5?"새끼손가락":j<=9?"손가락 하나":"손가락 두 개"; }
function buildSteps(sound){
  const raw=ANIM[sound.ipa]; if(!raw) return null;
  const pos=sound.pos||{};
  const first=raw[0], rest=pose("rest"), tgt=pose(first.p,{velum:first.velum||0});
  const moves=[]; let cur=Object.assign({},rest,{B:rest.B,D:rest.D,F:rest.F,T:rest.T});
  const pinsTongue=(first.pins||[]).filter(p=>p[0]>=30), pinsLip=(first.pins||[]).filter(p=>p[0]<30);
  if(Math.abs(tgt.jaw-rest.jaw)>=1.5){
    cur=Object.assign({},cur,{jaw:tgt.jaw});
    moves.push({b:"입 벌리기",jawStep:true,poseObj:cur,cap:"입 벌리기(아래턱): "+jawText(tgt.jaw)+".",voice:false});
  }
  const dist=["B","D","F","T"].reduce((m,k)=>Math.max(m,Math.hypot(tgt[k][0]-rest[k][0],tgt[k][1]-rest[k][1])),0);
  if(dist>=4){
    cur=Object.assign({},cur,{B:tgt.B,D:tgt.D,F:tgt.F,T:tgt.T});
    moves.push({b:"혀",poseObj:cur,cap:"혀: "+(pos["혀"]||pos["닿는 곳"]||""),pins:pinsTongue,voice:false});
  }
  const lipDiff=["round","spread","close","fv"].some(k=>Math.abs((tgt[k]||0)-(rest[k]||0))>=.2);
  if(lipDiff){
    cur=Object.assign({},cur,{round:tgt.round,spread:tgt.spread,close:tgt.close,fv:tgt.fv});
    moves.push({b:"입술",poseObj:cur,cap:"입술: "+(pos["입술"]||lipText(tgt)),pins:pinsLip,voice:false});
  }
  if(tgt.velum>.5){
    cur=Object.assign({},cur,{velum:tgt.velum});
    moves.push({b:"코길 열기",poseObj:cur,cap:"여린입천장을 내려서 코로 가는 길을 열어요.",pins:[[160,80,1]],voice:false});
  }
  let steps=raw.slice();
  if(moves.length>=1){
    const sounding = first.flow||first.voice;
    const base=first.b.replace(/^[①-⑨]\s*/,""); const fin=Object.assign({},first,{b: (["자세","입술 모으기","r 자세","혀 올리기"].includes(base)&&sounding)?"소리":base});
    steps=[...moves,fin,...raw.slice(1)];
    steps.defaultIndex=moves.length;
  } else steps.defaultIndex=0;
  const out=steps.map((st,i)=>Object.assign({},st,{b:(i+1)+". "+st.b.replace(/^[①-⑨]\s*/,"")}));
  out.defaultIndex=steps.defaultIndex;
  return out;
}
const VOWELS = [
 {g:"앞쪽 모음",ipa:"i",ex:"see, eat, team",hard:true,
  m:{pts:[[148,104],[108,62],[74,64],[48,90]],jaw:1,lips:"spread",at:[90,58]},
  pos:{"혀":"앞쪽을 입천장 가까이 높이 올림. 힘을 줌","입술":"양옆으로 살짝 당김(미소)","턱":"거의 닫힘"},
  trap:"한국어 '이'보다 더 길고 팽팽하게. 짧게 끊으면 /ɪ/로 들려요.",
  pair:"eat / it · sheep / ship · leave / live", vids:["r_itEat","r_ei"]},
 {g:"앞쪽 모음",ipa:"ɪ",ex:"sit, it, in",hard:true,
  m:{pts:[[148,104],[110,69],[76,72],[48,92]],jaw:2.5,lips:"rest",at:[92,66]},
  pos:{"혀":"/i/보다 조금 낮고 뒤로. 힘을 뺌","입술":"편하게","턱":"/i/보다 살짝 내림"},
  trap:"'이'와 '에' 사이의 짧고 느슨한 소리. 한국어 '이'로 내면 eat처럼 들려요.",
  pair:"it / eat · bit / beat · fill / feel", vids:["r_itEat","r_ei","o_in"]},
 {g:"앞쪽 모음",ipa:"eɪ",ex:"say, make, day",
  m:{pts:[[148,104],[110,72],[76,76],[48,93]],jaw:3,lips:"rest",at:[92,70]},
  pos:{"혀":"/ɛ/ 근처에서 시작해 /ɪ/ 쪽으로 올라감","입술":"편하게","턱":"조금 내렸다가 닫힘"},
  trap:"'에' 하나로 끝내지 말고 '에이'로 미끄러지기. 그림은 시작 위치예요.",
  pair:"late / let · pain / pen", vids:[]},
 {g:"앞쪽 모음",ipa:"ɛ",ex:"bed, said, head",
  m:{pts:[[148,106],[110,77],[76,82],[48,96]],jaw:5,lips:"rest",at:[92,76]},
  pos:{"혀":"앞쪽 중간 높이","입술":"편하게","턱":"/ɪ/보다 더 내림"},
  trap:"한국어 '에'와 가장 비슷한 모음. 대신 /æ/와 섞이지 않게 턱을 덜 내려요.",
  pair:"bed / bad · men / man · said / sad", vids:["r_ei","o_said"]},
 {g:"앞쪽 모음",ipa:"æ",ex:"cat, bad, apple",hard:true,
  m:{pts:[[150,110],[114,88],[78,94],[48,102]],jaw:10,lips:"spread",at:[94,88]},
  pos:{"혀":"앞쪽을 낮게, 혀끝은 아랫니 뒤","입술":"옆으로 넓게","턱":"크게 내림"},
  trap:"'애'보다 턱을 훨씬 더 내리고 입을 옆으로. 한국어 '애·에' 구분이 없어서 bed와 섞여요.",
  pair:"bad / bed · man / men · cap / cup", vids:["r_a"]},
 {g:"가운데 모음",ipa:"ʌ",ex:"cup, but, love",hard:true,
  m:{pts:[[148,104],[120,84],[84,92],[52,100]],jaw:5,lips:"rest",at:[118,80]},
  pos:{"혀":"가운데 중간 높이, 힘 뺌","입술":"편하게","턱":"반쯤 내림"},
  trap:"짧고 힘없는 '어'. 입을 크게 벌리면 /ɑ/가 돼요.",
  pair:"cup / cap · hut / hot · luck / lock", vids:["o_brother"]},
 {g:"가운데 모음",ipa:"ə",ex:"about, banana, police",hard:true,
  m:{pts:[[146,100],[116,86],[80,92],[52,99]],jaw:3,lips:"rest",at:[114,82]},
  pos:{"혀":"완전히 쉬는 위치","입술":"편하게","턱":"살짝 열림"},
  trap:"강세 없는 자리의 아주 약한 '어'(schwa). 영어에서 가장 많이 나오는 소리예요. 글자대로 또박또박 읽으면 어색해져요.",
  pair:"about, police, banana의 약한 음절", vids:["r_vowelStress","o_about","o_police"]},
 {g:"가운데 모음",ipa:"ɝ / ɚ",ex:"her, work, butter",hard:true,
  m:{pts:[[146,96],[118,70],[84,80],[62,84]],jaw:2,lips:"round",at:[100,66]},
  pos:{"혀":"혀 전체를 뒤로 모으고(뭉침) 혀끝은 어디에도 닿지 않음","입술":"살짝 모음","턱":"거의 닫힘"},
  trap:"'어' 다음에 r을 붙이는 게 아니라, 처음부터 r 모양 그대로 내는 모음이에요.",
  pair:"work / walk · bird / bud", vids:["r_walkWork","r_rEnd"]},
 {g:"뒤쪽 모음",ipa:"u",ex:"food, blue, two",
  m:{pts:[[152,86],[132,62],[96,80],[54,98]],jaw:1,lips:"round",at:[130,58]},
  pos:{"혀":"뒤쪽을 높이 올림","입술":"앞으로 동그랗게 내밂","턱":"거의 닫힘"},
  trap:"'우'보다 입술을 더 내밀고 길게.",
  pair:"pool / pull · food / foot", vids:["r_to"]},
 {g:"뒤쪽 모음",ipa:"ʊ",ex:"book, put, good",hard:true,
  m:{pts:[[150,90],[130,68],[94,82],[54,99]],jaw:2.5,lips:"round",at:[128,64]},
  pos:{"혀":"/u/보다 조금 낮고 힘 뺌","입술":"살짝만 모음","턱":"/u/보다 조금 내림"},
  trap:"짧고 느슨한 '우'. 한국어 '우'로 길게 내면 food처럼 들려요.",
  pair:"full / fool · look / Luke", vids:[]},
 {g:"뒤쪽 모음",ipa:"oʊ",ex:"go, home, focus",hard:true,
  m:{pts:[[150,96],[130,76],[92,88],[54,100]],jaw:4,lips:"round",at:[128,72]},
  pos:{"혀":"뒤쪽 중간에서 시작해 /ʊ/ 쪽으로 올라감","입술":"동그랗게 모았다가 더 모음","턱":"반쯤 열렸다 닫힘"},
  trap:"'오' 하나가 아니라 '오우'. focus를 '포커스'로 읽으면 다른 말로 들릴 수 있어요. 그림은 시작 위치예요.",
  pair:"coat / caught · low / law", vids:["o_focus"]},
 {g:"뒤쪽 모음",ipa:"ɔ",ex:"law, walk, thought",
  m:{pts:[[152,102],[132,84],[90,94],[54,102]],jaw:7,lips:"round",at:[130,80]},
  pos:{"혀":"뒤쪽 낮은 중간","입술":"약하게 둥글게","턱":"많이 내림"},
  trap:"미국 여러 지역에서는 /ɑ/와 같게 발음해요. 먼저 /ɑ/를 확실히 익히세요.",
  pair:"walk / work · caught / coat", vids:["r_walkWork"]},
 {g:"뒤쪽 모음",ipa:"ɑ",ex:"hot, father, stop",hard:true,
  m:{pts:[[152,112],[132,92],[88,100],[52,104]],jaw:10,lips:"rest",at:[134,88]},
  pos:{"혀":"뒤쪽을 낮게, 혀 전체가 아래로","입술":"둥글리지 않음","턱":"크게 내림"},
  trap:"미국식 o 글자(hot, stop)는 대부분 '오'가 아니라 입을 크게 벌린 '아'예요.",
  pair:"hot / hut · cop / cup", vids:["r_o"]},
 {g:"이중모음",ipa:"aɪ",ex:"time, my, like",
  m:{pts:[[152,110],[124,90],[84,98],[50,103]],jaw:9,lips:"rest",at:[118,86]},
  pos:{"혀":"낮은 '아'에서 /ɪ/ 쪽으로 올라감","입술":"편하게","턱":"크게 열었다 닫힘"},
  trap:"'아이' 두 음절이 아니라 한 덩어리로 미끄러지게. 그림은 시작 위치예요.",
  pair:"", vids:[]},
 {g:"이중모음",ipa:"aʊ",ex:"now, how, out",
  m:{pts:[[152,110],[124,90],[84,98],[50,103]],jaw:9,lips:"rest",at:[118,86]},
  pos:{"혀":"낮은 '아'에서 /ʊ/ 쪽으로 올라감","입술":"끝에서 동그랗게 모음","턱":"크게 열었다 닫힘"},
  trap:"How를 또박또박 '하우' 두 박자로 내지 않기. 그림은 시작 위치예요.",
  pair:"", vids:["o_how"]},
 {g:"이중모음",ipa:"ɔɪ",ex:"boy, coin, choice",
  m:{pts:[[152,102],[132,84],[90,94],[54,102]],jaw:7,lips:"round",at:[130,80]},
  pos:{"혀":"/ɔ/에서 /ɪ/ 쪽으로 앞으로 올라감","입술":"둥글게 시작해 풀림","턱":"열었다 닫힘"},
  trap:"'오이'를 한 박자로. 그림은 시작 위치예요.",
  pair:"", vids:[]},
];
const VOWELS_AU = [
 ["iː","혀 앞쪽을 높이 올리고 길게","옆으로 살짝 당김"],["ɪ ","혀 앞쪽을 높이, 힘 빼고 짧게","편하게"],
 ["e","혀 앞쪽 중간보다 조금 위","편하게"],["æ ","혀 앞쪽을 낮게, 턱을 내림","옆으로"],
 ["ɐ","혀 가운데를 낮게, 짧게","편하게"],["ɐː","혀 가운데를 낮게, 길게","편하게"],
 ["ɔ ","혀 뒤쪽을 낮게, 짧게","둥글게"],["ʊ ","혀 뒤를 조금 올림, 짧게","살짝 모음"],
 ["ʉː","혀 가운데·앞쪽을 올림, 길게","동그랗게"],["ɜː","혀는 가운데에(말지 않음), 길게","살짝 오므림"],
 ["ə ","쉬는 위치","편하게"],["oː","혀 뒤쪽 중간 높이, 길게","동그랗게"],
 ["æɪ","낮은 앞에서 높은 앞으로","옆으로"],["ɑe","낮은 뒤에서 앞 중간으로","편하게"],
 ["oɪ","둥근 뒤에서 높은 앞으로","둥글게 → 풀기"],["æɔ","낮은 앞에서 뒤로","옆으로 → 둥글게"],
 ["əʉ","가운데에서 둥근 쪽으로","편하게 → 둥글게"],["ɪə","높은 앞에서 가운데로","편하게"],
 ["eː","혀 앞쪽 중간, 길게","편하게"],["ʊə","높은 뒤에서 가운데로","살짝 모음 → 풀기"],
].map(([ipa,t,l])=>({g:"모음",ipa,pos:{"혀":t,"입술":l},vids:[]}));
const CONS = [
 {g:"입술",ipa:"p · b",ex:"pen / bed",
  m:{pts:REST.pts,jaw:1,lips:"closed",at:[26,74]},
  pos:{"닿는 곳":"두 입술을 붙였다가 터뜨림","공기":"p는 바람을 세게(휴지 앞에 대면 흔들림), b는 성대 울림","성대":"p 없음 · b 있음"},
  trap:"단어 첫 p는 'ㅍ'보다 바람이 더 세요. b는 'ㅂ'보다 처음부터 목이 울려야 해요.",
  pair:"pig / big · cap / cab", vids:["r_fp"]},
 {g:"입술",ipa:"m",ex:"man, home",
  m:{pts:REST.pts,jaw:1,lips:"closed",at:[26,74],nasal:true},
  pos:{"닿는 곳":"두 입술을 붙임","공기":"코로 나감","성대":"있음"},
  trap:"단어 끝 m은 입술을 꼭 닫고 끝내기.",
  pair:"", vids:[]},
 {g:"입술",ipa:"w",ex:"we, one, water",hard:true,
  m:{pts:[[152,86],[132,62],[96,80],[54,98]],jaw:1,lips:"round",at:[16,70]},
  pos:{"닿는 곳":"입술을 작고 동그랗게 내밀었다가 다음 모음으로 풀어 줌","공기":"막힘 없이 흐름","성대":"있음"},
  trap:"'우'를 따로 한 박자 내지 말고, 입술을 모은 상태에서 바로 다음 모음으로. would를 '우드'로 읽지 않기.",
  pair:"wine / vine · west / vest", vids:["r_w1","r_w2"]},
 {g:"윗니 + 아랫입술",ipa:"f · v",ex:"fan / van",hard:true,
  m:{pts:REST.pts,jaw:2,lips:"fv",at:[40,75]},
  pos:{"닿는 곳":"윗니 끝을 아랫입술 안쪽에 가볍게 댐","공기":"그 틈으로 바람을 계속 내보냄","성대":"f 없음 · v 있음"},
  trap:"f를 'ㅍ', v를 'ㅂ'으로 바꾸면 pan, ban으로 들려요. 입술을 붙이지 않는 게 핵심이에요.",
  pair:"fan / pan · very / berry · vest / best", vids:["r_fp","o_vlog"]},
 {g:"혀끝 + 이",ipa:"θ · ð",ex:"think / this",hard:true,
  m:{pts:[[146,100],[114,84],[66,82],[40,76]],jaw:2,lips:"rest",at:[42,76]},
  pos:{"닿는 곳":"혀끝을 윗니 끝에 가볍게 대거나 이 사이로 살짝 내밂","공기":"혀와 이 사이로 바람","성대":"θ 없음 · ð 있음"},
  trap:"θ를 'ㅆ', ð를 'ㄷ'으로 바꾸기 쉬워요. think가 sink, this가 dis처럼 들려요.",
  pair:"think / sink · three / tree · they / day", vids:["o_something","o_them","o_brother"]},
 {g:"혀끝 + 윗잇몸",ipa:"t · d",ex:"top / dog",
  m:{pts:[[146,98],[110,76],[70,68],[55,62]],jaw:1,lips:"rest",at:[56,60]},
  pos:{"닿는 곳":"혀끝을 윗니 뒤 볼록한 잇몸(치조)에 댔다가 뗌","공기":"t는 바람 세게, d는 울림","성대":"t 없음 · d 있음"},
  trap:"혀를 이에 대지 말고 잇몸에. 단어 끝 t, d 뒤에 '으'를 붙이지 않기.",
  pair:"tie / die · bat / bad", vids:["r_eu"]},
 {g:"혀끝 + 윗잇몸",ipa:"ɾ (미국식 t)",ex:"water, butter, city",hard:true,
  m:{pts:[[146,98],[110,78],[72,72],[56,64]],jaw:2,lips:"rest",at:[56,60]},
  pos:{"닿는 곳":"혀끝으로 윗잇몸을 아주 빠르게 한 번 톡 침","공기":"끊기지 않음","성대":"있음"},
  trap:"모음 사이의 t, d는 미국식에서 한국어 'ㄹ'처럼 가볍게 튕겨요(워러, 버러).",
  pair:"water, better, a lot of", vids:["r_td","o_butter1","o_butter2"]},
 {g:"혀끝 + 윗잇몸",ipa:"n",ex:"no, sun",
  m:{pts:[[146,98],[110,76],[70,68],[55,62]],jaw:1,lips:"rest",at:[56,60],nasal:true},
  pos:{"닿는 곳":"혀끝을 윗잇몸에 붙임","공기":"코로 나감","성대":"있음"},
  trap:"끝소리 n은 혀를 잇몸에 붙인 채로 끝내기(sun ≠ sung).",
  pair:"sin / sing · ran / rang", vids:[]},
 {g:"혀끝 + 윗잇몸",ipa:"s · z",ex:"see / zoo",hard:true,
  m:{pts:[[146,98],[110,76],[72,68],[56,68]],jaw:1,lips:"spread",at:[56,62]},
  pos:{"닿는 곳":"혀끝을 윗잇몸 가까이 두되 닿지 않게, 좁은 틈","공기":"틈으로 바람을 길게","성대":"s 없음 · z 있음"},
  trap:"z를 'ㅈ'으로 내기 쉬워요. z는 s 위치 그대로 목만 울리는 '즈~' 소리예요. see는 '씨'가 아니라 s 뒤에 /i/.",
  pair:"sue / zoo · ice / eyes · see / she", vids:["r_z","o_seeyou"]},
 {g:"혀끝 + 윗잇몸",ipa:"l",ex:"light, feel, milk",hard:true,
  m:{pts:[[148,104],[118,84],[72,70],[55,62]],jaw:2,lips:"rest",at:[56,60]},
  pos:{"닿는 곳":"혀끝을 윗잇몸에 꾹 붙이고, 공기는 혀 양옆으로","공기":"혀 옆으로 흐름","성대":"있음"},
  trap:"단어 끝 l(feel, milk)은 혀끝을 붙인 채 혀 뒤를 낮춰 '어'처럼 어둡게 울려요. 한국어 'ㄹ' 받침과 달라요.",
  pair:"light / right · collect / correct", vids:["r_lEnd","r_l2","r_rl"]},
 {g:"혀 앞쪽 + 잇몸 뒤",ipa:"ʃ · ʒ",ex:"she / vision",
  m:{pts:[[146,98],[108,74],[70,64],[58,74]],jaw:1,lips:"round",at:[66,58]},
  pos:{"닿는 곳":"혀 앞쪽을 /s/보다 조금 뒤로, 잇몸 뒤쪽에 가깝게","공기":"넓은 틈으로 '쉬~'","성대":"ʃ 없음 · ʒ 있음"},
  trap:"입술을 앞으로 내밀어 둥글게 하면 쉬워요. 끝소리 sh 뒤에 '이'나 '으'를 붙이지 않기(fish ≠ 피쉬이).",
  pair:"she / see · sure", vids:["r_sh","r_sure"]},
 {g:"혀 앞쪽 + 잇몸 뒤",ipa:"tʃ · dʒ",ex:"chair / job",
  m:{pts:[[146,98],[108,72],[70,62],[58,70]],jaw:1,lips:"round",at:[66,58]},
  pos:{"닿는 곳":"/ʃ/ 자리에서 한 번 막았다가 '취·쥐'로 터뜨림","공기":"막았다가 마찰","성대":"tʃ 없음 · dʒ 있음"},
  trap:"한국어 'ㅊ·ㅈ'보다 입술을 더 내밀고 혀가 조금 더 뒤에 있어요. 끝소리 뒤에 '이'를 붙이지 않기.",
  pair:"chin / gin · watch / wash", vids:[]},
 {g:"혀 앞쪽 + 잇몸 뒤",ipa:"r",ex:"red, very, car",hard:true,
  m:{pts:[[146,98],[116,74],[80,78],[64,72]],jaw:2,lips:"round",at:[78,70]},
  pos:{"닿는 곳":"혀끝을 살짝 들거나 뒤로 말되 어디에도 닿지 않음. 혀 양옆은 윗어금니에","공기":"막힘 없이 흐름","성대":"있음"},
  trap:"'ㄹ'처럼 혀로 치면 안 돼요. 시작할 때 입술을 살짝 '우' 모양으로 모으면 쉬워요.",
  pair:"right / light · rice / lice · very / berry", vids:["r_r1","r_r2","r_rEnd","r_rl","o_r"]},
 {g:"혀 가운데 + 입천장",ipa:"j",ex:"yes, you",
  m:{pts:[[148,104],[108,62],[74,64],[48,90]],jaw:1,lips:"spread",at:[90,58]},
  pos:{"닿는 곳":"/i/ 위치에서 바로 다음 모음으로 미끄러짐","공기":"막힘 없음","성대":"있음"},
  trap:"year와 ear를 구분하려면 시작할 때 혀를 /i/보다 더 높이.",
  pair:"year / ear · yes / s", vids:[]},
 {g:"혀 뒤 + 여린입천장",ipa:"k · g",ex:"cat / go",
  m:{pts:[[150,82],[138,58],[100,76],[52,98]],jaw:2,lips:"rest",at:[140,54]},
  pos:{"닿는 곳":"혀 뒤쪽을 여린입천장에 붙였다가 뗌","공기":"k는 바람 세게, g는 울림","성대":"k 없음 · g 있음"},
  trap:"단어 끝 k, g 뒤에 '으'를 붙이지 않기(bag ≠ 백그).",
  pair:"coat / goat · back / bag", vids:["r_eu"]},
 {g:"혀 뒤 + 여린입천장",ipa:"ŋ",ex:"sing, thinking",
  m:{pts:[[150,82],[138,58],[100,76],[52,98]],jaw:2,lips:"rest",at:[140,54],nasal:true},
  pos:{"닿는 곳":"혀 뒤쪽을 여린입천장에 붙임","공기":"코로 나감","성대":"있음"},
  trap:"한국어 'ㅇ' 받침과 같아요. sing 뒤에 'g' 소리를 따로 내지 않기.",
  pair:"sing / sin · thing / thin", vids:[]},
 {g:"목",ipa:"h",ex:"he, how, him",
  m:{pts:REST.pts,jaw:4,lips:"rest",at:[160,96]},
  pos:{"닿는 곳":"어디에도 닿지 않음. 목에서 바람만","공기":"다음 모음 입 모양으로 '하~' 숨","성대":"없음"},
  trap:"he, him, her는 문장 속에서 h가 거의 빠져요(tell him → '텔림'). 듣기에 중요해요.",
  pair:"", vids:["o_h"]},
];

/* ---- 단어장 ---- */
const ANIMKEY={C07:"ɾ (미국식 t)",C15:"k · g",V02:"ɪ ",V04:"æ ",V07:"ɔ ",V08:"ʊ ",V11:"ə "};
const soundEntry=id=>[...VOWELS_AU,...CONS].find(x=>x.ipa===(ANIMKEY[id]||SOUND[id]));
function mountMouth(box,id){ const s=soundEntry(id); if(!s){box.innerHTML="";return;} box.innerHTML=stageHtml(s.ipa)+(s.vids&&s.vids.length&&V[s.vids[0]]?`<div class="vid">Video: <a href="${url(V[s.vids[0]].id)}" target="_blank" rel="noopener">${esc(V[s.vids[0]].t)}</a></div>`:""); const fig=box.querySelector("figure.stage"); fig.querySelectorAll(".vsw button").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation(); fig.querySelectorAll(".view").forEach(v=>v.classList.toggle("on",v.classList.contains(b.dataset.v))); fig.querySelectorAll(".vsw button").forEach(x=>x.setAttribute("aria-pressed",x===b));})); const st=buildSteps(s); if(st) new Player(fig,st); }
const SOUND = {V01:"iː",V02:"ɪ",V03:"e",V04:"æ",V05:"ɐ",V06:"ɐː",V07:"ɔ",V08:"ʊ",V09:"ʉː",V10:"ɜː",V11:"ə",V12:"oː",V13:"æɪ",V14:"ɑe",V15:"oɪ",V16:"æɔ",V17:"əʉ",V18:"ɪə",V19:"eː",V20:"ʊə",
C01:"p · b",C02:"m",C03:"w",C04:"f · v",C05:"θ · ð",C06:"t · d",C07:"ɾ",C08:"n",C09:"s · z",C10:"l",C11:"ʃ · ʒ",C12:"tʃ · dʒ",C13:"r",C14:"j",C15:"k · ɡ",C16:"ŋ",C17:"h"};
const KO = {V01:["이","길게. 끝을 살짝 '이이'처럼 끌어 줌"],V02:["이","짧게. 한국어 '이'와 거의 같음"],V03:["에","한국어 '에'와 거의 같음. 짧게"],V04:["애","턱을 더 내리고 입은 옆으로"],V05:["아","짧고 가볍게. 턱은 조금만"],V06:["아","길게 끄는 '아'. 철자 r은 읽지 않음"],V07:["오","입을 더 벌린 짧은 '오'"],V08:["우","짧고 느슨하게"],V09:["우","입술은 둥글게, 혀는 앞으로. '유'에 가까운 '우'"],V10:["어","입술을 살짝 오므린 긴 '어'. 혀는 말지 않음"],V11:["약한 어","아주 약하게, 거의 안 들리게"],V12:["오","입술을 동그랗게 모아 길게"],V13:["애이","'애'에서 시작해 '이'로 미끄러짐"],V14:["아에","뒤쪽 '아'에서 시작해 '에' 쪽으로"],V15:["오이","한 덩어리로"],V16:["애오","'애'에서 시작해 입술을 모으며 '오'로"],V17:["어우","'어'에서 시작해 '우'로"],V18:["이어","'이'에서 약한 '어'로. 혀를 말지 않음"],V19:["에","길게 끄는 '에'. 혀를 말지 않음"],V20:["우어","'우'에서 약한 '어'로"],C01:["ㅍ · ㅂ","p는 바람을 세게"],C02:["ㅁ","같음"],C03:["우","입술을 작게 모았다가 바로 풂"],C04:["없음","ㅍ·ㅂ 아님. 윗니를 아랫입술에"],C05:["없음","ㅆ·ㄷ 아님. 혀끝을 윗니 끝에"],C06:["ㅌ · ㄷ","혀끝을 윗잇몸에"],C07:["ㄹ","모음 사이에서 혀로 한 번 톡"],C08:["ㄴ","같음"],C09:["ㅅ·ㅆ · 없음","z는 ㅈ 아님. 목을 울린 ㅅ"],C10:["ㄹ 받침","혀끝을 윗잇몸에 꾹 붙임"],C11:["쉬","입술을 앞으로 내밂"],C12:["ㅊ · ㅈ","입술을 앞으로 내밂"],C13:["없음","ㄹ 아님. 혀끝이 어디에도 안 닿음. 모음 앞에서만 소리 냄"],C14:["이(야·유의 ㅣ)","바로 다음 모음으로"],C15:["ㅋ · ㄱ","k는 바람을 세게"],C16:["ㅇ 받침","같음"],C17:["ㅎ","같음"]};
