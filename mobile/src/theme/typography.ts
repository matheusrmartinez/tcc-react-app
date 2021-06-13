import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const typography = {
  inputTextSize: 20,
  buttonTextSize: 20,
  listItemTitleTextSize: 22,
  listItemSubtitleTextSize: 18,
  fontFamilies: {
    RobotoSlabMedium: 'RobotoSlab-Medium',
    RobotoSlabRegular: 'RobotoSlab-Regular',
    LatoItalic: 'Lato-Italic',
  },
  fontSizes: {
    xsmall: wp('1.2%'), // 14px
    small: wp('1.35%'), // 16px
    medium: wp('1.5%'), // 18px
    large: wp('1.65%'), // 20px
    xlarge: wp('1.8%'), // 24px
    xxxlarge: wp('3.75%'), // 44px
  },
};
