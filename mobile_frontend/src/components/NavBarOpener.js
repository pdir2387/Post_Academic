import {Left,Icon,Header, Right, CheckBox} from 'native-base';
import React,{Component} from 'react';
import {StyleSheet,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class NavBarOpener extends Component
{
    constructor(props) {
        super(props);
        
        this.state = {rositaChecked : true};
    }

    componentDidMount() {
        this.setState({rositaChecked: true});
    }

    render()
    {

        return(
            <Header style={styles.header}>
                <Left style={styles.left}>
                    
                    <TouchableOpacity style={styles.touchable} onPress={()=>this.openNavBar(this.props)}>
                        <Icon name="ios-menu"/>
                        <Text style={styles.text}>Meniu</Text>
                    </TouchableOpacity>
                    
                </Left>
                <Right style={styles.right}>
                    <CheckBox 
                        checked={this.state.rositaChecked}
                        style={{width: 28, height: 28, paddingLeft: 6, paddingTop: 4}}
                        onPress={() => {
                            this.props.setRosita(!this.state.rositaChecked);
                            this.setState({rositaChecked : !this.state.rositaChecked})
                        }}
                    />
                    <Text style={styles.text}>Rosita</Text>
                </Right>
            </Header>
        );
    }

    openNavBar(props)
    {
        props.navigation.openDrawer();
    }

    toggleRosita(props)
    {

    }
}

const styles = StyleSheet.create({
    header:{
        height: 70,
        paddingTop: 30,
    },
    left:{
        display: "flex",
        flexDirection: "row",
    },
    right: {
        display: "flex",
        flexDirection: "row"
    },
    text:{
        fontSize: 20,
        paddingLeft: 10
    },
    touchable:{
        flexDirection:"row"
    }
});