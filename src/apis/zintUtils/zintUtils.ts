const ZINT_ALPHABET = "abcdefghijkmnoprstuvwxyz";
// smoot letters
const ZINT_ALPHABET_SMOOTH = "acemnorsuvwxz";
const ZINT_ALPHABET_NO_S = ZINT_ALPHABET.replace('s', ''); //без s
const ZINT_ALPHABET_NO_S_SMOOTH = ZINT_ALPHABET_SMOOTH.replace('s', ''); //без s


/** генерирует английский [zint]-термин */
function zintGenerateEng() {
  const r1 = zintRandomInt(0, ZINT_ALPHABET.length - 1);
  const r2 = zintRandomInt(0, ZINT_ALPHABET.length - 1);
  const r3 = zintRandomInt(0, ZINT_ALPHABET.length - 1);
  const r4 = zintRandomInt(0, ZINT_ALPHABET_NO_S.length - 1);
  return ZINT_ALPHABET.charAt(r1) + ZINT_ALPHABET.charAt(r2) + ZINT_ALPHABET.charAt(r3) + ZINT_ALPHABET_NO_S.charAt(r4);
}

/** генерирует английский [zint]-термин в "smooth-letter" режиме */
function zintGenerateEng_SL() {
  const r1 = zintRandomInt(0, ZINT_ALPHABET_SMOOTH.length - 1);
  const r2 = zintRandomInt(0, ZINT_ALPHABET_SMOOTH.length - 1);
  const r3 = zintRandomInt(0, ZINT_ALPHABET_SMOOTH.length - 1);
  const r4 = zintRandomInt(0, ZINT_ALPHABET_NO_S_SMOOTH.length - 1);
  return ZINT_ALPHABET_SMOOTH.charAt(r1) + ZINT_ALPHABET_SMOOTH.charAt(r2) + ZINT_ALPHABET_SMOOTH.charAt(r3) + ZINT_ALPHABET_NO_S_SMOOTH.charAt(r4);
}

/** генерирует рандомное целое число в диапазоне [min] [max] */
function zintRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** утилитные функции для работы с разными аспектами [zint]-технологии */
export class ZintUtils {

  /**
   * Генерирует *zintCode
   * @param isSmooth -- если TRUE то генерируется код smooth-вида
   */
  static codeGenerate(isSmooth: boolean) {
    return isSmooth ? zintGenerateEng_SL() : zintGenerateEng();
  }

  /** проверка {@param zintCode} на валидность */
  static codeVerify(zintCode: string) {
    if (zintCode && zintCode.length === 4) {
      return zintCode.split('').every((el, index) => {
        if (index < 3) {
          return ZINT_ALPHABET.includes(el)
        } else {
          return ZINT_ALPHABET_NO_S.includes(el)
        }
      });
    }
    return false;
  }

  /**
   *
   * @param zintsString -- *zintsString
   * @param zintCode -- *zintCode
   */
  static zintNameContainsIs(zintsString: string, zintCode: string) {
    if (zintsString && zintsString.length > 0 && zintCode && zintCode.length > 0) {
      return zintsString.split('\n').some(el => el === zintCode);
    }
    return false;
  }
}
