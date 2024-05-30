import CustomEase from 'gsap/dist/CustomEase';
import { gsap } from 'gsap';

gsap.registerPlugin(CustomEase);

const curve1 = CustomEase.create('curve1', 'M0,0 C0.406,0 0.098,1 1,1');
const curve2 = CustomEase.create('curve2', 'M0,0 C0,0.082 0.102,1.016 1,1');

export const easeOut1 = CustomEase.create('custom', 'M0,0 C0.25,0.25 0,1 1,1');
export const easeOut2 = CustomEase.create('custom', 'M0,0 C0.45,0.25 0,1 1,1');

const easeInOut1 = CustomEase.create('VinnieInOut', 'M0,0 C0.2,0 0,1 1,1');

const eases = {
  curve1,
  curve2,
  easeInOut1,
  easeOut1,
  easeOut2,
};

export default eases;
