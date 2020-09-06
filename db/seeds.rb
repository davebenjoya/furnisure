Room.destroy_all
Piece.destroy_all

Room.create([{name:'Living Room 1', width: 900, length: 700, height: 300, floor: 'pine' },
            {name:'Bedroom 1', width: 600, length: 800, height: 300, floor: 'grey_carpet' }])


Piece.create([{name: 'Armoire', width: 250, depth: 100, height: 240, color: '$redwood', available_colors: '$redwood, $camel, $alice-blue, $eagle-green', category: 'storage' },
  {name: 'Chifferobe', width: 300, depth: 80, height: 80, color: '$eagle-green', available_colors: '$kobe, $alice-blue, $eagle-green', category: 'storage' },
  {name: 'Hutch', width: 100, depth: 80, height: 300, color: '$amber', available_colors: '$redwood, $camel, $amber, $independence', category: 'storage' },
  {name: 'Sideboard', width: 200, depth: 80, height: 200, color: '$ming', available_colors: '$ming, $camel, $alice-blue, $eagle-green', category: 'storage' },
  {name: 'Schrank', width: 150, depth: 40, height: 80, color: '$rich-black', available_colors: '$rich-black, $independence, $amber', category: 'storage' },
  {name: 'Breakfront', width: 100, depth: 60, height: 180, color: '$camel', available_colors: '$camel, $alice-blue, $eagle-green, $blanched-almond', category: 'storage' }])


# $redwood: #9D6158;
# $camel: #CA9965;
# $alice-blue: #E4E9F1;
# $light-grey: #D1D9DB;
# $eagle-green: #19444E;
# $kobe: #78290f;
# $amber: #ff7d00;
# $blanched-almond: #ffecd1;
# $ming: #15616d;
# $rich-black: #001524;
# $independence: #4B4A67;

