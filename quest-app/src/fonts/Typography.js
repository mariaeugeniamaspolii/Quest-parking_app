// Importa tu fuente
import FontRegular from '../../assets/fonts/RSTReactorSansVF.ttf';
import FontBold from '../../assets/fonts/LexendBold.ttf';
// import YourFontBold from '../../assets/fonts/YourFontFile-Bold.ttf'; // Si tienes la variante negrita
const customFonts = {
    Lexend: require('../src/fonts/Lexend.ttf'),
    LexendBold: require('../src/fonts/LexendBold.ttf'),
    LexendExtraBold: require('../src/fonts/LexendExtraBold.ttf'),
    LexendThin: require('../src/fonts/LexendThin.ttf'),
};

const typography = {
    Lexend: {
        fontFamily: 'Lexend'
    },
    LexendBold: {
        fontFamily: 'LexendBold'
    },
    LexendExtraBold: {
        fontFamily: 'LexendExtraBold'
    },
    LexendBold: {
        fontFamily: 'LexendBold'
    },
    // regular: Lexend,
    // bold: LexendBold,
    // extrabold: LexendExtraBold,
    // thin: LexendBold,
    // bold: Platform.OS === 'ios' ? 'YourFontName-Bold' : YourFontBold,
    // ... otras variantes de la fuente que puedas tener
};

export default typography;