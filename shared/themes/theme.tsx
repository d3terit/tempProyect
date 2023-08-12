import { StyleSheet } from 'react-native';

const darkTheme = {
    colorPrimary: '#EBEBEB',
    backgroundPrimary: '#0E0F11',
    cardPrimary: '#1C1E22',
    imgBackground: require('../../assets/cube-dark.png')
}

const lightTheme = {
    colorPrimary: '#111111',
    backgroundPrimary: '#F6F6F6',
    cardPrimary: '#EBEBEB',
    imgBackground: require('../../assets/cube-light.png')
}

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

export default class Theme {
    static theme = lightTheme;
    static styles: any;
    static currentTheme = LIGHT_THEME;

    static setTheme(theme: any) {
        if (theme === DARK_THEME) Theme.theme = darkTheme;
        else if (theme === LIGHT_THEME) Theme.theme = lightTheme;
        Theme.styles = StyleSheet.create({
            titlePage: {
                fontSize: 25,
                textAlign: 'left',
                color: Theme.theme.colorPrimary,
                paddingHorizontal: 25,
            },
        });
        Theme.currentTheme = theme;
    }
}