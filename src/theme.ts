interface Theme{
  name: string;
  theme: string;
  themeColor: string;
  themeTextColor: string;
}

const themes: Map<string, Theme> = new Map([
  ['themeRed', {
    name: '中国红',
    theme: 'themeRed',
    themeColor: '#f92801',
    themeTextColor: '#ffffff'
  }],
  ['themeGreen', {
    name: '中国绿',
    theme: 'themeGreen',
    themeColor: '#009688',
    themeTextColor: '#ffffff'
  }],
  ['themeBlue', {
    name: '中国蓝',
    theme: 'themeBlue',
    themeColor: '#0091ea',
    themeTextColor: '#ffffff'
  }],
  ['themeIndigo', {
    name: '中国靛',
    theme: 'themeIndigo',
    themeColor: '#3f51b5',
    themeTextColor: '#ffffff'
  }],
  ['themePurple', {
    name: '中国紫',
    theme: 'themePurple',
    themeColor: '#7b1fa2',
    themeTextColor: '#ffffff'
  }],
]);
export default themes