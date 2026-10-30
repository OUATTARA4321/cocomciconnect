// Génère les UPDATE SQL d'affectation des portraits (un visage par personne).
const px = (id, ext = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=400&h=500`;

const MEN = [
  px(12311572), px(36053652), px(12311549), px(5648107), px(12311537),
  px(38758071, "png"), px(12311581), px(5082975), px(36741892), px(37090362),
  px(31516612), px(27948228), px(28607934), px(35040854),
  px(9063613), px(8498709), px(8138146), px(7191774), px(9254556),
  px(38216749), px(4287123), px(17368407), px(7562141),
];
const WOMEN = [
  px(29852895), px(15227424), px(9304685), px(37079379), px(7468194),
  px(34769115), px(34769109), px(34769117), px(1181695), px(34769123),
  px(34107695), px(34107697), px(27743608), px(33489789),
  px(33490123), px(39597898), px(40045595), px(33489784),
  px(8384889), px(8385362), px(40280756), px(30809031),
  px(2030147), px(9928018), px(7624810), px(2029867),
];

const FEMALE = new Set(["Affoué","Aminata","Awa","Aïcha","Bintou","Christine","Clarisse","Djeneba",
  "Estelle","Fatim","Fatoumata","Georgette","Habiba","Haoua","Julienne","Léontine","Mariam",
  "Marie-Josée","Mireille","Nadia","Nadège","Prisca","Rachelle","Rokia","Salimata","Solange",
  "Sylvie","Véronique"]);

// Ordre de priorité : BNE, bureaux de filière, coordinateurs, puis le reste.
const PRIORITY = [
  "Konan Aristide Yao","Aïcha Traoré Kouassi","Souleymane Bakayoko","Marie-Josée Gnaoré","Solange Aka Assi",
  "Ibrahima Sangaré","Affoué Marie-Laure Kouadio","Mariam Doumbia","Ange-Désiré Brou",
  "Serge Kouassi N’Goran","Habiba Fofana","Cheick Oumar Touré","Léontine Gbagbo Dibi",
  "Adama Diomandé","Véronique Tanoh","Pascal Yéboué Kouamé","Nadia Ouattara",
  "Fatim Koné Bamba","Olivier Assoumou",
  "Ibrahim Coulibaly","Fatoumata Bamba","Yao Kouassi","Awa Sanogo","Clarisse Yéo",
  "Mamadou Ouattara","Mariam Coulibaly","Abdoulaye Sylla","Salimata Diarra",
  "Jean-Baptiste Gnahoré","Estelle Kouamé","Félix Tanoh","Bintou Koné",
  "Ange Kouadio","Nadège Aka","Karim Touré","Haoua Sangaré","Patrice Assamoi","Georgette Assi",
  "Denis Koffi","Djeneba Cissé","Éric Boti","Rokia Sidibé",
  "Adama Konaté","Moussa Bamba","Sylvie N'Dri","Christophe Loukou","Rachelle Gnahouri",
  "Idrissa Koné","Mireille Kouassi","Armand Kouamé","Prisca Yao","Bakary Touré",
  "Julienne Assamoi","Aboubacar Sidibé","Aminata Cissé","Youssouf Diomandé","Aïcha Traoré",
  "Yao N'Guessan Bernard","Christine Diabaté","Ange Kouadio Kouamé","Estelle Kouamé Dago",
  "Éric Boti Kouamé","Solange Aka",
];

// Variantes de nom désignant la même personne : même portrait.
const ALIAS = {
  "Aïcha Traoré": "Aïcha Traoré Kouassi",
  "Estelle Kouamé Dago": "Estelle Kouamé",
  "Solange Aka": "Solange Aka Assi",
  "Ange Kouadio Kouamé": "Ange Kouadio",
  "Éric Boti Kouamé": "Éric Boti",
};

const first = (n) => n.split(" ")[0];
const assigned = new Map();
let mi = 0, wi = 0;

for (const name of PRIORITY) {
  if (ALIAS[name]) continue;
  const isF = FEMALE.has(first(name));
  if (isF && wi < WOMEN.length) assigned.set(name, WOMEN[wi++]);
  else if (!isF && mi < MEN.length) assigned.set(name, MEN[mi++]);
}
for (const [variant, canonical] of Object.entries(ALIAS)) {
  if (assigned.has(canonical)) assigned.set(variant, assigned.get(canonical));
}

const esc = (s) => s.replace(/'/g, "''");
const lines = ["BEGIN;"];
for (const [name, url] of assigned) {
  lines.push(`UPDATE members SET photo='${url}' WHERE full_name='${esc(name)}';`);
  lines.push(`UPDATE local_officers SET photo='${url}' WHERE full_name='${esc(name)}';`);
  lines.push(`UPDATE sectors SET lead_photo='${url}' WHERE lead_name='${esc(name)}';`);
  lines.push(`UPDATE sectors SET sg_photo='${url}' WHERE sg_name='${esc(name)}';`);
}
lines.push("COMMIT;");
console.log(lines.join("\n"));
console.error(`Portraits affectés : ${assigned.size} (hommes ${mi}/${MEN.length}, femmes ${wi}/${WOMEN.length})`);
