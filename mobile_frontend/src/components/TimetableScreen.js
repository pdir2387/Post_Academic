import React,{Component, useEffect} from 'react';
import { StyleSheet, View, Dimensions, FlatList, TouchableWithoutFeedback, Button, Text, Modal, Image, TouchableHighlight} from 'react-native';
import mainLogo from '../../assets/logo_facultate.png';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import NavBarOpener from './NavBarOpener';
import {backend_base_url} from '../misc/constants';
import { State } from 'react-native-gesture-handler';
import rosita_logo from '../../assets/logo_rosita.png';
import LoadingDots from "react-native-loading-dots";
  
class RositaTextView extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            index : 0,
            _interval : -1,
            colors : ['red', 'blue', 'green', 'black'],
            phrases : ['Try saying: Who is teaching software security?','Try saying: Search something about artificial intelligence on wikipedia.','Try saying: What\'s the time?','Try saying: What\'s the next big holiday?','Try saying: Where\'s Bucharest?','Try saying: What\'s my schedule for tomorrow?','Try saying: I like databases, what can you recommend?','Try saying: Open youtube.'],
        }
    }
    
    componentDidMount() {
        let intervalReference = setInterval(() => {
            let newIndex = this.state.index + 1;

            this.setState({index : newIndex});
        }, 2500);

        this.setState({_interval : intervalReference});
    }

    componentWillUnmount() {
        if (this.state._interval !== -1)
            clearInterval(this.state._interval);
    }

    render() {
        return (
            <View style={{display: 'flex', flexDirection: "row", padding: 10}}>
                <Image source={rosita_logo} style={{width: 25, height: 25, marginTop: 5}}/>
                <View style={{marginTop: 5, elevation: -1}}>
                    <LoadingDots dots={3} />
                </View>
    
                <Text style={{maxWidth: "80%", fontSize: 16}}>{this.state.phrases[this.state.index % this.state.phrases.length]}</Text>    
            </View>
        )
    }
        
}

export default function TimetableScreen(props) {
    const [orar, setOrar] = React.useState([]);
    const [clickedClass, setClickedClass] = React.useState(null);
    const [modalVisibility, setModalVisibility] = React.useState(false);
    const [rositaIsEnabled, setRosita] = React.useState(true);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'luni', title: 'Luni' },
        { key: 'marti', title: 'Marti' },
        { key: 'miercuri', title: 'Miercuri' },
        { key: 'joi', title: 'Joi' },
        { key: 'vineri', title: 'Vineri' },
    ]);

    useEffect(() => {
        fetchOrar();
    }, []);

    function fetchOrar() {
        if (orar.length === 0)
            //fetch(backend_base_url + 'api/orar')
            fetch(backend_base_url + 'api/student/ore')
            .then(res => res.json())
            .then(data => {
                setOrar(data);
            });
    }

    const getTodaysClasses = (day) => {
        let classes = [];

        let toCheckDay=day.toLowerCase();

        for (let course of orar) {
            if (course.zi.toLowerCase() == toCheckDay)
                classes.push(course);
        }

        return classes;
    }
    
    const _renderModal = (course) => {
        return (
            <Modal
                visible={modalVisibility}
                transparent={true}
                onRequestClose={() => {setModalVisibility(false)}}
                animationType='fade'
                >

                <TouchableWithoutFeedback onPress={() => {setModalVisibility(false)}}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <View style={styles.modalContent}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>{course.nume}</Text>

                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={{maxWidth: '50%', height: '80%', marginTop: 30, padding: 10}}>
                            <Text style={{fontSize: 17}}>{course.tip.toUpperCase()}</Text>
                            <Text style={{fontSize: 17}}>Cu {course.profesor}</Text>
                            <Text style={{fontSize: 17}}>Sala {course.sala}</Text>

                            <Button
                                title="Vezi pe harta"
                                onPress={() => {
                                    setModalVisibility(false);
                                    props.navigation.navigate('Locations', {sala_id : course.sala_id});
                                }}
                                style={{backgroundColor: 'lightblue'}}
                            />
                        </View>
                        <View style={{maxWidth: '50%', marginTop: 30, paddingLeft: 5}}>
                        <Image
                            style={{width: 150, height: 150}}
                            source={{uri: 'http://www.cs.ubbcluj.ro/wp-content/uploads/Suciu-Dan.jpg'}}
                        />
                        </View>
                    </View>
                </View>
            </Modal>
        )

    }

    const _renderFree = (props) => {
        return null;
        return (
            <View style={styles.classContainer}>
                <Text style={styles.classTime}>{props.time}:00</Text>
            </View>
        )
    }
    const _renderItem = (course) => {
        let currentClass = course.item;
        if (currentClass.nume === "fereastra")
            return (
                <_renderFree time={currentClass.start} />
            )

        return (
            <View 
                style={styles.classContainer}
                onStartShouldSetResponder={() => {

                }}
            >
                <Text style={styles.classTime}>{currentClass.start}:00</Text>

                <Text style={styles.class}>{currentClass.nume}{'\n'}{currentClass.tip}{'\n'}{currentClass.sala}</Text>
                <TouchableHighlight
                    onPress={() => {
                        setClickedClass(currentClass);
                        setModalVisibility(true);
                    }}
                    style={{backgroundColor: "lightblue",justifyContent:'center', height: 40, width: "50%", alignSelf: "center", marginBottom: 25}}
                >
                        <Text style={{textAlign: "center",  fontSize: 20}}>Mai multe informatii</Text>
                </TouchableHighlight>
            </View>
        )
    }

    const TabScene = (day) => {
        const classes = getTodaysClasses(day);
        
        //console.log(day + " am : " + JSON.stringify(classes));

        if (classes.length === 0) {
            return (
                <View style={styles.scene}>
                    <Text style={styles.congratsText}>Felicitări, astăzi ești complet liber!</Text>
                </View>
            )
        }

        let timeTableForToday = [];
        let hour = 8;
        while (hour < 20) {
            let foundOne = false;
            for (var classIndex = 0; classIndex < classes.length; classIndex++)
                if (classes[classIndex].start == hour) {
                    timeTableForToday.push(classes[classIndex]);
                    hour += classes[classIndex].durata;
                    foundOne = true;
                }
            
            if (!foundOne) {
                timeTableForToday.push({"nume" : "fereastra", "start" : hour});
                hour++;
            }
        }

        //console.log("day=" + day + " : " + timeTableForToday);

        return (
            <FlatList
                data={timeTableForToday}
                keyExtractor = { (item, index) => index.toString() }
                renderItem={(course) => _renderItem(course)}
                scrollEventThrottle={200}
                style={styles.scene}
            />
        )
    };
    
    const initialLayout = { width: Dimensions.get('window').width };
    
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'yellow', height: 2 }}
            labelStyle={{ fontSize: 17 }}
            scrollEnabled={true}
            style={{ backgroundColor: '#245caa'}}
        />
    );
    
    const renderScene = ({ route }) => {
        return TabScene(route.key);
    }

    return (
        <View style={styles.container}>
            { clickedClass !== null ? _renderModal(clickedClass) : null }
            <NavBarOpener navigation={props.navigation} setRosita={setRosita} />
            {rositaIsEnabled ? <RositaTextView /> : null}
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={styles.tabViewContainer}
            />
        </View>
    )
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    tabViewContainer: {
        fontSize: 5,
    },
    logo:{
        top: 40,
        alignContent: "center"
    },
    scene: {
        flex: 1,
        backgroundColor: "#F0F0F0"
    },
    classContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 30,
        borderBottomColor: 'black',
        borderBottomWidth: 3
    },
    classTime: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    class: {
        fontSize: 20,
        textAlign: 'center',
    },
    modalContent: {
        margin: '5%',
        backgroundColor: 'white',
        width: '90%',
        height: 275,
        marginTop: 180,
        padding: 20,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        
    },
    congratsText:{
        textAlign: 'center',
        fontSize: 20,
        top: 40
    }
});