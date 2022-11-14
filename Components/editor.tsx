import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Button,
} from 'react-native';
import { useContextHelper } from '../context';
import PDF from './pdf';
import Draggable from 'react-native-draggable';
import { BallInterface } from '../interfaces';
import {
    useNavigate,
} from 'react-router-native';
import Entypo from 'react-native-vector-icons/Entypo';

const pdfHeight = Dimensions.get('window').height / 1.13;
import ScrollController from './scrollController';

const Editor: React.FC = () => {

    const navigate = useNavigate();
    const ballSize = 75;
    const Context = useContextHelper();
    const [ballsData, setBallsData] = useState<BallInterface[]>(Context.coordinates);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [pages, setPages] = useState<number>(0);
    const [initialPage, setInitialPage] = useState<number>(1);

    const defaultCondition = {
        x: Dimensions.get('window').width / 2 - ballSize / 2,
        y: Dimensions.get('window').height / 2 - ballSize / 2,
    };

    const setNewPosition = async (ID: number, gastureState: any) => {
        let specificBall: BallInterface | undefined = ballsData.find((ball) => ball.id === ID);
        if (!specificBall) {
            return;
        }

        const newSpecificBall = {
            x: Math.min(Math.max(
                specificBall.x + gastureState.dx,
                0
            ), Dimensions.get('window').width - ballSize),
            y: Math.min(Math.max(
                specificBall.y + gastureState.dy,
                Dimensions.get('window').height - pdfHeight,
            ), Dimensions.get('window').height - ballSize),
            id: specificBall.id,
            page: initialPage,
        };

        const Deleted: boolean = await checkIfDelete(specificBall, gastureState);
        if (Deleted) {
            return;
        }
        setBallsData((prev: BallInterface[]) => {
            return prev.map((ball) => {
                return ball.id === ID ? newSpecificBall as BallInterface : ball;
            });
        });
    };

    const addNewCircle = () => {
        const random = Math.round(Math.random() * 10000000);
        setBallsData((prev: BallInterface[]) => {
            return [...prev, { ...defaultCondition, id: random, page: initialPage }];
        });
    };

    const checkIfDelete = async (ball: BallInterface, state: any) => {
        if (ball.y + state.dy + ballSize / 2 < Dimensions.get('window').height - pdfHeight) {
            setBallsData((prev: BallInterface[]) => {
                return prev.filter((item: BallInterface) => ball.id !== item.id);
            });
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = () => {
        Context?.setCoordinates(ballsData);
        navigate('result');
    };

    const removePDF = () => {
        Context.setUri('');
        Context.setCoordinates([]);
    };

    return (
        <View style={styles.container}>
            {isDragging ?
                <View style={styles.containerFlex}>
                    <Entypo
                        name="trash"
                        color="black"
                        size={40}
                    />
                </View> :
                <View style={styles.containerFlex}>
                    <Button
                        title="Add draggable"
                        onPress={addNewCircle}
                    />
                    {ballsData.length > 0 &&
                        <Button
                            title="Submit"
                            onPress={handleSubmit}
                        />}
                    <Button
                        title="Remove PDF"
                        onPress={removePDF}
                        color="red"
                    />
                </View>}
            {ballsData.filter((item) => item.page === initialPage)
                .map((ball) => {
                    return (
                        <Draggable
                            key={ball.id}
                            x={ball.x}
                            y={ball.y}
                            renderSize={ballSize}
                            renderColor="black"
                            renderText="Draggable"
                            isCircle
                            shouldReverse
                            onShortPressRelease={() => console.log('hello')}
                            onPressIn={() => {
                                setIsDragging(true);
                            }}
                            onDragRelease={(event, gastureState) => {
                                setNewPosition(ball.id, gastureState);
                                setIsDragging(false);
                            }}
                        />
                    );
                })}
            <PDF initial={initialPage} singlePage={true} />
            {!isDragging && <ScrollController setInitialPage={setInitialPage} pages={pages} />}
            {pages === 0 && <PDF setPages={setPages} singlePage={false} />}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        zIndex: -1,
    },
    containerFlex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
    },
});


export default Editor;

