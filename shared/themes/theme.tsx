import { StyleSheet } from 'react-native';

const darkTheme = {
    colorPrimary: '#0085FF',
    colortTextPrimary: '#EBEBEB',
    backgroundPrimary: '#0E0F11',
    secondaryColor: '#1C1E22',
    borderColor: '#262C35',
    imgBackground: require('~assets/cube-dark.png')
}

const lightTheme = {
    colorPrimary: '#0085FF',
    colortTextPrimary: '#111111',
    backgroundPrimary: '#F6F6F6',
    secondaryColor: '#EBEBEB',
    borderColor: '#DEDEDE',
    imgBackground: require('~assets/cube-light.png')
}

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';
export const SYSTEM_THEME = 'system';

export default class Theme {
    static theme = lightTheme;
    static styles: any;
    static currentTheme = SYSTEM_THEME;
    static systemTheme = LIGHT_THEME;

    static setSystemTheme(colorScheme: any) {
        Theme.systemTheme = colorScheme;
    }

    static setTheme(theme: any) {
        if (theme === DARK_THEME) Theme.theme = darkTheme;
        else if (theme === LIGHT_THEME) Theme.theme = lightTheme;
        else Theme.theme = Theme.systemTheme === DARK_THEME ? darkTheme : lightTheme;
        Theme.styles = StyleSheet.create({
            titlePage: {
                marginTop: 25,
                fontSize: 25,
                textAlign: 'left',
                color: Theme.theme.colortTextPrimary,
                paddingHorizontal: 25,
            },
        });
        Theme.currentTheme = theme;
    }
}