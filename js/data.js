// MaiAditza: aditz-taulak eta esaldiak
// ---------- Datuak ----------
const NOR = ["ni", "zu", "hura", "gu", "zuek", "haiek"];
const NORK = ["nik", "zuk", "hark", "guk", "zuek", "haiek"];
const NORI = ["niri", "zuri", "hari", "guri", "zuei", "haiei"];
const TENSES = {
  or: "Orainaldia",
  le: "Lehenaldia",
  ke: "Baldintza (-ke)",
  ba: "Baldintza (ba-)",
  ah: "Ahalera",
  su: "Subjuntiboa"
};
const GROUPS = ["NOR", "NOR-NORI", "NOR-NORK", "NOR-NORI-NORK", "Aditz trinkoak"];
// Adibideak: liburukoak (NOR-NORK, NOR-NORI-NORK) eta antzekoak
const EXAMPLES = {
  "NOR": "Ni ikaslea naiz. · Gu etxera joan ginen.",
  "NOR-NORI": "Liburua gustatzen zait. · Giltzak ahaztu zaizkio.",
  "NOR-NORK": "Nik ikusi dut. · Haiek egin dute. · Nik maite zaitut.",
  "NOR-NORI-NORK": "Nik zuri liburua eman dizut. · Ematen nizun.",
  "Aditz trinkoak": "Ni etxean nago. · Zuk badakizu."
};

const EX = [];
// labels: izenordainak; forms: hutsunez bereizita, "/" aukerentzat, "-" hutsunerako
function add(g, verb, t, ctx, labels, forms) {
  const f = forms.trim().split(/\s+/);
  const rows = labels.map((l, i) => ({ l, f: f[i].split("/") })).filter(r => r.f[0] !== "-");
  EX.push({ id: EX.length, g, verb, t, ctx, rows, nor: ctx ? ctx.split(" · ")[0] : "" });
}

// NOR · izan
add("NOR", "izan", "or", "", NOR, "naiz zara da gara zarete dira");
add("NOR", "izan", "le", "", NOR, "nintzen zinen zen ginen zineten ziren");
add("NOR", "izan", "ke", "", NOR, "nintzateke zintzateke litzateke ginateke zintzatekete lirateke");
add("NOR", "izan", "ba", "", NOR, "banintz bazina balitz bagina bazinete balira");
add("NOR", "izan (*edin)", "ah", "", NOR, "naiteke zaitezke daiteke gaitezke zaitezkete daitezke");
add("NOR", "izan (*edin)", "su", "", NOR, "nadin zaitezen dadin gaitezen zaitezten daitezen");

// NOR-NORI · izan
const Z = "izan (*zait)";
add("NOR-NORI", Z, "or", "hura", NORI, "zait zaizu zaio zaigu zaizue zaie");
add("NOR-NORI", Z, "or", "haiek", NORI, "zaizkit zaizkizu zaizkio zaizkigu zaizkizue zaizkie");
add("NOR-NORI", Z, "le", "hura", NORI, "zitzaidan zitzaizun zitzaion zitzaigun zitzaizuen zitzaien");
add("NOR-NORI", Z, "le", "haiek", NORI, "zitzaizkidan zitzaizkizun zitzaizkion zitzaizkigun zitzaizkizuen zitzaizkien");
add("NOR-NORI", Z, "or", "ni", NORI, "- natzaizu natzaio - natzaizue natzaie");
add("NOR-NORI", Z, "or", "zu", NORI, "zatzaizkit - zatzaizkio zatzaizkigu - zatzaizkie");
add("NOR-NORI", Z, "or", "gu", NORI, "- gatzaizkizu gatzaizkio - gatzaizkizue gatzaizkie");
add("NOR-NORI", Z, "or", "zuek", NORI, "zatzaizkidate - zatzaizkiote zatzaizkigute - zatzaizkiete");
add("NOR-NORI", Z, "le", "ni", NORI, "- nintzaizun nintzaion - nintzaizuen nintzaien");
add("NOR-NORI", Z, "le", "zu", NORI, "zintzaizkidan - zintzaizkion zintzaizkigun - zintzaizkien");
add("NOR-NORI", Z, "le", "gu", NORI, "- gintzaizkizun gintzaizkion - gintzaizkizuen gintzaizkien");
add("NOR-NORI", Z, "le", "zuek", NORI, "zintzaizkidaten - zintzaizkioten zintzaizkiguten - zintzaizkieten");
add("NOR-NORI", Z, "ke", "hura", NORI, "litzaidake litzaizuke litzaioke litzaiguke litzaizueke litzaieke");
add("NOR-NORI", Z, "ke", "haiek", NORI, "litzaizkidake litzaizkizuke litzaizkioke litzaizkiguke litzaizkizueke litzaizkieke");

// NOR-NORK · ukan
const U = "ukan (*edun)";
add("NOR-NORK", U, "or", "hura", NORK, "dut duzu du dugu duzue dute");
add("NOR-NORK", U, "or", "haiek", NORK, "ditut dituzu ditu ditugu dituzue dituzte");
add("NOR-NORK", U, "or", "ni", NORK, "- nauzu nau - nauzue naute");
add("NOR-NORK", U, "or", "zu", NORK, "zaitut - zaitu zaitugu - zaituzte");
add("NOR-NORK", U, "or", "gu", NORK, "- gaituzu gaitu - gaituzue gaituzte");
add("NOR-NORK", U, "or", "zuek", NORK, "zaituztet - zaituzte zaituztegu - zaituztete");
add("NOR-NORK", U, "le", "hura", NORK, "nuen zenuen zuen genuen zenuten zuten");
add("NOR-NORK", U, "le", "haiek", NORK, "nituen zenituen zituen genituen zenituzten zituzten");
add("NOR-NORK", U, "le", "ni", NORK, "- ninduzun ninduen - ninduzuen ninduten");
add("NOR-NORK", U, "le", "zu", NORK, "zintudan - zintuen zintugun - zintuzten");
add("NOR-NORK", U, "le", "gu", NORK, "- gintuzun gintuen - gintuzuen gintuzten");
add("NOR-NORK", U, "le", "zuek", NORK, "zintuztedan - zintuzten zintuztegun - zintuzteten");
add("NOR-NORK", U, "ke", "hura", NORK, "nuke zenuke luke genuke zenukete lukete");
add("NOR-NORK", U, "ke", "haiek", NORK, "nituzke zenituzke lituzke genituzke zenituzkete lituzkete");
add("NOR-NORK", U, "ba", "hura", NORK, "banu bazenu balu bagenu bazenute balute");
add("NOR-NORK", U, "ba", "haiek", NORK, "banitu bazenitu balitu bagenitu bazenituzte balituzte");
add("NOR-NORK", "ukan (*ezan)", "ah", "hura", NORK, "dezaket dezakezu dezake dezakegu dezakezue dezakete");
add("NOR-NORK", "ukan (*ezan)", "ah", "haiek", NORK, "ditzaket ditzakezu ditzake ditzakegu ditzakezue ditzakete");
add("NOR-NORK", "ukan (*ezan)", "su", "hura", NORK, "dezadan dezazun dezan dezagun dezazuen dezaten");
add("NOR-NORK", "ukan (*ezan)", "su", "haiek", NORK, "ditzadan ditzazun ditzan ditzagun ditzazuen ditzaten");

// NOR-NORI-NORK · ukan (NORI ordena: niri zuri hari guri zuei haiei)
const NNN = {
  or: {
    hura: {
      nik:   "- dizut diot - dizuet diet",
      zuk:   "didazu - diozu diguzu - diezu",
      hark:  "dit dizu dio digu dizue die",
      guk:   "- dizugu diogu - dizuegu diegu",
      zuek:  "didazue - diozue diguzue - diezue",
      haiek: "didate dizute diote digute dizuete diete"
    },
    haiek: {
      nik:   "- dizkizut dizkiot - dizkizuet dizkiet",
      zuk:   "dizkidazu - dizkiozu dizkiguzu - dizkiezu",
      hark:  "dizkit dizkizu dizkio dizkigu dizkizue dizkie",
      guk:   "- dizkizugu dizkiogu - dizkizuegu dizkiegu",
      zuek:  "dizkidazue - dizkiozue dizkiguzue - dizkiezue",
      haiek: "dizkidate dizkizute dizkiote dizkigute dizkizuete dizkiete"
    }
  },
  le: {
    hura: {
      nik:   "- nizun nion - nizuen nien",
      zuk:   "zenidan - zenion zenigun - zenien",
      hark:  "zidan zizun zion zigun zizuen zien",
      guk:   "- genizun genion - genizuen genien",
      zuek:  "zenidaten - zenioten zeniguten - zenieten",
      haiek: "zidaten zizuten zioten ziguten zizueten zieten"
    },
    haiek: {
      nik:   "- nizkizun nizkion - nizkizuen nizkien",
      zuk:   "zenizkidan - zenizkion zenizkigun - zenizkien",
      hark:  "zizkidan zizkizun zizkion zizkigun zizkizuen zizkien",
      guk:   "- genizkizun genizkion - genizkizuen genizkien",
      zuek:  "zenizkidaten - zenizkioten zenizkiguten - zenizkieten",
      haiek: "zizkidaten zizkizuten zizkioten zizkiguten zizkizueten zizkieten"
    }
  }
};
for (const t of ["or", "le"]) for (const obj of ["hura", "haiek"]) for (const k of NORK) {
  add("NOR-NORI-NORK", U, t, obj + " · NORK: " + k, NORI, NNN[t][obj][k]);
}

// Aditz trinkoak (gehigarriak)
const S = (verb, t, forms, ctx = "", labels = NOR) => add("Aditz trinkoak", verb, t, ctx, labels, forms);
S("egon", "or", "nago zaude dago gaude zaudete daude");
S("egon", "le", "nengoen zeunden zegoen geunden zeundeten zeuden");
S("joan", "or", "noa zoaz doa goaz zoazte doaz");
S("joan", "le", "nindoan zindoazen zihoan gindoazen zindoazten zihoazen");
S("etorri", "or", "nator zatoz dator gatoz zatozte datoz");
S("etorri", "le", "nentorren zentozen zetorren gentozen zentozten zetozen");
S("ibili", "or", "nabil zabiltza dabil gabiltza zabiltzate dabiltza");
S("ibili", "le", "nenbilen zenbiltzan zebilen genbiltzan zenbiltzaten zebiltzan");
S("jakin", "or", "dakit dakizu daki dakigu dakizue dakite", "hura", NORK);
S("jakin", "le", "nekien zenekien zekien genekien zenekiten zekiten", "hura", NORK);
S("eduki", "or", "daukat daukazu dauka daukagu daukazue daukate", "hura", NORK);
S("eduki", "or", "dauzkat dauzkazu dauzka dauzkagu dauzkazue dauzkate", "haiek", NORK);
S("eduki", "le", "neukan zeneukan zeukan geneukan zeneukaten zeukaten", "hura", NORK);
S("eduki", "le", "neuzkan zeneuzkan zeuzkan geneuzkan zeneuzkaten zeuzkaten", "haiek", NORK);


// ---------- Esaldiak ----------
// "___" = hutsunea; a = erantzun zuzenak ("/" aukerentzat); v = aditz trinkoetan, zein aditz den
const SENT = [];
const sent = (g, t, list) => list.forEach(([s, a, v]) => SENT.push({ id: SENT.length, g, t, s, f: a.split("/"), v }));

sent("NOR", "or", [
  ["Ni Bilbokoa ___.", "naiz"],
  ["Zu oso langilea ___.", "zara"],
  ["Amaia gaur goiz jaiki ___.", "da"],
  ["Gu bihar Donostiara joango ___.", "gara"],
  ["Zuek nire lagunak ___.", "zarete"],
  ["Haiek irakasleak ___.", "dira"]
]);
sent("NOR", "le", [
  ["Ni atzo zinemara joan ___.", "nintzen"],
  ["Zu berandu etorri ___.", "zinen"],
  ["Mikel iaz Londresera joan ___.", "zen"],
  ["Gu hondartzan ibili ___.", "ginen"],
  ["Zuek goiz esnatu ___.", "zineten"],
  ["Haiek Gasteizen jaio ___.", "ziren"]
]);
sent("NOR", "ke", [
  ["Dirua banu, ni munduan zehar bidaiatzera joango ___.", "nintzateke"],
  ["Zu ere etorriko ___, baina lan asko duzu.", "zintzateke"],
  ["Hura etorriko ___, baina gaixorik dago.", "litzateke"],
  ["Gu pozik egongo ___ zuekin.", "ginateke"]
]);
sent("NOR", "ba", [
  ["Ni aberatsa ___, etxe handi bat erosiko nuke.", "banintz"],
  ["Zu etorriko ___, pozik egongo nintzateke.", "bazina"],
  ["Hura hemen ___, lagunduko liguke.", "balitz"],
  ["Haiek garaiz etorriko ___, afaltzera joango ginateke.", "balira"]
]);
sent("NOR", "ah", [
  ["Ni bihar etor ___.", "naiteke"],
  ["Zuek hemen eser ___.", "zaitezkete"],
  ["Hori edonori gerta ___.", "daiteke"],
  ["Gu autobusez joan ___.", "gaitezke"]
]);
sent("NOR", "su", [
  ["Nahi dut zu goiz etor ___.", "zaitezen"],
  ["Deitu diot hura ere etor ___.", "dadin"],
  ["Itxaron, ni prest egon ___.", "nadin"],
  ["Etorri hona, gu elkarrekin joan ___.", "gaitezen"]
]);
sent("NOR-NORI", "or", [
  ["Niri txokolatea asko gustatzen ___.", "zait"],
  ["Zuri liburu hauek gustatzen ___?", "zaizkizu"],
  ["Ikasleari giltzak ahaztu ___.", "zaizkio"],
  ["Guri ogia erre ___.", "zaigu"],
  ["Zuei autoa hondatu ___.", "zaizue"],
  ["Haiei sagarrak gustatzen ___.", "zaizkie"],
  ["Ni zuri gustatzen ___?", "natzaizu"],
  ["Ni amari hurbildu ___.", "natzaio"],
  ["Zu niri asko gustatzen ___.", "zatzaizkit"],
  ["Gu irakasleari hurbildu ___.", "gatzaizkio"],
  ["Zuek guri asko gustatzen ___.", "zatzaizkigute"]
]);
sent("NOR-NORI", "le", [
  ["Niri telefonoa erori ___.", "zitzaidan"],
  ["Zuri betaurrekoak galdu ___.", "zitzaizkizun"],
  ["Mikeli etxeko giltza ahaztu ___.", "zitzaion"],
  ["Guri pelikula asko gustatu ___.", "zitzaigun"],
  ["Zuei txakurra galdu ___?", "zitzaizuen"],
  ["Haiei autobusa joan ___.", "zitzaien"],
  ["Ni atzo zuri hurbildu ___.", "nintzaizun"],
  ["Zu niri kalean agertu ___.", "zintzaizkidan"],
  ["Gu haiei hurbildu ___.", "gintzaizkien"],
  ["Zuek amari ahaztu ___.", "zintzaizkioten"]
]);
sent("NOR-NORI", "ke", [
  ["Niri hori asko gustatuko ___.", "litzaidake"],
  ["Zuri ere gustatuko ___ mendi hauek.", "litzaizkizuke"],
  ["Haiei ez ___ gustatuko.", "litzaieke"]
]);
sent("NOR-NORK", "or", [
  ["Nik goizean kafea edaten ___.", "dut"],
  ["Zuk liburu asko irakurri ___.", "dituzu"],
  ["Amaiak bi anaia ___.", "ditu"],
  ["Guk etxea garbitu ___.", "dugu"],
  ["Zuek etxeko lanak egin ___?", "dituzue"],
  ["Haiek pelikula ikusi ___.", "dute"],
  ["Nik zu maite ___.", "zaitut"],
  ["Amak ni eskolara eramaten ___.", "nau"],
  ["Zuk ni ulertzen ___?", "nauzu"],
  ["Irakasleak gu ikusi ___.", "gaitu"],
  ["Nik zuek gonbidatu ___.", "zaituztet"],
  ["Haiek gu kotxez ekarri ___.", "gaituzte"]
]);
sent("NOR-NORK", "le", [
  ["Nik atzo ogia erosi ___.", "nuen"],
  ["Zuk sagar guztiak jan ___.", "zenituen"],
  ["Hark ni etxera eraman ___.", "ninduen"],
  ["Guk zu kalean ikusi ___.", "zintugun"],
  ["Zuek gu ondo zaindu ___.", "gintuzuen"],
  ["Haiek oporrak Italian pasatu ___.", "zituzten"],
  ["Haiek zuek festara gonbidatu ___.", "zintuzteten"]
]);
sent("NOR-NORK", "ke", [
  ["Nik kafe bat hartuko ___.", "nuke"],
  ["Guk etxe hori erosiko ___, dirua bagenu.", "genuke"],
  ["Haiek liburu horiek pozik irakurriko ___.", "lituzkete"]
]);
sent("NOR-NORK", "ba", [
  ["Nik denbora ___, mendira joango nintzateke.", "banu"],
  ["Zuk giltzak ___, etxera sartu ahal izango ginateke.", "bazenitu"],
  ["Hark egia esango ___, denok lasaiago egongo ginateke.", "balu"]
]);
sent("NOR-NORK", "ah", [
  ["Nik gaur auto hori gida ___.", "dezaket"],
  ["Zuk leihoa ireki ___?", "dezakezu"],
  ["Guk liburu horiek ekar ___.", "ditzakegu"]
]);
sent("NOR-NORK", "su", [
  ["Liburua ekarri dizut, zuk irakur ___.", "dezazun"],
  ["Lagundu iezadazu, nik lana buka ___.", "dezadan"],
  ["Ekarri ditut sagarrak, haurrek jan ___.", "ditzaten"]
]);
sent("NOR-NORI-NORK", "or", [
  ["Nik zuri liburua eman ___.", "dizut"],
  ["Zuk niri egia esan ___.", "didazu"],
  ["Amak haurrari ipuin bat kontatzen ___.", "dio"],
  ["Guk irakasleari galdera bat egin ___.", "diogu"],
  ["Aitak zuei dirua eman ___.", "dizue"],
  ["Haiek guri opariak ekarri ___.", "dizkigute"],
  ["Nik lagunei postalak bidali ___.", "dizkiet"],
  ["Zuek amari loreak erosi ___.", "dizkiozue"]
]);
sent("NOR-NORI-NORK", "le", [
  ["Nik zuri atzo mezu bat bidali ___.", "nizun"],
  ["Hark niri giltzak eman ___.", "zizkidan"],
  ["Zuk haiei gutun bat idatzi ___.", "zenien"],
  ["Guk Mikeli opari bat erosi ___.", "genion"],
  ["Haiek guri istorio bat kontatu ___.", "ziguten"],
  ["Zuek niri liburuak ekarri ___.", "zenizkidaten"]
]);
sent("Aditz trinkoak", "or", [
  ["Ni etxean ___.", "nago", "egon"],
  ["Haiek hondartzan ___.", "daude", "egon"],
  ["Zu nora ___?", "zoaz", "joan"],
  ["Autobusa ___.", "dator", "etorri"],
  ["Gu oinez ___.", "gabiltza", "ibili"],
  ["Nik ez ___ erantzuna.", "dakit", "jakin"],
  ["Zuk bi katu ___.", "dauzkazu", "eduki"]
]);
sent("Aditz trinkoak", "le", [
  ["Ni atzo etxean ___.", "nengoen", "egon"],
  ["Haiek etxera ___.", "zihoazen", "joan"],
  ["Gu oinez ___.", "gentozen", "etorri"],
  ["Zuek mendian ___.", "zenbiltzaten", "ibili"],
  ["Hark ez ___ ezer.", "zekien", "jakin"],
  ["Guk etxe handi bat ___.", "geneukan", "eduki"]
]);

// Esaldi bakoitzaren NOR taulatik hartzen da (forma bera duen ariketa)
SENT.forEach(s => {
  const ex = EX.find(e => e.g === s.g && e.t === s.t && e.rows.some(r => r.f.includes(s.f[0])));
  s.nor = ex ? ex.nor : "";
});
