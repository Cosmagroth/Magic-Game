import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, Droplets, Mountain, Wind, Zap, Snowflake, Shield, Waves, Activity, Tornado, CloudLightning, Home, Skull,
  Coins, Book, PackageOpen, Swords, User, Play, ArrowLeft, Plus, Minus, Sparkles, X, Trophy, ArrowRight,
  Cloud, Diamond, Moon, Leaf, Star, Eye, Clock, LogIn, LogOut
} from 'lucide-react';
import { CARDS, RECIPES, CardDef, Rarity } from './shared/cards';
import { auth, db, signInWithGoogle, logOut } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ErrorBoundary } from './ErrorBoundary';

const RARITY_TEXT_COLORS: Record<Rarity, string> = {
  Basic: 'text-slate-400',
  Common: 'text-emerald-400',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-amber-400',
  Mythic: 'text-red-500'
};

const ICONS: Record<string, React.ElementType> = {
  Flame, Droplets, Mountain, Wind, Zap, Snowflake, Shield, Waves, Activity, Tornado, CloudLightning, Home, Skull,
  Cloud, Diamond, Moon, Leaf, Star, Eye, Clock
};

const RARITY_COLORS: Record<Rarity, string> = {
  Basic: 'border-slate-500 shadow-[0_0_15px_rgba(100,116,139,0.3)]',
  Common: 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
  Rare: 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]',
  Epic: 'border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.6)]',
  Legendary: 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.7)]',
  Mythic: 'border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.8)]'
};

const BG_COLORS: Record<string, string> = {
  rose: 'from-rose-950 to-rose-900',
  cyan: 'from-cyan-950 to-cyan-900',
  emerald: 'from-emerald-950 to-emerald-900',
  sky: 'from-sky-950 to-sky-900',
  orange: 'from-orange-950 to-orange-900',
  yellow: 'from-yellow-950 to-yellow-900',
  blue: 'from-blue-950 to-blue-900',
  amber: 'from-amber-950 to-amber-900',
  red: 'from-red-950 to-red-900',
  purple: 'from-purple-950 to-purple-900',
  slate: 'from-slate-950 to-slate-900',
  indigo: 'from-indigo-950 to-indigo-900',
  lime: 'from-lime-950 to-lime-900',
};

const TEXT_COLORS: Record<string, string> = {
  rose: 'text-rose-400',
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
  sky: 'text-sky-400',
  orange: 'text-orange-400',
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  purple: 'text-purple-400',
  slate: 'text-slate-400',
  indigo: 'text-indigo-400',
  lime: 'text-lime-400',
};

interface PlayerState {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  shield: number;
  stunned: number;
  hand: string[];
  deck: string[];
  discard: string[];
}

interface GameState {
  id: string;
  isSolo: boolean;
  players: PlayerState[];
  turn: number;
  status: 'waiting' | 'playing' | 'finished';
}

function CardView({ cardId, onClick, isSelected, disabled, small = false, micro = false, initial, animate, exit, transition }: { cardId: string, onClick?: () => void, isSelected?: boolean, disabled?: boolean, small?: boolean, micro?: boolean, key?: string | number, initial?: any, animate?: any, exit?: any, transition?: any }) {
  const card = CARDS[cardId];
  if (!card) return null;
  const Icon = ICONS[card.icon] || Sparkles;

  const sizeClass = micro ? 'w-16 h-24 p-1 rounded-lg' : small ? 'w-24 h-36 p-2 rounded-xl' : 'w-24 h-36 sm:w-36 sm:h-52 p-2 sm:p-3 rounded-xl';
  const titleSize = micro ? 'text-[8px]' : small ? 'text-xs' : 'text-xs sm:text-sm';
  const iconSizeClass = micro ? 'w-5 h-5' : small ? 'w-8 h-8' : 'w-8 h-8 sm:w-12 sm:h-12';
  const descSize = micro ? 'text-[6px]' : small ? 'text-[8px]' : 'text-[8px] sm:text-[10px]';

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={!disabled && onClick ? { y: -10, scale: 1.05, rotateY: 5, rotateX: 5 } : {}}
      whileTap={!disabled && onClick ? { scale: 0.95 } : {}}
      onClick={() => !disabled && onClick && onClick()}
      className={`
        group relative flex-shrink-0 bg-gradient-to-br ${BG_COLORS[card.color]} 
        border-2 ${RARITY_COLORS[card.rarity]} flex flex-col items-center justify-between transition-all duration-300 overflow-hidden
        ${disabled ? 'opacity-50 grayscale-[0.5] cursor-not-allowed' : 'cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'}
        ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#050505] -translate-y-4 shadow-[0_0_40px_rgba(255,255,255,0.4)]' : ''}
        ${sizeClass}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-xl" />
      
      {!disabled && onClick && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      <div className="w-full flex justify-between items-start z-10">
        <span className={`font-serif font-bold drop-shadow-md ${titleSize} ${TEXT_COLORS[card.color]}`}>{card.name}</span>
      </div>
      
      <div className={`z-10 transform drop-shadow-2xl ${TEXT_COLORS[card.color]}`}>
        <Icon className={iconSizeClass} />
        {card.rarity === 'Mythic' && (
          <motion.div 
            className="absolute inset-0 bg-red-500/20 blur-xl rounded-full -z-10"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      
      <div className="w-full flex flex-col items-center z-10 bg-black/50 p-1 rounded-lg backdrop-blur-sm border border-white/5">
        <span className={`text-center font-medium leading-tight ${descSize} text-slate-200`}>{card.description}</span>
      </div>
    </motion.div>
  );
}

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

function VisualEffectRenderer({ effects }: { effects: any[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {effects.map(effect => {
          const isOpponent = effect.target === 'opponent';
          const isPlayer = effect.target === 'player';
          const isCenter = effect.target === 'center';
          
          let top = isCenter ? '50%' : isOpponent ? '20%' : '80%';
          let left = '50%';

          if (effect.type === 'fire') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-48 h-48 bg-rose-500 rounded-full mix-blend-screen blur-xl"
                style={{ top, left, x: '-50%', y: '-50%' }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 2, 3], opacity: [1, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            );
          }
          if (effect.type === 'dark') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-48 h-48 bg-purple-600 rounded-full mix-blend-screen blur-xl"
                style={{ top, left, x: '-50%', y: '-50%' }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 2, 3], opacity: [1, 0.8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            );
          }
          if (effect.type === 'ice') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-48 h-48 bg-cyan-400 rounded-full mix-blend-screen blur-lg"
                style={{ top, left, x: '-50%', y: '-50%' }}
                initial={{ scale: 0, opacity: 1, rotate: 45 }}
                animate={{ scale: [0, 1.5, 2], opacity: [1, 0.8, 0], rotate: 90 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            );
          }
          if (effect.type === 'lightning') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-32 h-64 bg-yellow-300 mix-blend-screen blur-md"
                style={{ top, left, x: '-50%', y: '-50%', clipPath: 'polygon(50% 0%, 60% 40%, 100% 40%, 40% 100%, 50% 60%, 0% 60%)' }}
                initial={{ scale: 0, opacity: 1, y: '-100%' }}
                animate={{ scale: [0, 1.5, 1], opacity: [1, 1, 0], y: '-50%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            );
          }
          if (effect.type === 'heal') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-32 h-32 bg-emerald-400 rounded-full mix-blend-screen blur-lg"
                style={{ top, left, x: '-50%', y: '-50%' }}
                initial={{ scale: 0.5, opacity: 0, y: 0 }}
                animate={{ scale: 1.5, opacity: [0, 1, 0], y: -100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            );
          }
          if (effect.type === 'shield') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-48 h-48 border-8 border-sky-400 rounded-full mix-blend-screen"
                style={{ top, left, x: '-50%', y: '-50%' }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            );
          }
          if (effect.type === 'stun') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-24 h-24 bg-yellow-400 mix-blend-screen blur-md"
                style={{ top, left, x: '-50%', y: '-50%', clipPath: 'polygon(50% 0%, 60% 40%, 100% 40%, 40% 100%, 50% 60%, 0% 60%)' }}
                initial={{ scale: 0, opacity: 1, rotate: -20 }}
                animate={{ scale: [0, 1.5, 1], opacity: [1, 1, 0], rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            );
          }
          if (effect.type === 'slash') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-64 h-4 bg-white mix-blend-screen shadow-[0_0_20px_white]"
                style={{ top, left, x: '-50%', y: '-50%' }}
                initial={{ scaleX: 0, opacity: 1, rotate: 45 }}
                animate={{ scaleX: [0, 1, 0], opacity: [1, 1, 0], rotate: 45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            );
          }
          if (effect.type === 'craft') {
            return (
              <motion.div
                key={effect.id}
                className="absolute w-48 h-48 border-4 border-dashed border-purple-400 rounded-full mix-blend-screen"
                style={{ top, left, x: '-50%', y: '-50%' }}
                initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
                animate={{ scale: 1.5, opacity: [0, 1, 0], rotate: 180 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            );
          }
          if (effect.type === 'victory') {
            return (
              <motion.div
                key={effect.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: 'spring' }}
              >
                <div className="absolute inset-0 bg-yellow-500/20 mix-blend-screen" />
                <h1 className="text-8xl font-black text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.8)] uppercase tracking-widest">
                  Victory
                </h1>
              </motion.div>
            );
          }
          if (effect.type === 'defeat') {
            return (
              <motion.div
                key={effect.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: 'spring' }}
              >
                <div className="absolute inset-0 bg-red-900/40 mix-blend-multiply" />
                <h1 className="text-8xl font-black text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)] uppercase tracking-widest">
                  Defeat
                </h1>
              </motion.div>
            );
          }
          if (effect.type === 'turn-start') {
            return (
              <motion.div
                key={effect.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: [0, 1, 0], scale: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <h2 className="text-6xl font-black text-purple-400 drop-shadow-[0_0_20px_rgba(192,132,252,0.8)] uppercase tracking-widest italic">
                  Your Turn
                </h2>
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [view, setView] = useState<'menu' | 'battle' | 'tavern' | 'grimoire'>('menu');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  
  // Auth State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const isInitialLoad = useRef(true);

  // Player Data
  const [gold, setGold] = useState(10000);
  const [inventory, setInventory] = useState<Record<string, number>>({ fire: 10, water: 10, earth: 10, air: 10 });
  const [deck, setDeck] = useState<string[]>(['fire','fire','fire','fire','fire', 'water','water','water','water','water', 'earth','earth','earth','earth','earth', 'air','air','air','air','air']);
  const [discoveredRecipes, setDiscoveredRecipes] = useState<string[]>([]);
  const [grimoireTab, setGrimoireTab] = useState<'deck' | 'recipes'>('deck');

  // Pack Opening State
  const [packResult, setPackResult] = useState<string[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);

  // Battle State
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [actionLog, setActionLog] = useState<{ id: number, text: string, color: string }[]>([]);
  const [gameOver, setGameOver] = useState<{ winner: string } | null>(null);
  const [showGrimoire, setShowGrimoire] = useState(false);
  const [deckError, setDeckError] = useState<string | null>(null);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number, text: string, color: string, x: number, y: number }[]>([]);
  const [shake, setShake] = useState<{ id: number, target: 'player' | 'opponent' } | null>(null);
  const [visualEffects, setVisualEffects] = useState<Array<{ id: number, type: string, target: 'player' | 'opponent' | 'center', color?: string }>>([]);
  const [prevTurn, setPrevTurn] = useState<boolean>(false);

  useEffect(() => {
    if (gameState && socket) {
      const isMyTurn = gameState.players[gameState.turn].id === socket.id;
      if (isMyTurn && !prevTurn) {
        const turnEffect = { id: Date.now(), type: 'turn-start', target: 'center' };
        setVisualEffects(prev => [...prev, turnEffect as any]);
        setTimeout(() => {
          setVisualEffects(prev => prev.filter(e => e.id !== turnEffect.id));
        }, 1500);
      }
      setPrevTurn(isMyTurn);
    }
  }, [gameState?.turn, socket?.id]);
  const [playedCard, setPlayedCard] = useState<{ id: number, cardId: string, isYou: boolean } | null>(null);
  const [flash, setFlash] = useState<{ id: number, color: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;
    
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setGold(data.gold ?? 10000);
          setInventory(data.inventory ?? { fire: 10, water: 10, earth: 10, air: 10 });
          setDeck(data.deck ?? ['fire','fire','fire','fire','fire', 'water','water','water','water','water', 'earth','earth','earth','earth','earth', 'air','air','air','air','air']);
          setDiscoveredRecipes(data.discoveredRecipes ?? []);
          isInitialLoad.current = false;
        } else {
          // Initialize new user
          const initialData = {
            uid: user.uid,
            gold: 10000,
            inventory: { fire: 10, water: 10, earth: 10, air: 10 },
            deck: ['fire','fire','fire','fire','fire', 'water','water','water','water','water', 'earth','earth','earth','earth','earth', 'air','air','air','air','air'],
            discoveredRecipes: [],
            updatedAt: serverTimestamp()
          };
          setDoc(userRef, initialData).catch(err => console.error("Error creating user", err));
          isInitialLoad.current = false;
        }
      }).catch((error) => {
        console.error('Firestore Error:', error);
      });
    } else {
      // Load from local storage if not logged in
      setGold(parseInt(localStorage.getItem('gold') || '10000'));
      const savedInv = localStorage.getItem('inventory');
      setInventory(savedInv ? JSON.parse(savedInv) : { fire: 10, water: 10, earth: 10, air: 10 });
      const savedDeck = localStorage.getItem('deck');
      setDeck(savedDeck ? JSON.parse(savedDeck) : ['fire','fire','fire','fire','fire', 'water','water','water','water','water', 'earth','earth','earth','earth','earth', 'air','air','air','air','air']);
      const savedRecipes = localStorage.getItem('discoveredRecipes');
      setDiscoveredRecipes(savedRecipes ? JSON.parse(savedRecipes) : []);
      isInitialLoad.current = false;
    }
  }, [user, isAuthReady]);

  useEffect(() => {
    if (!isAuthReady || isInitialLoad.current) return;

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      setDoc(userRef, {
        uid: user.uid,
        gold,
        inventory,
        deck,
        discoveredRecipes,
        updatedAt: serverTimestamp()
      }, { merge: true }).catch(err => console.error("Error saving to Firestore", err));
    } else {
      localStorage.setItem('gold', gold.toString());
      localStorage.setItem('inventory', JSON.stringify(inventory));
      localStorage.setItem('deck', JSON.stringify(deck));
      localStorage.setItem('discoveredRecipes', JSON.stringify(discoveredRecipes));
    }
  }, [gold, inventory, deck, discoveredRecipes, user, isAuthReady]);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('room-update', (state: GameState) => setGameState(state));
    newSocket.on('game-start', (state: GameState) => {
      setGameState(state);
      setView('battle');
      setGameOver(null);
      setActionLog([]);
    });
    
    newSocket.on('action', (action) => {
      let text = '';
      let color = 'text-slate-300';
      let floatText = '';
      let floatColor = '';
      let isDamage = false;
      
      if (action.type === 'play') {
        const card = CARDS[action.cardId];
        const cardName = card.name;
        const rarity = card.rarity;
        const isYou = action.playerId === newSocket.id;
        text = `${isYou ? 'You' : 'Opponent'} cast ${cardName}!`;
        setPlayedCard({ id: Date.now(), cardId: action.cardId, isYou });
        setTimeout(() => setPlayedCard(null), 1500);

        if (rarity === 'Mythic') {
          setFlash({ id: Date.now(), color: 'bg-red-500' });
        } else if (rarity === 'Legendary') {
          setFlash({ id: Date.now(), color: 'bg-amber-500' });
        }
        
        const newEffects: Array<{ id: number, type: string, target: 'player' | 'opponent' | 'center', color?: string }> = [];
        const baseId = Date.now();

        if (action.damage) {
          text += ` (-${action.damage} HP)`;
          floatText = `-${action.damage}`;
          floatColor = 'text-rose-500';
          isDamage = true;
          
          let effectType = 'slash';
          if (['rose', 'orange', 'red'].includes(card.color)) effectType = 'fire';
          if (['purple', 'indigo'].includes(card.color)) effectType = 'dark';
          if (['blue', 'sky', 'cyan'].includes(card.color)) effectType = 'ice';
          if (['yellow', 'amber'].includes(card.color)) effectType = 'lightning';
          
          newEffects.push({ id: baseId + 1, type: effectType, target: isYou ? 'opponent' : 'player' });
        }
        if (action.heal) {
          text += ` (+${action.heal} HP)`;
          floatText = `+${action.heal}`;
          floatColor = 'text-emerald-400';
          newEffects.push({ id: baseId + 2, type: 'heal', target: isYou ? 'player' : 'opponent' });
        }
        if (action.shield) {
          text += ` (+${action.shield} Shield)`;
          floatText = `+${action.shield}`;
          floatColor = 'text-sky-400';
          newEffects.push({ id: baseId + 3, type: 'shield', target: isYou ? 'player' : 'opponent' });
        }
        if (action.stun) {
          newEffects.push({ id: baseId + 4, type: 'stun', target: isYou ? 'opponent' : 'player' });
        }
        
        if (newEffects.length > 0) {
          setVisualEffects(prev => [...prev, ...newEffects]);
          setTimeout(() => {
            setVisualEffects(prev => prev.filter(e => !newEffects.find(ne => ne.id === e.id)));
          }, 1500);
        }

        color = 'text-amber-400';
      } else if (action.type === 'craft') {
        const cardName = CARDS[action.cardId].name;
        const isYou = action.playerId === newSocket.id;
        text = `${isYou ? 'You' : 'Opponent'} crafted ${cardName}!`;
        setPlayedCard({ id: Date.now(), cardId: action.cardId, isYou });
        setTimeout(() => setPlayedCard(null), 1500);
        color = 'text-purple-400';
        floatText = 'Crafted!';
        floatColor = 'text-purple-400';
        
        const craftEffect = { id: Date.now(), type: 'craft', target: isYou ? 'player' : 'opponent' };
        setVisualEffects(prev => [...prev, craftEffect as any]);
        setTimeout(() => {
          setVisualEffects(prev => prev.filter(e => e.id !== craftEffect.id));
        }, 1500);
      } else if (action.type === 'stun-skip') {
        const isYou = action.playerId === newSocket.id;
        text = `${isYou ? 'You are' : 'Opponent is'} stunned and skipped a turn!`;
        color = 'text-sky-400';
        floatText = 'Stunned!';
        floatColor = 'text-sky-400';
        
        const stunEffect = { id: Date.now(), type: 'stun', target: isYou ? 'player' : 'opponent' };
        setVisualEffects(prev => [...prev, stunEffect as any]);
        setTimeout(() => {
          setVisualEffects(prev => prev.filter(e => e.id !== stunEffect.id));
        }, 1500);
      }

      setActionLog(prev => [...prev, { id: Date.now(), text, color }].slice(-5));

      if (floatText) {
        const isYou = action.playerId === newSocket.id;
        const x = isYou ? window.innerWidth / 2 : window.innerWidth / 2;
        const y = isYou ? window.innerHeight * 0.7 : window.innerHeight * 0.3;
        
        setFloatingTexts(prev => [...prev, {
          id: Date.now() + Math.random(),
          text: floatText,
          color: floatColor,
          x: x + (Math.random() * 100 - 50),
          y: y + (Math.random() * 50 - 25)
        }]);

        if (isDamage) {
          setShake({ id: Date.now(), target: isYou ? 'opponent' : 'player' });
        }
      }
    });

    newSocket.on('game-over', ({ winner }) => {
      setGameOver({ winner });
      if (winner === newSocket.id) {
        setGold(g => g + 100);
        const victoryEffect = { id: Date.now(), type: 'victory', target: 'center' };
        setVisualEffects(prev => [...prev, victoryEffect as any]);
      } else {
        const defeatEffect = { id: Date.now(), type: 'defeat', target: 'center' };
        setVisualEffects(prev => [...prev, defeatEffect as any]);
      }
    });

    newSocket.on('error', (msg: string) => {
      setError(msg);
      setTimeout(() => setError(''), 3000);
    });

    return () => { newSocket.disconnect(); };
  }, []);

  const joinSolo = (difficulty: 'easy' | 'advanced') => {
    if (deck.length !== 20) {
      setError('Deck must have exactly 20 cards!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (socket) socket.emit('join-solo', { deck, difficulty });
  };

  const joinRoom = () => {
    if (deck.length !== 20) {
      setError('Deck must have exactly 20 cards!');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (socket && roomId) socket.emit('join-room', { roomId, deck });
  };

  const toggleCardSelection = (index: number) => {
    if (gameState) {
      const myPlayer = gameState.players.find(p => p.id === socket?.id);
      if (myPlayer && myPlayer.stunned > 0) return;
    }
    setSelectedCards(prev => {
      if (prev.includes(index)) return prev.filter(i => i !== index);
      if (prev.length >= 2) return [prev[1], index];
      return [...prev, index];
    });
  };

  const executePlay = () => {
    if (socket && gameState && selectedCards.length === 1) {
      socket.emit('play-card', { roomId: gameState.id, cardIndex: selectedCards[0] });
      setSelectedCards([]);
    }
  };

  const executeCraft = () => {
    if (socket && gameState && selectedCards.length === 2) {
      const myPlayer = gameState.players.find(p => p.id === socket.id);
      if (myPlayer) {
        const id1 = myPlayer.hand[selectedCards[0]];
        const id2 = myPlayer.hand[selectedCards[1]];
        const resultId = RECIPES[`${id1}+${id2}`] || RECIPES[`${id2}+${id1}`];
        if (resultId && !discoveredRecipes.includes(resultId)) {
          setDiscoveredRecipes(prev => [...prev, resultId]);
        }
      }
      socket.emit('craft-cards', { roomId: gameState.id, indices: selectedCards });
      setSelectedCards([]);
    }
  };

  const executeSkip = () => {
    if (socket && gameState) {
      socket.emit('skip-turn', { roomId: gameState.id });
      setSelectedCards([]);
    }
  };

  const openPack = () => {
    if (gold < 100) return;
    setGold(g => g - 100);
    
    const newCards: string[] = [];
    for (let i = 0; i < 5; i++) {
      const roll = Math.random();
      let rarity: Rarity = 'Common';
      if (roll > 0.99) rarity = 'Legendary';
      else if (roll > 0.90) rarity = 'Epic';
      else if (roll > 0.70) rarity = 'Rare';

      const pool = Object.values(CARDS).filter(c => c.rarity === rarity);
      const card = pool[Math.floor(Math.random() * pool.length)];
      newCards.push(card.id);
    }

    setInventory(prev => {
      const next = { ...prev };
      newCards.forEach(id => { next[id] = (next[id] || 0) + 1; });
      return next;
    });

    setDiscoveredRecipes(prev => {
      const next = new Set(prev);
      newCards.forEach(id => next.add(id));
      return Array.from(next);
    });

    setPackResult(newCards);
    setFlippedCards(new Array(5).fill(false));
    setView('pack');
  };

  const toggleDeckCard = (cardId: string, add: boolean) => {
    setDeckError(null);
    if (add) {
      if (deck.length >= 20) {
        setDeckError("Deck is full (20 cards max).");
        return;
      }
      
      const card = CARDS[cardId];
      const countInDeck = deck.filter(id => id === cardId).length;
      
      const maxCopies = card.rarity === 'Mythic' ? 1 : card.rarity === 'Legendary' ? 1 : card.rarity === 'Epic' ? 2 : 3;
      if (countInDeck >= maxCopies) {
        setDeckError(`Max ${maxCopies} copies of this ${card.rarity} card allowed.`);
        return;
      }

      if (card.rarity === 'Mythic') {
        const mythicCount = deck.filter(id => CARDS[id].rarity === 'Mythic').length;
        if (mythicCount >= 1) {
          setDeckError("Max 1 Mythic card allowed per deck.");
          return;
        }
      }
      if (card.rarity === 'Legendary') {
        const legendaryCount = deck.filter(id => CARDS[id].rarity === 'Legendary').length;
        if (legendaryCount >= 2) {
          setDeckError("Max 2 Legendary cards allowed per deck.");
          return;
        }
      }
      if (card.rarity === 'Epic') {
        const epicCount = deck.filter(id => CARDS[id].rarity === 'Epic').length;
        if (epicCount >= 4) {
          setDeckError("Max 4 Epic cards allowed per deck.");
          return;
        }
      }
      if (card.rarity === 'Rare') {
        const rareCount = deck.filter(id => CARDS[id].rarity === 'Rare').length;
        if (rareCount >= 5) {
          setDeckError("Max 5 Rare cards allowed per deck.");
          return;
        }
      }

      if (countInDeck < (inventory[cardId] || 0)) {
        setDeck([...deck, cardId]);
      }
    } else {
      const idx = deck.indexOf(cardId);
      if (idx > -1) {
        const newDeck = [...deck];
        newDeck.splice(idx, 1);
        setDeck(newDeck);
      }
    }
  };

  if (view === 'menu') {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(88,28,135,0.5),_rgba(5,5,5,1))]"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 2,
              }}
              animate={{
                y: [null, Math.random() * -500],
                x: [null, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full z-10">
          <Coins className="text-amber-400 w-5 h-5" />
          <span className="text-amber-400 font-bold">{gold}</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md flex flex-col gap-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-rose-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              Alchemist's Arena
            </h1>
            <p className="text-slate-400 mt-2 uppercase tracking-[0.2em] text-sm">Forge Spells. Destroy Rivals.</p>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => joinSolo('easy')} className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Easy AI
            </button>
            <button onClick={() => joinSolo('advanced')} className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group">
              <Skull className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Hard AI
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Room Code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="flex-1 px-4 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none placeholder:text-slate-600"
            />
            <button onClick={joinRoom} className="bg-gradient-to-r from-purple-600 to-rose-600 text-white px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <Swords className="w-5 h-5" />
            </button>
          </div>

          <button onClick={() => setView('tavern')} className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 group">
            <PackageOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Tavern (Packs)
          </button>

          <button onClick={() => setView('grimoire')} className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 group">
            <Book className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Grimoire (Deck)
          </button>

          <button onClick={() => setGold(g => g + 10000)} className="w-full bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-400 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm">
            <Coins className="w-4 h-4" />
            Cheat: +10,000 Gold
          </button>

          {user ? (
            <button onClick={logOut} className="w-full bg-slate-500/10 hover:bg-slate-500/20 border border-slate-500/20 text-slate-400 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm">
              <LogOut className="w-4 h-4" />
              Sign Out ({user.displayName || user.email})
            </button>
          ) : (
            <button onClick={signInWithGoogle} className="w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm">
              <LogIn className="w-4 h-4" />
              Sign In with Google to Save Progress
            </button>
          )}

          {error && <p className="text-rose-400 text-sm text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">{error}</p>}
        </motion.div>
      </div>
    );
  }

  if (view === 'tavern') {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-200 p-8 font-sans relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(120,53,15,0.4),_transparent_80%)]"
            animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <button onClick={() => setView('menu')} className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors z-10">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="absolute top-8 right-8 flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full z-10">
          <Coins className="text-amber-400 w-5 h-5" />
          <span className="text-amber-400 font-bold">{gold}</span>
        </div>

        <h2 className="text-4xl font-serif font-bold text-amber-400 mb-12 mt-16 z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">The Tavern</h2>
        
        <motion.div 
          whileHover={{ scale: 1.05, rotateZ: Math.random() * 4 - 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={openPack}
          className={`relative z-10 w-64 h-80 bg-gradient-to-br from-amber-900 to-amber-950 border-4 border-amber-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(251,191,36,0.3)] overflow-hidden ${gold < 100 ? 'opacity-50 grayscale' : ''}`}
        >
          <motion.div 
            className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%]"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <PackageOpen className="w-24 h-24 text-amber-400 mb-4 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
          <span className="text-2xl font-serif font-bold text-amber-400 drop-shadow-[0_0_5px_rgba(0,0,0,1)]">Arcane Pack</span>
          <span className="mt-4 flex items-center gap-1 text-amber-200 bg-black/50 px-3 py-1 rounded-full"><Coins className="w-4 h-4"/> 100</span>
        </motion.div>
      </div>
    );
  }

  if (view === 'pack') {
    return (
      <div className="min-h-screen bg-[#050505] text-slate-200 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(251,191,36,0.3),_rgba(5,5,5,1))]"
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <h2 className="text-4xl font-serif font-bold text-amber-400 mb-12 relative z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
          Opening Pack...
        </h2>

        <div className="relative z-10 flex flex-wrap justify-center gap-4 max-w-4xl">
          {packResult.map((cardId, index) => (
            <motion.div
              key={index}
              className="relative w-24 h-36 sm:w-36 sm:h-52 cursor-pointer perspective-1000"
              onClick={() => {
                if (!flippedCards[index]) {
                  const newFlipped = [...flippedCards];
                  newFlipped[index] = true;
                  setFlippedCards(newFlipped);
                }
              }}
              initial={{ scale: 0, y: 100, rotateY: 180, rotateZ: -10 + Math.random() * 20 }}
              animate={{ 
                scale: flippedCards[index] ? 1.1 : 1, 
                y: 0, 
                rotateY: flippedCards[index] ? 0 : 180,
                rotateZ: flippedCards[index] ? 0 : (-10 + Math.random() * 20)
              }}
              whileHover={{ scale: flippedCards[index] ? 1.15 : 1.05 }}
              transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', bounce: 0.4 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <div className="absolute inset-0 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                <CardView cardId={cardId} />
                {flippedCards[index] && (
                  <motion.div 
                    initial={{ opacity: 1, scale: 1 }} 
                    animate={{ opacity: 0, scale: 1.5 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 bg-white rounded-xl pointer-events-none mix-blend-overlay shadow-[0_0_50px_rgba(255,255,255,1)]"
                  />
                )}
              </div>
              
              {/* Back of card */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 border-2 border-purple-500/50 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)] backface-hidden overflow-hidden"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <motion.div 
                  className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%]"
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-purple-400/80 drop-shadow-[0_0_10px_rgba(192,132,252,1)]" />
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {flippedCards.every(Boolean) && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 relative z-10 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-xl font-bold transition-colors"
              onClick={() => setView('tavern')}
            >
              Continue
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (view === 'grimoire') {
    const uniqueCards = Object.keys(inventory).filter(id => inventory[id] > 0);
    
    return (
      <div className="min-h-screen bg-[#050505] text-slate-200 p-8 font-sans relative flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(16,185,129,0.2),_transparent_80%)]"
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="flex justify-between items-center mb-8 relative z-10">
          <button onClick={() => setView('menu')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex gap-4">
            <button onClick={() => setGrimoireTab('deck')} className={`px-6 py-2 rounded-full font-bold transition-colors ${grimoireTab === 'deck' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}>Deck</button>
            <button onClick={() => setGrimoireTab('recipes')} className={`px-6 py-2 rounded-full font-bold transition-colors ${grimoireTab === 'recipes' ? 'bg-purple-500 text-white' : 'bg-white/10 text-slate-400 hover:bg-white/20'}`}>Recipes</button>
          </div>
          <div className="w-20 text-right text-sm text-slate-400">
            {deck.length} / 20
          </div>
        </div>

        {deckError && (
          <div className="mb-4 bg-rose-500/20 border border-rose-500/50 text-rose-400 px-4 py-2 rounded-lg text-center font-bold relative z-10">
            {deckError}
          </div>
        )}

        {grimoireTab === 'deck' ? (
          <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 pb-20 relative z-10">
            {uniqueCards.map(id => {
              const countInDeck = deck.filter(c => c === id).length;
              const totalOwned = inventory[id];
              return (
                <div key={id} className="flex flex-col items-center gap-2">
                  <CardView cardId={id} small />
                  <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 border border-white/10">
                    <button onClick={() => toggleDeckCard(id, false)} disabled={countInDeck === 0} className="text-rose-400 disabled:opacity-30"><Minus className="w-4 h-4"/></button>
                    <span className="text-xs font-mono">{countInDeck} / {totalOwned}</span>
                    <button onClick={() => toggleDeckCard(id, true)} disabled={countInDeck === totalOwned} className="text-emerald-400 disabled:opacity-30"><Plus className="w-4 h-4"/></button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-4 pb-20 relative z-10">
            {Object.entries(RECIPES).map(([ingredients, resultId]) => {
              const [id1, id2] = ingredients.split('+');
              const isDiscovered = discoveredRecipes.includes(resultId);
              const resultCard = CARDS[resultId];
              return (
                <div key={ingredients} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                  {isDiscovered ? (
                    <>
                      <div className="flex items-center gap-2">
                        <CardView cardId={id1} micro disabled />
                        <Plus className="w-4 h-4 text-slate-500" />
                        <CardView cardId={id2} micro disabled />
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-500" />
                      <CardView cardId={resultId} small disabled />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-24 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-600">?</div>
                        <Plus className="w-4 h-4 text-slate-700" />
                        <div className="w-16 h-24 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-600">?</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-700" />
                      <div className="w-24 h-36 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center flex-col gap-2 bg-black/20">
                        <span className={`text-[10px] uppercase tracking-wider ${RARITY_TEXT_COLORS[resultCard.rarity]}`}>{resultCard.rarity}</span>
                        <span className="text-2xl text-slate-700">?</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (view === 'battle' && gameState) {
    const myPlayer = gameState.players.find(p => p.id === socket?.id);
    const opponent = gameState.players.find(p => p.id !== socket?.id);
    const isMyTurn = gameState.players[gameState.turn].id === socket?.id;

    if (!myPlayer || !opponent) return null;

    return (
      <div className="min-h-screen bg-[#050505] text-slate-200 p-4 font-sans flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(88,28,135,0.4),_transparent_80%)]"
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`battle-particle-${i}`}
              className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 2,
              }}
              animate={{
                y: [null, Math.random() * -500],
                x: [null, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <VisualEffectRenderer effects={visualEffects} />

        <AnimatePresence>
          {flash && (
            <motion.div
              key={`flash-${flash.id}`}
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`absolute inset-0 z-30 pointer-events-none mix-blend-screen ${flash.color}`}
            />
          )}
        </AnimatePresence>

        {/* Opponent Area */}
        <div className="relative z-10 flex justify-between items-start mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
            <motion.div 
              key={shake?.target === 'opponent' ? `shake-opp-${shake.id}` : 'opp'}
              animate={shake?.target === 'opponent' ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="bg-black/40 p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-col items-center min-w-[100px] sm:min-w-[120px]"
            >
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm font-bold text-slate-300">{opponent.name}</span>
              <div className="w-full bg-rose-950/50 h-2 sm:h-3 rounded-full mt-1 sm:mt-2 overflow-hidden border border-rose-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <motion.div 
                  className="bg-gradient-to-r from-rose-600 to-rose-400 h-full shadow-[0_0_10px_rgba(244,63,94,0.8)]" 
                  initial={{ width: `${(opponent.hp / opponent.maxHp) * 100}%` }}
                  animate={{ width: `${(opponent.hp / opponent.maxHp) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
              </div>
              <span className="text-[10px] sm:text-xs text-rose-400 font-mono mt-1 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]">{opponent.hp} / {opponent.maxHp} HP</span>
              
              {opponent.shield > 0 && (
                <div className="w-full bg-sky-950/50 h-1.5 sm:h-2 rounded-full mt-1 overflow-hidden border border-sky-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <motion.div 
                    className="bg-gradient-to-r from-sky-500 to-cyan-300 h-full shadow-[0_0_10px_rgba(56,189,248,0.8)]" 
                    initial={{ width: '100%' }}
                    animate={{ width: '100%' }}
                  />
                </div>
              )}
              {opponent.shield > 0 && <span className="text-[8px] sm:text-[10px] text-sky-400 font-mono mt-1">{opponent.shield} Shield</span>}
            </motion.div>
            
            {opponent.stunned > 0 && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 px-2 sm:px-3 py-1 rounded-lg flex items-center gap-1 sm:gap-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span className="text-[10px] sm:text-xs text-yellow-400">Stunned ({opponent.stunned})</span>
              </div>
            )}
          </div>
          
          <div className="text-right flex flex-col items-end gap-1 sm:gap-2">
            <div>
              <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest">Cards in Hand: {opponent.hand.length}</p>
              <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest">Deck: {opponent.deck.length}</p>
            </div>
            <button onClick={() => setShowGrimoire(true)} className="bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-2 transition-colors mt-1 sm:mt-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Book className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
              <span className="text-[10px] sm:text-xs font-bold text-purple-200">Grimoire</span>
            </button>
          </div>
        </div>

        {/* Action Log / Arena */}
        <div className="flex-1 relative z-10 flex flex-col items-center justify-center">
          <AnimatePresence>
            {playedCard && (
              <motion.div
                key={`played-${playedCard.id}`}
                initial={{ opacity: 0, scale: 0.5, y: playedCard.isYou ? 100 : -100, rotateZ: playedCard.isYou ? -10 : 10 }}
                animate={{ opacity: 1, scale: 1.2, y: 0, rotateZ: 0 }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)', y: playedCard.isYou ? -50 : 50 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="absolute z-40 pointer-events-none drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]"
              >
                <CardView cardId={playedCard.cardId} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {floatingTexts.map((ft) => (
              <motion.div
                key={ft.id}
                initial={{ opacity: 1, y: ft.y, x: ft.x, scale: 0.5 }}
                animate={{ opacity: 0, y: ft.y - 120, x: ft.x + (Math.random() * 40 - 20), scale: 2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                onAnimationComplete={() => setFloatingTexts(prev => prev.filter(t => t.id !== ft.id))}
                className={`absolute z-50 text-5xl font-black drop-shadow-[0_0_15px_rgba(0,0,0,1)] ${ft.color} pointer-events-none`}
                style={{ left: 0, top: 0 }}
              >
                {ft.text}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {actionLog.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className={`text-xl font-serif font-bold mb-2 ${log.color} drop-shadow-lg bg-black/40 px-6 py-2 rounded-full border border-white/5`}
              >
                {log.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {gameOver && (
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50"
            >
              <div className="bg-white/10 border border-white/20 p-12 rounded-3xl text-center flex flex-col items-center">
                {gameOver.winner === socket?.id ? (
                  <>
                    <Trophy className="w-20 h-20 text-amber-400 mb-6" />
                    <h2 className="text-5xl font-serif font-bold text-amber-400 mb-4">Victory!</h2>
                    <p className="text-amber-200 mb-8">+100 Gold</p>
                  </>
                ) : (
                  <>
                    <Skull className="w-20 h-20 text-rose-500 mb-6" />
                    <h2 className="text-5xl font-serif font-bold text-rose-500 mb-8">Defeat</h2>
                  </>
                )}
                <button onClick={() => setView('menu')} className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl font-bold transition-colors">
                  Return to Menu
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Bar */}
        <div className="h-16 flex flex-col sm:flex-row justify-center items-center relative z-20 mb-4 sm:mb-8">
          <p className={`sm:absolute sm:left-0 text-sm sm:text-lg font-serif italic transition-colors mb-2 sm:mb-0 ${isMyTurn ? 'text-purple-400' : 'text-slate-500'}`}>
            {isMyTurn ? "Your Turn" : "Opponent's Turn..."}
          </p>

          <AnimatePresence>
            {isMyTurn && myPlayer.stunned > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 sm:p-2 rounded-2xl shadow-2xl flex gap-2"
              >
                <button onClick={executeSkip} className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Skip Turn (Stunned)
                </button>
              </motion.div>
            )}
            {selectedCards.length > 0 && isMyTurn && myPlayer.stunned === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 sm:p-2 rounded-2xl shadow-2xl flex gap-2"
              >
                {selectedCards.length === 1 && (
                  <button onClick={executePlay} className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]">
                    <Play className="w-4 h-4" /> Cast Spell
                  </button>
                )}
                {selectedCards.length === 2 && (
                  <button onClick={executeCraft} className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]">
                    <Sparkles className="w-4 h-4" /> Craft Spell
                  </button>
                )}
                <button onClick={() => setSelectedCards([])} className="bg-white/5 hover:bg-white/10 text-slate-300 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-colors">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Player Area */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-end w-full">
          <motion.div 
            key={shake?.target === 'player' ? `shake-player-${shake.id}` : 'player'}
            animate={shake?.target === 'player' ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="bg-black/40 p-3 sm:p-4 rounded-2xl border border-white/10 flex flex-col items-center min-w-[100px] sm:min-w-[120px] mb-2 sm:mb-0 w-full sm:w-auto"
          >
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm font-bold text-purple-300">You</span>
            <div className="w-full bg-rose-950/50 h-2 sm:h-3 rounded-full mt-1 sm:mt-2 overflow-hidden border border-rose-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <motion.div 
                className="bg-gradient-to-r from-rose-600 to-rose-400 h-full shadow-[0_0_10px_rgba(244,63,94,0.8)]" 
                initial={{ width: `${(myPlayer.hp / myPlayer.maxHp) * 100}%` }}
                animate={{ width: `${(myPlayer.hp / myPlayer.maxHp) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              />
            </div>
            <span className="text-[10px] sm:text-xs text-rose-400 font-mono mt-1 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]">{myPlayer.hp} / {myPlayer.maxHp} HP</span>
            
            {myPlayer.shield > 0 && (
              <div className="w-full bg-sky-950/50 h-1.5 sm:h-2 rounded-full mt-1 overflow-hidden border border-sky-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <motion.div 
                  className="bg-gradient-to-r from-sky-500 to-cyan-300 h-full shadow-[0_0_10px_rgba(56,189,248,0.8)]" 
                  initial={{ width: '100%' }}
                  animate={{ width: '100%' }}
                />
              </div>
            )}
            {myPlayer.shield > 0 && <span className="text-[8px] sm:text-[10px] text-sky-400 font-mono mt-1">{myPlayer.shield} Shield</span>}
            
            {myPlayer.stunned > 0 && (
              <div className="mt-2 bg-yellow-500/20 border border-yellow-500/50 px-2 py-1 rounded w-full text-center">
                <span className="text-[10px] text-yellow-400">Stunned ({myPlayer.stunned})</span>
              </div>
            )}
          </motion.div>

          <div className="flex-1 w-full bg-white/5 backdrop-blur-md p-2 sm:p-4 rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="flex justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-4 pt-2 sm:pt-4 px-2">
              <AnimatePresence>
                {myPlayer.hand.map((cardId, i) => (
                  <CardView 
                    key={`${cardId}-${i}`} 
                    cardId={cardId} 
                    isSelected={selectedCards.includes(i)}
                    disabled={!isMyTurn || myPlayer.stunned > 0}
                    onClick={() => isMyTurn && myPlayer.stunned === 0 && toggleCardSelection(i)}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, y: -50 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Grimoire Modal */}
        <AnimatePresence>
          {showGrimoire && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl z-50 flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-purple-400 flex items-center gap-3">
                  <Book className="w-8 h-8" /> Grimoire
                </h2>
                <button onClick={() => setShowGrimoire(false)} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-4 pb-20">
                {Object.entries(RECIPES).map(([ingredients, resultId]) => {
                  const [id1, id2] = ingredients.split('+');
                  const isDiscovered = discoveredRecipes.includes(resultId);
                  const resultCard = CARDS[resultId];
                  return (
                    <div key={ingredients} className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                      {isDiscovered ? (
                        <>
                          <div className="flex items-center gap-2">
                            <CardView cardId={id1} micro disabled />
                            <Plus className="w-4 h-4 text-slate-500" />
                            <CardView cardId={id2} micro disabled />
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-500" />
                          <CardView cardId={resultId} small disabled />
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-24 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-600">?</div>
                            <Plus className="w-4 h-4 text-slate-700" />
                            <div className="w-16 h-24 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center text-slate-600">?</div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-700" />
                          <div className="w-24 h-36 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center flex-col gap-2 bg-black/20">
                            <span className={`text-[10px] uppercase tracking-wider ${RARITY_TEXT_COLORS[resultCard.rarity]}`}>{resultCard.rarity}</span>
                            <span className="text-2xl text-slate-700">?</span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}
