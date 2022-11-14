import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

interface Props {
    setInitialPage: React.Dispatch<React.SetStateAction<number>>,
    pages: number,
}

const ScrollController: React.FC<Props> = ({ setInitialPage, pages }) => {

    const increase = () => {
        setInitialPage((prev) => Math.max(prev - 1, 1));
    };

    const decrease = () => {
        setInitialPage((prev) => Math.min(prev + 1, pages));
    };

    return (
        <View style={styles.gameInfoButtons}>
            <TouchableOpacity
                onPress={increase}
                style={styles.roundButton}
            >
                <Entypo name="arrow-bold-up" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={decrease}
                style={styles.roundButton}
            >
                <Entypo name="arrow-bold-down" size={40} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    gameInfoButtons: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    roundButton: {
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        text: {
            fontSize: 25,
        },
    },
});

export default ScrollController;