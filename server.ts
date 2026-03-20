import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import { CARDS, RECIPES } from './src/shared/cards.ts';

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  app.use(cors());

  // Game State
  const rooms = new Map();

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function drawCards(player, count) {
    for (let i = 0; i < count; i++) {
      if (player.deck.length === 0) {
        if (player.discard.length === 0) break;
        player.deck = shuffle([...player.discard]);
        player.discard = [];
      }
      if (player.hand.length < 10 && player.deck.length > 0) {
        player.hand.push(player.deck.pop());
      }
    }
  }

  function initPlayer(id, name, deckIds, upgrades = {}) {
    const deck = shuffle([...deckIds]);
    const player = {
      id,
      name,
      hp: 50,
      maxHp: 50,
      shield: 0,
      stunned: 0,
      hand: [],
      deck,
      discard: [],
      upgrades
    };
    drawCards(player, 5);
    return player;
  }

  function getRecipeResult(id1, id2) {
    const key1 = `${id1}+${id2}`;
    const key2 = `${id2}+${id1}`;
    return RECIPES[key1] || RECIPES[key2] || null;
  }

  function triggerAI(roomId) {
    setTimeout(() => {
      const room = rooms.get(roomId);
      if (!room || room.status !== 'playing' || room.turn !== 1) return;
      
      const ai = room.players[1];
      const player = room.players[0];

      if (ai.stunned > 0) {
        ai.stunned--;
        room.turn = 0;
        drawCards(player, 1);
        io.to(roomId).emit('action', { type: 'stun-skip', playerId: 'ai' });
        io.to(roomId).emit('room-update', room);
        return;
      }

      const isAdvanced = room.difficulty === 'advanced';

      // AI Logic
      let actionTaken = false;

      // 1. Check for crafts (especially high rarity)
      for (let i = 0; i < ai.hand.length; i++) {
        for (let j = i + 1; j < ai.hand.length; j++) {
          const resultId = getRecipeResult(ai.hand[i], ai.hand[j]);
          if (resultId) {
            const rarity = CARDS[resultId].rarity;
            
            let shouldCraft = false;
            if (isAdvanced) {
              if (rarity === 'Legendary' || rarity === 'Epic' || Math.random() > 0.25) {
                shouldCraft = true;
              }
            } else {
              // Easy AI only crafts Common or Rare, and rarely
              if ((rarity === 'Common' || rarity === 'Rare') && Math.random() > 0.8) {
                shouldCraft = true;
              }
            }

            if (shouldCraft) {
              // Craft it
              ai.hand.splice(j, 1);
              ai.hand.splice(i, 1);
              ai.hand.push(resultId);
              drawCards(ai, 1);
              io.to(roomId).emit('action', { type: 'craft', playerId: 'ai', cardId: resultId });
              actionTaken = true;
              break;
            }
          }
        }
        if (actionTaken) break;
      }

      // 2. Play a card
      if (!actionTaken) {
        let bestIdx = 0;
        
        const mistakeChance = isAdvanced ? 0.0 : 0.40;
        if (Math.random() < mistakeChance) {
          bestIdx = Math.floor(Math.random() * ai.hand.length);
        } else {
          let bestScore = -1;

          ai.hand.forEach((cardId, idx) => {
            const card = CARDS[cardId];
            let score = 0;
            if (card.damage) score += card.damage * (player.hp < 15 ? 3 : 1);
            if (card.heal && ai.hp < 30) score += card.heal * 2;
            if (card.shield && ai.shield < 10) score += card.shield * 1.5;
            if (card.stun) score += 10;
            if (score > bestScore) {
              bestScore = score;
              bestIdx = idx;
            }
          });
        }

        const cardId = ai.hand.splice(bestIdx, 1)[0];
        const card = CARDS[cardId];
        ai.discard.push(cardId);

        let damageDealt = 0;
        let healAmount = 0;
        let shieldAmount = 0;

        if (card.damage) {
          if (player.shield >= card.damage) {
            player.shield -= card.damage;
          } else {
            const remaining = card.damage - player.shield;
            player.shield = 0;
            player.hp -= remaining;
            damageDealt = remaining;
          }
        }
        if (card.heal) {
          const missing = ai.maxHp - ai.hp;
          healAmount = Math.min(missing, card.heal);
          ai.hp += healAmount;
        }
        if (card.shield) {
          ai.shield += card.shield;
          shieldAmount = card.shield;
        }
        if (card.stun) {
          player.stunned += card.stun;
        }
        if (card.draw) {
          drawCards(ai, card.draw);
        }

        io.to(roomId).emit('action', { 
          type: 'play', 
          playerId: 'ai', 
          cardId, 
          damage: damageDealt,
          heal: healAmount,
          shield: shieldAmount
        });
      }

      // Check win condition
      if (player.hp <= 0) {
        room.status = 'finished';
        io.to(roomId).emit('game-over', { winner: 'ai' });
      } else {
        room.turn = 0;
        drawCards(room.players[0], 1); // Draw card for player at start of their turn
        io.to(roomId).emit('room-update', room);
      }
    }, 1500);
  }

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-solo', ({ deck, difficulty }) => {
      const roomId = 'solo-' + Math.random().toString(36).substring(7);
      socket.join(roomId);
      
      let aiDeck = [];
      if (difficulty === 'advanced') {
        aiDeck = [
          'fire', 'fire', 'fire', 'fire',
          'water', 'water', 'water', 'water',
          'earth', 'earth', 'earth', 'earth',
          'air', 'air', 'air', 'air',
          'fireball', 'heal_wave', 'rock_wall', 'gust'
        ];
      } else {
        aiDeck = [
          'fire', 'fire', 'fire', 'fire', 'fire',
          'water', 'water', 'water', 'water', 'water',
          'earth', 'earth', 'earth', 'earth', 'earth',
          'air', 'air', 'air', 'air', 'air'
        ];
      }

      const room = {
        id: roomId,
        isSolo: true,
        difficulty: difficulty || 'easy',
        players: [
          initPlayer(socket.id, 'You', deck),
          initPlayer('ai', difficulty === 'advanced' ? 'Grand Magus' : 'Apprentice', aiDeck)
        ],
        turn: 0,
        status: 'playing'
      };
      
      rooms.set(roomId, room);
      io.to(roomId).emit('game-start', room);
    });

    socket.on('join-room', ({ roomId, deck }) => {
      socket.join(roomId);
      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          id: roomId,
          isSolo: false,
          players: [],
          turn: 0,
          status: 'waiting'
        });
      }
      const room = rooms.get(roomId);
      
      if (room.players.length < 2) {
        room.players.push(initPlayer(socket.id, `Player ${room.players.length + 1}`, deck));
        io.to(roomId).emit('room-update', room);
        
        if (room.players.length === 2) {
          room.status = 'playing';
          io.to(roomId).emit('game-start', room);
        }
      } else {
        socket.emit('error', 'Room full');
      }
    });

    socket.on('play-card', ({ roomId, cardIndex }) => {
      const room = rooms.get(roomId);
      if (!room || room.status !== 'playing') return;

      const currentPlayer = room.players[room.turn];
      const opponent = room.players[(room.turn + 1) % 2];
      
      if (currentPlayer.id !== socket.id) return;

      if (currentPlayer.stunned > 0) {
        currentPlayer.stunned--;
        room.turn = (room.turn + 1) % 2;
        drawCards(opponent, 1);
        io.to(roomId).emit('action', { type: 'stun-skip', playerId: socket.id });
        io.to(roomId).emit('room-update', room);
        if (room.isSolo && room.turn === 1) triggerAI(roomId);
        return;
      }

      const cardId = currentPlayer.hand.splice(cardIndex, 1)[0];
      const card = CARDS[cardId];
      currentPlayer.discard.push(cardId);

      let damageDealt = 0;
      let healAmount = 0;
      let shieldAmount = 0;

      if (card.damage) {
        if (opponent.shield >= card.damage) {
          opponent.shield -= card.damage;
        } else {
          const remaining = card.damage - opponent.shield;
          opponent.shield = 0;
          opponent.hp -= remaining;
          damageDealt = remaining;
        }
      }
      if (card.heal) {
        const missing = currentPlayer.maxHp - currentPlayer.hp;
        healAmount = Math.min(missing, card.heal);
        currentPlayer.hp += healAmount;
      }
      if (card.shield) {
        currentPlayer.shield += card.shield;
        shieldAmount = card.shield;
      }
      if (card.stun) {
        opponent.stunned += card.stun;
      }
      if (card.draw) {
        drawCards(currentPlayer, card.draw);
      }

      io.to(roomId).emit('action', { 
        type: 'play', 
        playerId: socket.id, 
        cardId, 
        damage: damageDealt,
        heal: healAmount,
        shield: shieldAmount
      });

      if (opponent.hp <= 0) {
        room.status = 'finished';
        io.to(roomId).emit('game-over', { winner: socket.id });
      } else {
        room.turn = (room.turn + 1) % 2;
        drawCards(opponent, 1);
        io.to(roomId).emit('room-update', room);
        if (room.isSolo && room.turn === 1) triggerAI(roomId);
      }
    });

    socket.on('craft-cards', ({ roomId, indices }) => {
      const room = rooms.get(roomId);
      if (!room || room.status !== 'playing') return;

      const currentPlayer = room.players[room.turn];
      const opponent = room.players[(room.turn + 1) % 2];
      if (currentPlayer.id !== socket.id) return;

      if (currentPlayer.stunned > 0) {
        currentPlayer.stunned--;
        room.turn = (room.turn + 1) % 2;
        drawCards(opponent, 1);
        io.to(roomId).emit('action', { type: 'stun-skip', playerId: socket.id });
        io.to(roomId).emit('room-update', room);
        if (room.isSolo && room.turn === 1) triggerAI(roomId);
        return;
      }

      indices.sort((a, b) => b - a);
      const id1 = currentPlayer.hand[indices[0]];
      const id2 = currentPlayer.hand[indices[1]];
      
      const resultId = getRecipeResult(id1, id2);
      if (!resultId) {
        socket.emit('error', 'Invalid recipe');
        return;
      }

      currentPlayer.hand.splice(indices[0], 1);
      currentPlayer.hand.splice(indices[1], 1);
      currentPlayer.hand.push(resultId);
      
      // Crafting takes a turn, but you draw a card to replace the second lost card
      drawCards(currentPlayer, 1);

      io.to(roomId).emit('action', { type: 'craft', playerId: socket.id, cardId: resultId });
      
      room.turn = (room.turn + 1) % 2;
      drawCards(opponent, 1);
      io.to(roomId).emit('room-update', room);

      if (room.isSolo && room.turn === 1) triggerAI(roomId);
    });

    socket.on('skip-turn', ({ roomId }) => {
      const room = rooms.get(roomId);
      if (!room || room.status !== 'playing') return;

      const currentPlayer = room.players[room.turn];
      const opponent = room.players[(room.turn + 1) % 2];
      if (currentPlayer.id !== socket.id) return;

      if (currentPlayer.stunned > 0) {
        currentPlayer.stunned--;
        room.turn = (room.turn + 1) % 2;
        drawCards(opponent, 1);
        io.to(roomId).emit('action', { type: 'stun-skip', playerId: socket.id });
        io.to(roomId).emit('room-update', room);
        if (room.isSolo && room.turn === 1) triggerAI(roomId);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
