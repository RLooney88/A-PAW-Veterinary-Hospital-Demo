/**
 * Complete services data for the Annapolis Vet Smart Site.
 * Organized by animal type -> preventive + urgent care sections.
 */

// Unsplash helper
const u = (id, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

// ──────────────────────────────────────────────
// DOGS
// ──────────────────────────────────────────────
const DOG_PREVENTIVE = [
  {
    slug: "dog-wellness-exams",
    title: "Wellness & Preventive Exams",
    summary: "Annual and semiannual exams, growth tracking, preventive planning, baseline labs when appropriate.",
    image: u("photo-1770836037793-95bdbf190f71"),
    detail: "A comprehensive nose-to-tail exam is the foundation of your dog's health. We check heart, lungs, joints, skin, eyes, ears, teeth, and weight. For puppies we track growth milestones; for adults and seniors we recommend baseline bloodwork so we can catch problems early. Every visit ends with a clear written plan.",
  },
  {
    slug: "dog-vaccinations",
    title: "Dog Vaccinations",
    summary: "Core vaccines plus lifestyle-based vaccines. Distemper, adenovirus, parvovirus, rabies, leptospirosis, and more based on risk.",
    image: u("photo-1644675443401-ea4c14bad0e6"),
    detail: "We follow AAHA guidelines for canine vaccination. Core vaccines include distemper, adenovirus, parvovirus, rabies, and leptospirosis. Beyond those, we evaluate your dog's lifestyle: boarding, dog parks, hiking, travel. We build a schedule that covers real risk without over-vaccinating.",
  },
  {
    slug: "dog-parasite-prevention",
    title: "Parasite Prevention",
    summary: "Heartworm, fleas, ticks, intestinal parasites, fecal screening, year-round prevention planning.",
    image: u("photo-1587300003388-59208cc962cb"),
    detail: "Year-round parasite prevention is essential in our region. We screen for heartworm annually, run fecal tests, and recommend a prevention plan tailored to your dog's environment and exposure. Fleas, ticks, and intestinal parasites are all part of the conversation.",
  },
  {
    slug: "dog-dental-care",
    title: "Dental Care",
    summary: "Oral exams, professional cleanings, periodontal disease prevention, home dental guidance.",
    image: u("photo-1731496526655-f3ecf4a3eba3"),
    detail: "Dental disease is one of the most common conditions in dogs, and it is often painful long before it is obvious. We screen at every wellness visit and offer full cleanings with dental X-rays under anesthesia. Extractions are performed when needed. We also coach you on home dental care that actually works.",
  },
  {
    slug: "dog-skin-allergy-ear",
    title: "Skin, Allergy & Ear Care",
    summary: "Hot spots, itching, recurrent ear infections, seasonal allergies, food sensitivities.",
    image: u("photo-1588950538967-ca7f8599c669"),
    detail: "Allergies are one of the most common reasons dogs come to see us: itching, ear infections, hot spots, licking paws. We work through whether the cause is environmental, food-related, or seasonal, and build a plan that actually resolves the issue rather than just masking symptoms.",
  },
  {
    slug: "dog-nutrition-weight",
    title: "Nutrition & Weight Management",
    summary: "Puppy nutrition, adult maintenance, obesity prevention, prescription diets, joint-support nutrition.",
    image: u("photo-1695023264743-7f1448deb7f2"),
    detail: "Good nutrition is the foundation of long-term health. We guide you through puppy feeding, adult maintenance, and senior diets. For dogs struggling with weight, we create realistic plans that work. Prescription diets are recommended when there is a clinical need, not as a default.",
  },
  {
    slug: "dog-surgery-spay-neuter",
    title: "Surgery & Spay/Neuter",
    summary: "Routine soft tissue surgery, anesthesia protocols, perioperative care.",
    image: u("photo-1614509689507-5ededae510a2"),
    detail: "We perform routine soft tissue surgeries including spay, neuter, and mass removals. Every procedure follows careful anesthesia protocols with monitoring, IV fluids, and pain management. We discuss timing for spay/neuter based on breed and size rather than using a one-size-fits-all approach.",
  },
  {
    slug: "dog-senior-care",
    title: "Senior Dog Care",
    summary: "Mobility support, arthritis monitoring, cognition changes, senior bloodwork, quality-of-life support.",
    image: u("photo-1477884213360-7e9d7dcc8f9b"),
    detail: "Senior dogs (typically 7+) benefit from twice-yearly exams and bloodwork to catch age-related conditions early. We monitor for arthritis, kidney disease, liver changes, thyroid issues, and cognitive decline. Laser therapy, joint supplements, weight management, and pain control are all part of our toolkit for keeping seniors comfortable.",
  },
];

const DOG_URGENT = [
  { slug: "dog-vomiting-diarrhea", title: "Vomiting & Diarrhea", summary: "GI distress is one of the most common reasons dogs come in. We assess hydration, run diagnostics when needed, and get your dog feeling better.", image: u("photo-1587300003388-59208cc962cb") },
  { slug: "dog-ear-infections", title: "Ear Infections", summary: "Head shaking, scratching, odor, or discharge. We identify the cause and treat it properly so it does not keep coming back.", image: u("photo-1588950538967-ca7f8599c669") },
  { slug: "dog-skin-hot-spots", title: "Skin Rashes, Hot Spots & Allergies", summary: "Sudden itching, redness, hair loss, or weeping sores. We diagnose the trigger and provide fast relief.", image: u("photo-1587300003388-59208cc962cb") },
  { slug: "dog-limping-pain", title: "Limping & Pain", summary: "Lameness, reluctance to jump, or crying out. We assess the source of pain and build a treatment plan.", image: u("photo-1477884213360-7e9d7dcc8f9b") },
  { slug: "dog-coughing-respiratory", title: "Coughing & Respiratory Symptoms", summary: "Persistent cough, labored breathing, or nasal discharge. We evaluate heart, lungs, and airways.", image: u("photo-1770836037793-95bdbf190f71") },
  { slug: "dog-urinary-problems", title: "Urinary Problems", summary: "Straining, frequent urination, blood in urine, or accidents. We run urinalysis and get answers.", image: u("photo-1614509689507-5ededae510a2") },
  { slug: "dog-eye-problems", title: "Eye Problems", summary: "Redness, squinting, discharge, or swelling. Early treatment can prevent lasting damage.", image: u("photo-1770836037816-4445dbd449fd") },
  { slug: "dog-wounds-injuries", title: "Minor Wounds & Injuries", summary: "Cuts, scrapes, bite wounds, or trauma. We clean, assess, and treat to prevent infection.", image: u("photo-1614509689507-5ededae510a2") },
];

// ──────────────────────────────────────────────
// CATS
// ──────────────────────────────────────────────
const CAT_PREVENTIVE = [
  {
    slug: "cat-wellness-exams",
    title: "Wellness & Preventive Exams",
    summary: "Routine exams, weight trends, baseline screening, preventive planning, indoor/outdoor risk review.",
    image: u("photo-1725409796872-8b41e8eca929"),
    detail: "Annual exams are critical for cats because they hide illness so well. We check weight trends, dental health, heart, thyroid, kidneys, and overall condition. For indoor cats we review environmental enrichment; for outdoor cats we assess risk factors. Baseline bloodwork helps us spot problems before they become emergencies.",
  },
  {
    slug: "cat-vaccinations",
    title: "Cat Vaccinations",
    summary: "Core feline vaccines plus lifestyle-based vaccines. FHV-1, FCV, FPV, rabies, and FeLV for at-risk cats.",
    image: u("photo-1733783506192-653df6185a7d"),
    detail: "We follow AAHA/AAFP feline vaccination guidelines. Core vaccines include FHV-1, FCV, FPV, and rabies. FeLV is recommended for all cats under 1 year and for any cat with outdoor access. We build a minimal, risk-appropriate schedule, not a one-size-fits-all list.",
  },
  {
    slug: "cat-parasite-prevention",
    title: "Parasite Prevention",
    summary: "Fleas, intestinal parasites, tick prevention, heartworm discussion based on geography and risk.",
    image: u("photo-1653556835401-5d307354e220"),
    detail: "Even indoor cats can get fleas and intestinal parasites. We recommend year-round prevention tailored to your cat's lifestyle and region. Heartworm discussion is included based on local risk factors. Fecal screening is part of every wellness visit.",
  },
  {
    slug: "cat-dental-care",
    title: "Dental Care",
    summary: "Oral exams, preventive dentistry, resorptive lesion awareness, senior oral monitoring.",
    image: u("photo-1733783489145-f3d3ee7a9ccf"),
    detail: "Feline dental disease is incredibly common and painful, but cats rarely show obvious signs. Resorptive lesions are particularly common and can only be detected with dental X-rays. We screen at every wellness visit and offer full cleanings. Many cat owners are surprised how much better their cat feels after dental treatment.",
  },
  {
    slug: "cat-nutrition-weight",
    title: "Nutrition & Weight Management",
    summary: "Weight control, obesity prevention, urinary-health diets, kidney-support diets, life-stage feeding.",
    image: u("photo-1653556835401-5d307354e220"),
    detail: "Obesity is a major health risk for cats, contributing to diabetes, joint disease, and urinary problems. We create realistic feeding plans tailored to your cat's age, activity level, and any health conditions. Prescription diets for urinary health or kidney support are recommended when clinically indicated.",
  },
  {
    slug: "cat-behavior-litter",
    title: "Behavior & Litter Box Health",
    summary: "Stress-related behaviors, litter box changes, scratching, environmental guidance.",
    image: u("photo-1725409796872-8b41e8eca929"),
    detail: "Changes in litter box habits, hiding, aggression, or overgrooming often have a medical component. We always rule out physical causes first. For behavioral issues, we provide environmental enrichment guidance, multi-cat household strategies, and stress reduction techniques.",
  },
  {
    slug: "cat-surgery-spay-neuter",
    title: "Surgery & Spay/Neuter",
    summary: "Routine surgery, anesthesia, recovery support.",
    image: u("photo-1733783506192-653df6185a7d"),
    detail: "We perform routine feline surgeries with careful feline-specific anesthesia protocols. Cats metabolize anesthesia differently than dogs, and our protocols reflect that. Pain management, temperature monitoring, and gentle recovery handling are standard for every procedure.",
  },
  {
    slug: "cat-senior-care",
    title: "Senior Cat Care",
    summary: "Kidney monitoring, thyroid screening, mobility support, chronic disease management, comfort care.",
    image: u("photo-1653556835401-5d307354e220"),
    detail: "Cats over 10 benefit from twice-yearly exams, bloodwork, kidney function testing, thyroid screening, and blood pressure checks. Kidney disease, hyperthyroidism, and diabetes are common in older cats and highly manageable when caught early. We focus on comfort and quality of life at every stage.",
  },
];

const CAT_URGENT = [
  { slug: "cat-vomiting-appetite", title: "Vomiting & Appetite Loss", summary: "Cats who stop eating for even 24 to 48 hours are at risk. We assess quickly and intervene early.", image: u("photo-1725409796872-8b41e8eca929") },
  { slug: "cat-respiratory", title: "Upper Respiratory Symptoms", summary: "Sneezing, nasal discharge, congestion, or eye involvement. Common in cats and treatable when caught early.", image: u("photo-1733783489145-f3d3ee7a9ccf") },
  { slug: "cat-urinary", title: "Urinary Problems", summary: "Straining, crying in the litter box, blood in urine. In male cats, urethral obstruction is a life-threatening emergency.", image: u("photo-1653556835401-5d307354e220") },
  { slug: "cat-constipation", title: "Constipation", summary: "Straining without producing stool, vocalizing, or decreased appetite. Can become serious if left untreated.", image: u("photo-1733783506192-653df6185a7d") },
  { slug: "cat-skin-overgrooming", title: "Skin Issues & Overgrooming", summary: "Bald patches, excessive licking, scabs, or hair loss. Often stress or allergy related.", image: u("photo-1653556835401-5d307354e220") },
  { slug: "cat-eye-problems", title: "Eye Problems", summary: "Squinting, redness, discharge, or cloudiness. Prompt treatment protects vision.", image: u("photo-1733783489145-f3d3ee7a9ccf") },
  { slug: "cat-dental-pain", title: "Mouth Pain & Dental Issues", summary: "Drooling, difficulty eating, pawing at the mouth. Often indicates advanced dental disease or resorptive lesions.", image: u("photo-1725409796872-8b41e8eca929") },
  { slug: "cat-behavior-hiding", title: "Behavior Change, Hiding & Lethargy", summary: "Cats who suddenly withdraw, stop eating, or become unusually quiet are often telling you something is wrong.", image: u("photo-1653556835401-5d307354e220") },
];

// ──────────────────────────────────────────────
// RABBITS
// ──────────────────────────────────────────────
const RABBIT_PREVENTIVE = [
  {
    slug: "rabbit-wellness-exams",
    title: "Rabbit Wellness Exams",
    summary: "Routine exams, weight checks, husbandry review, early illness detection.",
    image: u("photo-1696089622129-7466db52e7af"),
    detail: "Rabbits are prey animals and hide illness exceptionally well. Annual wellness exams include a full physical, weight check, dental assessment, and a thorough review of diet, housing, and enrichment. Early detection makes all the difference with rabbits.",
  },
  {
    slug: "rabbit-vaccination",
    title: "Rabbit Vaccination",
    summary: "RHDV2 vaccination where appropriate. Protection against a serious and often fatal disease.",
    image: u("photo-1604952962532-62697f858346"),
    detail: "Rabbit Hemorrhagic Disease Virus 2 (RHDV2) has spread across the US and is often fatal. Annual vaccination is the best protection. We follow current guidance from the House Rabbit Society and discuss risk based on your location and rabbit's exposure.",
  },
  {
    slug: "rabbit-dental-care",
    title: "Dental Care",
    summary: "Rabbit teeth grow continuously. Hay-based diet, dental screening, and intervention when needed.",
    image: u("photo-1687667326821-32409c5f2331"),
    detail: "A rabbit's teeth grow continuously for life, and proper wear depends on a hay-based diet. We screen for malocclusion, overgrowth, and spurs at every visit. When dental issues arise, we intervene early to prevent pain, appetite loss, and secondary GI problems.",
  },
  {
    slug: "rabbit-nutrition-gi",
    title: "Nutrition & Digestive Health",
    summary: "Hay-based diet guidance, GI health, appetite monitoring, stool monitoring, cecotrope issues.",
    image: u("photo-1661930779263-0cff09dc40d6"),
    detail: "Diet is the single most important factor in rabbit health. We emphasize unlimited hay, appropriate greens, limited pellets, and proper hydration. GI stasis is one of the most common and dangerous rabbit conditions, and good nutrition is the best prevention.",
  },
  {
    slug: "rabbit-spay-neuter",
    title: "Spay/Neuter",
    summary: "Important for health, behavior, and litter prevention. An especially important service for rabbits.",
    image: u("photo-1604952962532-62697f858346"),
    detail: "Spaying female rabbits significantly reduces the risk of uterine cancer, which is extremely common in unspayed does over 3 to 4 years. Neutering males reduces territorial behavior. We use rabbit-safe anesthesia protocols and monitor recovery closely.",
  },
  {
    slug: "rabbit-skin-parasite",
    title: "Skin & Parasite Care",
    summary: "Mites, fur issues, skin lesions, parasite concerns.",
    image: u("photo-1696089622129-7466db52e7af"),
    detail: "Rabbits are susceptible to fur mites, ear mites, and various skin conditions. We diagnose through skin scraping and examination, and treat with rabbit-safe products. Some over-the-counter flea products are toxic to rabbits, so guidance matters.",
  },
  {
    slug: "rabbit-husbandry-habitat",
    title: "Husbandry & Habitat Guidance",
    summary: "Housing, enrichment, litter habits, exercise, stress reduction.",
    image: u("photo-1687667326821-32409c5f2331"),
    detail: "Many rabbit health problems trace back to environment. We review enclosure size, flooring, litter choices, enrichment, exercise time, and social needs. Small adjustments often make a big difference in your rabbit's health and happiness.",
  },
];

const RABBIT_URGENT = [
  { slug: "rabbit-appetite-loss", title: "Reduced Appetite or Not Eating", summary: "A rabbit who stops eating is an emergency. GI stasis can become life-threatening within hours.", image: u("photo-1696089622129-7466db52e7af") },
  { slug: "rabbit-gi-stasis", title: "GI Stasis & Stool Changes", summary: "Decreased or absent droppings, bloating, or lethargy. This is the most common rabbit emergency.", image: u("photo-1687667326821-32409c5f2331") },
  { slug: "rabbit-dental-pain", title: "Dental Pain & Drooling", summary: "Drooling, wet chin, dropping food, or reduced appetite. Often indicates tooth overgrowth or spurs.", image: u("photo-1604952962532-62697f858346") },
  { slug: "rabbit-respiratory", title: "Respiratory Illness", summary: "Sneezing, nasal discharge, labored breathing. Pasteurella and other infections require prompt treatment.", image: u("photo-1661930779263-0cff09dc40d6") },
  { slug: "rabbit-skin-fur", title: "Skin & Fur Problems", summary: "Hair loss, itching, scabs, or flaking. Mites and fungal infections are common causes.", image: u("photo-1696089622129-7466db52e7af") },
  { slug: "rabbit-urinary", title: "Urinary Problems", summary: "Sludgy urine, straining, or wet bottom. Calcium metabolism in rabbits makes urinary issues common.", image: u("photo-1604952962532-62697f858346") },
  { slug: "rabbit-head-tilt", title: "Head Tilt & Neurologic Concerns", summary: "Sudden head tilt, circling, or loss of balance. Often caused by E. cuniculi or inner ear infection.", image: u("photo-1687667326821-32409c5f2331") },
  { slug: "rabbit-injury-mobility", title: "Injury & Mobility Issues", summary: "Limping, reluctance to move, or signs of trauma. Rabbits have fragile spines that need careful assessment.", image: u("photo-1661930779263-0cff09dc40d6") },
];

// ──────────────────────────────────────────────
// GUINEA PIGS / SMALL HERBIVORES
// ──────────────────────────────────────────────
const GP_PREVENTIVE = [
  {
    slug: "gp-wellness-exams",
    title: "Wellness Exams",
    summary: "Routine exams, weight trends, preventive review, early detection of subtle illness.",
    image: u("photo-1643010852905-21af4ae8b4c1"),
    detail: "Guinea pigs are masters at hiding illness. Annual wellness exams include a thorough physical, dental check, weight trend review, and husbandry assessment. Early detection of common conditions like dental disease, respiratory infections, and vitamin C deficiency makes treatment much more effective.",
  },
  {
    slug: "gp-nutrition-vitamin-c",
    title: "Nutrition & Vitamin Support",
    summary: "Guinea pigs require dietary vitamin C. High-fiber feeding, proper pellets, and fresh produce guidance.",
    image: u("photo-1645287712615-4a3968515cb3"),
    detail: "Guinea pigs cannot produce their own vitamin C and require approximately 10 mg/kg daily from diet. Deficiency leads to scurvy: joint pain, lethargy, and poor healing. We review diet composition, hay quality, fresh produce, and supplement options. Proper nutrition prevents most guinea pig health problems.",
  },
  {
    slug: "gp-dental-care",
    title: "Dental Care",
    summary: "Tooth overgrowth, chewing issues, weight loss, diet-linked dental disease.",
    image: u("photo-1658938822483-f9389eb6fcea"),
    detail: "Cheek-tooth elongation is the most common dental disease in guinea pigs. Like rabbits, their teeth grow continuously and depend on proper wear from hay and chewing. We screen for malocclusion and overgrowth at every visit. Weight loss and drooling are early warning signs.",
  },
  {
    slug: "gp-skin-parasite",
    title: "Skin, Coat & Parasite Care",
    summary: "Mites, hair loss, itching, skin irritation.",
    image: u("photo-1643457091984-30e031f5e127"),
    detail: "Skin mites are extremely common in guinea pigs and cause intense itching, hair loss, and scabbing. Fungal infections (ringworm) are also prevalent. We diagnose through examination and skin scraping, and treat with species-safe products. Some over-the-counter treatments are not safe for guinea pigs.",
  },
  {
    slug: "gp-foot-nail-grooming",
    title: "Foot, Nail & Grooming Care",
    summary: "Nail trims, foot sores, husbandry-related foot issues.",
    image: u("photo-1643010852905-21af4ae8b4c1"),
    detail: "Pododermatitis (bumblefoot) is a common condition in guinea pigs, especially those on wire or rough flooring. Regular nail trims, proper bedding, and weight management help prevent it. We assess foot health at every visit and treat early to avoid complications.",
  },
  {
    slug: "gp-diagnostics-appetite",
    title: "Diagnostics for Appetite, Weight & Respiratory Changes",
    summary: "These pets often mask illness. Subtle changes in eating, weight, or breathing deserve investigation.",
    image: u("photo-1645287712615-4a3968515cb3"),
    detail: "Guinea pigs hide illness until it is advanced. Unexplained weight loss, changes in appetite, or even subtle breathing changes can signal serious conditions. We use physical exam findings, bloodwork, and imaging when needed to get answers before problems become critical.",
  },
  {
    slug: "gp-husbandry-habitat",
    title: "Husbandry & Habitat Guidance",
    summary: "Bedding, sanitation, enclosure setup, social housing, stress reduction.",
    image: u("photo-1658938822483-f9389eb6fcea"),
    detail: "Many guinea pig health problems trace directly to husbandry. We review enclosure size, bedding type, sanitation schedule, temperature, social housing needs (guinea pigs are social and do best in pairs), and enrichment. Small changes at home often prevent veterinary visits later.",
  },
];

const GP_URGENT = [
  { slug: "gp-not-eating", title: "Weight Loss & Not Eating", summary: "A guinea pig who stops eating needs prompt assessment. GI slowdown can escalate quickly.", image: u("photo-1643010852905-21af4ae8b4c1") },
  { slug: "gp-dental-overgrowth", title: "Dental Overgrowth", summary: "Difficulty chewing, drooling, weight loss. The most common guinea pig dental problem.", image: u("photo-1658938822483-f9389eb6fcea") },
  { slug: "gp-respiratory", title: "Respiratory Symptoms", summary: "Sneezing, wheezing, labored breathing, nasal discharge. Bacterial pneumonia is a common and serious concern.", image: u("photo-1645287712615-4a3968515cb3") },
  { slug: "gp-skin-mites", title: "Skin Mites & Hair Loss", summary: "Intense itching, scratching, bald patches, scabbing. Mites are extremely common and treatable.", image: u("photo-1643457091984-30e031f5e127") },
  { slug: "gp-bumblefoot", title: "Foot Sores & Bumblefoot", summary: "Swollen or cracked footpads, limping. Often related to bedding, weight, or enclosure design.", image: u("photo-1643010852905-21af4ae8b4c1") },
  { slug: "gp-stool-changes", title: "Diarrhea & Stool Changes", summary: "Soft stool, diarrhea, or reduced droppings. Can indicate diet issues, parasites, or infection.", image: u("photo-1645287712615-4a3968515cb3") },
  { slug: "gp-injury-weakness", title: "Injury or Weakness", summary: "Limping, inability to move, or signs of trauma. Guinea pigs are fragile and need gentle assessment.", image: u("photo-1658938822483-f9389eb6fcea") },
  { slug: "gp-reproductive", title: "Reproductive Concerns", summary: "Pregnancy complications, cystic ovaries, or reproductive emergencies. Spaying is often recommended.", image: u("photo-1643457091984-30e031f5e127") },
];

// ──────────────────────────────────────────────
// EXPORT
// ──────────────────────────────────────────────
export const SERVICES_BY_ANIMAL = {
  dogs: {
    label: "Dogs",
    intent: "dogs",
    preventive: DOG_PREVENTIVE,
    urgent: DOG_URGENT,
  },
  cats: {
    label: "Cats",
    intent: "cats",
    preventive: CAT_PREVENTIVE,
    urgent: CAT_URGENT,
  },
  rabbits: {
    label: "Rabbits",
    intent: "critters",
    preventive: RABBIT_PREVENTIVE,
    urgent: RABBIT_URGENT,
  },
  guinea_pigs: {
    label: "Guinea Pigs & Small Herbivores",
    intent: "critters",
    preventive: GP_PREVENTIVE,
    urgent: GP_URGENT,
  },
};

// Flat lookup for service detail pages
export const ALL_SERVICES = {};
for (const animal of Object.values(SERVICES_BY_ANIMAL)) {
  for (const s of [...animal.preventive, ...animal.urgent]) {
    ALL_SERVICES[s.slug] = { ...s, animalLabel: animal.label, animalKey: animal.intent };
  }
}
