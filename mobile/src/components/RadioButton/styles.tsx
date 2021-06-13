import { StyleSheet } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    padding: 0,
    fontSize: 18,
  },
  light: {
    color: colors.black,
  },
  dark: {
    color: colors.white,
  },
  checkbox: {
    fontFamily: typography.fontFamilies.RobotoSlabRegular,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: 'normal',
  },
});

export default styles;
