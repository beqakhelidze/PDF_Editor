import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useContextHelper } from '../context';
import PDF from '../Components/pdf';
import Draggable from 'react-native-draggable';
import ScrollController from '../Components/scrollController';

const Result: React.FC = () => {

    const navigate = useNavigate();
    const Context = useContextHelper();
    const ballsData = Context?.coordinates;
    const ballSize = 75;
    const [initialPage, setInitialPage] = useState<number>(1);
    const [pages, setPages] = useState<number>(0);

    return (
        <View style={styles.container}>
            <View style={styles.containerFlex}>
                <Button
                    title="Edit PDF"
                    onPress={() => navigate(-1)}
                />
            </View>
            {ballsData.filter((item) => item.page === initialPage)
                .map((ball) => {
                    return (
                        <Draggable
                            key={ball.id}
                            x={ball.x}
                            y={ball.y}
                            renderSize={ballSize}
                            renderColor="black"
                            renderText="Static"
                            isCircle
                            disabled
                            shouldReverse
                        />
                    );
                })}
            <PDF initial={initialPage} singlePage={true} />
            <ScrollController setInitialPage={setInitialPage} pages={pages} />
            {pages === 0 && <PDF setPages={setPages} singlePage={false} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        elevation: -1,
        zIndex: -1,
    },
    containerFlex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
    },
});


export default Result;