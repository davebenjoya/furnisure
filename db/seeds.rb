Room.destroy_all
Piece.destroy_all

Room.create([{name:'Living Room 1', width: 1000, length: 700, height: 300, floor: 'pine' },
            {name:'Bedroom 1', width: 600, length: 800, height: 300, floor: 'grey_carpet' }])


Piece.create([{name: 'Armoire', width: 250, depth: 100, height: 240, color: '#78290f' },
  {name: 'Chifferobe', width: 300, depth: 80, height: 80, color: '#ff7d00' },
  {name: 'Hutch', width: 100, depth: 80, height: 300, color: '#ffecd1' },
  {name: 'Sideboard', width: 200, depth: 80, height: 200, color: '#15616d' },
  {name: 'Schrank', width: 150, depth: 40, height: 80, color: '#001524' },
  {name: 'Breakfront', width: 100, depth: 60, height: 180, color: '#4B4A67' }])
