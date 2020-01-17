import React,{Component, useEffect} from 'react';
import { StyleSheet, View, Dimensions, FlatList, StatusBar, Text} from 'react-native';
import mainLogo from '../../assets/logo_facultate.png';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import NavBarOpener from './NavBarOpener';
import {backend_base_url} from '../misc/constants';


function TabbedTimeTable() {
    const [orar, setOrar] = React.useState([]);
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
            fetch(backend_base_url + 'api/orar')
            //fetch(backend_base_url + 'api/student/ore')
            .then(res => res.json())
            .then(data => {
                setOrar(data);
                //console.log(data);
            });
    }

    const getTodaysClasses = (day) => {
        let classes = [];

        for (let course of orar) {
            if (course.zi == day)
                classes.push(course);
        }

        return classes;
    }
    
    const _renderClass = (course) => {
        let currentClass = course.item;
        if (currentClass.nume === "fereastra")
            return (
                <View style={styles.classContainer}>
                    <Text style={styles.classTime}>{currentClass.start}:00</Text>
                </View>
            )
        else {
            
            return (
                <View style={styles.classContainer}>
                    <Text style={styles.classTime}>{currentClass.start}:00</Text>

                    <Text style={styles.class}>{currentClass.nume}{'\n'}{currentClass.tip}{'\n'}{currentClass.sala}</Text>
                </View>
            )
        }
    }

    const TabScene = (day) => {
        const classes = getTodaysClasses(day);
        
        //console.log(day + " am : " + JSON.stringify(classes));

        if (classes.length === 0) {
            return (
                <View style={styles.scene}>
                    <Text>Felicitari, astazi esti complet liber</Text>
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
                renderItem={(course) => _renderClass(course)}
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
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.tabViewContainer}
      />
    );
}
  
export default function TimetableScreen(props) {
    return (
        <View style={styles.container}>
            <NavBarOpener navigation={props.navigation}/>
            <TabbedTimeTable />
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
        backgroundColor: 'yellow',
        fontSize: 20,
        textAlign: 'center',
        height: 100
    }

});