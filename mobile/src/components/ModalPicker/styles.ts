import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../../theme/color';
import { typography } from '../../theme/typography';

export const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 8,
    height: 60,
    backgroundColor: 'white',
    borderColor: 'white',
    alignItems: 'center',
  },
  text: {
    paddingRight: 10,
    color: colors.black,
    marginBottom: 6,
    fontFamily: typography.fontFamilies.RobotoSlabMedium,
    fontSize: 18,
  },
  input: {
    paddingHorizontal: wp('1%'),
    color: colors.black,
    fontFamily: typography.fontFamilies.RobotoSlabMedium,
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: wp('8%'),
    paddingHorizontal: wp('1.25%'),
    backgroundColor: 'white',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  label: {
    color: colors.black,
    paddingBottom: hp('2%'),
    fontSize: 18,
  },
  overlaySpecie: {
    padding: wp('3%'),
    backgroundColor: colors.white,
    height: 250,
    width: wp('70%'),
  },
  overlayAnimal: {
    padding: wp('3%'),
    backgroundColor: colors.white,
    height: 500,
    width: wp('70%'),
  },
  disabledInput: {
    backgroundColor: colors.black,
  },
});
