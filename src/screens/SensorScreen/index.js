import {Image, Text, TouchableHighlight, View, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';
import { Divider } from 'react-native-elements';



const Detail = ({
                    key,
                    detail,
                    name,
                    style,
                    image

                })=>(
    <View>
        <View style = {{flexDirection: 'row',justifyContent: 'space-between',}}>
            <Text style = {{alignSelf: 'flex-start', paddingLeft: '5%'}}>{name}</Text>
            <Image
                source={image}
                style = {style}
            />
        </View>
        <Divider style={styles.sectionDivider}/>
    </View>
);



class SensorScreen extends React.Component {


        state = {
            //this is the array that holds information the the sensor components
            buttonText: "Activate Override",
            //azimuth: this.props.navigation.getParam("azimuth", 45),
            sensorName: this.props.navigation.getParam('sensorname', 'Sensor'),
            detail:  this.props.navigation.getParam('details', 3),
            override: this.props.navigation.getParam('override',0)
        }


    getLightColor = (detail,override) =>{
        /*
        This function sets the image of the sensor
        if override is 1 it returns orange
        if 0 the func returns based on the integer parameter 'detail'
        0 returns red, 1 returns yellow, 2 returns green, returns grey if anything else
         */
        if(override){
            this.state.buttonText = "Remove Override"
            return require("../../../assets/images/orangeStatus.png");
        }
        else{
            this.state.buttonText = "Activate Override"
            if(detail == 0){//0 = red
                return require("../../../assets/images/redStatus.png");
            }
            else if (detail == 1){//1 = yellow
                return require("../../../assets/images/mediumyellowstatus.png");
            }
            else if (detail == 2){// 2 = green
                return require("../../../assets/images/meduimgreenstatus.png");
            }
            else{//anything else should be a grey light to show something is wrong
                return require("../../../assets/images/greyStatus.png");
            }
        }
    };

    updateOverride = () =>{
        if(this.state.override){
            this.setState({buttonText: "Activate Override"});
            this.setState({override: 0})
        }
        else{
            this.setState({buttonText: "Remove Override"});
            this.setState({override: 1})
        }

    };

  render() {
    const { navigation } = this.props;
    const details = navigation.getParam('details', 3)
    return (
        <ScrollView>
            <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.back}>
                <Image
                    source={require("../../../assets/images/back.png")}
                />
            </TouchableHighlight>
            <View style={{marginTop: '10%', alignItems: 'center',}}>
                <Text style = {styles.header}> {this.state.sensorName}</Text>

            </View>
            <Divider style={styles.sectionDivider}/>
            <View style={styles.container}>
                <View style={styles.detailslistcontainer}>
                    <TouchableHighlight onPress={() => {this.props.navigation.navigate('Override')}}>
                        <Detail name = {this.state.sensorName} detail={this.state.detail}
                        style = {styles.statusLightStyle}
                        image = {this.getLightColor(this.state.detail,this.state.override)}
                        />
                    </TouchableHighlight>
                </View>
            </View>
            <TouchableHighlight onPress={() => {this.updateOverride()}} style={styles.button}>
                <View>
                    <Text style={{color: 'white'}}> {this.state.buttonText} </Text>
                </View>
            </TouchableHighlight>
        </ScrollView>
    );
  }
}

export default SensorScreen;
