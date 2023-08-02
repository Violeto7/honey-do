import {StyleSheet} from 'react-native';

const COLORS = {
  charcoal: '#36454F', 
  transCharcoal: '#36454Faa',
  mint: '#d3e6e2',
  tealGreen: '#08806c',
  forestGreen: '#0a5246'
};

const STYLE = StyleSheet.create({

    appContainer: {
      flex: 1,
      //paddingTop: 10, (Too much space added with this)
      paddingHorizontal: 10,
      backgroundColor: COLORS.mint
    },
  
    descriptionWrapper: {
      flexDirection: 'row',
    },
    
    topBuffer: {
      height: 30,
    },
    //include this at the bottom of pages so the navbar doesn't cover stuff
    //change the height if the navbar gets any taller
    bottomBuffer: {
        height: 60,
    },  
});

  export { STYLE, COLORS} ;
