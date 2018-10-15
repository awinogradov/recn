# Recn [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/recn.svg)](https://bundlephobia.com/result?p=recn)

Blazing fast. Tiny size. The last one className helper.

## Usage

> npm i -S recn

``` ts
import { cn } from 'recn';

const cat = cn('Cat');

cat(); // Cat
cat({ size: 'm' }); // Cat_size_m
cat('Tail'); // Cat-Tail
cat('Tail', { length: 'small' }); // Cat-Tail_length_small

const dogPaw = cn('Dog', 'Paw');

dogPaw(); // Dog-Paw
dogPaw({ color: 'black', exists: true }); // Dog-Paw_color_black Dog-Paw_exists
```

### License [MIT](LICENSE)
