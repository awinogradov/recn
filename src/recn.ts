import { IPreset } from './typings';

/**
 * Modifiers format.
 *
 * @see https://en.bem.info/methodology/key-concepts/#modifier
 */
export type NoStrictEntityMods = Record<string, string | boolean | number | undefined>;

/**
 * List of classname.
 */
export type ClassNameList = Array<string | undefined>;

/**
 * ClassName formatter signature.
 *
 */
export type ClassNameFormatter = (
    elemNameOrBlockMods?: NoStrictEntityMods | string | null,
    elemModsOrBlockMix?: NoStrictEntityMods | ClassNameList | null,
    elemMix?: ClassNameList,
) => string;

interface IStringifierOptions {
    b: string;
    e?: string;
    m?: NoStrictEntityMods | null;
    mix?: Array<string | undefined> | string | undefined;
}

export function setup(preset: IPreset) {
    function stringify(o: IStringifierOptions) {
        let className = o.b + (!o.e ? '' : preset.e + o.e);
    
        className += addMods(o.m);
    
        className += (o.mix ? !Array.isArray(o.mix) ? '' : ' ' + o.mix.join(' ') : '');
    
        function addMods(m?: NoStrictEntityMods | null) {
            const a = m || Object.create(null);
            const pairs = Object.keys(a).filter(k => (a[k] === 0 || a[k] !== false)).map(k => a[k] === true ? [k] : [k, a[k]]);
            return !pairs.length 
                ? '' 
                : ' ' + pairs.map(pair => (o.e ? o.b + preset.e + o.e : o.b) + preset.m + pair.join(preset.m)).join(' ');
        }
    
        return className;
    }
    /**
     * ClassName constructor.
     *
     * @example
     * ``` ts
     *
     * import { cn } from 'recn';
     *
     * const cat = cn('Cat');
     *
     * cat(); // Cat
     * cat({ size: 'm' }); // Cat_size_m
     * cat('Tail'); // Cat-Tail
     * cat('Tail', { length: 'small' }); // Cat-Tail_length_small
     *
     * const dogPaw = cn('Dog', 'Paw');
     *
     * dogPaw(); // Dog-Paw
     * dogPaw({ color: 'black', exists: true }); // Dog-Paw_color_black Dog-Paw_exists
     * ```
     *
     * @see https://en.bem.info/methodology/naming-convention/#react-style
     */
    return function cn(b: string, e?: string): ClassNameFormatter {
        return (
            elemOrMods?: NoStrictEntityMods | string | null,
            elemModsOrBlockMix?: NoStrictEntityMods | ClassNameList | null,
            elemMix?: ClassNameList,
        ) => {
            const entity: IStringifierOptions = { b, e };
        
            if (typeof elemOrMods === 'string') {
                entity.e = elemOrMods;
        
                if (Array.isArray(elemModsOrBlockMix)) {
                    entity.mix = elemModsOrBlockMix;
                } else {
                    entity.m = elemModsOrBlockMix as NoStrictEntityMods;
                    entity.mix = elemMix;
                }
            } else {
                entity.m = elemOrMods;
                entity.mix = elemModsOrBlockMix as ClassNameList;
            }
        
            return stringify(entity);
        };
    };
};
    
