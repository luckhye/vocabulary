"""Build the 625 base words (pack A) for the web app.

Usage: python3 -I build_words.py <cmudict.dict> <frequency-12000.json> <field-words-au.json> <out dir>

Rules (spec sections 8, 13, 14):
- order = SUBTLEX-US lemma rank, after dropping profanity, interjections,
  names and duplicates (EXCLUDE below)
- IPA from CMUdict, general American:
  stress mark before the syllable onset (maximal legal onset),
  flap ɾ for t/d between a vowel (or vowel+r) and an unstressed vowel,
  r-coloured vowels: iy r -> ɪr, ey r -> ɛr, uw r -> ʊr,
  AO -> ɔ with ɑ given as an alternative (except before r)
- each segment is tagged with a sound card id V01..V16 / C01..C17
"""
import json, re, sys

EXCLUDE = {
    # profanity
    "fuck", "shit", "ass", "bitch", "damn",
    # interjections / fillers
    "uh", "um", "huh", "ah", "whoa", "ha", "ma",
    # names, artefacts, duplicates
    "jack", "sam", "gan", "i", "ok",
}
# extra exclusions for pack B (ranks 626-3000): slurs and profanity, names,
# place/nationality names, abbreviations and transcript artefacts
EXCLUDE_B = set("""
bastard asshole bullshit motherfucker dick pussy whore nigger nigga piss pissed rape tit penis fucker cock
prick hooker christ
ray bob jimmy henry ed max bobby billy tony nick roger tommy lee jake ted martin smith brian carter anna matt
jones piper brad mac eve carl hank sally rick morgan terry willie jess potter josh ruth earl jenny jordan
barney mickey kirk mitch cooper victor bundy meg ken felicity porter jay walker teddy steven ralph mel warren
daisy diane wally griffin murphy mason sherry sammy jo ling lin gene wade sonny dean walter sandy
american chinese german russian japanese spanish british dutch jew jewish christian london china japan berlin
americans hong opus wive monsieur madame
th l ln ld la ms st co com de el se et da mon er mm hm ooh aah ow shh eh aw ugh whoo aye yo ho mar pa
""".split())

V = {"IY": "i", "IH": "ɪ", "EY": "eɪ", "EH": "ɛ", "AE": "æ", "UW": "u", "UH": "ʊ",
     "OW": "oʊ", "AO": "ɔ", "AA": "ɑ", "AY": "aɪ", "AW": "aʊ", "OY": "ɔɪ"}
C = {"P": "p", "B": "b", "M": "m", "W": "w", "F": "f", "V": "v", "TH": "θ", "DH": "ð",
     "T": "t", "D": "d", "N": "n", "S": "s", "Z": "z", "L": "l", "SH": "ʃ", "ZH": "ʒ",
     "CH": "tʃ", "JH": "dʒ", "R": "r", "Y": "j", "K": "k", "G": "ɡ", "NG": "ŋ", "HH": "h"}
# General Australian English sound cards (spec section 17)
SID = {"iː": "V01", "ɪ": "V02", "e": "V03", "æ": "V04", "ɐ": "V05", "ɐː": "V06", "ɔ": "V07",
       "ʊ": "V08", "ʉː": "V09", "ɜː": "V10", "ə": "V11", "oː": "V12", "æɪ": "V13", "ɑe": "V14",
       "oɪ": "V15", "æɔ": "V16", "əʉ": "V17", "ɪə": "V18", "eː": "V19", "ʊə": "V20",
       "p": "C01", "b": "C01", "m": "C02", "w": "C03", "f": "C04", "v": "C04", "θ": "C05",
       "ð": "C05", "t": "C06", "d": "C06", "ɾ": "C07", "n": "C08", "s": "C09", "z": "C09",
       "l": "C10", "ʃ": "C11", "ʒ": "C11", "tʃ": "C12", "dʒ": "C12", "r": "C13", "j": "C14",
       "k": "C15", "ɡ": "C15", "ŋ": "C16", "h": "C17"}
HARD = {"V04", "V05", "V06", "V09", "V10", "V11", "V13", "V14", "V16", "V17", "V18", "V19",
        "C03", "C04", "C05", "C07", "C09", "C10", "C13"}
# TRAP-BATH: ɐː before f, θ, s ... except these
BATH_NOT = {"gas", "mass", "math", "maths", "classic", "classical", "passage", "passenger", "plastic",
            "athlete", "asset", "massive", "pasta", "fascinating", "fashion", "assassin", "ass", "hassle",
            "tassel", "passion", "classy", "jasmine", "aspect", "aspirin", "asterisk", "rascal"}
BATH_ALSO = {"can't", "aunt", "banana", "tomato", "shan't", "vase", "example", "sample"}
LOT_BEFORE_R = {"orange", "forest", "foreign", "horrible", "horror", "quarrel", "warrant", "origin",
                "coral", "moral", "corridor", "majority", "minority", "priority", "authority", "historic"}
THOUGHT_NOT = {"because"}
CLUSTERS = """p l|b l|k l|ɡ l|f l|s l|p r|b r|t r|d r|k r|ɡ r|f r|θ r|ʃ r|t w|d w|k w|ɡ w|s w|θ w|s p|s t|s k|s m|s n|s p l|s p r|s t r|s k r|s k w|p j|b j|k j|m j|f j|v j|h j|n j|s k j|t j|d j|s t j"""
ONSETS = {tuple(x.split()) for x in CLUSTERS.split("|")}
ONSETS |= {(c,) for c in ["p", "b", "t", "d", "k", "ɡ", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ",
                          "h", "tʃ", "dʒ", "m", "n", "l", "r", "w", "j"]}


def load_cmu(path):
    cmu = {}
    for line in open(path, encoding="utf-8"):
        line = line.split("#")[0].strip()
        if not line:
            continue
        w, *ph = line.split()
        if "(" in w or w in cmu:
            continue
        cmu[w] = ph
    return cmu


def isv(p):
    return re.sub(r"\d", "", p) in V or p[:2] in ("AH", "ER")


def convert(ph, word=""):
    """CMUdict (American) -> General Australian. -> list of {s, v, st, dropped_r}"""
    w = word.lower()
    seg, dropped = [], False
    has_o = "o" in w
    thought_spelling = any(x in w for x in ("au", "aw", "al", "ough", "oa", "war", "quar")) or (
        "a" in w and not has_o)
    nvow = sum(isv(x) for x in ph)
    for i, p in enumerate(ph):
        base, st = re.match(r"([A-Z]+)(\d?)", p).groups()
        prev = ph[i - 1] if i else None
        nxt = ph[i + 1] if i + 1 < len(ph) else None
        r_follows = nxt == "R" and (i + 2 >= len(ph) or not isv(ph[i + 2]))
        r_any = nxt == "R"
        stressed = st in ("1", "2")
        last = i == len(ph) - 1
        out = None
        if base == "R":
            if not (nxt and isv(nxt)):
                dropped = True
                continue                       # non-rhotic: no r unless a vowel follows
            out = "r"
        elif base == "ER":
            if nxt and isv(nxt):
                seg.append({"s": "ɐ" if stressed else "ə", "v": True, "st": st})
                out = "r"
                seg.append({"s": out, "v": False, "st": ""})
                continue
            out = "ɜː" if stressed else "ə"
            dropped = True
        elif base == "AH":
            out = ("ɔ" if prev == "W" and w.startswith("wa") or w.startswith("wha") else "ɐ") if stressed else "ə"
        elif base == "IY":
            out = "ɪə" if r_follows else "iː"
        elif base == "IH":
            if r_follows:
                out = "ɪə"
            elif st == "0" and nvow > 1 and nxt != "NG" and not last:
                out = "ə"
            else:
                out = "ɪ"
        elif base == "EH":
            out = "eː" if r_follows else "e"
        elif base == "EY":
            out = "eː" if r_follows else ("ɐː" if stressed and w in BATH_ALSO else "æɪ")
        elif base == "AE":
            bath = stressed and w not in BATH_NOT and (
                w in BATH_ALSO or (nxt in ("F", "TH", "S") and not (i + 2 < len(ph) and isv(ph[i + 2]) and nxt == "S" and w.endswith("ic"))))
            out = "ɐː" if bath else "æ"
        elif base == "AA":
            if r_any and (r_follows or not has_o):
                out = "ɐː"
            elif prev == "W" or has_o:
                out = "ɔ"
            else:
                out = "ɐː"
        elif base == "AO":
            if r_any and w not in LOT_BEFORE_R:
                out = "oː"
            elif w in THOUGHT_NOT or w in LOT_BEFORE_R:
                out = "ɔ"
            elif thought_spelling:
                out = "oː"
            else:
                out = "ɔ"
        elif base == "UW":
            if r_follows:
                out = "ʊə"
            else:
                out = "ʉː"
                yod = prev in ("T", "D", "N") and stressed and (
                    "ew" in w or "eu" in w or re.search(r"[tdn]u", w)) and not ("oo" in w or "ou" in w)
                if yod and not (seg and seg[-1]["s"] == "j"):
                    seg.append({"s": "j", "v": False, "st": ""})
        elif base == "UH":
            out = "oː" if r_follows else "ʊ"
        elif base == "OW":
            out = "oː" if r_follows else "əʉ"
        elif base == "AY":
            out = "ɑe"
        elif base == "AW":
            out = "æɔ"
        elif base == "OY":
            out = "oɪ"
        else:
            out = C[base]
            if base in ("T", "D") and 0 < i < len(ph) - 1:
                prev_ok = isv(prev) or (prev == "R" and i >= 2 and isv(ph[i - 2]))
                nxt_unstressed = isv(nxt) and nxt[-1] == "0"
                button = base in ("T", "D") and nxt == "AH0" and i + 2 < len(ph) and ph[i + 2] == "N"
                if prev_ok and nxt_unstressed and not button:
                    out = "ɾ"
        seg.append({"s": out, "v": isv(p), "st": st if isv(p) else ""})
    seg_dropped_r = dropped and "r" in w
    for x in seg:
        x["alt"] = None
    return seg, seg_dropped_r


def stress_positions(seg):
    """index where each stressed syllable starts (maximal legal onset)."""
    nv = sum(x["v"] for x in seg)
    out = {}
    if nv < 2:
        return out
    for i, x in enumerate(seg):
        if not x["v"] or x["st"] not in ("1", "2"):
            continue
        j = i
        while j > 0 and not seg[j - 1]["v"]:
            cand = tuple(y["s"].replace("ɾ", "t") for y in seg[j - 1:i])
            if cand in ONSETS:
                j -= 1
            else:
                break
        if x["st"] == "1":
            out[j] = "ˈ"  # secondary stress is not shown
    return out


def build(word, ph):
    seg, dropped_r = convert(ph, word)
    marks = stress_positions(seg)
    parts, alt_parts = [], []
    for i, x in enumerate(seg):
        if i in marks:
            parts.append([marks[i], None])
            alt_parts.append(marks[i])
        parts.append([x["s"], SID[x["s"]]])
        alt_parts.append(x["alt"] or x["s"])
    ipa = "".join(p[0] for p in parts)
    alt = "".join(alt_parts)
    sounds = list(dict.fromkeys(p[1] for p in parts if p[1]))
    warn = []
    cons = [x for x in seg]
    # consonant cluster at the start
    if len(cons) > 1 and not cons[0]["v"] and not cons[1]["v"]:
        warn.append(f"{cons[0]['s']}{cons[1]['s']} 사이에 '으'를 넣지 않기")
    last = seg[-1]
    if not last["v"] and last["s"] not in ("m", "n", "ŋ", "l", "r"):
        warn.append(f"끝 {last['s']} 뒤에 '으'를 붙이지 않기")
    if "ɾ" in ipa:
        warn.append("모음 사이 t는 혀로 한 번 톡")
    if dropped_r:
        warn.append("모음 뒤 철자 r은 소리 내지 않기")
    return {"w": word, "ipa": ipa, "alt": alt if alt != ipa else None, "seg": parts,
            "sounds": sounds, "hard": [s for s in sounds if s in HARD], "warn": warn}


EMO = dict(x.split(":") for x in """
man:👨 time:⏰ love:❤️ money:💰 home:🏠 house:🏡 car:🚗 baby:👶 dog:🐕 water:💧 book:📖
phone:📱 door:🚪 eye:👁️ face:🙂 hand:✋ fire:🔥 light:💡 music:🎵 coffee:☕ ball:⚽ ring:💍
key:🔑 king:👑 horse:🐎 star:⭐ hospital:🏥 ship:🚢 bag:👜 road:🛣️ letter:✉️ rock:🪨 song:🎶
one:1️⃣ two:2️⃣ three:3️⃣ four:4️⃣ five:5️⃣ six:6️⃣ seven:7️⃣ ten:🔟 school:🏫 doctor:🧑‍⚕️
police:👮 food:🍽️ dance:💃 picture:🖼️ dinner:🍝 bed:🛏️ foot:🦶 kiss:💋 city:🏙️ white:⚪
black:⚫ red:🔴 movie:🎬 news:📰 train:🚆 paper:📄 hair:💇 sweet:🍬 arm:💪 card:🃏 cold:🥶
hot:🥵 christmas:🎄 girl:👧 boy:👦 woman:👩 family:👪 world:🌍 morning:🌅 night:🌙 day:☀️
minute:⏱️ hour:⌛ sleep:😴 eat:🍴 drink:🥤 walk:🚶 run:🏃 sit:🪑 cry:😢 laugh:😂 happy:😊
sick:🤒 funny:😆 scared:😨 smell:👃 sing:🎤 write:✍️ game:🎮 party:🎉 heart:💗 present:🎁
number:🔢 question:❓ sound:🔊 power:⚡ win:🏆 luck:🍀 lucky:🍀 test:📝 law:⚖️ office:🏢
town:🏘️ date:📅 gentleman:🎩 lady:👒 child:🧒 kid:🧒 friend:🤝 money:💰 eat:🍴 read:📚
call:📞 car:🚗 gun:🔫 money:💰 table:🍽️ air:🌬️ fly:🪽 cut:✂️ swim:🏊 fall:🍂 tree:🌳
open:🔓 lock:🔒 hide:🙈 wake:⏰ clean:🧹 cook:🧑‍🍳 smile:😄 angry:😠 sad:😢 big:🐘 little:🐭
""".split())


def entry_for(cmu, word):
    ph = cmu.get(word)
    return build(word, ph) if ph else None


def keep(x):
    return {k: x[k] for k in ("n", "d", "w", "ipa", "alt", "seg", "sounds", "hard", "warn") if k in x} | (
        {"emo": x["emo"]} if "emo" in x else {}) | ({"f": x["f"]} if "f" in x else {})


def write(path, name, desc, words):
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"// generated by tools/build_words.py — {desc}\n")
        f.write(f"window.{name} = ")
        json.dump([keep(x) for x in words], f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")


B_START, B_PER_DAY, C_PER_DAY = 13, 30, 20     # day index 13 = 2026-12-06 (day 14)
FIELDS = [("travel", "TRV", "Travel", 500), ("life", "AU", "Australia", 500), ("news", "NEWS", "News", 733),
          ("stocks", "ECO", "Money", 600), ("korea", "KR", "K-trend", 549)]


def main():
    """args: cmudict.dict frequency-12000.json field-words-au.json out_dir"""
    cmu = load_cmu(sys.argv[1])
    rows = json.load(open(sys.argv[2], encoding="utf-8"))["rows"]
    out_dir = sys.argv[4]
    seen, A, B, skipped = set(), [], [], []
    for r in rows:
        if r["rank"] > 3000:
            break
        lw = "I" if r["lemma"] == "I" else r["lemma"].lower()
        if lw in seen or lw in EXCLUDE or (len(A) == 625 and lw in EXCLUDE_B):
            skipped.append(lw); continue
        e = entry_for(cmu, "i" if lw == "I" else lw)
        if not e:
            skipped.append(lw + "(no cmu)"); continue
        e["w"] = lw
        if lw.lower() in EMO:
            e["emo"] = EMO[lw.lower()]
        seen.add(lw)
        (A if len(A) < 625 else B).append(e)
    for i, x in enumerate(A, 1):
        x["n"], x["d"] = f"{i:03d}", (i - 1) // 50
    for i, x in enumerate(B):
        x["n"], x["d"] = str(626 + i), B_START + i // B_PER_DAY
    # pack C: field words, one from each field in turn
    fw = json.load(open(sys.argv[3], encoding="utf-8"))["out"]
    lists = []
    for key, code, label, cap in FIELDS:
        got = []
        for r in fw[key]:
            lw = r["lemma"].lower()
            if lw in seen or lw in EXCLUDE or lw in EXCLUDE_B:
                continue
            e = entry_for(cmu, lw)
            if not e:
                continue
            e["w"], e["f"] = lw, label
            seen.add(lw)
            got.append(e)
            if len(got) == cap:
                break
        for i, x in enumerate(got, 1):
            x["n"] = f"{code}-{i:03d}"
        lists.append(got)
    C = []
    while any(lists):
        for l in lists:
            if l:
                C.append(l.pop(0))
    for i, x in enumerate(C):
        x["d"] = B_START + i // C_PER_DAY
    write(f"{out_dir}/words-a.js", "PACK_A", "pack A, 625 base words, 50 a day from day 1", A)
    write(f"{out_dir}/words-b.js", "PACK_B", "pack B, base ranks 626-3000, 30 a day from day 14", B)
    write(f"{out_dir}/words-c.js", "PACK_C", "pack C, field words (travel, Australia, news, money, K-trend), 20 a day from day 14", C)
    print("A", len(A), "B", len(B), "last B day", B[-1]["d"] + 1, "C", len(C), "last C day", C[-1]["d"] + 1,
          "fields", [sum(1 for x in C if x["f"] == f[2]) for f in FIELDS], file=sys.stderr)


if __name__ == "__main__":
    main()
