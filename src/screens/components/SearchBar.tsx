import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
};

export default function SearchBar({ value, onChangeText, placeholder }: Props) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder || "Search..."}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    input: {
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 8,
        padding: 10,
    },
});
