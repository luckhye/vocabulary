/**
 * Sound Deck — "Don't know" list backup in a Google Sheet.
 * Sheet columns: No | Word | Day | Date
 * GET  -> {"missed": {"037": 2, ...}}
 * POST -> body {"items":[{"n":"037","w":"...","day":2,"date":"2026-11-25"}]} (one row per word, updated in place)
 */
function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName("Missed") || ss.insertSheet("Missed");
  if (sh.getLastRow() === 0) sh.appendRow(["No", "Word", "Day", "Date"]);
  sh.getRange("A:A").setNumberFormat("@");
  return sh;
}
function doGet() {
  const sh = sheet_(), rows = sh.getDataRange().getValues().slice(1), missed = {};
  rows.forEach(r => { if (r[0] !== "") missed[String(r[0]).padStart(3, "0")] = Number(r[2]); });
  return ContentService.createTextOutput(JSON.stringify({ missed })).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const items = (JSON.parse(e.postData.contents).items || []);
    const sh = sheet_(), vals = sh.getDataRange().getValues();
    const at = {}; vals.forEach((r, i) => { if (i) at[String(r[0]).padStart(3, "0")] = i + 1; });
    items.forEach(it => {
      const row = [String(it.n), it.w || "", Number(it.day), it.date || ""];
      if (at[it.n]) sh.getRange(at[it.n], 1, 1, 4).setValues([row]);
      else { sh.appendRow(row); at[it.n] = sh.getLastRow(); }
    });
    return ContentService.createTextOutput(JSON.stringify({ ok: true }));
  } finally { lock.releaseLock(); }
}
