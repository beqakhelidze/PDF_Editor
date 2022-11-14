import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import { useContextHelper } from '../context';

const pdfHeight = Dimensions.get('window').height / 1.13;

interface Props {
    initial?: number,
    setPages?: React.Dispatch<React.SetStateAction<number>>,
    singlePage: boolean
}

const PDF: React.FC<Props> = ({ initial, setPages, singlePage }) => {

    const Context = useContextHelper();
    const source = { uri: Context.uri, cache: true };

    return (
        <Pdf
            page={initial}
            singlePage={singlePage}
            onLoadComplete={(numberOfPages) => {
                if (setPages) {
                    setPages(numberOfPages);
                }
            }}
            trustAllCerts={false}
            source={source}
            style={styles.pdf} />
    );
};

const styles = StyleSheet.create({
    pdf: {
        width: Dimensions.get('window').width,
        height: pdfHeight,
        elevation: -1,
        zIndex: -1,
    },
});


export default PDF;