import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [spinning, setSpinning] = useState(false);
  const [slotResults, setSlotResults] = useState(['7', '7', '7']);
  const [rouletteNumber, setRouletteNumber] = useState<number | null>(null);
  const [balance, setBalance] = useState(1000);

  const slots = [
    { id: 1, name: 'Lucky Sevens', minBet: 10, jackpot: 5000 },
    { id: 2, name: 'Diamond Deluxe', minBet: 25, jackpot: 10000 },
    { id: 3, name: 'Golden Fortune', minBet: 50, jackpot: 25000 },
    { id: 4, name: 'Royal Riches', minBet: 100, jackpot: 50000 },
  ];

  const spinSlot = () => {
    if (spinning || balance < 10) return;
    
    setSpinning(true);
    setBalance(prev => prev - 10);
    
    const symbols = ['7', '🍒', '🍋', '⭐', '💎', '👑'];
    const interval = setInterval(() => {
      setSlotResults([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalResults = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      setSlotResults(finalResults);
      
      if (finalResults[0] === finalResults[1] && finalResults[1] === finalResults[2]) {
        setBalance(prev => prev + 100);
      }
      
      setSpinning(false);
    }, 2000);
  };

  const spinRoulette = () => {
    if (spinning || balance < 25) return;
    
    setSpinning(true);
    setBalance(prev => prev - 25);
    setRouletteNumber(null);
    
    setTimeout(() => {
      const number = Math.floor(Math.random() * 37);
      setRouletteNumber(number);
      
      if (number === 0 || number % 2 === 0) {
        setBalance(prev => prev + 50);
      }
      
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-casino-black to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]"></div>
      
      <div className="relative">
        <header className="border-b border-gold/30 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Casino Royale
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-card border border-gold/30 rounded-lg px-4 py-2">
                  <Icon name="Coins" className="text-gold" size={20} />
                  <span className="text-lg font-semibold text-gold">{balance}</span>
                </div>
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                  Касса
                </Button>
              </div>
            </div>
          </div>
        </header>

        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-fade-in">
              <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Добро пожаловать
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Роскошное казино с классическими играми. Испытайте удачу на слотах и рулетке.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-gold to-gold-light text-black hover:from-gold-light hover:to-gold text-lg px-8">
                  <Icon name="Play" className="mr-2" size={20} />
                  Начать игру
                </Button>
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 text-lg px-8">
                  <Icon name="Info" className="mr-2" size={20} />
                  Правила
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-gold/20 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-gold/20 rounded-full animate-spin-slow"></div>
        </section>

        <section id="slots" className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 text-gold">Игровые автоматы</h2>
              <p className="text-muted-foreground text-lg">Выберите свой слот и испытайте удачу</p>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <Card className="bg-gradient-to-br from-card via-casino-black to-card border-2 border-gold/50 shadow-2xl shadow-gold/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-28 h-32 bg-gradient-to-b from-muted to-background border-4 border-gold rounded-lg flex items-center justify-center">
                      <span className={`text-6xl ${spinning ? 'animate-pulse' : ''}`}>{slotResults[0]}</span>
                    </div>
                    <div className="w-28 h-32 bg-gradient-to-b from-muted to-background border-4 border-gold rounded-lg flex items-center justify-center">
                      <span className={`text-6xl ${spinning ? 'animate-pulse' : ''}`}>{slotResults[1]}</span>
                    </div>
                    <div className="w-28 h-32 bg-gradient-to-b from-muted to-background border-4 border-gold rounded-lg flex items-center justify-center">
                      <span className={`text-6xl ${spinning ? 'animate-pulse' : ''}`}>{slotResults[2]}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      size="lg"
                      onClick={spinSlot}
                      disabled={spinning || balance < 10}
                      className="bg-gradient-to-r from-casino-red to-red-700 hover:from-red-700 hover:to-casino-red text-white text-xl px-12 py-6 disabled:opacity-50"
                    >
                      {spinning ? 'Вращение...' : 'Крутить (10₽)'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {slots.map((slot) => (
                <Card key={slot.id} className="group hover:scale-105 transition-transform duration-300 bg-card/50 backdrop-blur border-gold/30 hover:border-gold overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-4 h-32 bg-gradient-to-br from-gold/20 to-transparent rounded-lg flex items-center justify-center">
                      <Icon name="Sparkles" className="text-gold animate-pulse-gold" size={48} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gold">{slot.name}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground mb-4">
                      <p>Мин. ставка: {slot.minBet}₽</p>
                      <p className="text-gold font-semibold">Джекпот: {slot.jackpot}₽</p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-gold to-gold-light text-black hover:from-gold-light hover:to-gold">
                      Играть
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="roulette" className="py-16 bg-gradient-to-b from-background to-casino-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 text-gold">Рулетка</h2>
              <p className="text-muted-foreground text-lg">Классическая европейская рулетка</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-casino-green via-casino-green/90 to-casino-black border-2 border-gold shadow-2xl shadow-gold/20">
                <CardContent className="p-8">
                  <div className="relative w-64 h-64 mx-auto mb-8">
                    <div className={`absolute inset-0 rounded-full border-8 border-gold bg-gradient-to-br from-casino-red via-casino-black to-casino-green ${spinning ? 'animate-spin-slow' : ''}`}>
                      <div className="absolute inset-4 rounded-full border-4 border-gold-light bg-casino-black flex items-center justify-center">
                        <span className="text-6xl font-bold text-gold">
                          {rouletteNumber !== null ? rouletteNumber : '?'}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gold rounded-full shadow-lg shadow-gold/50 z-10"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Button variant="outline" className="border-casino-red text-casino-red hover:bg-casino-red hover:text-white">
                      Красное
                    </Button>
                    <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
                      Зеро
                    </Button>
                    <Button variant="outline" className="border-foreground hover:bg-foreground hover:text-background">
                      Чёрное
                    </Button>
                  </div>

                  <Button 
                    size="lg"
                    onClick={spinRoulette}
                    disabled={spinning || balance < 25}
                    className="w-full bg-gradient-to-r from-gold to-gold-light text-black hover:from-gold-light hover:to-gold text-xl py-6 disabled:opacity-50"
                  >
                    {spinning ? 'Вращение...' : 'Крутить (25₽)'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <footer className="border-t border-gold/30 py-8 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">© 2024 Casino Royale. Играйте ответственно.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
