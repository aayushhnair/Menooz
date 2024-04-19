import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GText from '../common/GText';
import { colors, style, styles } from '../../themes';
import { moderateScale } from '../../common/constants';
import strings from '../../i18n/strings';

const PopupModal = ({ isVisible, onClose, stringToShow }) => {
    return (
        <Modal
            animationType="pop"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={localStyles.modalContainer}>
                <View style={localStyles.modalContent}>
                    <GText type="r15" color={colors.appwhite} style={localStyles.modalText}>{stringToShow}</GText>
                </View>
                <TouchableOpacity onPress={onClose} style={localStyles.closeContainer}>
                    <GText type="b15" style={localStyles.closeButton}>Close</GText>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

const CartPopupModal = ({ isVisible, onClose, onBack }) => {
    return (
        <Modal
            animationType="pop"
            transparent={true}
            visible={isVisible}
        >
            <View style={localStyles.modalContainer1}>
                <View style={localStyles.modalContent1}>
                    <GText type="r15" color={colors.appwhite} style={localStyles.modalText1}>{strings.cartCleared}</GText>
                </View>
                <View style={localStyles.buttonsContainer1}>
                    <TouchableOpacity onPress={onClose} style={localStyles.closeContainer1}>
                        <GText type="b15" style={localStyles.closeButton1}>Proceed</GText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onBack} style={localStyles.closeContainer}>
                        <GText type="b15" style={localStyles.closeButton1}>Go back</GText>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

const localStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    closeContainer: {
        borderTopWidth: 1,
        backgroundColor: colors.appyellow,
        ...styles.center,
        borderBottomRightRadius: moderateScale(10),
        width : '50%',
    },
    modalContainer: {
        borderWidth: 1,
        borderColor: colors.appyellow,
        marginTop: '90%',
        marginLeft: '15%',
        backgroundColor: colors.appblack,
        borderRadius: moderateScale(10),
        width: '70%',

    },
    modalContent: {
        alignItems: 'center',

    },
    modalText: {
        fontSize: 18,
        margin: 10,
    },
    closeButton: {
        ...styles.m10,
        color: colors.appblack, // Adjust color as needed
        fontSize: 16,
    },
    modalBackground1: {
        flex: 1,

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',

    },
    closeContainer1: {
        borderTopWidth: 1,
        backgroundColor: colors.appyellow,
        ...styles.center,
        borderBottomLeftRadius: moderateScale(10),
        width : '50%',
    },
    buttonsContainer1:{
        ...styles.rowSpaceBetween,
    },
    modalContainer1: {
        borderWidth: 1,
        borderColor: colors.appyellow,
        marginTop: '90%',
        marginLeft: '15%',
        backgroundColor: colors.appblack,
        borderRadius: moderateScale(10),
        width: '70%',

    },
    modalContent1: {
        alignItems: 'center',

    },
    modalText1: {
        fontSize: 18,
        margin: 10,
    },
    closeButton1: {
        ...styles.m10,
        color: colors.appblack, // Adjust color as needed
        fontSize: 16,
    },
});

export default PopupModal;
export { CartPopupModal };
