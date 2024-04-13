import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GText from '../common/GText';
import { colors, style, styles } from '../../themes';
import { moderateScale } from '../../common/constants';

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
        borderBottomLeftRadius: moderateScale(10),
        borderBottomRightRadius: moderateScale(10),
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
});

export default PopupModal;
