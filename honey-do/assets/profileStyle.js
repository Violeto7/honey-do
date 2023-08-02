import { StyleSheet } from 'react-native';
import { COLORS } from './style';

const PROFILESTYLE = StyleSheet.create({

  profileContainer: {
    alignItems: 'center',
  },

  profileImage: {
    marginTop: 100,
    borderWidth: 1.5,
    borderRadius: 50,
    backgroundColor: 'white',
  },

  profileName: {
    paddingTop: 10,
    paddingHorizontal: 4,
    fontSize: 24,
    fontWeight: 'bold',
  },

  optionImage: {
    padding: 4,
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.charcoal,
  },

  touchableOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginBottom: 20,
  },

  optionText: {
    marginLeft: 20,
    fontSize: 20,
  },

  itemText:{
    marginRight: 25,
    fontSize: 20,
    alignItems: 'center',
  },

  profileOptions: {
    marginTop: 40,
  },

  modalContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  modal: {
    backgroundColor: COLORS.mint,
    height: 600,
    width: '100%',
    margin: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    //flex: 1,
  },

  prefBtn: {
    width: 300,
    height: 40,
    backgroundColor: COLORS.tealGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  checkBox: {
    width: '70%',
    height: 40,
    paddingBottom: 10,
    borderRadius: 7,
  },

  helpMenuContainer: {
    height: 50,
    width: 200,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: COLORS.forestGreen,
  },

  helpMenuText: {
    padding: 10,
    fontSize: 15,
    color: 'white',
    fontWeight: "bold",
    textTransform: 'capitalize',
  },

  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  

});

export { PROFILESTYLE };
