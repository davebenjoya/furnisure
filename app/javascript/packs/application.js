
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import { dnd } from '../components/dnd';


document.addEventListener('turbolinks:load', () => {

  dnd();
});
