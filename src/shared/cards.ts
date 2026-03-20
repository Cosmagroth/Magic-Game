export type Rarity = 'Basic' | 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

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

export const CARDS: Record<string, CardDef> = {
  "fire": {
    "id": "fire",
    "name": "Fire Element",
    "rarity": "Basic",
    "description": "Deal 2 Damage.",
    "damage": 2,
    "icon": "Flame",
    "color": "rose"
  },
  "water": {
    "id": "water",
    "name": "Water Element",
    "rarity": "Basic",
    "description": "Heal 2 HP.",
    "heal": 2,
    "icon": "Droplets",
    "color": "cyan"
  },
  "earth": {
    "id": "earth",
    "name": "Earth Element",
    "rarity": "Basic",
    "description": "Gain 2 Shield.",
    "shield": 2,
    "icon": "Mountain",
    "color": "emerald"
  },
  "air": {
    "id": "air",
    "name": "Air Element",
    "rarity": "Basic",
    "description": "Draw 1 Card.",
    "draw": 1,
    "icon": "Wind",
    "color": "sky"
  },
  "light": {
    "id": "light",
    "name": "Light Element",
    "rarity": "Basic",
    "description": "Heal 1 HP, Draw 1 Card.",
    "heal": 1,
    "draw": 1,
    "icon": "Sun",
    "color": "yellow"
  },
  "dark": {
    "id": "dark",
    "name": "Dark Element",
    "rarity": "Basic",
    "description": "Deal 3 Damage, take 1 Damage.",
    "damage": 3,
    "icon": "Moon",
    "color": "purple"
  },
  "fireball": {
    "id": "fireball",
    "name": "Fireball",
    "rarity": "Common",
    "description": "Deal 6 Damage.",
    "damage": 6,
    "icon": "Flame",
    "color": "rose"
  },
  "steam": {
    "id": "steam",
    "name": "Steam Cloud",
    "rarity": "Common",
    "description": "Heal 3 HP, Draw 1 Card.",
    "heal": 3,
    "draw": 1,
    "icon": "Cloud",
    "color": "sky"
  },
  "magma": {
    "id": "magma",
    "name": "Magma Bolt",
    "rarity": "Common",
    "description": "Deal 4 Dmg, Gain 2 Shield.",
    "damage": 4,
    "shield": 2,
    "icon": "Flame",
    "color": "orange"
  },
  "smoke": {
    "id": "smoke",
    "name": "Smoke Screen",
    "rarity": "Common",
    "description": "Gain 3 Shield, Draw 1 Card.",
    "shield": 3,
    "draw": 1,
    "icon": "Cloud",
    "color": "slate"
  },
  "radiance": {
    "id": "radiance",
    "name": "Radiance",
    "rarity": "Common",
    "description": "Deal 3 Dmg, Heal 3 HP.",
    "damage": 3,
    "heal": 3,
    "icon": "Sun",
    "color": "yellow"
  },
  "hellfire": {
    "id": "hellfire",
    "name": "Hellfire",
    "rarity": "Common",
    "description": "Deal 8 Damage.",
    "damage": 8,
    "icon": "Flame",
    "color": "red"
  },
  "heal_wave": {
    "id": "heal_wave",
    "name": "Healing Wave",
    "rarity": "Common",
    "description": "Heal 6 HP.",
    "heal": 6,
    "icon": "Droplets",
    "color": "cyan"
  },
  "mud": {
    "id": "mud",
    "name": "Mud Splatter",
    "rarity": "Common",
    "description": "Deal 2 Dmg, Heal 2 HP.",
    "damage": 2,
    "heal": 2,
    "icon": "Droplets",
    "color": "amber"
  },
  "ice": {
    "id": "ice",
    "name": "Ice Shard",
    "rarity": "Common",
    "description": "Deal 3 Dmg, Stun 1 Turn.",
    "damage": 3,
    "stun": 1,
    "icon": "Snowflake",
    "color": "blue"
  },
  "holy_water": {
    "id": "holy_water",
    "name": "Holy Water",
    "rarity": "Common",
    "description": "Heal 5 HP, Draw 1 Card.",
    "heal": 5,
    "draw": 1,
    "icon": "Droplets",
    "color": "yellow"
  },
  "poison": {
    "id": "poison",
    "name": "Poison Vial",
    "rarity": "Common",
    "description": "Deal 5 Dmg.",
    "damage": 5,
    "icon": "Droplets",
    "color": "purple"
  },
  "rock_wall": {
    "id": "rock_wall",
    "name": "Rock Wall",
    "rarity": "Common",
    "description": "Gain 6 Shield.",
    "shield": 6,
    "icon": "Mountain",
    "color": "emerald"
  },
  "dust": {
    "id": "dust",
    "name": "Dust Devil",
    "rarity": "Common",
    "description": "Deal 3 Dmg, Draw 1 Card.",
    "damage": 3,
    "draw": 1,
    "icon": "Wind",
    "color": "amber"
  },
  "crystal": {
    "id": "crystal",
    "name": "Crystal",
    "rarity": "Common",
    "description": "Gain 4 Shield, Heal 2 HP.",
    "shield": 4,
    "heal": 2,
    "icon": "Diamond",
    "color": "cyan"
  },
  "obsidian": {
    "id": "obsidian",
    "name": "Obsidian",
    "rarity": "Common",
    "description": "Gain 5 Shield, Deal 2 Dmg.",
    "shield": 5,
    "damage": 2,
    "icon": "Diamond",
    "color": "slate"
  },
  "gust": {
    "id": "gust",
    "name": "Gust",
    "rarity": "Common",
    "description": "Draw 2 Cards.",
    "draw": 2,
    "icon": "Wind",
    "color": "sky"
  },
  "mirage": {
    "id": "mirage",
    "name": "Mirage",
    "rarity": "Common",
    "description": "Gain 3 Shield, Draw 2 Cards.",
    "shield": 3,
    "draw": 2,
    "icon": "Sun",
    "color": "amber"
  },
  "miasma": {
    "id": "miasma",
    "name": "Miasma",
    "rarity": "Common",
    "description": "Deal 4 Dmg, Stun 1 Turn.",
    "damage": 4,
    "stun": 1,
    "icon": "Cloud",
    "color": "purple"
  },
  "flash": {
    "id": "flash",
    "name": "Flash",
    "rarity": "Common",
    "description": "Stun 1 Turn, Draw 1 Card.",
    "stun": 1,
    "draw": 1,
    "icon": "Zap",
    "color": "yellow"
  },
  "twilight": {
    "id": "twilight",
    "name": "Twilight",
    "rarity": "Common",
    "description": "Deal 4 Dmg, Heal 4 HP.",
    "damage": 4,
    "heal": 4,
    "icon": "Moon",
    "color": "indigo"
  },
  "shadow": {
    "id": "shadow",
    "name": "Shadow Strike",
    "rarity": "Common",
    "description": "Deal 7 Dmg.",
    "damage": 7,
    "icon": "Moon",
    "color": "slate"
  },
  "blaze": {
    "id": "blaze",
    "name": "Blaze",
    "rarity": "Rare",
    "description": "Deal 10 Damage.",
    "damage": 10,
    "icon": "Flame",
    "color": "rose"
  },
  "lightning": {
    "id": "lightning",
    "name": "Lightning Strike",
    "rarity": "Rare",
    "description": "Deal 8 Dmg, Stun 1 Turn.",
    "damage": 8,
    "stun": 1,
    "icon": "Zap",
    "color": "yellow"
  },
  "geyser": {
    "id": "geyser",
    "name": "Geyser",
    "rarity": "Rare",
    "description": "Deal 6 Dmg, Heal 4 HP.",
    "damage": 6,
    "heal": 4,
    "icon": "Waves",
    "color": "cyan"
  },
  "sandstorm": {
    "id": "sandstorm",
    "name": "Sandstorm",
    "rarity": "Rare",
    "description": "Deal 5 Dmg, Draw 2 Cards.",
    "damage": 5,
    "draw": 2,
    "icon": "Tornado",
    "color": "amber"
  },
  "frostbite": {
    "id": "frostbite",
    "name": "Frostbite",
    "rarity": "Rare",
    "description": "Deal 6 Dmg, Stun 1 Turn.",
    "damage": 6,
    "stun": 1,
    "icon": "Snowflake",
    "color": "blue"
  },
  "lava_flow": {
    "id": "lava_flow",
    "name": "Lava Flow",
    "rarity": "Rare",
    "description": "Deal 8 Dmg, Gain 4 Shield.",
    "damage": 8,
    "shield": 4,
    "icon": "Flame",
    "color": "orange"
  },
  "thunder": {
    "id": "thunder",
    "name": "Thunder Clap",
    "rarity": "Rare",
    "description": "Deal 7 Dmg, Stun 1 Turn.",
    "damage": 7,
    "stun": 1,
    "icon": "CloudLightning",
    "color": "yellow"
  },
  "aqua_ring": {
    "id": "aqua_ring",
    "name": "Aqua Ring",
    "rarity": "Rare",
    "description": "Heal 8 HP, Draw 1 Card.",
    "heal": 8,
    "draw": 1,
    "icon": "Droplets",
    "color": "cyan"
  },
  "stone_golem": {
    "id": "stone_golem",
    "name": "Stone Golem",
    "rarity": "Rare",
    "description": "Gain 12 Shield.",
    "shield": 12,
    "icon": "Mountain",
    "color": "emerald"
  },
  "cyclone": {
    "id": "cyclone",
    "name": "Cyclone",
    "rarity": "Rare",
    "description": "Draw 3 Cards.",
    "draw": 3,
    "icon": "Tornado",
    "color": "sky"
  },
  "sunbeam": {
    "id": "sunbeam",
    "name": "Sunbeam",
    "rarity": "Rare",
    "description": "Heal 6 HP, Gain 4 Shield.",
    "heal": 6,
    "shield": 4,
    "icon": "Sun",
    "color": "yellow"
  },
  "moonlight": {
    "id": "moonlight",
    "name": "Moonlight",
    "rarity": "Rare",
    "description": "Draw 2 Cards, Heal 4 HP.",
    "draw": 2,
    "heal": 4,
    "icon": "Moon",
    "color": "indigo"
  },
  "blood_magic": {
    "id": "blood_magic",
    "name": "Blood Magic",
    "rarity": "Rare",
    "description": "Deal 12 Dmg, Heal 2 HP.",
    "damage": 12,
    "heal": 2,
    "icon": "Droplets",
    "color": "red"
  },
  "vine_whip": {
    "id": "vine_whip",
    "name": "Vine Whip",
    "rarity": "Rare",
    "description": "Deal 6 Dmg, Heal 4 HP.",
    "damage": 6,
    "heal": 4,
    "icon": "Leaf",
    "color": "emerald"
  },
  "static_field": {
    "id": "static_field",
    "name": "Static Field",
    "rarity": "Rare",
    "description": "Gain 5 Shield, Stun 1 Turn.",
    "shield": 5,
    "stun": 1,
    "icon": "Zap",
    "color": "yellow"
  },
  "acid_rain": {
    "id": "acid_rain",
    "name": "Acid Rain",
    "rarity": "Rare",
    "description": "Deal 8 Dmg.",
    "damage": 8,
    "icon": "CloudRain",
    "color": "lime"
  },
  "ash_cloud": {
    "id": "ash_cloud",
    "name": "Ash Cloud",
    "rarity": "Rare",
    "description": "Gain 8 Shield.",
    "shield": 8,
    "icon": "Cloud",
    "color": "slate"
  },
  "whirlpool": {
    "id": "whirlpool",
    "name": "Whirlpool",
    "rarity": "Rare",
    "description": "Deal 5 Dmg, Draw 2 Cards.",
    "damage": 5,
    "draw": 2,
    "icon": "Waves",
    "color": "blue"
  },
  "meteor_fragment": {
    "id": "meteor_fragment",
    "name": "Meteor Fragment",
    "rarity": "Rare",
    "description": "Deal 9 Dmg.",
    "damage": 9,
    "icon": "Flame",
    "color": "orange"
  },
  "poison_dart": {
    "id": "poison_dart",
    "name": "Poison Dart",
    "rarity": "Rare",
    "description": "Deal 3 Dmg, Draw 1 Card.",
    "damage": 3,
    "draw": 1,
    "icon": "Zap",
    "color": "lime"
  },
  "quicksand": {
    "id": "quicksand",
    "name": "Quicksand",
    "rarity": "Rare",
    "description": "Deal 4 Dmg, Stun 1 Turn.",
    "damage": 4,
    "stun": 1,
    "icon": "Mountain",
    "color": "amber"
  },
  "healing_spring": {
    "id": "healing_spring",
    "name": "Healing Spring",
    "rarity": "Rare",
    "description": "Heal 10 HP.",
    "heal": 10,
    "icon": "Droplets",
    "color": "cyan"
  },
  "scald": {
    "id": "scald",
    "name": "Scald",
    "rarity": "Rare",
    "description": "Deal 6 Dmg, Draw 1 Card.",
    "damage": 6,
    "draw": 1,
    "icon": "Flame",
    "color": "rose"
  },
  "obsidian_shard": {
    "id": "obsidian_shard",
    "name": "Obsidian Shard",
    "rarity": "Rare",
    "description": "Deal 5 Dmg, Gain 5 Shield.",
    "damage": 5,
    "shield": 5,
    "icon": "Diamond",
    "color": "slate"
  },
  "hail": {
    "id": "hail",
    "name": "Hailstorm",
    "rarity": "Rare",
    "description": "Deal 4 Dmg, Stun 1 Turn, Draw 1.",
    "damage": 4,
    "stun": 1,
    "draw": 1,
    "icon": "CloudRain",
    "color": "blue"
  },
  "crystal_shard": {
    "id": "crystal_shard",
    "name": "Crystal Shard",
    "rarity": "Rare",
    "description": "Deal 4 Dmg, Gain 6 Shield.",
    "damage": 4,
    "shield": 6,
    "icon": "Diamond",
    "color": "purple"
  },
  "mud_armor": {
    "id": "mud_armor",
    "name": "Mud Armor",
    "rarity": "Rare",
    "description": "Heal 5 HP, Gain 5 Shield.",
    "heal": 5,
    "shield": 5,
    "icon": "Shield",
    "color": "amber"
  },
  "solar_flare": {
    "id": "solar_flare",
    "name": "Solar Flare",
    "rarity": "Rare",
    "description": "Deal 12 Damage.",
    "damage": 12,
    "icon": "Sun",
    "color": "yellow"
  },
  "lunar_tide": {
    "id": "lunar_tide",
    "name": "Lunar Tide",
    "rarity": "Rare",
    "description": "Heal 8 HP, Gain 4 Shield.",
    "heal": 8,
    "shield": 4,
    "icon": "Moon",
    "color": "indigo"
  },
  "void_ray": {
    "id": "void_ray",
    "name": "Void Ray",
    "rarity": "Rare",
    "description": "Deal 10 Dmg, Stun 1 Turn.",
    "damage": 10,
    "stun": 1,
    "icon": "Zap",
    "color": "purple"
  },
  "holy_light": {
    "id": "holy_light",
    "name": "Holy Light",
    "rarity": "Rare",
    "description": "Heal 12 HP.",
    "heal": 12,
    "icon": "Sun",
    "color": "yellow"
  },
  "dark_matter": {
    "id": "dark_matter",
    "name": "Dark Matter",
    "rarity": "Rare",
    "description": "Deal 8 Dmg, Gain 4 Shield.",
    "damage": 8,
    "shield": 4,
    "icon": "Moon",
    "color": "slate"
  },
  "prism": {
    "id": "prism",
    "name": "Prism",
    "rarity": "Rare",
    "description": "Draw 2 Cards, Gain 4 Shield.",
    "draw": 2,
    "shield": 4,
    "icon": "Diamond",
    "color": "cyan"
  },
  "eclipse": {
    "id": "eclipse",
    "name": "Eclipse",
    "rarity": "Rare",
    "description": "Deal 6 Dmg, Heal 6 HP.",
    "damage": 6,
    "heal": 6,
    "icon": "Moon",
    "color": "indigo"
  },
  "soul_drain": {
    "id": "soul_drain",
    "name": "Soul Drain",
    "rarity": "Rare",
    "description": "Deal 8 Dmg, Heal 4 HP.",
    "damage": 8,
    "heal": 4,
    "icon": "Skull",
    "color": "purple"
  },
  "pyroblast": {
    "id": "pyroblast",
    "name": "Pyroblast",
    "rarity": "Epic",
    "description": "Deal 16 Damage.",
    "damage": 16,
    "icon": "Flame",
    "color": "rose"
  },
  "tsunami": {
    "id": "tsunami",
    "name": "Tsunami",
    "rarity": "Epic",
    "description": "Deal 10 Dmg, Heal 10 HP.",
    "damage": 10,
    "heal": 10,
    "icon": "Waves",
    "color": "cyan"
  },
  "earthquake": {
    "id": "earthquake",
    "name": "Earthquake",
    "rarity": "Epic",
    "description": "Deal 12 Dmg, Gain 8 Shield.",
    "damage": 12,
    "shield": 8,
    "icon": "Activity",
    "color": "emerald"
  },
  "tornado": {
    "id": "tornado",
    "name": "Tornado",
    "rarity": "Epic",
    "description": "Deal 8 Dmg, Draw 3 Cards.",
    "damage": 8,
    "draw": 3,
    "icon": "Tornado",
    "color": "sky"
  },
  "plasma": {
    "id": "plasma",
    "name": "Plasma Burst",
    "rarity": "Epic",
    "description": "Deal 14 Dmg, Stun 1 Turn.",
    "damage": 14,
    "stun": 1,
    "icon": "Zap",
    "color": "purple"
  },
  "obsidian_wall": {
    "id": "obsidian_wall",
    "name": "Obsidian Wall",
    "rarity": "Epic",
    "description": "Gain 18 Shield.",
    "shield": 18,
    "icon": "Shield",
    "color": "slate"
  },
  "crystal_ward": {
    "id": "crystal_ward",
    "name": "Crystal Ward",
    "rarity": "Epic",
    "description": "Heal 10 HP, Gain 10 Shield.",
    "heal": 10,
    "shield": 10,
    "icon": "Diamond",
    "color": "cyan"
  },
  "storm": {
    "id": "storm",
    "name": "Thunderstorm",
    "rarity": "Epic",
    "description": "Deal 12 Dmg, Draw 2 Cards.",
    "damage": 12,
    "draw": 2,
    "icon": "CloudLightning",
    "color": "blue"
  },
  "blizzard": {
    "id": "blizzard",
    "name": "Blizzard",
    "rarity": "Epic",
    "description": "Deal 10 Dmg, Stun 1 Turn.",
    "damage": 10,
    "stun": 1,
    "icon": "Snowflake",
    "color": "sky"
  },
  "inferno": {
    "id": "inferno",
    "name": "Inferno",
    "rarity": "Epic",
    "description": "Deal 14 Dmg, Heal 4 HP.",
    "damage": 14,
    "heal": 4,
    "icon": "Flame",
    "color": "orange"
  },
  "glacier": {
    "id": "glacier",
    "name": "Glacier",
    "rarity": "Epic",
    "description": "Gain 12 Shield, Stun 1 Turn.",
    "shield": 12,
    "stun": 1,
    "icon": "Mountain",
    "color": "blue"
  },
  "monsoon": {
    "id": "monsoon",
    "name": "Monsoon",
    "rarity": "Epic",
    "description": "Heal 12 HP, Draw 2 Cards.",
    "heal": 12,
    "draw": 2,
    "icon": "CloudRain",
    "color": "cyan"
  },
  "eruption": {
    "id": "eruption",
    "name": "Eruption",
    "rarity": "Epic",
    "description": "Deal 15 Dmg, Gain 5 Shield.",
    "damage": 15,
    "shield": 5,
    "icon": "Mountain",
    "color": "rose"
  },
  "typhoon": {
    "id": "typhoon",
    "name": "Typhoon",
    "rarity": "Epic",
    "description": "Deal 10 Dmg, Draw 2 Cards.",
    "damage": 10,
    "draw": 2,
    "icon": "Waves",
    "color": "blue"
  },
  "avalanche_minor": {
    "id": "avalanche_minor",
    "name": "Lesser Avalanche",
    "rarity": "Epic",
    "description": "Deal 12 Dmg, Stun 1 Turn.",
    "damage": 12,
    "stun": 1,
    "icon": "Snowflake",
    "color": "slate"
  },
  "nature_wrath": {
    "id": "nature_wrath",
    "name": "Nature's Wrath",
    "rarity": "Epic",
    "description": "Deal 10 Dmg, Heal 8 HP.",
    "damage": 10,
    "heal": 8,
    "icon": "Leaf",
    "color": "emerald"
  },
  "steel_forge": {
    "id": "steel_forge",
    "name": "Steel Forge",
    "rarity": "Epic",
    "description": "Gain 15 Shield, Draw 1 Card.",
    "shield": 15,
    "draw": 1,
    "icon": "Shield",
    "color": "slate"
  },
  "mind_blast": {
    "id": "mind_blast",
    "name": "Mind Blast",
    "rarity": "Epic",
    "description": "Deal 8 Dmg, Stun 1 Turn, Draw 1.",
    "damage": 8,
    "stun": 1,
    "draw": 1,
    "icon": "Eye",
    "color": "purple"
  },
  "venom_strike": {
    "id": "venom_strike",
    "name": "Venom Strike",
    "rarity": "Epic",
    "description": "Deal 8 Dmg, Draw 2 Cards.",
    "damage": 8,
    "draw": 2,
    "icon": "Zap",
    "color": "lime"
  },
  "sinkhole": {
    "id": "sinkhole",
    "name": "Sinkhole",
    "rarity": "Epic",
    "description": "Deal 10 Dmg, Stun 1 Turn.",
    "damage": 10,
    "stun": 1,
    "icon": "Mountain",
    "color": "amber"
  },
  "solar_beam": {
    "id": "solar_beam",
    "name": "Solar Beam",
    "rarity": "Epic",
    "description": "Deal 18 Damage.",
    "damage": 18,
    "icon": "Sun",
    "color": "yellow"
  },
  "lunar_eclipse": {
    "id": "lunar_eclipse",
    "name": "Lunar Eclipse",
    "rarity": "Epic",
    "description": "Draw 4 Cards, Heal 8 HP.",
    "draw": 4,
    "heal": 8,
    "icon": "Moon",
    "color": "indigo"
  },
  "supernova_spark": {
    "id": "supernova_spark",
    "name": "Supernova Spark",
    "rarity": "Epic",
    "description": "Deal 20 Damage.",
    "damage": 20,
    "icon": "Sun",
    "color": "yellow"
  },
  "void_rift": {
    "id": "void_rift",
    "name": "Void Rift",
    "rarity": "Epic",
    "description": "Deal 15 Dmg, Stun 1 Turn.",
    "damage": 15,
    "stun": 1,
    "icon": "Moon",
    "color": "purple"
  },
  "divine_shield": {
    "id": "divine_shield",
    "name": "Divine Shield",
    "rarity": "Epic",
    "description": "Gain 20 Shield.",
    "shield": 20,
    "icon": "Shield",
    "color": "yellow"
  },
  "life_drain": {
    "id": "life_drain",
    "name": "Life Drain",
    "rarity": "Epic",
    "description": "Deal 12 Dmg, Heal 12 HP.",
    "damage": 12,
    "heal": 12,
    "icon": "Skull",
    "color": "red"
  },
  "chaos_bolt": {
    "id": "chaos_bolt",
    "name": "Chaos Bolt",
    "rarity": "Epic",
    "description": "Deal 16 Dmg, Draw 1 Card.",
    "damage": 16,
    "draw": 1,
    "icon": "Zap",
    "color": "purple"
  },
  "aurora": {
    "id": "aurora",
    "name": "Aurora",
    "rarity": "Epic",
    "description": "Heal 15 HP, Draw 2 Cards.",
    "heal": 15,
    "draw": 2,
    "icon": "Star",
    "color": "cyan"
  },
  "meteor_shower": {
    "id": "meteor_shower",
    "name": "Meteor Shower",
    "rarity": "Epic",
    "description": "Deal 18 Dmg.",
    "damage": 18,
    "icon": "Flame",
    "color": "orange"
  },
  "hurricane_minor": {
    "id": "hurricane_minor",
    "name": "Lesser Hurricane",
    "rarity": "Epic",
    "description": "Deal 10 Dmg, Draw 3 Cards.",
    "damage": 10,
    "draw": 3,
    "icon": "Tornado",
    "color": "sky"
  },
  "meteor": {
    "id": "meteor",
    "name": "Meteor Strike",
    "rarity": "Legendary",
    "description": "Deal 25 Damage.",
    "damage": 25,
    "icon": "CloudLightning",
    "color": "orange"
  },
  "sanctuary": {
    "id": "sanctuary",
    "name": "Sanctuary",
    "rarity": "Legendary",
    "description": "Heal 20 HP, Gain 20 Shield.",
    "heal": 20,
    "shield": 20,
    "icon": "Home",
    "color": "yellow"
  },
  "absolute_zero": {
    "id": "absolute_zero",
    "name": "Absolute Zero",
    "rarity": "Legendary",
    "description": "Deal 15 Dmg, Stun 2 Turns.",
    "damage": 15,
    "stun": 2,
    "icon": "Snowflake",
    "color": "blue"
  },
  "volcano": {
    "id": "volcano",
    "name": "Volcanic Eruption",
    "rarity": "Legendary",
    "description": "Deal 20 Dmg, Gain 15 Shield.",
    "damage": 20,
    "shield": 15,
    "icon": "Mountain",
    "color": "rose"
  },
  "hurricane": {
    "id": "hurricane",
    "name": "Hurricane",
    "rarity": "Legendary",
    "description": "Deal 15 Dmg, Draw 4 Cards.",
    "damage": 15,
    "draw": 4,
    "icon": "Tornado",
    "color": "sky"
  },
  "phoenix": {
    "id": "phoenix",
    "name": "Phoenix Tear",
    "rarity": "Legendary",
    "description": "Heal 40 HP.",
    "heal": 40,
    "icon": "Flame",
    "color": "orange"
  },
  "avalanche": {
    "id": "avalanche",
    "name": "Avalanche",
    "rarity": "Legendary",
    "description": "Deal 20 Dmg, Stun 2 Turns.",
    "damage": 20,
    "stun": 2,
    "icon": "Snowflake",
    "color": "slate"
  },
  "leviathan": {
    "id": "leviathan",
    "name": "Leviathan's Call",
    "rarity": "Legendary",
    "description": "Deal 15 Dmg, Heal 20 HP.",
    "damage": 15,
    "heal": 20,
    "icon": "Waves",
    "color": "blue"
  },
  "behemoth": {
    "id": "behemoth",
    "name": "Behemoth's Stride",
    "rarity": "Legendary",
    "description": "Deal 15 Dmg, Gain 25 Shield.",
    "damage": 15,
    "shield": 25,
    "icon": "Mountain",
    "color": "emerald"
  },
  "supernova": {
    "id": "supernova",
    "name": "Supernova",
    "rarity": "Legendary",
    "description": "Deal 30 Damage.",
    "damage": 30,
    "icon": "Sun",
    "color": "yellow"
  },
  "black_hole": {
    "id": "black_hole",
    "name": "Black Hole",
    "rarity": "Legendary",
    "description": "Deal 20 Dmg, Draw 3 Cards.",
    "damage": 20,
    "draw": 3,
    "icon": "Moon",
    "color": "purple"
  },
  "yggdrasil": {
    "id": "yggdrasil",
    "name": "Yggdrasil's Blessing",
    "rarity": "Legendary",
    "description": "Heal 25 HP, Draw 2 Cards.",
    "heal": 25,
    "draw": 2,
    "icon": "Leaf",
    "color": "emerald"
  },
  "aegis": {
    "id": "aegis",
    "name": "Aegis Shield",
    "rarity": "Legendary",
    "description": "Gain 40 Shield.",
    "shield": 40,
    "icon": "Shield",
    "color": "slate"
  },
  "chronos": {
    "id": "chronos",
    "name": "Chronos Shift",
    "rarity": "Legendary",
    "description": "Stun 3 Turns.",
    "stun": 3,
    "icon": "Clock",
    "color": "indigo"
  },
  "dragon_breath": {
    "id": "dragon_breath",
    "name": "Dragon Breath",
    "rarity": "Legendary",
    "description": "Deal 22 Dmg, Gain 10 Shield.",
    "damage": 22,
    "shield": 10,
    "icon": "Flame",
    "color": "rose"
  },
  "toxic_nova": {
    "id": "toxic_nova",
    "name": "Toxic Nova",
    "rarity": "Legendary",
    "description": "Deal 18 Dmg, Draw 3 Cards.",
    "damage": 18,
    "draw": 3,
    "icon": "Zap",
    "color": "lime"
  },
  "abyss": {
    "id": "abyss",
    "name": "Abyss",
    "rarity": "Legendary",
    "description": "Deal 25 Dmg, Stun 2 Turns.",
    "damage": 25,
    "stun": 2,
    "icon": "Moon",
    "color": "slate"
  },
  "celestial_alignment": {
    "id": "celestial_alignment",
    "name": "Celestial Alignment",
    "rarity": "Legendary",
    "description": "Draw 5 Cards, Heal 20 HP.",
    "draw": 5,
    "heal": 20,
    "icon": "Star",
    "color": "indigo"
  },
  "vampiric_aura": {
    "id": "vampiric_aura",
    "name": "Vampiric Aura",
    "rarity": "Legendary",
    "description": "Deal 20 Dmg, Heal 20 HP.",
    "damage": 20,
    "heal": 20,
    "icon": "Skull",
    "color": "red"
  },
  "divine_wrath": {
    "id": "divine_wrath",
    "name": "Divine Wrath",
    "rarity": "Legendary",
    "description": "Deal 25 Dmg, Heal 10 HP.",
    "damage": 25,
    "heal": 10,
    "icon": "Sun",
    "color": "yellow"
  },
  "armageddon": {
    "id": "armageddon",
    "name": "Armageddon",
    "rarity": "Mythic",
    "description": "Deal 50 Damage.",
    "damage": 50,
    "icon": "Skull",
    "color": "red"
  },
  "void": {
    "id": "void",
    "name": "Void Collapse",
    "rarity": "Mythic",
    "description": "Deal 40 Dmg, Stun 1 Turn.",
    "damage": 40,
    "stun": 1,
    "icon": "Moon",
    "color": "purple"
  },
  "genesis": {
    "id": "genesis",
    "name": "Genesis",
    "rarity": "Mythic",
    "description": "Heal 50 HP, Gain 20 Shield.",
    "heal": 50,
    "shield": 20,
    "icon": "Sun",
    "color": "yellow"
  },
  "omniscience": {
    "id": "omniscience",
    "name": "Omniscience",
    "rarity": "Mythic",
    "description": "Draw 7 Cards, Heal 10 HP.",
    "draw": 7,
    "heal": 10,
    "icon": "Eye",
    "color": "indigo"
  },
  "cataclysm": {
    "id": "cataclysm",
    "name": "Cataclysm",
    "rarity": "Mythic",
    "description": "Deal 35 Dmg, Gain 20 Shield.",
    "damage": 35,
    "shield": 20,
    "icon": "Activity",
    "color": "rose"
  },
  "plague": {
    "id": "plague",
    "name": "Plague",
    "rarity": "Mythic",
    "description": "Deal 45 Dmg, Draw 5 Cards.",
    "damage": 45,
    "draw": 5,
    "icon": "Zap",
    "color": "lime"
  },
  "singularity": {
    "id": "singularity",
    "name": "Singularity",
    "rarity": "Mythic",
    "description": "Deal 60 Dmg, Stun 3 Turns.",
    "damage": 60,
    "stun": 3,
    "icon": "Moon",
    "color": "slate"
  },
  "big_bang": {
    "id": "big_bang",
    "name": "Big Bang",
    "rarity": "Mythic",
    "description": "Deal 80 Dmg, Heal 20 HP.",
    "damage": 80,
    "heal": 20,
    "icon": "Sun",
    "color": "yellow"
  },
  "omnipresence": {
    "id": "omnipresence",
    "name": "Omnipresence",
    "rarity": "Mythic",
    "description": "Draw 10 Cards, Heal 40 HP.",
    "draw": 10,
    "heal": 40,
    "icon": "Eye",
    "color": "indigo"
  },
  "ragnarok": {
    "id": "ragnarok",
    "name": "Ragnarok",
    "rarity": "Mythic",
    "description": "Deal 100 Damage.",
    "damage": 100,
    "icon": "Flame",
    "color": "red"
  }
};

export const RECIPES: Record<string, string> = {
  "fire+fire": "fireball",
  "fire+water": "steam",
  "earth+fire": "magma",
  "air+fire": "smoke",
  "fire+light": "radiance",
  "dark+fire": "hellfire",
  "water+water": "heal_wave",
  "earth+water": "mud",
  "air+water": "ice",
  "light+water": "holy_water",
  "dark+water": "poison",
  "earth+earth": "rock_wall",
  "air+earth": "dust",
  "earth+light": "crystal",
  "dark+earth": "obsidian",
  "air+air": "gust",
  "air+light": "mirage",
  "air+dark": "miasma",
  "light+light": "flash",
  "dark+light": "twilight",
  "dark+dark": "shadow",
  "fire+fireball": "blaze",
  "fire+gust": "lightning",
  "magma+water": "geyser",
  "earth+gust": "sandstorm",
  "air+ice": "frostbite",
  "earth+magma": "lava_flow",
  "flash+smoke": "thunder",
  "steam+water": "aqua_ring",
  "earth+rock_wall": "stone_golem",
  "air+gust": "cyclone",
  "light+radiance": "sunbeam",
  "dark+twilight": "moonlight",
  "fire+mud": "blood_magic",
  "earth+mud": "vine_whip",
  "air+flash": "static_field",
  "smoke+water": "acid_rain",
  "dust+fire": "ash_cloud",
  "gust+water": "whirlpool",
  "earth+fireball": "meteor_fragment",
  "air+poison": "poison_dart",
  "dust+mud": "quicksand",
  "heal_wave+water": "healing_spring",
  "fire+steam": "scald",
  "magma+rock_wall": "obsidian_shard",
  "ice+water": "hail",
  "rock_wall+steam": "crystal_shard",
  "rock_wall+water": "mud_armor",
  "fire+radiance": "solar_flare",
  "twilight+water": "lunar_tide",
  "dark+shadow": "void_ray",
  "holy_water+light": "holy_light",
  "dark+obsidian": "dark_matter",
  "crystal+light": "prism",
  "light+shadow": "eclipse",
  "dark+poison": "soul_drain",
  "fireball+fireball": "pyroblast",
  "heal_wave+heal_wave": "tsunami",
  "rock_wall+rock_wall": "earthquake",
  "gust+gust": "tornado",
  "fire+lightning": "plasma",
  "obsidian_shard+rock_wall": "obsidian_wall",
  "crystal_shard+heal_wave": "crystal_ward",
  "gust+thunder": "storm",
  "frostbite+ice": "blizzard",
  "blaze+magma": "inferno",
  "ice+stone_golem": "glacier",
  "aqua_ring+gust": "monsoon",
  "fireball+lava_flow": "eruption",
  "gust+whirlpool": "typhoon",
  "hail+rock_wall": "avalanche_minor",
  "healing_spring+vine_whip": "nature_wrath",
  "magma+stone_golem": "steel_forge",
  "lightning+mirage": "mind_blast",
  "acid_rain+poison_dart": "venom_strike",
  "earthquake+quicksand": "sinkhole",
  "solar_flare+sunbeam": "solar_beam",
  "lunar_tide+moonlight": "lunar_eclipse",
  "plasma+solar_flare": "supernova_spark",
  "dark_matter+void_ray": "void_rift",
  "crystal_ward+holy_light": "divine_shield",
  "blood_magic+soul_drain": "life_drain",
  "lightning+void_ray": "chaos_bolt",
  "holy_light+prism": "aurora",
  "blaze+meteor_fragment": "meteor_shower",
  "cyclone+tornado": "hurricane_minor",
  "meteor_shower+pyroblast": "meteor",
  "crystal_ward+divine_shield": "sanctuary",
  "blizzard+glacier": "absolute_zero",
  "earthquake+eruption": "volcano",
  "hurricane_minor+typhoon": "hurricane",
  "aurora+inferno": "phoenix",
  "avalanche_minor+earthquake": "avalanche",
  "monsoon+tsunami": "leviathan",
  "earthquake+obsidian_wall": "behemoth",
  "solar_beam+supernova_spark": "supernova",
  "mind_blast+void_rift": "black_hole",
  "nature_wrath+sanctuary": "yggdrasil",
  "obsidian_wall+steel_forge": "aegis",
  "lunar_eclipse+mind_blast": "chronos",
  "inferno+pyroblast": "dragon_breath",
  "chaos_bolt+venom_strike": "toxic_nova",
  "sinkhole+void_rift": "abyss",
  "aurora+lunar_eclipse": "celestial_alignment",
  "blood_magic+life_drain": "vampiric_aura",
  "holy_light+solar_beam": "divine_wrath",
  "meteor+supernova": "armageddon",
  "abyss+black_hole": "void",
  "sanctuary+yggdrasil": "genesis",
  "celestial_alignment+chronos": "omniscience",
  "behemoth+volcano": "cataclysm",
  "toxic_nova+vampiric_aura": "plague",
  "chronos+void": "singularity",
  "divine_wrath+supernova": "big_bang",
  "celestial_alignment+omniscience": "omnipresence",
  "armageddon+cataclysm": "ragnarok"
};
