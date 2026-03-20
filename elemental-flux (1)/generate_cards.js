import fs from 'fs';

const rarities = ['Basic', 'Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];

const cards = {};
const recipes = {};

function addCard(id, name, rarity, desc, stats, icon, color) {
  cards[id] = { id, name, rarity, description: desc, ...stats, icon, color };
}

function addRecipe(c1, c2, result) {
  // Sort alphabetically to ensure consistency
  const sorted = [c1, c2].sort();
  recipes[`${sorted[0]}+${sorted[1]}`] = result;
}

// --- BASIC (6) ---
addCard('fire', 'Fire Element', 'Basic', 'Deal 2 Damage.', { damage: 2 }, 'Flame', 'rose');
addCard('water', 'Water Element', 'Basic', 'Heal 2 HP.', { heal: 2 }, 'Droplets', 'cyan');
addCard('earth', 'Earth Element', 'Basic', 'Gain 2 Shield.', { shield: 2 }, 'Mountain', 'emerald');
addCard('air', 'Air Element', 'Basic', 'Draw 1 Card.', { draw: 1 }, 'Wind', 'sky');
addCard('light', 'Light Element', 'Basic', 'Heal 1 HP, Draw 1 Card.', { heal: 1, draw: 1 }, 'Sun', 'yellow');
addCard('dark', 'Dark Element', 'Basic', 'Deal 3 Damage, take 1 Damage.', { damage: 3 }, 'Moon', 'purple');

// --- COMMON (21) ---
// Fire + X
addCard('fireball', 'Fireball', 'Common', 'Deal 6 Damage.', { damage: 6 }, 'Flame', 'rose');
addRecipe('fire', 'fire', 'fireball');

addCard('steam', 'Steam Cloud', 'Common', 'Heal 3 HP, Draw 1 Card.', { heal: 3, draw: 1 }, 'Cloud', 'sky');
addRecipe('fire', 'water', 'steam');

addCard('magma', 'Magma Bolt', 'Common', 'Deal 4 Dmg, Gain 2 Shield.', { damage: 4, shield: 2 }, 'Flame', 'orange');
addRecipe('fire', 'earth', 'magma');

addCard('smoke', 'Smoke Screen', 'Common', 'Gain 3 Shield, Draw 1 Card.', { shield: 3, draw: 1 }, 'Cloud', 'slate');
addRecipe('fire', 'air', 'smoke');

addCard('radiance', 'Radiance', 'Common', 'Deal 3 Dmg, Heal 3 HP.', { damage: 3, heal: 3 }, 'Sun', 'yellow');
addRecipe('fire', 'light', 'radiance');

addCard('hellfire', 'Hellfire', 'Common', 'Deal 8 Damage.', { damage: 8 }, 'Flame', 'red');
addRecipe('fire', 'dark', 'hellfire');

// Water + X
addCard('heal_wave', 'Healing Wave', 'Common', 'Heal 6 HP.', { heal: 6 }, 'Droplets', 'cyan');
addRecipe('water', 'water', 'heal_wave');

addCard('mud', 'Mud Splatter', 'Common', 'Deal 2 Dmg, Heal 2 HP.', { damage: 2, heal: 2 }, 'Droplets', 'amber');
addRecipe('water', 'earth', 'mud');

addCard('ice', 'Ice Shard', 'Common', 'Deal 3 Dmg, Stun 1 Turn.', { damage: 3, stun: 1 }, 'Snowflake', 'blue');
addRecipe('water', 'air', 'ice');

addCard('holy_water', 'Holy Water', 'Common', 'Heal 5 HP, Draw 1 Card.', { heal: 5, draw: 1 }, 'Droplets', 'yellow');
addRecipe('water', 'light', 'holy_water');

addCard('poison', 'Poison Vial', 'Common', 'Deal 5 Dmg.', { damage: 5 }, 'Droplets', 'purple');
addRecipe('water', 'dark', 'poison');

// Earth + X
addCard('rock_wall', 'Rock Wall', 'Common', 'Gain 6 Shield.', { shield: 6 }, 'Mountain', 'emerald');
addRecipe('earth', 'earth', 'rock_wall');

addCard('dust', 'Dust Devil', 'Common', 'Deal 3 Dmg, Draw 1 Card.', { damage: 3, draw: 1 }, 'Wind', 'amber');
addRecipe('earth', 'air', 'dust');

addCard('crystal', 'Crystal', 'Common', 'Gain 4 Shield, Heal 2 HP.', { shield: 4, heal: 2 }, 'Diamond', 'cyan');
addRecipe('earth', 'light', 'crystal');

addCard('obsidian', 'Obsidian', 'Common', 'Gain 5 Shield, Deal 2 Dmg.', { shield: 5, damage: 2 }, 'Diamond', 'slate');
addRecipe('earth', 'dark', 'obsidian');

// Air + X
addCard('gust', 'Gust', 'Common', 'Draw 2 Cards.', { draw: 2 }, 'Wind', 'sky');
addRecipe('air', 'air', 'gust');

addCard('mirage', 'Mirage', 'Common', 'Gain 3 Shield, Draw 2 Cards.', { shield: 3, draw: 2 }, 'Sun', 'amber');
addRecipe('air', 'light', 'mirage');

addCard('miasma', 'Miasma', 'Common', 'Deal 4 Dmg, Stun 1 Turn.', { damage: 4, stun: 1 }, 'Cloud', 'purple');
addRecipe('air', 'dark', 'miasma');

// Light + X
addCard('flash', 'Flash', 'Common', 'Stun 1 Turn, Draw 1 Card.', { stun: 1, draw: 1 }, 'Zap', 'yellow');
addRecipe('light', 'light', 'flash');

addCard('twilight', 'Twilight', 'Common', 'Deal 4 Dmg, Heal 4 HP.', { damage: 4, heal: 4 }, 'Moon', 'indigo');
addRecipe('light', 'dark', 'twilight');

// Dark + X
addCard('shadow', 'Shadow Strike', 'Common', 'Deal 7 Dmg.', { damage: 7 }, 'Moon', 'slate');
addRecipe('dark', 'dark', 'shadow');

// --- RARE (35) ---
addCard('blaze', 'Blaze', 'Rare', 'Deal 10 Damage.', { damage: 10 }, 'Flame', 'rose');
addRecipe('fire', 'fireball', 'blaze');

addCard('lightning', 'Lightning Strike', 'Rare', 'Deal 8 Dmg, Stun 1 Turn.', { damage: 8, stun: 1 }, 'Zap', 'yellow');
addRecipe('fire', 'gust', 'lightning');

addCard('geyser', 'Geyser', 'Rare', 'Deal 6 Dmg, Heal 4 HP.', { damage: 6, heal: 4 }, 'Waves', 'cyan');
addRecipe('water', 'magma', 'geyser');

addCard('sandstorm', 'Sandstorm', 'Rare', 'Deal 5 Dmg, Draw 2 Cards.', { damage: 5, draw: 2 }, 'Tornado', 'amber');
addRecipe('earth', 'gust', 'sandstorm');

addCard('frostbite', 'Frostbite', 'Rare', 'Deal 6 Dmg, Stun 1 Turn.', { damage: 6, stun: 1 }, 'Snowflake', 'blue');
addRecipe('ice', 'air', 'frostbite');

addCard('lava_flow', 'Lava Flow', 'Rare', 'Deal 8 Dmg, Gain 4 Shield.', { damage: 8, shield: 4 }, 'Flame', 'orange');
addRecipe('magma', 'earth', 'lava_flow');

addCard('thunder', 'Thunder Clap', 'Rare', 'Deal 7 Dmg, Stun 1 Turn.', { damage: 7, stun: 1 }, 'CloudLightning', 'yellow');
addRecipe('smoke', 'flash', 'thunder');

addCard('aqua_ring', 'Aqua Ring', 'Rare', 'Heal 8 HP, Draw 1 Card.', { heal: 8, draw: 1 }, 'Droplets', 'cyan');
addRecipe('steam', 'water', 'aqua_ring');

addCard('stone_golem', 'Stone Golem', 'Rare', 'Gain 12 Shield.', { shield: 12 }, 'Mountain', 'emerald');
addRecipe('earth', 'rock_wall', 'stone_golem');

addCard('cyclone', 'Cyclone', 'Rare', 'Draw 3 Cards.', { draw: 3 }, 'Tornado', 'sky');
addRecipe('air', 'gust', 'cyclone');

addCard('sunbeam', 'Sunbeam', 'Rare', 'Heal 6 HP, Gain 4 Shield.', { heal: 6, shield: 4 }, 'Sun', 'yellow');
addRecipe('light', 'radiance', 'sunbeam');

addCard('moonlight', 'Moonlight', 'Rare', 'Draw 2 Cards, Heal 4 HP.', { draw: 2, heal: 4 }, 'Moon', 'indigo');
addRecipe('dark', 'twilight', 'moonlight');

addCard('blood_magic', 'Blood Magic', 'Rare', 'Deal 12 Dmg, Heal 2 HP.', { damage: 12, heal: 2 }, 'Droplets', 'red');
addRecipe('mud', 'fire', 'blood_magic');

addCard('vine_whip', 'Vine Whip', 'Rare', 'Deal 6 Dmg, Heal 4 HP.', { damage: 6, heal: 4 }, 'Leaf', 'emerald');
addRecipe('mud', 'earth', 'vine_whip');

addCard('static_field', 'Static Field', 'Rare', 'Gain 5 Shield, Stun 1 Turn.', { shield: 5, stun: 1 }, 'Zap', 'yellow');
addRecipe('flash', 'air', 'static_field');

addCard('acid_rain', 'Acid Rain', 'Rare', 'Deal 8 Dmg.', { damage: 8 }, 'CloudRain', 'lime');
addRecipe('smoke', 'water', 'acid_rain');

addCard('ash_cloud', 'Ash Cloud', 'Rare', 'Gain 8 Shield.', { shield: 8 }, 'Cloud', 'slate');
addRecipe('fire', 'dust', 'ash_cloud');

addCard('whirlpool', 'Whirlpool', 'Rare', 'Deal 5 Dmg, Draw 2 Cards.', { damage: 5, draw: 2 }, 'Waves', 'blue');
addRecipe('water', 'gust', 'whirlpool');

addCard('meteor_fragment', 'Meteor Fragment', 'Rare', 'Deal 9 Dmg.', { damage: 9 }, 'Flame', 'orange');
addRecipe('fireball', 'earth', 'meteor_fragment');

addCard('poison_dart', 'Poison Dart', 'Rare', 'Deal 3 Dmg, Draw 1 Card.', { damage: 3, draw: 1 }, 'Zap', 'lime');
addRecipe('poison', 'air', 'poison_dart');

addCard('quicksand', 'Quicksand', 'Rare', 'Deal 4 Dmg, Stun 1 Turn.', { damage: 4, stun: 1 }, 'Mountain', 'amber');
addRecipe('dust', 'mud', 'quicksand');

addCard('healing_spring', 'Healing Spring', 'Rare', 'Heal 10 HP.', { heal: 10 }, 'Droplets', 'cyan');
addRecipe('water', 'heal_wave', 'healing_spring');

addCard('scald', 'Scald', 'Rare', 'Deal 6 Dmg, Draw 1 Card.', { damage: 6, draw: 1 }, 'Flame', 'rose');
addRecipe('fire', 'steam', 'scald');

addCard('obsidian_shard', 'Obsidian Shard', 'Rare', 'Deal 5 Dmg, Gain 5 Shield.', { damage: 5, shield: 5 }, 'Diamond', 'slate');
addRecipe('magma', 'rock_wall', 'obsidian_shard');

addCard('hail', 'Hailstorm', 'Rare', 'Deal 4 Dmg, Stun 1 Turn, Draw 1.', { damage: 4, stun: 1, draw: 1 }, 'CloudRain', 'blue');
addRecipe('ice', 'water', 'hail');

addCard('crystal_shard', 'Crystal Shard', 'Rare', 'Deal 4 Dmg, Gain 6 Shield.', { damage: 4, shield: 6 }, 'Diamond', 'purple');
addRecipe('rock_wall', 'steam', 'crystal_shard');

addCard('mud_armor', 'Mud Armor', 'Rare', 'Heal 5 HP, Gain 5 Shield.', { heal: 5, shield: 5 }, 'Shield', 'amber');
addRecipe('water', 'rock_wall', 'mud_armor');

addCard('solar_flare', 'Solar Flare', 'Rare', 'Deal 12 Damage.', { damage: 12 }, 'Sun', 'yellow');
addRecipe('fire', 'radiance', 'solar_flare');

addCard('lunar_tide', 'Lunar Tide', 'Rare', 'Heal 8 HP, Gain 4 Shield.', { heal: 8, shield: 4 }, 'Moon', 'indigo');
addRecipe('water', 'twilight', 'lunar_tide');

addCard('void_ray', 'Void Ray', 'Rare', 'Deal 10 Dmg, Stun 1 Turn.', { damage: 10, stun: 1 }, 'Zap', 'purple');
addRecipe('dark', 'shadow', 'void_ray');

addCard('holy_light', 'Holy Light', 'Rare', 'Heal 12 HP.', { heal: 12 }, 'Sun', 'yellow');
addRecipe('light', 'holy_water', 'holy_light');

addCard('dark_matter', 'Dark Matter', 'Rare', 'Deal 8 Dmg, Gain 4 Shield.', { damage: 8, shield: 4 }, 'Moon', 'slate');
addRecipe('dark', 'obsidian', 'dark_matter');

addCard('prism', 'Prism', 'Rare', 'Draw 2 Cards, Gain 4 Shield.', { draw: 2, shield: 4 }, 'Diamond', 'cyan');
addRecipe('light', 'crystal', 'prism');

addCard('eclipse', 'Eclipse', 'Rare', 'Deal 6 Dmg, Heal 6 HP.', { damage: 6, heal: 6 }, 'Moon', 'indigo');
addRecipe('light', 'shadow', 'eclipse');

addCard('soul_drain', 'Soul Drain', 'Rare', 'Deal 8 Dmg, Heal 4 HP.', { damage: 8, heal: 4 }, 'Skull', 'purple');
addRecipe('dark', 'poison', 'soul_drain');


// --- EPIC (30) ---
addCard('pyroblast', 'Pyroblast', 'Epic', 'Deal 16 Damage.', { damage: 16 }, 'Flame', 'rose');
addRecipe('fireball', 'fireball', 'pyroblast');

addCard('tsunami', 'Tsunami', 'Epic', 'Deal 10 Dmg, Heal 10 HP.', { damage: 10, heal: 10 }, 'Waves', 'cyan');
addRecipe('heal_wave', 'heal_wave', 'tsunami');

addCard('earthquake', 'Earthquake', 'Epic', 'Deal 12 Dmg, Gain 8 Shield.', { damage: 12, shield: 8 }, 'Activity', 'emerald');
addRecipe('rock_wall', 'rock_wall', 'earthquake');

addCard('tornado', 'Tornado', 'Epic', 'Deal 8 Dmg, Draw 3 Cards.', { damage: 8, draw: 3 }, 'Tornado', 'sky');
addRecipe('gust', 'gust', 'tornado');

addCard('plasma', 'Plasma Burst', 'Epic', 'Deal 14 Dmg, Stun 1 Turn.', { damage: 14, stun: 1 }, 'Zap', 'purple');
addRecipe('lightning', 'fire', 'plasma');

addCard('obsidian_wall', 'Obsidian Wall', 'Epic', 'Gain 18 Shield.', { shield: 18 }, 'Shield', 'slate');
addRecipe('obsidian_shard', 'rock_wall', 'obsidian_wall');

addCard('crystal_ward', 'Crystal Ward', 'Epic', 'Heal 10 HP, Gain 10 Shield.', { heal: 10, shield: 10 }, 'Diamond', 'cyan');
addRecipe('crystal_shard', 'heal_wave', 'crystal_ward');

addCard('storm', 'Thunderstorm', 'Epic', 'Deal 12 Dmg, Draw 2 Cards.', { damage: 12, draw: 2 }, 'CloudLightning', 'blue');
addRecipe('thunder', 'gust', 'storm');

addCard('blizzard', 'Blizzard', 'Epic', 'Deal 10 Dmg, Stun 1 Turn.', { damage: 10, stun: 1 }, 'Snowflake', 'sky');
addRecipe('frostbite', 'ice', 'blizzard');

addCard('inferno', 'Inferno', 'Epic', 'Deal 14 Dmg, Heal 4 HP.', { damage: 14, heal: 4 }, 'Flame', 'orange');
addRecipe('blaze', 'magma', 'inferno');

addCard('glacier', 'Glacier', 'Epic', 'Gain 12 Shield, Stun 1 Turn.', { shield: 12, stun: 1 }, 'Mountain', 'blue');
addRecipe('stone_golem', 'ice', 'glacier');

addCard('monsoon', 'Monsoon', 'Epic', 'Heal 12 HP, Draw 2 Cards.', { heal: 12, draw: 2 }, 'CloudRain', 'cyan');
addRecipe('aqua_ring', 'gust', 'monsoon');

addCard('eruption', 'Eruption', 'Epic', 'Deal 15 Dmg, Gain 5 Shield.', { damage: 15, shield: 5 }, 'Mountain', 'rose');
addRecipe('lava_flow', 'fireball', 'eruption');

addCard('typhoon', 'Typhoon', 'Epic', 'Deal 10 Dmg, Draw 2 Cards.', { damage: 10, draw: 2 }, 'Waves', 'blue');
addRecipe('whirlpool', 'gust', 'typhoon');

addCard('avalanche_minor', 'Lesser Avalanche', 'Epic', 'Deal 12 Dmg, Stun 1 Turn.', { damage: 12, stun: 1 }, 'Snowflake', 'slate');
addRecipe('hail', 'rock_wall', 'avalanche_minor');

addCard('nature_wrath', 'Nature\'s Wrath', 'Epic', 'Deal 10 Dmg, Heal 8 HP.', { damage: 10, heal: 8 }, 'Leaf', 'emerald');
addRecipe('vine_whip', 'healing_spring', 'nature_wrath');

addCard('steel_forge', 'Steel Forge', 'Epic', 'Gain 15 Shield, Draw 1 Card.', { shield: 15, draw: 1 }, 'Shield', 'slate');
addRecipe('stone_golem', 'magma', 'steel_forge');

addCard('mind_blast', 'Mind Blast', 'Epic', 'Deal 8 Dmg, Stun 1 Turn, Draw 1.', { damage: 8, stun: 1, draw: 1 }, 'Eye', 'purple');
addRecipe('mirage', 'lightning', 'mind_blast');

addCard('venom_strike', 'Venom Strike', 'Epic', 'Deal 8 Dmg, Draw 2 Cards.', { damage: 8, draw: 2 }, 'Zap', 'lime');
addRecipe('poison_dart', 'acid_rain', 'venom_strike');

addCard('sinkhole', 'Sinkhole', 'Epic', 'Deal 10 Dmg, Stun 1 Turn.', { damage: 10, stun: 1 }, 'Mountain', 'amber');
addRecipe('quicksand', 'earthquake', 'sinkhole');

addCard('solar_beam', 'Solar Beam', 'Epic', 'Deal 18 Damage.', { damage: 18 }, 'Sun', 'yellow');
addRecipe('sunbeam', 'solar_flare', 'solar_beam');

addCard('lunar_eclipse', 'Lunar Eclipse', 'Epic', 'Draw 4 Cards, Heal 8 HP.', { draw: 4, heal: 8 }, 'Moon', 'indigo');
addRecipe('moonlight', 'lunar_tide', 'lunar_eclipse');

addCard('supernova_spark', 'Supernova Spark', 'Epic', 'Deal 20 Damage.', { damage: 20 }, 'Sun', 'yellow');
addRecipe('solar_flare', 'plasma', 'supernova_spark');

addCard('void_rift', 'Void Rift', 'Epic', 'Deal 15 Dmg, Stun 1 Turn.', { damage: 15, stun: 1 }, 'Moon', 'purple');
addRecipe('void_ray', 'dark_matter', 'void_rift');

addCard('divine_shield', 'Divine Shield', 'Epic', 'Gain 20 Shield.', { shield: 20 }, 'Shield', 'yellow');
addRecipe('holy_light', 'crystal_ward', 'divine_shield');

addCard('life_drain', 'Life Drain', 'Epic', 'Deal 12 Dmg, Heal 12 HP.', { damage: 12, heal: 12 }, 'Skull', 'red');
addRecipe('soul_drain', 'blood_magic', 'life_drain');

addCard('chaos_bolt', 'Chaos Bolt', 'Epic', 'Deal 16 Dmg, Draw 1 Card.', { damage: 16, draw: 1 }, 'Zap', 'purple');
addRecipe('void_ray', 'lightning', 'chaos_bolt');

addCard('aurora', 'Aurora', 'Epic', 'Heal 15 HP, Draw 2 Cards.', { heal: 15, draw: 2 }, 'Star', 'cyan');
addRecipe('holy_light', 'prism', 'aurora');

addCard('meteor_shower', 'Meteor Shower', 'Epic', 'Deal 18 Dmg.', { damage: 18 }, 'Flame', 'orange');
addRecipe('meteor_fragment', 'blaze', 'meteor_shower');

addCard('hurricane_minor', 'Lesser Hurricane', 'Epic', 'Deal 10 Dmg, Draw 3 Cards.', { damage: 10, draw: 3 }, 'Tornado', 'sky');
addRecipe('cyclone', 'tornado', 'hurricane_minor');


// --- LEGENDARY (20) ---
addCard('meteor', 'Meteor Strike', 'Legendary', 'Deal 25 Damage.', { damage: 25 }, 'CloudLightning', 'orange');
addRecipe('pyroblast', 'meteor_shower', 'meteor');

addCard('sanctuary', 'Sanctuary', 'Legendary', 'Heal 20 HP, Gain 20 Shield.', { heal: 20, shield: 20 }, 'Home', 'yellow');
addRecipe('crystal_ward', 'divine_shield', 'sanctuary');

addCard('absolute_zero', 'Absolute Zero', 'Legendary', 'Deal 15 Dmg, Stun 2 Turns.', { damage: 15, stun: 2 }, 'Snowflake', 'blue');
addRecipe('blizzard', 'glacier', 'absolute_zero');

addCard('volcano', 'Volcanic Eruption', 'Legendary', 'Deal 20 Dmg, Gain 15 Shield.', { damage: 20, shield: 15 }, 'Mountain', 'rose');
addRecipe('eruption', 'earthquake', 'volcano');

addCard('hurricane', 'Hurricane', 'Legendary', 'Deal 15 Dmg, Draw 4 Cards.', { damage: 15, draw: 4 }, 'Tornado', 'sky');
addRecipe('hurricane_minor', 'typhoon', 'hurricane');

addCard('phoenix', 'Phoenix Tear', 'Legendary', 'Heal 40 HP.', { heal: 40 }, 'Flame', 'orange');
addRecipe('inferno', 'aurora', 'phoenix');

addCard('avalanche', 'Avalanche', 'Legendary', 'Deal 20 Dmg, Stun 2 Turns.', { damage: 20, stun: 2 }, 'Snowflake', 'slate');
addRecipe('avalanche_minor', 'earthquake', 'avalanche');

addCard('leviathan', 'Leviathan\'s Call', 'Legendary', 'Deal 15 Dmg, Heal 20 HP.', { damage: 15, heal: 20 }, 'Waves', 'blue');
addRecipe('tsunami', 'monsoon', 'leviathan');

addCard('behemoth', 'Behemoth\'s Stride', 'Legendary', 'Deal 15 Dmg, Gain 25 Shield.', { damage: 15, shield: 25 }, 'Mountain', 'emerald');
addRecipe('earthquake', 'obsidian_wall', 'behemoth');

addCard('supernova', 'Supernova', 'Legendary', 'Deal 30 Damage.', { damage: 30 }, 'Sun', 'yellow');
addRecipe('supernova_spark', 'solar_beam', 'supernova');

addCard('black_hole', 'Black Hole', 'Legendary', 'Deal 20 Dmg, Draw 3 Cards.', { damage: 20, draw: 3 }, 'Moon', 'purple');
addRecipe('void_rift', 'mind_blast', 'black_hole');

addCard('yggdrasil', 'Yggdrasil\'s Blessing', 'Legendary', 'Heal 25 HP, Draw 2 Cards.', { heal: 25, draw: 2 }, 'Leaf', 'emerald');
addRecipe('nature_wrath', 'sanctuary', 'yggdrasil');

addCard('aegis', 'Aegis Shield', 'Legendary', 'Gain 40 Shield.', { shield: 40 }, 'Shield', 'slate');
addRecipe('obsidian_wall', 'steel_forge', 'aegis');

addCard('chronos', 'Chronos Shift', 'Legendary', 'Stun 3 Turns.', { stun: 3 }, 'Clock', 'indigo');
addRecipe('lunar_eclipse', 'mind_blast', 'chronos');

addCard('dragon_breath', 'Dragon Breath', 'Legendary', 'Deal 22 Dmg, Gain 10 Shield.', { damage: 22, shield: 10 }, 'Flame', 'rose');
addRecipe('inferno', 'pyroblast', 'dragon_breath');

addCard('toxic_nova', 'Toxic Nova', 'Legendary', 'Deal 18 Dmg, Draw 3 Cards.', { damage: 18, draw: 3 }, 'Zap', 'lime');
addRecipe('venom_strike', 'chaos_bolt', 'toxic_nova');

addCard('abyss', 'Abyss', 'Legendary', 'Deal 25 Dmg, Stun 2 Turns.', { damage: 25, stun: 2 }, 'Moon', 'slate');
addRecipe('sinkhole', 'void_rift', 'abyss');

addCard('celestial_alignment', 'Celestial Alignment', 'Legendary', 'Draw 5 Cards, Heal 20 HP.', { draw: 5, heal: 20 }, 'Star', 'indigo');
addRecipe('lunar_eclipse', 'aurora', 'celestial_alignment');

addCard('vampiric_aura', 'Vampiric Aura', 'Legendary', 'Deal 20 Dmg, Heal 20 HP.', { damage: 20, heal: 20 }, 'Skull', 'red');
addRecipe('life_drain', 'blood_magic', 'vampiric_aura');

addCard('divine_wrath', 'Divine Wrath', 'Legendary', 'Deal 25 Dmg, Heal 10 HP.', { damage: 25, heal: 10 }, 'Sun', 'yellow');
addRecipe('solar_beam', 'holy_light', 'divine_wrath');


// --- MYTHIC (10) ---
addCard('armageddon', 'Armageddon', 'Mythic', 'Deal 50 Damage.', { damage: 50 }, 'Skull', 'red');
addRecipe('meteor', 'supernova', 'armageddon');

addCard('void', 'Void Collapse', 'Mythic', 'Deal 40 Dmg, Stun 1 Turn.', { damage: 40, stun: 1 }, 'Moon', 'purple');
addRecipe('black_hole', 'abyss', 'void');

addCard('genesis', 'Genesis', 'Mythic', 'Heal 50 HP, Gain 20 Shield.', { heal: 50, shield: 20 }, 'Sun', 'yellow');
addRecipe('sanctuary', 'yggdrasil', 'genesis');

addCard('omniscience', 'Omniscience', 'Mythic', 'Draw 7 Cards, Heal 10 HP.', { draw: 7, heal: 10 }, 'Eye', 'indigo');
addRecipe('chronos', 'celestial_alignment', 'omniscience');

addCard('cataclysm', 'Cataclysm', 'Mythic', 'Deal 35 Dmg, Gain 20 Shield.', { damage: 35, shield: 20 }, 'Activity', 'rose');
addRecipe('volcano', 'behemoth', 'cataclysm');

addCard('plague', 'Plague', 'Mythic', 'Deal 45 Dmg, Draw 5 Cards.', { damage: 45, draw: 5 }, 'Zap', 'lime');
addRecipe('toxic_nova', 'vampiric_aura', 'plague');

addCard('singularity', 'Singularity', 'Mythic', 'Deal 60 Dmg, Stun 3 Turns.', { damage: 60, stun: 3 }, 'Moon', 'slate');
addRecipe('void', 'chronos', 'singularity');

addCard('big_bang', 'Big Bang', 'Mythic', 'Deal 80 Dmg, Heal 20 HP.', { damage: 80, heal: 20 }, 'Sun', 'yellow');
addRecipe('supernova', 'divine_wrath', 'big_bang');

addCard('omnipresence', 'Omnipresence', 'Mythic', 'Draw 10 Cards, Heal 40 HP.', { draw: 10, heal: 40 }, 'Eye', 'indigo');
addRecipe('celestial_alignment', 'omniscience', 'omnipresence');

addCard('ragnarok', 'Ragnarok', 'Mythic', 'Deal 100 Damage.', { damage: 100 }, 'Flame', 'red');
addRecipe('armageddon', 'cataclysm', 'ragnarok');

const fileContent = `export type Rarity = 'Basic' | 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface CardDef {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  damage?: number;
  heal?: number;
  shield?: number;
  stun?: number;
  draw?: number;
  icon: string;
  color: string;
}

export const CARDS: Record<string, CardDef> = ${JSON.stringify(cards, null, 2)};

export const RECIPES: Record<string, string> = ${JSON.stringify(recipes, null, 2)};
`;

fs.writeFileSync('src/shared/cards.ts', fileContent);
console.log('Cards generated successfully. Total cards:', Object.keys(cards).length, 'Total recipes:', Object.keys(recipes).length);
