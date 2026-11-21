"""Build the 625 base words (pack A) for the web app.

Usage: python3 -I build_words.py <cmudict.dict> <frequency-12000.json> <out words-a.js>

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

V = {"IY": "i", "IH": "ɪ", "EY": "eɪ", "EH": "ɛ", "AE": "æ", "UW": "u", "UH": "ʊ",
     "OW": "oʊ", "AO": "ɔ", "AA": "ɑ", "AY": "aɪ", "AW": "aʊ", "OY": "ɔɪ"}
C = {"P": "p", "B": "b", "M": "m", "W": "w", "F": "f", "V": "v", "TH": "θ", "DH": "ð",
     "T": "t", "D": "d", "N": "n", "S": "s", "Z": "z", "L": "l", "SH": "ʃ", "ZH": "ʒ",
     "CH": "tʃ", "JH": "dʒ", "R": "r", "Y": "j", "K": "k", "G": "ɡ", "NG": "ŋ", "HH": "h"}
SID = {"i": "V01", "ɪ": "V02", "eɪ": "V03", "ɛ": "V04", "æ": "V05", "ʌ": "V06", "ə": "V07",
       "ɝ": "V08", "ɚ": "V08", "u": "V09", "ʊ": "V10", "oʊ": "V11", "ɔ": "V12", "ɑ": "V13",
       "aɪ": "V14", "aʊ": "V15", "ɔɪ": "V16",
       "p": "C01", "b": "C01", "m": "C02", "w": "C03", "f": "C04", "v": "C04", "θ": "C05",
       "ð": "C05", "t": "C06", "d": "C06", "ɾ": "C07", "n": "C08", "s": "C09", "z": "C09",
       "l": "C10", "ʃ": "C11", "ʒ": "C11", "tʃ": "C12", "dʒ": "C12", "r": "C13", "j": "C14",
       "k": "C15", "ɡ": "C15", "ŋ": "C16", "h": "C17"}
HARD = {"V01", "V02", "V05", "V06", "V07", "V08", "V10", "V11", "V12", "V13",
        "C03", "C04", "C05", "C07", "C09", "C10", "C13"}
CLUSTERS = """p l|b l|k l|ɡ l|f l|s l|p r|b r|t r|d r|k r|ɡ r|f r|θ r|ʃ r|t w|d w|k w|ɡ w|s w|θ w|s p|s t|s k|s m|s n|s p l|s p r|s t r|s k r|s k w|p j|b j|k j|m j|f j|v j|h j|n j|s k j"""
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


def convert(ph):
    """-> list of dicts {s: ipa, v: is_vowel, st: '1'|'2'|'0'|''}"""
    seg = []
    for i, p in enumerate(ph):
        base, st = re.match(r"([A-Z]+)(\d?)", p).groups()
        nxt = ph[i + 1] if i + 1 < len(ph) else None
        r_follows = nxt == "R" and (i + 2 >= len(ph) or not isv(ph[i + 2]))
        if base == "AH":
            s = "ʌ" if st in ("1", "2") else "ə"
        elif base == "ER":
            s = "ɝ" if st in ("1", "2") else "ɚ"
        elif base in V:
            s = V[base]
            if r_follows:
                s = {"i": "ɪ", "eɪ": "ɛ", "u": "ʊ"}.get(s, s)
        else:
            s = C[base]
            if base in ("T", "D") and 0 < i < len(ph) - 1:
                prev = ph[i - 1]
                prev_ok = isv(prev) or (prev == "R" and i >= 2 and isv(ph[i - 2]))
                nxt_unstressed = isv(nxt) and nxt[-1] == "0"
                button = base == "T" and nxt == "AH0" and i + 2 < len(ph) and ph[i + 2] == "N"
                if prev_ok and nxt_unstressed and not button:
                    s = "ɾ"
        alt = "ɑ" if base == "AO" and not r_follows else None
        seg.append({"s": s, "v": isv(p), "st": st if isv(p) else "", "alt": alt})
    return seg


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
    seg = convert(ph)
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
        warn.append("t를 혀로 한 번 톡 치는 미국식 t")
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


def main():
    cmu = load_cmu(sys.argv[1])
    rows = json.load(open(sys.argv[2], encoding="utf-8"))["rows"]
    words, skipped = [], []
    for r in rows:
        lw = r["lemma"].lower()
        if r["lemma"] == "I":
            lw = "i"
            if any(x["w"] == "I" for x in words):
                continue
            ph = cmu.get("i")
            entry = build("I", ph)
        else:
            if lw in EXCLUDE or lw in (x["w"] for x in words):
                skipped.append(lw)
                continue
            ph = cmu.get(lw)
            if not ph:
                skipped.append(lw + "(no cmu)")
                continue
            entry = build(lw, ph)
        entry["rank"] = r["rank"]
        if lw in EMO:
            entry["emo"] = EMO[lw]
        words.append(entry)
        if len(words) == 625:
            break
    for i, x in enumerate(words, 1):
        x["n"] = f"{i:03d}"
    out = [{k: x[k] for k in ("n", "w", "rank", "ipa", "alt", "seg", "sounds", "hard", "warn") } | ({"emo": x["emo"]} if "emo" in x else {}) for x in words]
    with open(sys.argv[3], "w", encoding="utf-8") as f:
        f.write("// generated by tools/build_words.py — pack A, 625 base words\n")
        f.write("window.PACK_A = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("words", len(out), "last rank", words[-1]["rank"], "skipped", skipped, file=sys.stderr)


if __name__ == "__main__":
    main()
