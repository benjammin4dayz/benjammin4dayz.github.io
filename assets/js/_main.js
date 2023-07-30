import { Site } from './_src/Site.js';
import Drawer from './_src/Drawer.js';
import ScrollHandler from './_src/ScrollHandler.js';
import DolorDemo from './_src/Dolor-demo.js';
import * as dolorPreDemo from './_src/dolorPreDemo.js';

const Bundle = {
  Site,
  Drawer,
  ScrollHandler,
  dolor: {
    concept: dolorPreDemo,
    prod: DolorDemo
  }
};

export default Bundle;
